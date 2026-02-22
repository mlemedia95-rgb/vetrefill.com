import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for VetRefill Animal News.',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-gray-500 mb-10">Last updated: February 22, 2026</p>

      <div className="prose max-w-none space-y-8">

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using VetRefill Animal News ("Service", "Site") at vetrefill.com, you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2>2. Description of Service</h2>
          <p>
            VetRefill Animal News is a free online publication featuring animal news, wildlife stories, pet care tips, and animal-related entertainment content.
            Content is curated from reputable sources and editorially adapted for our readers. Original sources are always credited.
          </p>
        </section>

        <section>
          <h2>3. Free Service</h2>
          <p>
            VetRefill Animal News is completely free to access. No registration, subscription, or payment is required to read our content.
            The site is supported by advertising revenue through Google AdSense.
          </p>
        </section>

        <section>
          <h2>4. Content and Intellectual Property</h2>
          <p>
            The editorial content published on this site is the intellectual property of VetRefill Animal News. Underlying news stories are attributed to and remain the property of their original publishers.
          </p>
          <ul>
            <li>You may share links to our articles freely.</li>
            <li>You may not reproduce, republish, or redistribute our editorial content without written permission.</li>
            <li>All trademarks and logos belong to their respective owners.</li>
          </ul>
        </section>

        <section>
          <h2>5. Accuracy and Disclaimer</h2>
          <p>
            We strive to publish accurate and up-to-date information. However:
          </p>
          <ul>
            <li>Content is provided for informational and entertainment purposes only.</li>
            <li>We do not guarantee the accuracy, completeness, or timeliness of any content.</li>
            <li><strong>Nothing on this site constitutes veterinary or medical advice.</strong> Always consult a licensed veterinarian for pet health decisions.</li>
            <li>We are not liable for any decisions made based on content published on this site.</li>
          </ul>
        </section>

        <section>
          <h2>6. Third-Party Links</h2>
          <p>
            Our articles link to original source publications and other third-party websites. These links are provided for attribution and convenience. We are not responsible for the content, privacy practices, or accuracy of third-party sites. Links to original sources are marked with <code>rel="nofollow noopener"</code>.
          </p>
        </section>

        <section>
          <h2>7. Advertising</h2>
          <p>
            This site displays advertisements through Google AdSense. Advertisements are clearly separated from editorial content. We are not responsible for the content of advertisements displayed on this site.
          </p>
        </section>

        <section>
          <h2>8. User Conduct</h2>
          <p>When using this site, you agree not to:</p>
          <ul>
            <li>Use the site for any unlawful purpose</li>
            <li>Attempt to interfere with or disrupt the site&apos;s operation</li>
            <li>Scrape, crawl, or harvest content in an automated manner without permission</li>
            <li>Circumvent any technical measures we employ</li>
          </ul>
        </section>

        <section>
          <h2>9. Privacy</h2>
          <p>
            Your use of this site is also governed by our <Link href="/privacy">Privacy Policy</Link>, which is incorporated into these Terms by reference.
          </p>
        </section>

        <section>
          <h2>10. Limitation of Liability</h2>
          <p>
            VetRefill Animal News is provided "as is" without warranties of any kind, express or implied. To the fullest extent permitted by law, we are not liable for any direct, indirect, incidental, special, or consequential damages arising from your use of, or inability to use, the Service.
          </p>
        </section>

        <section>
          <h2>11. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective upon posting to the site with an updated "Last updated" date.
            Continued use of the site after changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h2>12. Governing Law</h2>
          <p>
            These Terms are governed by applicable law. Any disputes arising from these Terms or your use of the Service shall be resolved through good-faith negotiation where possible.
          </p>
        </section>

        <section>
          <h2>13. Contact Us</h2>
          <p>
            For questions about these Terms, contact us at:{' '}
            <a href="mailto:dreaminvestmentcompany1@gmail.com">dreaminvestmentcompany1@gmail.com</a>
          </p>
          <p>Or use our <Link href="/contact">contact form</Link>.</p>
        </section>

      </div>
    </div>
  )
}
