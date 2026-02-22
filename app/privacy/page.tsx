import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for VetRefill Animal News — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-gray-500 mb-10">Last updated: February 22, 2026</p>

      <div className="prose max-w-none space-y-8">

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to VetRefill Animal News ("we", "us", or "our"). We are committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, and safeguard information when you visit our website
            at <strong>vetrefill.com</strong>.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>We collect minimal information to operate the site effectively:</p>
          <ul>
            <li><strong>Usage Data:</strong> Pages visited, time on site, referring URLs, and browser/device type — collected automatically via Google Analytics.</li>
            <li><strong>Contact Information:</strong> If you contact us via our contact form, we collect your name, email address, and message content.</li>
            <li><strong>Cookies:</strong> We use cookies for analytics and site functionality. See Section 5 for details.</li>
          </ul>
          <p>We do not require account registration and do not collect personally identifiable information unless you voluntarily contact us.</p>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, operate, and improve our animal news content</li>
            <li>Analyze website traffic and usage patterns to improve user experience</li>
            <li>Respond to your inquiries and contact form submissions</li>
            <li>Display relevant advertising (via Google AdSense)</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2>4. Third-Party Services</h2>
          <p>We use the following third-party services, each with their own privacy policies:</p>
          <ul>
            <li><strong>Google Analytics</strong> — Website traffic analysis. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
            <li><strong>Google AdSense</strong> — Advertising. Google may use cookies to serve ads based on your prior visits. <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google Ads Policy</a></li>
            <li><strong>Supabase</strong> — Database hosting for news articles. No personal user data is stored in our database.</li>
            <li><strong>Vercel</strong> — Website hosting. May collect server logs including IP addresses.</li>
            <li><strong>Formspree</strong> — Contact form processing. Subject to <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Formspree Privacy Policy</a>.</li>
          </ul>
        </section>

        <section>
          <h2>5. Cookies</h2>
          <p>
            We use cookies to enhance your browsing experience and analyze site usage. Types of cookies we use:
          </p>
          <ul>
            <li><strong>Analytics cookies:</strong> Google Analytics uses cookies to track visitor behavior anonymously.</li>
            <li><strong>Advertising cookies:</strong> Google AdSense may set cookies to personalize ads.</li>
            <li><strong>Functional cookies:</strong> Essential cookies that enable core site functionality.</li>
          </ul>
          <p>
            You can control or disable cookies through your browser settings. Note that disabling cookies may affect site functionality.
            You can also opt out of Google Analytics at <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">tools.google.com/dlpage/gaoptout</a>.
          </p>
        </section>

        <section>
          <h2>6. Advertising</h2>
          <p>
            We display advertisements through Google AdSense. Google uses cookies to serve ads based on a user&apos;s prior visits to our website and other sites on the Internet.
            You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a> or
            via <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer">aboutads.info</a>.
          </p>
        </section>

        <section>
          <h2>7. Data Sharing</h2>
          <p>
            We do not sell, rent, or trade your personal information to third parties. We may share information only:
          </p>
          <ul>
            <li>With service providers who assist in operating our website (listed in Section 4)</li>
            <li>When required by law or to protect our legal rights</li>
            <li>In connection with a business transfer or acquisition</li>
          </ul>
        </section>

        <section>
          <h2>8. Data Retention</h2>
          <p>
            Contact form submissions are retained for as long as necessary to respond to your inquiry and for a reasonable period thereafter.
            Analytics data is retained according to Google Analytics&apos; default retention policies.
          </p>
        </section>

        <section>
          <h2>9. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction or deletion of your personal data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Data portability</li>
          </ul>
          <p>To exercise these rights, please contact us using the information below.</p>
        </section>

        <section>
          <h2>10. Children&apos;s Privacy</h2>
          <p>
            Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify users of significant changes by updating the "Last updated" date at the top of this page.
            Continued use of the site after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2>12. Contact Us</h2>
          <p>
            For privacy-related questions or to exercise your rights, please contact us at:{' '}
            <a href="mailto:dreaminvestmentcompany1@gmail.com">dreaminvestmentcompany1@gmail.com</a>
          </p>
          <p>
            Or use our <Link href="/contact">contact form</Link>.
          </p>
        </section>

      </div>
    </div>
  )
}
