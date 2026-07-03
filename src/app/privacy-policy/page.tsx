export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] pt-24 pb-16">
      <section className="py-12 bg-gradient-to-br from-[#8B1538] to-[#6B0E28] text-white text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-orange-200 text-sm">Last updated: June 2026</p>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-[#6B4226] leading-relaxed">
        <p>
          Bhagwati Industry &amp; Marketing (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy.
          This page explains what information we collect through this website, how we use it,
          and your choices. By using this website, you agree to the practices described here.
        </p>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">1. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Information you give us directly: name, phone number, email address, and message when you use our Contact form or chat with our website assistant.</li>
            <li>Order-related details if you call or WhatsApp us to place an order (we do not process online payments on this website).</li>
            <li>A language preference (English/Marathi) saved in your browser&apos;s local storage so the site remembers your choice on return visits.</li>
          </ul>
          <p className="mt-2">We do not use cookies for advertising or third-party tracking on this website.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To respond to your enquiries and process orders.</li>
            <li>To improve our products, website, and customer service.</li>
            <li>To contact you about your order status, when necessary.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">3. Sharing of Information</h2>
          <p>
            We do not sell, rent, or trade your personal information. We may share necessary
            details (such as your delivery address) with our own delivery staff or courier
            partners solely to fulfil your order. We may disclose information if required by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">4. Data Security</h2>
          <p>
            We take reasonable measures to protect the information you share with us. However,
            no method of electronic storage or transmission is 100% secure, and we cannot
            guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">5. Your Rights</h2>
          <p>
            You may ask us to access, correct, or delete the personal information we hold about
            you at any time by contacting us using the details below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">6. Children&apos;s Privacy</h2>
          <p>This website is not directed at children under 13, and we do not knowingly collect information from them.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">7. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#2D1B00] mb-2">8. Contact Us</h2>
          <p>
            For any privacy-related questions, contact us at{" "}
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
