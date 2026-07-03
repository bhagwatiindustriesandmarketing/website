"use client";

import { useState } from "react";
import { Star, CheckCircle, Send } from "lucide-react";
import { submitForm } from "@/lib/submitForm";

export default function FeedbackPage() {
  const [form, setForm] = useState({ name: "", contact: "", comments: "" });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setLoading(true);
    await submitForm({
      type: "feedback",
      name: form.name,
      contact: form.contact,
      rating,
      comments: form.comments,
    });
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#FFF8F0] pt-24 pb-16">
      <section className="py-12 bg-gradient-to-br from-[#8B1538] to-[#6B0E28] text-white text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Share Your Feedback</h1>
        <p className="text-orange-200 text-lg">
          Tell us how we&apos;re doing — your feedback helps us improve.
        </p>
      </section>

      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-orange-100 p-6 sm:p-8 shadow">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <CheckCircle size={56} className="text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-[#2D1B00] mb-2">Thank You!</h3>
              <p className="text-[#6B4226]">
                We appreciate you taking the time to share your feedback.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", contact: "", comments: "" });
                  setRating(0);
                }}
                className="mt-6 text-[#E8832A] font-semibold hover:underline text-sm"
              >
                Share more feedback
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#6B4226] mb-2">How was your experience? *</label>
                <div className="flex gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const value = i + 1;
                    const filled = value <= (hoverRating || rating);
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        onMouseEnter={() => setHoverRating(value)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`${value} star`}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={32}
                          className={filled ? "text-[#C8A951] fill-[#C8A951]" : "text-orange-200"}
                        />
                      </button>
                    );
                  })}
                </div>
                {rating === 0 && (
                  <p className="text-xs text-orange-400 mt-1">Please select a rating</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#6B4226] mb-1">Your Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full border border-orange-200 rounded-xl px-4 py-2.5 text-sm text-[#2D1B00] focus:outline-none focus:ring-2 focus:ring-[#E8832A]/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6B4226] mb-1">Phone / Email</label>
                  <input
                    value={form.contact}
                    onChange={(e) => setForm((p) => ({ ...p, contact: e.target.value }))}
                    placeholder="Optional"
                    className="w-full border border-orange-200 rounded-xl px-4 py-2.5 text-sm text-[#2D1B00] focus:outline-none focus:ring-2 focus:ring-[#E8832A]/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B4226] mb-1">Your Feedback *</label>
                <textarea
                  required
                  rows={4}
                  value={form.comments}
                  onChange={(e) => setForm((p) => ({ ...p, comments: e.target.value }))}
                  placeholder="What did you like? What can we improve?"
                  className="w-full border border-orange-200 rounded-xl px-4 py-2.5 text-sm text-[#2D1B00] focus:outline-none focus:ring-2 focus:ring-[#E8832A]/30 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || rating === 0}
                className="w-full flex items-center justify-center gap-2 bg-[#E8832A] hover:bg-[#d4751f] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all"
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <Send size={16} />
                )}
                {loading ? "Sending…" : "Submit Feedback"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
