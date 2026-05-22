import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

// ── Data ─────────────────────────────────────────────────────────────

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

// ── Page ─────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* ── SECTION: HEADER ────────────────────────── */}
      

      {/* ── SECTION: CONTACT GRID ───────────────────── */}
      <section className="py-20 border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6">
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
                <h3 className="mb-4 text-xl font-extrabold uppercase leading-tight tracking-tight">
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

      {/* ── SECTION: FORM ───────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left: Intro */}
            <div>
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
                Enquiry Form
              </p>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight">
                Submit Specification
              </h2>
              <p className="mt-4 text-sm text-neutral-600 leading-relaxed max-w-md">
                Please provide your project requirements or equipment specifications. For urgent technical support, please contact our engineering desk directly via phone.
              </p>
              
              <div className="mt-10 border-l-2 border-red-900 pl-6">
                <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2">
                  Operating Hours
                </p>
                <p className="text-sm font-bold uppercase">
                  Mon — Fri: 08:30 – 17:30 <br />
                  Sat — Sun: Closed
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-neutral-50 p-8 md:p-12 border border-neutral-200">
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" placeholder="ENGINEER NAME" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="company">Company *</Label>
                    <Input id="company" placeholder="ORGANIZATION" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="EMAIL@COMPANY.COM" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+66" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input id="subject" placeholder="TECHNICAL ENQUIRY / SALES" required />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message">Message / Specifications *</Label>
                  <Textarea 
                    id="message" 
                    placeholder="DESCRIBE YOUR REQUIREMENTS OR ATTACH SPECIFICATIONS..." 
                    required 
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Enquiry →
                </Button>
                
                <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 text-center">
                  By submitting this form, you agree to our privacy policy and data handling protocols.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
