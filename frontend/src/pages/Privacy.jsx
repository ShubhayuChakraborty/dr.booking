import React, { useEffect } from "react";

const Privacy = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.scrollTo) window.scrollTo(0, 0);
  }, []);
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* HEADING */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Privacy <span className="text-[#5F6FFF]">Policy</span>
      </h1>

      <p className="text-gray-600 text-lg mb-10">Last updated: January 2025</p>

      {/* CARD */}
      <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-8 space-y-10 leading-relaxed">
        {/* INTRO */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Introduction
          </h2>
          <p className="text-gray-700">
            At <strong>Prescripto</strong>, we value your privacy and are
            committed to protecting your personal information. This Privacy
            Policy explains how we collect, use, and safeguard your data when
            you use our platform to book doctor appointments and access
            healthcare-related services.
          </p>
        </section>

        {/* DATA COLLECTION */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Information We Collect
          </h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email, phone number,
              date of birth, gender.
            </li>
            <li>
              <strong>Medical Details:</strong> Doctor preferences, appointment
              details.
            </li>
            <li>
              <strong>Usage Data:</strong> Pages visited, device information, IP
              address.
            </li>
            <li>
              <strong>Location Data:</strong> Used only to improve doctor
              recommendations.
            </li>
          </ul>
        </section>

        {/* USAGE */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            How We Use Your Information
          </h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>To book and manage doctor appointments</li>
            <li>To send reminders and important updates</li>
            <li>To improve our services and user experience</li>
            <li>To ensure account security and authentication</li>
            <li>To comply with legal requirements</li>
          </ul>
        </section>

        {/* SHARING */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Sharing of Information
          </h2>
          <p className="text-gray-700">
            We <strong>do not sell or trade</strong> your personal data.
            Information may be shared only with:
          </p>
          <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-2">
            <li>Trusted medical partners and doctors</li>
            <li>Service providers who help us run the platform</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </section>

        {/* COOKIES */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Cookies and Tracking
          </h2>
          <p className="text-gray-700">
            Prescripto uses cookies to enhance your browsing experience. Cookies
            help us remember your preferences, understand usage patterns, and
            improve platform performance.
          </p>
        </section>

        {/* SECURITY */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Data Security
          </h2>
          <p className="text-gray-700">
            We implement strict security measures to protect your data from
            unauthorized access, misuse, or alteration. However, no system is
            completely secure, and we cannot guarantee absolute protection.
          </p>
        </section>

        {/* USER RIGHTS */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Your Rights
          </h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Right to access your data</li>
            <li>Right to correct or update information</li>
            <li>Right to delete your account</li>
            <li>Right to withdraw consent at any time</li>
          </ul>
        </section>

        {/* THIRD PARTY */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Third-Party Links
          </h2>
          <p className="text-gray-700">
            Our platform may contain links to third-party websites. We are not
            responsible for the privacy practices of these external sites.
          </p>
        </section>

        {/* UPDATES */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Updates to This Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated “Last Updated” date.
          </p>
        </section>

        {/* CONTACT */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Contact Us
          </h2>
          <p className="text-gray-700">
            If you have any questions regarding this Privacy Policy, feel free
            to contact us at:
            <br />
            <strong>Email:</strong> support@prescripto.com
            <br />
            <strong>Phone:</strong> +1-123-456-7890
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
