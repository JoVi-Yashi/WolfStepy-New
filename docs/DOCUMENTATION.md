
# Documentación Técnica del Proyecto WolfStep (Arquitectura Laravel + Vue)

## 1. Introducción

Este documento describe la arquitectura técnica hipotética del proyecto WolfStep si se construyera utilizando **Laravel** para el backend, **Vue.js** para el frontend y **PostgreSQL** como base de datos. El objetivo es proporcionar un plano detallado para el desarrollo, mantenimiento y escalabilidad de la aplicación bajo este stack tecnológico.

## 2. Arquitectura General

La aplicación sigue un modelo de **API monolítica con un frontend desacoplado (SPA)**.

-   **Backend (Laravel)**: Expone una API RESTful para gestionar todos los recursos (usuarios, productos, categorías). Se encarga de la lógica de negocio, la interacción con la base de datos y la autenticación.
-   **Frontend (Vue.js)**: Una Aplicación de Página Única (SPA) que consume la API de Laravel. Se encarga de toda la interfaz de usuario, la gestión del estado en el cliente y la interacción con el usuario.
-   **Base de Datos (PostgreSQL)**: Almacena todos los datos de la aplicación de manera relacional.

---

## 3. Backend (Laravel)

### 3.1. Modelo de Datos y Migraciones (PostgreSQL)

A continuación se definen las tablas de la base de datos y sus correspondientes migraciones en Laravel.

#### Tabla `users`
Almacena la información de los usuarios registrados.

**Migración (`create_users_table`)**
```php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('username')->unique();
    $table->string('first_name')->nullable();
    $table->string('last_name')->nullable();
    $table->string('email')->unique();
    $table->timestamp('email_verified_at')->nullable();
    $table->string('password');
    $table->string('photo_url', 2048)->nullable();
    $table->rememberToken();
    $table->timestamps(); // created_at y updated_at
});
```
- **Índices**: `username`, `email`.

#### Tabla `categories`
Almacena las categorías de productos, vinculadas a un usuario.

**Migración (`create_categories_table`)**
```php
Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('name');
    $table->text('description');
    $table->json('attributes'); // Se almacena como un array de strings en formato JSON
    $table->timestamps();
});
```
- **Relaciones**: `categories.user_id` -> `users.id` (Muchos a Uno).

#### Tabla `products`
Almacena los productos del inventario, vinculados a un usuario y una categoría.

**Migración (`create_products_table`)**
```php
Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('category_id')->constrained()->onDelete('cascade');
    $table->string('title');
    $table->string('etapa'); // p. ej., 'Juvenil', 'Adulto', 'Niños'
    $table->string('size');
    $table->string('color'); // Hex code, e.g., '#FFFFFF'
    $table->string('color_name');
    $table->integer('stock')->default(0);
    $table->string('image_url', 2048)->nullable();
    $table->timestamps();
});
```
- **Relaciones**:
    - `products.user_id` -> `users.id` (Muchos a Uno).
    - `products.category_id` -> `categories.id` (Muchos a Uno).
- **Índices**: `etapa`.

### 3.2. Modelos de Eloquent

#### `User` Model (`app/Models/User.php`)
```php
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'username', 'first_name', 'last_name', 'email', 'password', 'photo_url'
    ];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = ['email_verified_at' => 'datetime'];

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
```

#### `Category` Model (`app/Models/Category.php`)
```php
class Category extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'description', 'attributes'];

    protected $casts = ['attributes' => 'array'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
```

#### `Product` Model (`app/Models/Product.php`)
```php
class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'category_id', 'title', 'etapa', 'size', 'color', 'color_name', 'stock', 'image_url'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
```

### 3.3. Rutas de la API (`routes/api.php`)

Se utiliza Laravel Sanctum para la autenticación de la SPA.

```php
// Rutas de Autenticación
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Rutas Protegidas
Route::middleware('auth:sanctum')->group(function () {
    // Perfil de Usuario
    Route::get('/user', [ProfileController::class, 'show']);
    Route::put('/user', [ProfileController::class, 'update']);
    Route::post('/user/photo', [ProfileController::class, 'updatePhoto']);

    // Recursos anidados por usuario
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('products', ProductController::class);

    // Dashboard
    Route::get('/dashboard/stats', [DashboardController::class, 'getStats']);
    Route::get('/dashboard/inventory-distribution', [DashboardController::class, 'getInventoryDistribution']);
});
```

### 3.4. Controladores Principales

-   **`AuthController`**: Maneja el registro, inicio de sesión (emitiendo un token de Sanctum) y cierre de sesión.
-   **`ProfileController`**: Gestiona la obtención, actualización del perfil de usuario y la subida de la foto de perfil a un servicio de almacenamiento (ej. AWS S3).
-   **`CategoryController` / `ProductController`**: Controladores de tipo `Resource` que gestionan el CRUD para categorías y productos. Implementan políticas de autorización para asegurar que un usuario solo pueda acceder a sus propios recursos.
-   **`DashboardController`**: Proporciona los datos agregados para el panel de control.

---

## 4. Frontend (Vue.js)

### 4.1. Estructura de Carpetas

```
src/
├── assets/         // Imágenes, fuentes, etc.
├── components/     // Componentes reutilizables (botones, modales, etc.)
├── views/          // Componentes de página (Dashboard, Inventory, Login, etc.)
├── router/         // Configuración de Vue Router
├── store/          // Gestión de estado con Pinia
└── services/       // Módulos para interactuar con la API de Laravel (Axios)
```

### 4.2. Gestión de Estado (Pinia)

-   **`auth.store.js`**: Almacena el estado de autenticación del usuario (el token y los datos del usuario). Proporciona acciones para `login`, `register`, `logout` y `fetchUser`.
-   **`inventory.store.js`**: Gestiona el estado del inventario (productos y categorías). Mantiene una copia local de los datos y proporciona acciones para obtener, añadir, actualizar y eliminar recursos, sincronizando con la API.

### 4.3. Componentes Clave

-   **`App.vue`**: Componente raíz. Contiene el `RouterView` y los layouts principales.
-   **`Login.vue` / `Register.vue`**: Vistas con formularios para autenticación. Llaman a las acciones del `auth.store`.
-   **`DashboardLayout.vue`**: Layout principal para las vistas autenticadas. Incluye el `Sidebar` y el `Header` con el menú de usuario.
-   **`Dashboard.vue`**: Vista del panel de control. Obtiene las estadísticas desde el `inventory.store` y renderiza los gráficos (usando una librería como `Chart.js` o `ApexCharts`).
-   **`Inventory.vue`**: Vista de gestión de inventario. Contiene:
    -   `DataTable.vue`: Componente reutilizable para mostrar datos en una tabla con búsqueda, ordenación y paginación.
    -   `ProductForm.vue`: Formulario modal para añadir/editar productos, con validaciones (usando una librería como `Vuelidate`).
-   **`Categories.vue`**: Vista para gestionar las categorías. Muestra tarjetas por cada categoría y utiliza un modal con `CategoryForm.vue` para el CRUD.
-   **`Profile.vue`**: Vista de perfil de usuario. Muestra la información y permite la edición a través de modales.
    -   `ProfilePictureEditor.vue`: Componente con una herramienta de recorte de imagen (ej. `vue-advanced-cropper`) que se comunica con el servicio de API para subir la nueva foto.

### 4.4. Enrutamiento (Vue Router)

-   **Rutas Públicas**: `/login`, `/register`.
-   **Rutas Protegidas**: `/dashboard`, `/inventory`, `/categories`, `/profile`.
-   Se utiliza un **Navigation Guard** (`beforeEach`) en el router para verificar si el usuario está autenticado (comprobando la existencia del token en el `auth.store`). Si no lo está y trata de acceder a una ruta protegida, se le redirige a `/login`.

---

## 5. Flujo de Autenticación (Laravel Sanctum + Vue)

1.  **Login**: El usuario envía su email y contraseña desde el formulario de Vue.
2.  **API Request**: Vue (Axios) hace una petición `POST` a `/api/login` de Laravel.
3.  **Laravel**: Valida las credenciales. Si son correctas, crea un token de API para el usuario.
4.  **API Response**: Laravel devuelve una respuesta `200 OK` con los datos del usuario. El token se gestiona a través de cookies seguras (`HttpOnly`).
5.  **Vue**: Pinia (`auth.store`) guarda los datos del usuario y un estado `isAuthenticated: true`. Vue Router redirige al `/dashboard`.
6.  **Peticiones Subsecuentes**: Axios se configura para incluir automáticamente las credenciales (cookies) en todas las peticiones a la API, permitiendo a Laravel autenticar al usuario en las rutas protegidas.

