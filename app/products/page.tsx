import { Suspense } from "react"
import { getProducts } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductsPageProps {
  searchParams: {
    category?: string
  }
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <div className="px-4 py-8 mx-20">
      <h1 className="mb-8 text-3xl font-bold">
        {searchParams.category
          ? `${searchParams.category.charAt(0).toUpperCase() + searchParams.category.slice(1)}`
          : "All Products"}
      </h1>
      <Suspense fallback={<ProductsLoading />}>
        <ProductsList category={searchParams.category} />
      </Suspense>
    </div>
  )
}

async function ProductsList({ category }: { category?: string }) {
  const products = await getProducts(category)

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold">No products found</h2>
        <p className="text-muted-foreground">Try a different category or check back later.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-background p-2">
          <Skeleton className="h-[200px] w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-8 w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

