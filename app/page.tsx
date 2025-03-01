import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { getFeaturedProducts } from "@/lib/data"

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-amber-50 to-orange-100">
        <div className="px-4 mx-20">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  100% Natural &amp;  Fresh Frozen Food Delivered to Your Door
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Authentic Indian street food ready to cook. From samosas to kebabs, we've got your cravings covered.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <img
              src="/placeholder.svg?height=550&width=550"
              width={550}
              height={550}
              alt="SuBurp Featured Products"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-4 mx-20">
          <div className="flex flex-col-2 items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Products</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our most popular frozen treats, ready to heat and enjoy
              </p>
            </div>
          </div>
          <div className="grid items-center justify-center grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {featuredProducts.map((product) => (
              <h1 className="text-center text-3xl font-bold">Coming soon...</h1>
              // <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/products">
              <Button size="lg" variant="outline">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="px-4 mx-20">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Categories</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Browse our delicious frozen food categories
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {["Samosas", "Patties", "Rolls", "Kebabs"].map((category) => (
              <Link key={category} href={`/products?category=${category.toLowerCase()}`}>
                <div className="relative group overflow-hidden rounded-lg">
                  <img
                    src={`/placeholder.svg?height=300&width=400&text=${category}`}
                    alt={category}
                    width={400}
                    height={300}
                    className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">{category}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-4 mx-20">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Customers Say</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don't just take our word for it
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              {
                name: "Sarah J.",
                quote:
                  "The samosas are just like the ones my grandmother used to make. Authentic taste and so easy to prepare!",
              },
              {
                name: "Raj P.",
                quote:
                  "I always keep SuBurp kebabs in my freezer for quick dinners. They're a lifesaver on busy weeknights.",
              },
              {
                name: "Emma T.",
                quote: "The vegetable patties are my kids' favorite after-school snack. Healthy and delicious!",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-muted p-6 rounded-lg">
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

