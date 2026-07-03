export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] pt-24 pb-16">
      <section className="py-12 bg-gradient-to-br from-[#8B1538] to-[#6B0E28] text-white text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Terms &amp; Conditions</h1>
        <p className="text-orange-200 text-sm">Last updated: June 2026</p>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-[#6B4226] leading-relaxed">
        <p>
          These Terms &amp; Conditions govern your use of the Bhagwati Industry &amp; Marketing
          website. By browsing this site or placing an order with us, you agree to these terms.
        </p>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">1. About This Website</h2>
          <p>
            This website is informational — it showcases our products, prices, and company
            details. Orders are placed by phone or WhatsApp and confirmed directly with our team;
            we do not process online payments through this website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">2. Product Information &amp; Pricing</h2>
          <p>
            We try to keep product descriptions, images, and prices accurate and up to date.
            However, prices, weights, and availability are subject to change without prior notice
            due to market conditions. The price confirmed at the time of your order (by phone/WhatsApp)
            is the price that applies. All prices are in Indian Rupees (₹).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">3. Orders</h2>
          <p>
            Orders are accepted subject to product availability. We reserve the right to refuse
            or cancel any order at our discretion, including in cases of pricing errors or
            inability to fulfil the quantity requested.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">4. Intellectual Property</h2>
          <p>
            The Bhagwati name, logo, product photography, and website content are the property of
            Bhagwati Industry &amp; Marketing and may not be copied or reused without our written
            permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">5. Limitation of Liability</h2>
          <p>
            We make reasonable efforts to ensure the information on this website is accurate, but
            we do not guarantee it is error-free at all times. Bhagwati Industry &amp; Marketing
            is not liable for indirect or incidental losses arising from use of this website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">6. Governing Law</h2>
          <p>
            These terms are governed by the laws of India, and any disputes will be subject to the
            jurisdiction of the courts in Aurangabad (Chhatrapati Sambhajinagar), Maharashtra.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">7. Changes to These Terms</h2>
          <p>We may revise these terms from time to time. Continued use of the website after changes means you accept the updated terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">8. Contact Us</h2>
          <p>
            Questions about these terms? Reach us at{" "}
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
