import type { Metadata } from 'next'
import { AppButton, AppCard } from '@/components/materials/DesignSystem'

export const metadata: Metadata = {
  title: 'Materials',
  description: 'Shared UI defaults for product teams.',
}

import Image from "next/image";
import App from 'next/app';
import { Card } from '@payloadcms/ui';

const partners = [
  { name: "FLUIMAC",    logo: "/api/media/file/FLUIMAC.jpg" },
  { name: "HOMA",       logo: "/api/media/file/HOMA.png" },
  { name: "SEKO",       logo: "/api/media/file/SEKO.png" },
  { name: "VICTORPUMP", logo: "/api/media/file/VICTOR.png" },
  { name: "TOKYO",      logo: "/api/media/file/TOKYO.png" },
  { name: "MAXSEAL",    logo: "/api/media/file/MAXSEAL.png" },
  { name: "FLOTITE",    logo: "/api/media/file/FLOTITE.png" },
  { name: "FAUDI",      logo: "/api/media/file/FAUDI.png" },
  { name: "AFH",        logo: "/api/media/file/AFH.png" },
  { name: "AIRCON",     logo: "/api/media/file/AIRCON.png" },
];


export default function MaterialsPage() {
  return (
    <main className="container py-16">
      <section className="ds-section">
        <p className="ds-eyebrow">Team Defaults</p>
        <h1 className="text-4xl font-semibold tracking-tight">Materials</h1>
        <p className="max-w-2xl text-muted-foreground">
          Use these components as the baseline for color, spacing, and button treatment.
        </p>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        <AppCard
          title="Primary Action"
          description="Use for the main action in a section or page."
        >
          <div className="flex flex-wrap gap-3">
            <AppButton>Save Changes</AppButton>
            <AppButton variant="outline">Secondary</AppButton>
          </div>
        </AppCard>

        <AppCard title="Danger Action" description="Use only for destructive behavior.">
          <div className="flex flex-wrap gap-3">
            <AppButton variant="destructive">Delete Item</AppButton>
            <AppButton variant="ghost">Cancel</AppButton>
          </div>
        </AppCard>
      </section>
      <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
      {partners.map((partner) => (
        <div
          key={partner.name}
          className="group relative flex h-24 items-center justify-center rounded-xl bg-white px-6 py-4
                     shadow-sm transition-all duration-300 ease-in-out
                     hover:scale-110 hover:shadow-2xl hover:z-10"
        >
          <Image
            src={partner.logo}
            alt={partner.name}
            width={360}
            height={120}
            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
    </main>
  )
}

