export default function ShippingRefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] pt-24 pb-16">
      <section className="py-12 bg-gradient-to-br from-[#8B1538] to-[#6B0E28] text-white text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Shipping &amp; Refund Policy</h1>
        <p className="text-orange-200 text-sm">Last updated: June 2026</p>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-[#6B4226] leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">1. Delivery Areas</h2>
          <p>
            We deliver within Aurangabad (Chhatrapati Sambhajinagar) city directly. For other
            locations across Maharashtra and the rest of India, we ship via courier — call or
            WhatsApp us at <a href="tel:+919307240577" className="text-[#E8832A] hover:underline">+91 9307240577</a> to confirm delivery to your area.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">2. Delivery Timelines</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Within Aurangabad city: typically 1–2 business days.</li>
            <li>Elsewhere in Maharashtra: typically 3–5 business days.</li>
            <li>Rest of India: typically 5–8 business days, depending on the courier service.</li>
          </ul>
          <p className="mt-2">Timelines are estimates and may vary due to courier delays, weather, or local holidays.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">3. Shipping Charges</h2>
          <p>
            Delivery within Aurangabad city is generally free above a minimum order value, confirmed
            at the time of ordering. Outstation orders may carry a courier charge depending on
            weight and distance — this will always be confirmed with you before the order is dispatched.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">4. Order Confirmation</h2>
          <p>
            Since orders are placed by phone or WhatsApp, our team will confirm the items,
            quantities, price, and delivery address with you before dispatch.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">5. Damaged or Incorrect Items</h2>
          <p>
            As our products are food items, please inspect your order on delivery. If a product
            arrives damaged, spoiled, or different from what you ordered, contact us within
            48 hours with your order details and a photo of the item — we will arrange a
            replacement or refund.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">6. Returns</h2>
          <p>
            For hygiene and food-safety reasons, we cannot accept returns of food products once
            delivered and opened, except in cases of damage, spoilage, or an incorrect item as
            described above.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">7. Refunds</h2>
          <p>
            Approved refunds are processed back to your original payment method (or via UPI/bank
            transfer for cash-on-delivery orders) within 5–7 business days of approval.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">8. Contact Us</h2>
          <p>
            For any delivery or refund query, reach us at{" "}
            <a href="mailto:bhagwatiindustriesandmarketing@gmail.com" className="text-[#E8832A] hover:underline">
              bhagwatiindustriesandmarketing@gmail.com
            </a>{" "}
            or call/WhatsApp{" "}
            <a href="tel:+919307240577" className="text-[#E8832A] hover:underline">+91 9307240577</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
