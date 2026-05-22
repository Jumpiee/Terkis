import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const contactDetails = [
  {
    label: 'Enquiry',
    value: 'sales@terkis.co.th',
    description: 'For product specifications, pricing, and authorized distribution queries.',
  },
  {
    label: 'Phone',
    value: '+66 84 903 5656',
    description: 'Engineering consultation and post-commissioning service support.',
  },
  {
    label: 'Headquarters',
    value: 'Bangkok, Thailand',
    description: 'Serving petrochemical and refinery sectors across Southeast Asia.',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">

      {/* ── CONTACT DETAILS ─────────────────────────────────────────────── */}
      <section className="border-b border-neutral-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
              Contact
            </p>
            <h1 className="text-3xl font-extrabold uppercase tracking-tight">
              Get in Touch
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-px bg-neutral-200 md:grid-cols-3">
            {contactDetails.map((detail, idx) => (
              <article key={detail.label} className="group bg-white p-10 hover:bg-neutral-50 transition-colors">
                <div className="mb-8 flex items-center gap-4">
                  <span className="flex h-9 w-9 items-center justify-center border border-neutral-900 font-mono text-xs font-bold">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 bg-neutral-200 group-hover:bg-red-900 transition-colors duration-500" />
                </div>
                <p className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
                  {detail.label}
                </p>
                <h3 className="mb-4 text-lg font-extrabold uppercase leading-tight tracking-tight">
                  {detail.value}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {detail.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENQUIRY FORM ────────────────────────────────────────────────── */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">

            {/* Left: Info */}
            <div className="flex flex-col">
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
                Enquiry Form
              </p>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight">
                Submit Specification
              </h2>
              <p className="mt-4 max-w-md text-sm text-neutral-600 leading-relaxed">
                Please provide your project requirements or equipment specifications. For urgent technical support, contact our engineering desk directly via phone.
              </p>

              <div className="mt-10 border-l-2 border-red-900 pl-6">
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
                  Operating Hours
                </p>
                <p className="text-sm font-extrabold uppercase">
                  Mon — Fri: 08:30 – 17:30
                </p>
                <p className="text-sm font-extrabold uppercase text-neutral-500">
                  Sat — Sun: Closed
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="border border-neutral-200 bg-white p-10">
              <form className="flex flex-col gap-6">

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" placeholder="ENGINEER NAME" required />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="company">Company *</Label>
                    <Input id="company" placeholder="ORGANIZATION" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="EMAIL@COMPANY.COM" required />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+66" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input id="subject" placeholder="TECHNICAL ENQUIRY / SALES" required />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="message">Message / Specifications *</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="DESCRIBE YOUR REQUIREMENTS OR ATTACH SPECIFICATIONS..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="h-11 w-full rounded-none bg-red-900 text-xs font-bold uppercase tracking-widest text-white hover:bg-red-800"
                >
                  Send Enquiry →
                </Button>

                <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 text-center">
                  By submitting, you agree to our privacy policy and data handling protocols.
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
