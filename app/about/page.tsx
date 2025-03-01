"use client"

import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="px-4 py-12 md:px-6 md:py-24"
    >
      <div className=" texxt-center item-center mx-32 max-w-10xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">About SuBurp</h1>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Bringing authentic frozen Indian street food to your doorstep
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Story</h2>
          <p className="text-muted-foreground">
          SuBurp Food was founded in 2019 by the lovely couple Raabia & Iqbal Ahmed. Iqbal was so mesmerized by Raabia’s cooking that he couldn’t keep it just to himself. And just like the Taj Mahal was built for Mumtaz, SuBurp was built for Raabia Ahmed—a tribute to her incredible culinary skills and passion.
          </p>
          <p className="text-muted-foreground">
            What began as a small operation has now grown into a beloved brand, delivering frozen samosas, patties,
            rolls, and kebabs to thousands of customers. Our commitment to quality, authenticity, and convenience has
            made us a trusted name in the frozen food industry.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground">
              To provide high-quality, authentic Indian street food that can be enjoyed at home, without compromising on
              taste or quality.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Use authentic recipes and traditional cooking methods</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Source the freshest ingredients from trusted suppliers</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Maintain strict quality control at every stage</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Deliver convenience without compromising on taste</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our Values</h2>
            <p className="text-muted-foreground">At SuBurp, we believe in:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Quality - We never compromise on the quality of our products</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Authenticity - We stay true to traditional recipes and flavors</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Innovation - We constantly explore new products and processes</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Customer Satisfaction - We put our customers first, always</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Process</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                1
              </div>
              <h3 className="text-lg font-bold">Source</h3>
              <p className="text-sm text-muted-foreground">
                We source the freshest ingredients from trusted suppliers, ensuring quality at the very first step.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                2
              </div>
              <h3 className="text-lg font-bold">Prepare</h3>
              <p className="text-sm text-muted-foreground">
                Our skilled chefs prepare each item using traditional recipes and cooking methods, preserving authentic
                flavors.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                3
              </div>
              <h3 className="text-lg font-bold">Freeze</h3>
              <p className="text-sm text-muted-foreground">
                We use advanced quick-freezing technology to lock in freshness and flavor, ensuring quality in every
                bite.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Meet Our Team</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <div className="aspect-square overflow-hidden rounded-md mb-4">
                <img
                  src="/placeholder.svg?height=300&width=300&text=Chef+Raj"
                  alt="Chef Raj"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold">Raabia Ahmed</h3>
              <p className="text-sm text-muted-foreground">Chef</p>
              <p className="mt-2 text-sm text-muted-foreground">
              Raabia Ahmed had no formal training, just a passion for cooking that turned into perfection. Her love for food made every product mouth watering.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <div className="aspect-square overflow-hidden rounded-md mb-4">
                <img
                  src="/placeholder.svg?height=300&width=300&text=Priya"
                  alt="Priya Singh"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold">Iqbal Ahmed</h3>
              <p className="text-sm text-muted-foreground">Founder</p>
              <p className="mt-2 text-sm text-muted-foreground">
              Iqbal Ahmed, the visionary behind SuBurp, turned a heartfelt dream into reality, building a brand that celebrates passion, flavor, and love.              </p>
            </div>
            <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <div className="aspect-square overflow-hidden rounded-md mb-4">
                <img
                  src="/placeholder.svg?height=300&width=300&text=Arjun"
                  alt="Arjun Patel"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold">DevBy2</h3>
              <p className="text-sm text-muted-foreground">Developer</p>
              <p className="mt-2 text-sm text-muted-foreground">
              DevBy2 ensures that SuBurp’s online presence is as rich and flavorful as its food, delivering a seamless digital as well as physical experience for customers.              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

