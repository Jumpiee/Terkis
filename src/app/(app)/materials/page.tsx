import type { Metadata } from 'next'

import { AppButton, AppCard } from '@/components/materials/DesignSystem'

export const metadata: Metadata = {
  title: 'Materials',
  description: 'Shared UI defaults for product teams.',
}

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
    </main>
  )
}

