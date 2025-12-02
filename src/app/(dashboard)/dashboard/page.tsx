'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Boxes, Package, AlertTriangle, Warehouse } from "lucide-react";
import * as React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCollection, useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { type Product, type Category } from "@/lib/schema";
import { collection } from "firebase/firestore";

const chartConfig = {
  products: {
    label: "Productos",
    color: "hsl(var(--primary))",
  },
  units: {
    label: "Unidades",
    color: "hsl(var(--accent))",
  }
};

export default function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [chartView, setChartView] = React.useState<'products' | 'units'>('products');

  const productsCollectionRef = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return collection(firestore, `users/${user.uid}/products`);
  }, [firestore, user?.uid]);

  const categoriesCollectionRef = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return collection(firestore, `users/${user.uid}/categories`);
  }, [firestore, user?.uid]);
  
  const { data: products } = useCollection<Product>(productsCollectionRef);
  const { data: categories } = useCollection<Category>(categoriesCollectionRef);

  const totalProducts = products?.length || 0;
  const totalUnits = products?.reduce((sum, product) => sum + product.stock, 0) || 0;
  const lowStockAlerts = products?.filter(product => product.stock < 15).length || 0;
  const totalCategories = categories?.length || 0;

  const chartData = React.useMemo(() => {
    if (!categories || !products) return [];
    return categories.map(category => {
        const productsInCategory = products.filter(product => product.categoria === category.name);
        const productCount = productsInCategory.length;
        const unitCount = productsInCategory.reduce((sum, task) => sum + task.stock, 0);
        return { name: category.name, products: productCount, units: unitCount };
    });
  }, [categories, products]);

  const activeChartConfig = {
    [chartView]: {
        label: chartView === 'products' ? 'Productos' : 'Unidades',
        color: `hsl(var(--${chartView === 'products' ? 'primary' : 'accent'}))`,
    },
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold">Panel de Control</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Productos Totales
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Total de SKU únicos en inventario
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unidades Totales
            </CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUnits}</div>
            <p className="text-xs text-muted-foreground">
                Suma de stock de todos los productos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Alertas de Stock Bajo
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockAlerts}</div>
            <p className="text-xs text-muted-foreground">
              Artículos que necesitan reabastecimiento
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Categorías
            </CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
            <p className="text-xs text-muted-foreground">
              Total de categorías gestionadas
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle>Distribución de Inventario</CardTitle>
                    <CardDescription>
                        Un resumen de tu inventario por categoría.
                    </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="chart-view-switch" className={chartView === 'products' ? 'text-foreground' : 'text-muted-foreground'}>
                    Productos
                  </Label>
                  <Switch
                    id="chart-view-switch"
                    checked={chartView === 'units'}
                    onCheckedChange={(checked) => setChartView(checked ? 'units' : 'products')}
                  />
                  <Label htmlFor="chart-view-switch" className={chartView === 'units' ? 'text-foreground' : 'text-muted-foreground'}>
                    Unidades
                  </Label>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={activeChartConfig} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey={chartView} fill={`var(--color-${chartView})`} radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
