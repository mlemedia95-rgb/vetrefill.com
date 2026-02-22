export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px', fontFamily: 'sans-serif', color: '#1f2937' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Privacy Policy</h1>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>Last updated: February 22, 2026</p>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>1. Information We Collect</h2>
        <p>We collect information you provide directly: name, email address, clinic information, and patient data you enter into the Service. We also collect usage data and log files automatically.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>2. How We Use Your Information</h2>
        <p>We use collected information to provide and improve the Service, send prescription reminders and notifications, process payments, and respond to support requests.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>3. Data Storage</h2>
        <p>Your data is stored securely using Supabase (PostgreSQL) with encryption at rest. We implement industry-standard security measures to protect your information.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>4. Third-Party Services</h2>
        <p>We use the following third-party services: Paddle (payment processing), Supabase (database), Vercel (hosting), Google Analytics (usage analytics). Each has their own privacy policy.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>5. Data Sharing</h2>
        <p>We do not sell, rent, or share your personal information with third parties except as necessary to provide the Service or as required by law.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>6. Cookies</h2>
        <p>We use cookies to maintain your session and improve your experience. You can disable cookies in your browser settings, though some features may not function properly.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>7. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal data at any time. To request data deletion, contact us or use the account deletion feature in Settings.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>8. Contact</h2>
        <p>For privacy-related questions, contact us at: <a href="mailto:dreaminvestmentcompany1@gmail.com" style={{ color: '#16a34a' }}>dreaminvestmentcompany1@gmail.com</a></p>
      </section>
    </div>
  )
}
