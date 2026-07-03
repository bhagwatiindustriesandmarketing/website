"use client";

import { useState } from "react";
import { Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { submitForm } from "@/lib/submitForm";

const contactInfo = [
  {
    icon: <Phone size={20} className="text-[#E8832A]" />,
    title: "Phone / WhatsApp",
    lines: ["+91 9307240577"],
    action: { href: "tel:+919307240577", label: "Call Now" },
  },
  {
    icon: <MapPin size={20} className="text-[#E8832A]" />,
    title: "Address",
    lines: ["Gat No. 88, Satara Parisar,", "Aurangabad, Maharashtra"],
    action: null,
  },
  {
    icon: <Clock size={20} className="text-[#E8832A]" />,
    title: "Business Hours",
    lines: ["Monday – Saturday", "9:00 AM – 6:00 PM"],
    action: null,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await submitForm({
      type: "contact",
      name: form.name,
      phone: form.phone,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#FFF8F0] pt-24 pb-16">
      {/* Hero */}
      <section className="py-12 bg-gradient-to-br from-[#8B1538] to-[#6B0E28] text-white text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-orange-200 text-lg">
          We&apos;d love to hear from you — orders, queries, or just a hello!
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
        {/* Info cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#2D1B00]">Get in Touch</h2>
          <p className="text-[#6B4226]">
            Call us, WhatsApp us, or fill the form and we will get back to you within 24 hours.
          </p>

          {contactInfo.map((info) => (
            <div key={info.title} className="bg-white rounded-2xl border border-orange-100 p-5 flex gap-4 shadow-sm">
              <div className="w-10 h-10 bg-[#FFF3E6] rounded-xl flex items-center justify-center shrink-0">
                {info.icon}
              </div>
              <div>
                <h3 className="font-semibold text-[#2D1B00] mb-1">{info.title}</h3>
                {info.lines.map((l) => (
                  <p key={l} className="text-sm text-[#6B4226]">{l}</p>
                ))}
                {info.action && (
                  <a
                    href={info.action.href}
                    className="inline-block mt-2 text-sm text-[#E8832A] font-semibold hover:underline"
                  >
                    {info.action.label} →
                  </a>
                )}
              </div>
            </div>
          ))}

          {/* Map placeholder */}
          <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-sm">
            <div className="h-48 bg-gradient-to-br from-[#FFF3E6] to-[#FFE8CC] flex flex-col items-center justify-center text-[#6B4226]">
              <MapPin size={32} className="text-[#E8832A] mb-2" />
              <p className="font-semibold">Gat No. 88, Satara Parisar</p>
              <p className="text-sm">Aurangabad, Maharashtra</p>
              <a
                href="https://maps.google.com/?q=Satara+Parisar+Aurangabad"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-xs bg-[#E8832A] text-white px-4 py-1.5 rounded-full hover:bg-[#d4751f] transition-colors"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-orange-100 p-6 sm:p-8 shadow">
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <CheckCircle size={56} className="text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-[#2D1B00] mb-2">Message Sent!</h3>
              <p className="text-[#6B4226]">
                Thank you for contacting Bhagwati. We will get back to you within 24 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                className="mt-6 text-[#E8832A] font-semibold hover:underline text-sm"
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-[#2D1B00] mb-6">Send an Enquiry</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#6B4226] mb-1">Full Name *</label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full border border-orange-200 rounded-xl px-4 py-2.5 text-sm text-[#2D1B00] focus:outline-none focus:ring-2 focus:ring-[#E8832A]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6B4226] mb-1">Phone *</label>
                    <input
                      required
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full border border-orange-200 rounded-xl px-4 py-2.5 text-sm text-[#2D1B00] focus:outline-none focus:ring-2 focus:ring-[#E8832A]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B4226] mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full border border-orange-200 rounded-xl px-4 py-2.5 text-sm text-[#2D1B00] focus:outline-none focus:ring-2 focus:ring-[#E8832A]/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B4226] mb-1">Subject *</label>
                  <select
                    required
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full border border-orange-200 rounded-xl px-4 py-2.5 text-sm text-[#2D1B00] focus:outline-none focus:ring-2 focus:ring-[#E8832A]/30 bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Place an Order</option>
                    <option value="bulk">Bulk / Wholesale Enquiry</option>
                    <option value="gift">Gift Pack Enquiry</option>
                    <option value="product">Product Information</option>
                    <option value="delivery">Delivery / Shipping</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B4226] mb-1">Message *</label>
                  <textarea
                    required
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us what you need…"
                    className="w-full border border-orange-200 rounded-xl px-4 py-2.5 text-sm text-[#2D1B00] focus:outline-none focus:ring-2 focus:ring-[#E8832A]/30 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#E8832A] hover:bg-[#d4751f] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all"
                >
                  {loading ? (
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  ) : (
                    <Send size={16} />
                  )}
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
