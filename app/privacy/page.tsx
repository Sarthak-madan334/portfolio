import { AmbientBackground } from "@/components/AmbientBackground";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Your Internet Day",
  description: "Privacy policy for the Your Internet Day browser extension.",
};

export default function PrivacyPage() {
  return (
    <>
      <AmbientBackground />
      <main className="relative z-10 overflow-hidden min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-grow site-shell section-pad pt-32 sm:pt-40">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#77777d] hover:text-[#1d1d1f] transition-colors mb-6">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Back to Home
              </Link>
              <h1 className="text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-[#1d1d1f] sm:text-5xl mb-4">
                Privacy Policy
              </h1>
              <p className="text-[#77777d]">Effective Date: September 3, 2026</p>
            </div>

            <div className="glass-panel p-8 sm:p-12 rounded-3xl space-y-8 text-[#1d1d1f] leading-relaxed">
              <section>
                <h2 className="text-xl font-semibold mb-3 tracking-[-0.02em]">1. Information We Collect</h2>
                <p className="mb-3 text-[#4d4d53]">
                  Your Internet Day is a browser extension that analyzes your browsing habits to provide insights. To function properly, the extension collects:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-[#4d4d53]">
                  <li><strong>Browsing History:</strong> Specifically, visited domain names and timestamps.</li>
                </ul>
                <p className="mt-4 text-sm font-medium text-[#1d1d1f] p-4 bg-black/[0.03] rounded-xl border border-black/[0.05]">
                  We do NOT collect passwords, payment information, or the contents of private messages, forms, or any other sensitive on-page data.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 tracking-[-0.02em]">2. How We Use Your Data</h2>
                <p className="mb-3 text-[#4d4d53]">The data collected is used exclusively to power the extension&apos;s features, which include:</p>
                <ul className="list-disc pl-5 space-y-2 text-[#4d4d53]">
                  <li>Providing daily browsing analytics and category breakdowns.</li>
                  <li>Tracking hourly activity and detecting &quot;rabbit-holes&quot; in your browsing.</li>
                  <li>Generating AI-driven observations based on your daily web usage.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 tracking-[-0.02em]">3. Data Processing and Third Parties</h2>
                <p className="text-[#4d4d53]">
                  To generate AI insights, your browsing data (domains and timestamps) may be sent to our backend API for processing. The backend utilizes the Groq API to generate these AI observations. We do not sell or share your data with other third-party advertisers or brokers.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 tracking-[-0.02em]">4. Data Storage, Retention, and User Control</h2>
                <p className="mb-3 text-[#4d4d53]">
                  We only retain data for as long as necessary to provide the analytics features you request. You have full control over your data:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-[#4d4d53]">
                  <li>You can clear your extension data at any time.</li>
                  <li>You can uninstall the extension to immediately stop all further data collection.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 tracking-[-0.02em]">5. Contact Us</h2>
                <p className="text-[#4d4d53]">
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at: <br/>
                  <a href="mailto:privacy@yourinternetday.com" className="font-medium text-[#2563eb] hover:underline mt-2 inline-block">privacy@yourinternetday.com</a>
                </p>
              </section>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
