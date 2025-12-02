
export const categories = [
    {
        name: 'Zapatillas',
        description: 'Calzado ligero y cómodo para uso diario o deportivo.',
        attributes: ['Material', 'Suela', 'Estilo'],
    },
    {
        name: 'Botas',
        description: 'Calzado robusto que cubre el pie y parte del tobillo, ideal para protección o clima frío.',
        attributes: ['Material', 'Altura de caña', 'Tipo de cierre'],
    },
    {
        name: 'Sandalias',
        description: 'Calzado abierto, ideal para climas cálidos y uso casual.',
        attributes: ['Material', 'Tipo de suela', 'Estilo de tira'],
    },
    {
        name: 'Zapatos Formales',
        description: 'Calzado elegante para ocasiones de negocios, eventos y ceremonias.',
        attributes: ['Material', 'Tipo de cierre', 'Acabado'],
    },
    {
        name: 'Zapatos Deportivos',
        description: 'Calzado técnico diseñado para actividades deportivas específicas.',
        attributes: ['Deporte', 'Amortiguación', 'Tipo de pisada'],
    },
    {
        name: 'Zapatos de Niños',
        description: 'Calzado diseñado específicamente para los pies en desarrollo de los niños.',
        attributes: ['Rango de edad', 'Tipo de cierre', 'Material'],
    },
    {
        name: 'Zapatillas de Casa',
        description: 'Calzado cómodo y suave para usar dentro del hogar.',
        attributes: ['Material', 'Forro', 'Tipo de suela'],
    },
    {
        name: 'Mocasines',
        description: 'Zapatos sin cordones, conocidos por su comodidad y estilo versátil.',
        attributes: ['Material', 'Adorno', 'Tipo de suela'],
    },
    {
        name: 'Zuecos',
        description: 'Calzado, tradicionalmente de madera, ahora en diversos materiales, caracterizado por su comodidad y facilidad de uso.',
        attributes: ['Material', 'Correa trasera', 'Ventilación'],
    },
    {
        name: 'Calzado de Seguridad',
        description: 'Calzado diseñado para proteger los pies en entornos laborales peligrosos.',
        attributes: ['Puntera de seguridad', 'Suela antideslizante', 'Protección dieléctrica'],
    },
    {
        name: 'Calzado Acuático',
        description: 'Calzado ligero y de secado rápido para actividades en el agua.',
        attributes: ['Material', 'Drenaje', 'Tipo de suela'],
    },
]

export const products = [
    // Zapatillas (Sneakers)
    {
      "id": "SHOE-8782",
      "title": "Zapatilla Deslizador Cósmico",
      "etapa": "Juvenil",
      "categoria": "Zapatillas",
      "size": "US 9",
      "color": "#60a5fa",
      "colorName": "Azul Cielo",
      "stock": 105,
      "imageUrl": "https://images.unsplash.com/photo-1615290642708-a37192ba54ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxibHVlJTIwc25lYWtlcnxlbnwwfHx8fDE3NjM5MTg1MjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9876",
      "title": "Explorador Urbano High-Top",
      "etapa": "Juvenil",
      "categoria": "Zapatillas",
      "size": "US 8",
      "color": "#4b5563",
      "colorName": "Pizarra",
      "stock": 62,
      "imageUrl": "https://images.unsplash.com/photo-1700407592504-f4de855d559a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Z3JheSUyMHNuZWFrZXJ8ZW58MHx8fHwxNzYzOTE4NTI0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-1234",
      "title": "Velocista Galáctico",
      "etapa": "Niños",
      "categoria": "Zapatillas",
      "size": "US 1",
      "color": "#818cf8",
      "colorName": "Índigo",
      "stock": 75,
      "imageUrl": "https://images.unsplash.com/photo-1631312782643-883d1bfc84c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwdXJwbGUlMjBzbmVha2VyfGVufDB8fHx8MTc2MzkxODUyNHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
     {
      "id": "SHOE-1001",
      "title": "Zapatilla Clásica de Lona",
      "etapa": "Adulto",
      "categoria": "Zapatillas",
      "size": "US 10",
      "color": "#ffffff",
      "colorName": "Blanco",
      "stock": 200,
      "imageUrl": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJ8ZW58MHx8fHwxNzE2NDk2ODUxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-1002",
      "title": "Zapatilla Urbana de Cuero",
      "etapa": "Adulto",
      "categoria": "Zapatillas",
      "size": "US 9.5",
      "color": "#000000",
      "colorName": "Negro",
      "stock": 150,
      "imageUrl": "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwzfHxibGFjayUyMHNuZWFrZXJ8ZW58MHx8fHwxNzE2NDk2ODUxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },

    // Botas
    {
      "id": "SHOE-7878",
      "title": "Bota Exploradora Terra",
      "etapa": "Adulto",
      "categoria": "Botas",
      "size": "US 10",
      "color": "#8b5cf6",
      "colorName": "Violeta",
      "stock": 8,
      "imageUrl": "https://images.unsplash.com/photo-1655976795408-92a8498838c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxoaWtpbmclMjBib290fGVufDB8fHx8MTc2Mzg5Njk0Mnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-1122",
      "title": "Bota de Senderismo Everest",
      "etapa": "Adulto",
      "categoria": "Botas",
      "size": "US 9.5",
      "color": "#a16207",
      "colorName": "Marrón Dorado",
      "stock": 35,
      "imageUrl": "https://images.unsplash.com/photo-1744814917810-269fbf29ca00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxicm93biUyMGJvb3R8ZW58MHx8fHwxNzYzOTE4NTI0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-5678",
      "title": "Escalador de Cumbres",
      "etapa": "Adulto",
      "categoria": "Botas",
      "size": "US 12",
      "color": "#ca8a04",
      "colorName": "Dorado",
      "stock": 25,
      "imageUrl": "https://images.unsplash.com/photo-1698352709078-7dde09852142?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxjbGltYmluZyUyMHNob2V8ZW58MHx8fHwxNzYzOTE4NTI0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-2001",
      "title": "Botín Chelsea de Cuero",
      "etapa": "Adulto",
      "categoria": "Botas",
      "size": "US 9",
      "color": "#44403c",
      "colorName": "Marrón Oscuro",
      "stock": 60,
      "imageUrl": "https://images.unsplash.com/photo-1631312782643-883d1bfc84c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwyfHxicm93biUyMGJvb3R8ZW58MHx8fHwxNzE2NDk2OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-2002",
      "title": "Bota de Invierno Aislante",
      "etapa": "Juvenil",
      "categoria": "Botas",
      "size": "US 7",
      "color": "#3f3f46",
      "colorName": "Gris",
      "stock": 40,
      "imageUrl": "https://images.unsplash.com/photo-1608256247924-a745c91f1b2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBib290fGVufDB8fHx8MTcxNjQ5Njk1OXww&ixlib=rb-4.1.0&q=80&w=1080"
    },

    // Sandalias
    {
      "id": "SHOE-7839",
      "title": "Sandalia Aqua Stride",
      "etapa": "Niños",
      "categoria": "Sandalias",
      "size": "US 4",
      "color": "#34d399",
      "colorName": "Esmeralda",
      "stock": 48,
      "imageUrl": "https://images.unsplash.com/photo-1669774119496-0ea0b7250e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxncmVlbiUyMHNhbmRhbHxlbnwwfHx8fDE3NjM5MTg1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-3344",
      "title": "Chancla Playera",
      "etapa": "Juvenil",
      "categoria": "Sandalias",
      "size": "US 7",
      "color": "#22d3ee",
      "colorName": "Cian",
      "stock": 150,
      "imageUrl": "https://images.unsplash.com/photo-1568901578471-a1d5af772617?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxibHVlJTIwZmxpcC1mbG9wfGVufDB8fHx8MTc2MzkxODUyNHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-3001",
      "title": "Sandalia de Dedo de Cuero",
      "etapa": "Adulto",
      "categoria": "Sandalias",
      "size": "US 11",
      "color": "#78350f",
      "colorName": "Cuero",
      "stock": 90,
      "imageUrl": "https://images.unsplash.com/photo-1627054231641-a62a98457f5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwc2FuZGFsc3xlbnwwfHx8fDE3MTY0OTcwMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-3002",
      "title": "Sandalia de Plataforma",
      "etapa": "Juvenil",
      "categoria": "Sandalias",
      "size": "US 8",
      "color": "#fdf2f8",
      "colorName": "Rosa Pálido",
      "stock": 70,
      "imageUrl": "https://images.unsplash.com/photo-1603540323062-3c873a1c7423?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcGxhdGZvcm0lMjBzYW5kYWxzfGVufDB8fHx8MTcxNjQ5NzAyNnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-3003",
      "title": "Sandalia de Trekking",
      "etapa": "Adulto",
      "categoria": "Sandalias",
      "size": "US 10",
      "color": "#4b5563",
      "colorName": "Gris Oscuro",
      "stock": 55,
      "imageUrl": "https://images.unsplash.com/photo-1604671363555-0a78f0b1a6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHx0cmVra2luZyUyMHNhbmRhbHN8ZW58MHx8fHwxNzE2NDk3MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },

    // Zapatos Deportivos
    {
      "id": "SHOE-2456",
      "title": "Corredor de Velocidad",
      "etapa": "Adulto",
      "categoria": "Zapatos Deportivos",
      "size": "US 11",
      "color": "#f87171",
      "colorName": "Coral",
      "stock": 12,
      "imageUrl": "https://images.unsplash.com/photo-1635252517690-1a4438427ba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxyZWQlMjBydW5uZXJ8ZW58MHx8fHwxNzYzOTE4NTI0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-2457",
      "title": "Zapatilla de Correr Ligera",
      "etapa": "Adulto",
      "categoria": "Zapatos Deportivos",
      "size": "US 9",
      "color": "#0ea5e9",
      "colorName": "Azul Eléctrico",
      "stock": 80,
      "imageUrl": "https://images.unsplash.com/photo-1587587448924-b5a1db520d29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxydW5uaW5nJTIwc2hvZXN8ZW58MHx8fHwxNzY0MjQwNjQyfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-2458",
      "title": "Zapatilla de Baloncesto High-Top",
      "etapa": "Juvenil",
      "categoria": "Zapatos Deportivos",
      "size": "US 8",
      "color": "#dc2626",
      "colorName": "Rojo Fuego",
      "stock": 45,
      "imageUrl": "https://images.unsplash.com/photo-1595909236612-9fd30b476365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxiYXNrZXRiYWxsJTIwc2hvZXN8ZW58MHx8fHwxNzY0MzQzMTIxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-2459",
      "title": "Zapatilla de Entrenamiento Cruzado",
      "etapa": "Adulto",
      "categoria": "Zapatos Deportivos",
      "size": "US 10",
      "color": "#65a30d",
      "colorName": "Verde Lima",
      "stock": 65,
      "imageUrl": "https://images.unsplash.com/photo-1627847314307-148d89709094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx0cmFpbmluZyUyMHNob2VzfGVufDB8fHx8MTc2NDM0MzEyMXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-2460",
      "title": "Zapatilla de Trail Minimalista",
      "etapa": "Adulto",
      "categoria": "Zapatos Deportivos",
      "size": "US 10.5",
      "color": "#f97316",
      "colorName": "Naranja",
      "stock": 30,
      "imageUrl": "https://images.unsplash.com/photo-1614638964199-576734e56290?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx0cmFpbCUyMHNob2VzfGVufDB8fHx8MTc2NDM0MzEyMXww&ixlib=rb-4.1.0&q=80&w=1080"
    },

    // Zapatos de Niños
    {
      "id": "SHOE-5432",
      "title": "Primeros Pasos Dedos Pequeños",
      "etapa": "Niños",
      "categoria": "Zapatos de Niños",
      "size": "US 3",
      "color": "#fbbf24",
      "colorName": "Ámbar",
      "stock": 88,
      "imageUrl": "https://images.unsplash.com/photo-1721924335651-378eece1b7d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx5ZWxsb3clMjBzaG9lfGVufDB8fHx8MTc2MzkxODUyNHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-5566",
      "title": "Zapato Brillo Estelar",
      "etapa": "Niños",
      "categoria": "Zapatos de Niños",
      "size": "US 2",
      "color": "#ec4899",
      "colorName": "Rosa",
      "stock": 5,
      "imageUrl": "https://images.unsplash.com/photo-1727703215357-3522297d66e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxwaW5rJTIwc2hvZXxlbnwwfHx8fDE3NjM5MTg1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-5433",
      "title": "Zapatos de Bebé con Velcro",
      "etapa": "Niños",
      "categoria": "Zapatos de Niños",
      "size": "US 4K",
      "color": "#3b82f6",
      "colorName": "Azul Bebé",
      "stock": 110,
      "imageUrl": "https://images.unsplash.com/photo-1605317143724-025ceb00651c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0b2RkbGVyJTIwc2hvZXN8ZW58MHx8fHwxNzY0MzQzMTIxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-5434",
      "title": "Zapatillas con Luces para Niños",
      "etapa": "Niños",
      "categoria": "Zapatos de Niños",
      "size": "US 11K",
      "color": "#a855f7",
      "colorName": "Púrpura",
      "stock": 70,
      "imageUrl": "https://images.unsplash.com/photo-1763749530598-081a259e5bf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxsaWdodC11cCUyMHNuZWFrZXJzfGVufDB8fHx8MTc2NDM0MzEyMXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-5435",
      "title": "Botas de Lluvia para Niños",
      "etapa": "Niños",
      "categoria": "Zapatos de Niños",
      "size": "US 12K",
      "color": "#facc15",
      "colorName": "Amarillo",
      "stock": 60,
      "imageUrl": "https://images.unsplash.com/photo-1709768669201-40b3a25b6e74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxraWRzJTIwYm9vdHN8ZW58MHx8fHwxNzY0MzQzMTIxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },

    // Zapatos Formales
    {
      "id": "SHOE-7788",
      "title": "Mocasín Metrópolis",
      "etapa": "Adulto",
      "categoria": "Zapatos Formales",
      "size": "US 10.5",
      "color": "#1f2937",
      "colorName": "Carbón",
      "stock": 42,
      "imageUrl": "https://images.unsplash.com/photo-1657850064402-973260e4e272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxibGFjayUyMGxvYWZlcnxlbnwwfHx8fDE3NjM5MTg1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-8790",
      "title": "Zapatos Clásicos Formales Negros",
      "etapa": "Adulto",
      "categoria": "Zapatos Formales",
      "size": "US 10",
      "color": "#000000",
      "colorName": "Negro",
      "stock": 50,
      "imageUrl": "https://images.unsplash.com/photo-1668069226492-508742b03147?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBzaG9lc3xlbnwwfHx8fDE3NjQzNDMxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-8791",
      "title": "Zapatos de Vestir de Cuero Marrón",
      "etapa": "Adulto",
      "categoria": "Zapatos Formales",
      "size": "US 9",
      "color": "#7f5539",
      "colorName": "Marrón",
      "stock": 35,
      "imageUrl": "https://images.unsplash.com/photo-1657036779347-db31ebaad251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxkcmVzcyUyMHNob2VzfGVufDB8fHx8MTc2NDMyNzE4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-8792",
      "title": "Brogues Wingtip",
      "etapa": "Adulto",
      "categoria": "Zapatos Formales",
      "size": "US 11",
      "color": "#5c5c5c",
      "colorName": "Gris Oscuro",
      "stock": 25,
      "imageUrl": "https://images.unsplash.com/photo-1710196301218-c9a08d142c68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8d2luZ3RpcCUyMGJyb2d1ZXN8ZW58MHx8fHwxNzY0MzQzMTIxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-8793",
      "title": "Zapatos Oxford de Charol",
      "etapa": "Adulto",
      "categoria": "Zapatos Formales",
      "size": "US 8.5",
      "color": "#312e81",
      "colorName": "Azul Marino",
      "stock": 20,
      "imageUrl": "https://images.unsplash.com/photo-1576133385309-203e67da8e58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxveGZvcmQlMjBzaG9lc3xlbnwwfHx8fDE3NjQzNDMxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },

    // Zapatillas de Casa (Slippers)
    {
      "id": "SHOE-9001",
      "title": "Pantufla de Felpa Cómoda",
      "etapa": "Adulto",
      "categoria": "Zapatillas de Casa",
      "size": "M",
      "color": "#e5e7eb",
      "colorName": "Gris Claro",
      "stock": 120,
      "imageUrl": "https://images.unsplash.com/photo-1605812398516-242862e39a3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxwbHVzaCUyMHNsaXBwZXJzfGVufDB8fHx8MTcxNjQ5NzE1Nnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9002",
      "title": "Pantufla de Espuma Viscoelástica",
      "etapa": "Adulto",
      "categoria": "Zapatillas de Casa",
      "size": "L",
      "color": "#1e3a8a",
      "colorName": "Azul Marino",
      "stock": 95,
      "imageUrl": "https://images.unsplash.com/photo-1590798642706-9a1b1a0302b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxtZW1vcnklMjBmb2FtJTIwc2xpcHBlcnN8ZW58MHx8fHwxNzE2NDk3MTU2fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9003",
      "title": "Pantufla de Animalitos para Niños",
      "etapa": "Niños",
      "categoria": "Zapatillas de Casa",
      "size": "S",
      "color": "#d27303",
      "colorName": "Naranja Zorro",
      "stock": 80,
      "imageUrl": "https://images.unsplash.com/photo-1582015291953-62586616de32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxhbmltYWwlMjBzbGlwcGVyc3xlbnwwfHx8fDE3MTY0OTcxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9004",
      "title": "Pantufla tipo Bota",
      "etapa": "Juvenil",
      "categoria": "Zapatillas de Casa",
      "size": "M",
      "color": "#fda4af",
      "colorName": "Rosa",
      "stock": 60,
      "imageUrl": "https://images.unsplash.com/photo-1560346740-a9686362a945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxzbGlwcGVyJTIwYm9vdHN8ZW58MHx8fHwxNzE2NDk3MTU2fDA&ixlibrb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9005",
      "title": "Pantufla Abierta de Verano",
      "etapa": "Adulto",
      "categoria": "Zapatillas de Casa",
      "size": "S",
      "color": "#a7f3d0",
      "colorName": "Verde Menta",
      "stock": 110,
      "imageUrl": "https://images.unsplash.com/photo-1623199898235-a508493c1265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxv-Blbi10b2UlMjBzbGlwcGVyc3xlbnwwfHx8fDE3MTY0OTcxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },

    // Mocasines (Loafers)
    {
      "id": "SHOE-8794",
      "title": "Mocasines de Ante",
      "etapa": "Adulto",
      "categoria": "Mocasines",
      "size": "US 9",
      "color": "#a16207",
      "colorName": "Marrón Claro",
      "stock": 70,
      "imageUrl": "https://images.unsplash.com/photo-1709186404666-ee89a090575c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxzdWVkZSUyMGxvYWZlcnN8ZW58MHx8fHwxNzY0MzQzMTIxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9101",
      "title": "Mocasín Penny Clásico",
      "etapa": "Adulto",
      "categoria": "Mocasines",
      "size": "US 10",
      "color": "#4c1d95",
      "colorName": "Borgoña",
      "stock": 50,
      "imageUrl": "https://images.unsplash.com/photo-1599388136367-293444850720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxwZW5ueSUyMGxvYWZlcnN8ZW58MHx8fHwxNzE2NDk3MjIyfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9102",
      "title": "Mocasín de Conducir",
      "etapa": "Adulto",
      "categoria": "Mocasines",
      "size": "US 11",
      "color": "#065f46",
      "colorName": "Verde Bosque",
      "stock": 45,
      "imageUrl": "https://images.unsplash.com/photo-1631401399839-897d293b66b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxkcml2aW5nJTIwbG9hZmVyc3xlbnwwfHx8fDE3MTY0OTcyMjJ8MA&ixlib-rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9103",
      "title": "Mocasín con Borlas",
      "etapa": "Adulto",
      "categoria": "Mocasines",
      "size": "US 9.5",
      "color": "#fefce8",
      "colorName": "Beige",
      "stock": 65,
      "imageUrl": "https://images.unsplash.com/photo-1549298916-b41d501d3772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHx0YXNzZWwlMjBsb2FmZXJzfGVufDB8fHx8MTcxNjQ5NzIyMnww&ixlib-rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9104",
      "title": "Mocasín de Cuero Trenzado",
      "etapa": "Adulto",
      "categoria": "Mocasines",
      "size": "US 10",
      "color": "#3e2723",
      "colorName": "Café",
      "stock": 40,
      "imageUrl": "https://images.unsplash.com/photo-1626372580190-410a5665cf5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHx3b3ZlbiUyMGxvYWZlcnN8ZW58MHx8fHwxNzE2NDk3MjIyfDA&ixlib-rb-4.1.0&q=80&w=1080"
    },

    // Zuecos (Clogs)
    {
      "id": "SHOE-9201",
      "title": "Zueco Clásico de Goma",
      "etapa": "Adulto",
      "categoria": "Zuecos",
      "size": "US 9",
      "color": "#2563eb",
      "colorName": "Azul",
      "stock": 150,
      "imageUrl": "https://images.unsplash.com/photo-1603145733316-74623f43c333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxibHVlJTIwY2xvZ3N8ZW58MHx8fHwxNzE2NDk3Mjk1fDA&ixlib-rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9202",
      "title": "Zueco con Forro de Felpa",
      "etapa": "Juvenil",
      "categoria": "Zuecos",
      "size": "US 7",
      "color": "#be185d",
      "colorName": "Fucsia",
      "stock": 80,
      "imageUrl": "https://images.unsplash.com/photo-1616223731140-94d86895c378?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxwbHVzaCUyMGNsb2dzfGVufDB8fHx8MTcxNjQ5NzI5NXww&ixlib-rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9203",
      "title": "Zueco Sanitario Profesional",
      "etapa": "Adulto",
      "categoria": "Zuecos",
      "size": "US 8",
      "color": "#ffffff",
      "colorName": "Blanco",
      "stock": 200,
      "imageUrl": "https://images.unsplash.com/photo-1631214524029-a35606f56a73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNsb2dzfGVufDB8fHx8MTcxNjQ5NzI5NXww&ixlib-rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9204",
      "title": "Zueco de Jardín",
      "etapa": "Adulto",
      "categoria": "Zuecos",
      "size": "US 10",
      "color": "#166534",
      "colorName": "Verde",
      "stock": 130,
      "imageUrl": "https://images.unsplash.com/photo-1618779949198-d34f0a99e4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGNsb2dzfGVufDB8fHx8MTcxNjQ5NzI5NXww&ixlib-rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9205",
      "title": "Zueco con Plataforma",
      "etapa": "Juvenil",
      "categoria": "Zuecos",
      "size": "US 6",
      "color": "#fde047",
      "colorName": "Amarillo Sol",
      "stock": 75,
      "imageUrl": "https://images.unsplash.com/photo-1605557635954-c9b88d1d2346?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHx5ZWxsb3clMjBjbG9nc3xlbnwwfHx8fDE3MTY0OTcyOTV8MA&ixlib-rb-4.1.0&q=80&w=1080"
    },

    // Calzado de Seguridad
    {
      "id": "SHOE-9301",
      "title": "Bota con Punta de Acero",
      "etapa": "Adulto",
      "categoria": "Calzado de Seguridad",
      "size": "US 11",
      "color": "#f59e0b",
      "colorName": "Trigo",
      "stock": 50,
      "imageUrl": "https://images.unsplash.com/photo-1598511472851-f421f1533c06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBib290c3xlbnwwfHx8fDE3MTY0OTczODF8MA&ixlib-rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9302",
      "title": "Zapato Antideslizante para Cocina",
      "etapa": "Adulto",
      "categoria": "Calzado de Seguridad",
      "size": "US 9",
      "color": "#171717",
      "colorName": "Negro",
      "stock": 90,
      "imageUrl": "https://images.unsplash.com/photo-1608372235946-c475e5be3154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxrbm9uLXNsaXAlMjBzaG9lc3xlbnwwfHx8fDE3MTY0OTczODF8MA&ixlib-rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9303",
      "title": "Bota Dieléctrica",
      "etapa": "Adulto",
      "categoria": "Calzado de Seguridad",
      "size": "US 10.5",
      "color": "#991b1b",
      "colorName": "Rojo Oscuro",
      "stock": 30,
      "imageUrl": "https://images.unsplash.com/photo-1627999086111-c91dc2014792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwc2FmZXR5JTIwYm9vdHN8ZW58MHx8fHwxNzE2NDk3MzgxfDA&ixlib-rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9304",
      "title": "Zapatilla de Seguridad Ligera",
      "etapa": "Adulto",
      "categoria": "Calzado de Seguridad",
      "size": "US 10",
      "color": "#525252",
      "colorName": "Gris",
      "stock": 60,
      "imageUrl": "https://images.unsplash.com/photo-1549298916-c6c5f842330a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBzbmVha2Vyc3xlbnwwfHx8fDE3MTY0OTczODF8MA&ixlib-rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9305",
      "title": "Bota de Trabajo Impermeable",
      "etapa": "Adulto",
      "categoria": "Calzado de Seguridad",
      "size": "US 12",
      "color": "#5d4037",
      "colorName": "Marrón Robusto",
      "stock": 40,
      "imageUrl": "https://images.unsplash.com/photo-1526868662863-3adb1a75f1d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHx3b3JrJTIwYm9vdHN8ZW58MHx8fHwxNzE2NDk3MzgxfDA&ixlib-rb-4.1.0&q=80&w=1080"
    },

    // Calzado Acuático
    {
      "id": "SHOE-9401",
      "title": "Escarpín de Neopreno",
      "etapa": "Adulto",
      "categoria": "Calzado Acuático",
      "size": "US 9",
      "color": "#0891b2",
      "colorName": "Cian Oscuro",
      "stock": 70,
      "imageUrl": "https://images.unsplash.com/photo-1593348821948-2191c7a88484?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHNob2VzfGVufDB8fHx8MTcxNjQ5NzQ2Mnww&ixlib-rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9402",
      "title": "Zapatilla de Agua con Drenaje",
      "etapa": "Juvenil",
      "categoria": "Calzado Acuático",
      "size": "US 7",
      "color": "#e11d48",
      "colorName": "Rosa Neón",
      "stock": 85,
      "imageUrl": "https://images.unsplash.com/photo-1543163521-a4b31a83355b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxwaW5rJTIwd2F0ZXIlMjBzaG9lc3xlbnwwfHx8fDE3MTY0OTc0NjJ8MA&ixlib-rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9403",
      "title": "Sandalia de Río para Niños",
      "etapa": "Niños",
      "categoria": "Calzado Acuático",
      "size": "US 2",
      "color": "#4d7c0f",
      "colorName": "Verde Lima",
      "stock": 100,
      "imageUrl": "https://images.unsplash.com/photo-1572055744837-775b0b2474f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxyaXZlciUyMHNhbmRhbHN8ZW58MHx8fHwxNzE2NDk3NDYyfDA&ixlib-rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9404",
      "title": "Bota de Kayak",
      "etapa": "Adulto",
      "categoria": "Calzado Acuático",
      "size": "US 10",
      "color": "#4338ca",
      "colorName": "Azul Índigo",
      "stock": 45,
      "imageUrl": "https://images.unsplash.com/photo-1579309633397-4b67f10e4708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxrYXlhayUyMHNob2VzfGVufDB8fHx8MTcxNjQ5NzQ2Mnww&ixlib-rb-4.1.0&q=80&w=1080"
    },
    {
      "id": "SHOE-9405",
      "title": "Zapatilla Anfibia",
      "etapa": "Adulto",
      "categoria": "Calzado Acuático",
      "size": "US 11",
      "color": "#6b7280",
      "colorName": "Gris Piedra",
      "stock": 60,
      "imageUrl": "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzk5ODJ8MHwxfHNlYXJjaHwxfHxhbXBoaWJpb3VzJTIwc2hvZXN8ZW58MHx8fHwxNzE2NDk3NDYyfDA&ixlib-rb-4.1.0&q=80&w=1080"
    }
]
