import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { getProduct } from "@/lib/data"
import AddToCartButton from "@/components/add-to-cart-button"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <Link
        href="/products"
        className="inline-flex items-center mb-8 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to products
      </Link>
      <Suspense fallback={<ProductLoading />}>
        <ProductDetails id={params.id} />
      </Suspense>
    </div>
  )
}

async function ProductDetails({ id }: { id: string }) {
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
      <div className="flex items-center justify-center rounded-lg bg-muted/50 p-8">
        <img
          src={product.imageUrl || "/placeholder.svg?height=500&width=500"}
          alt={product.name}
          width={500}
          height={500}
          className="aspect-square rounded-md object-cover"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-sm text-muted-foreground">Category: {product.category}</p>
        </div>
        <div className="text-3xl font-bold">₹{product.price.toFixed(2)}</div>
        <div className="text-muted-foreground">{product.description}</div>
        <div className="flex items-center gap-2 text-sm">
          <div className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
          </div>
        </div>
        <div className="mt-4">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}

function ProductLoading() {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
      <Skeleton className="aspect-square h-full w-full" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-8 w-1/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-10 w-1/3" />
      </div>
    </div>
  )
}

