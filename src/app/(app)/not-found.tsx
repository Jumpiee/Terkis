import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative bg-neutral-50 text-neutral-900 min-h-[calc(100vh-64px)] flex items-center overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, #d4d4d4 1px, transparent 1px), linear-gradient(to bottom, #d4d4d4 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Radial white fade at center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 120% 120% at 50% 50%, rgba(250,250,249,1) 0%, rgba(250,250,249,0.9) 30%, rgba(250,250,249,0.4) 65%, transparent 100%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 w-full">
        <div className="mb-6 flex items-center gap-4">
          <span className="h-0.5 w-12 bg-red-900" />
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-red-900">
            Error
          </span>
        </div>

        <p className="text-8xl font-extrabold uppercase text-red-900 leading-none select-none md:text-[12rem]">
          404
        </p>

        <h1 className="mt-4 text-3xl font-extrabold uppercase leading-tight md:text-4xl">
          Page <span className="text-red-900">Not Found</span>
        </h1>

        <p className="mt-6 max-w-md text-lg text-neutral-700">
          The page you are looking for does not exist or has been moved. Please check the URL or
          return to the home page.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/">
            <Button className="bg-red-900 text-white hover:bg-red-800">Return to Home</Button>
          </Link>
          <Link href="/products">
            <Button variant="outline">Browse Products</Button>
          </Link>
        </div>

        <div className="mt-16 h-px w-12 bg-red-900" />
      </div>
    </div>
  )
}
