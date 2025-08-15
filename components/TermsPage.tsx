import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { navigate } from "./SimpleRouter";

export function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: August 2025</p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
            <p>
              These Terms of Service ("Terms") govern your use of MindHub Club's website, services, and participation in our professional clubs and events. By accessing or using our services, you agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Description of Services</h2>
            <p>
              MindHub Club provides professional networking and learning opportunities through specialized clubs focused on various industries and topics. Our services include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Professional club memberships</li>
              <li>In-person and virtual events</li>
              <li>Networking opportunities</li>
              <li>Educational content and resources</li>
              <li>Community forums and discussions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Membership and Registration</h2>
            <h3 className="text-xl font-medium mb-3">Eligibility</h3>
            <p>To use our services, you must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be at least 18 years old</li>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 mt-6">Account Responsibilities</h3>
            <p>You are responsible for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All activities that occur under your account</li>
              <li>Maintaining the confidentiality of your password</li>
              <li>Ensuring your account information is current and accurate</li>
              <li>Logging out of your account when using shared devices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Code of Conduct</h2>
            <p>As a member of MindHub Club, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Treat all members with respect and professionalism</li>
              <li>Maintain confidentiality of shared information</li>
              <li>Not engage in discriminatory, harassing, or inappropriate behavior</li>
              <li>Not use our services for commercial solicitation without permission</li>
              <li>Not share false or misleading information</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <h3 className="text-xl font-medium mb-3">Our Content</h3>
            <p>
              All content on our website, including text, graphics, logos, and software, is owned by MindHub Club or our licensors and is protected by copyright and other intellectual property laws.
            </p>

            <h3 className="text-xl font-medium mb-3 mt-6">Your Content</h3>
            <p>
              You retain ownership of content you submit to our services. By submitting content, you grant us a non-exclusive, worldwide license to use, display, and distribute your content in connection with our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Payment and Fees</h2>
            <p>
              Some of our services may require payment. All fees are non-refundable unless otherwise stated. We reserve the right to change our pricing with reasonable notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use our services for any illegal or unauthorized purpose</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the rights of others</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt our services</li>
              <li>Use automated systems to access our services</li>
              <li>Share your account credentials with others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Termination</h2>
            <p>
              We may terminate or suspend your account and access to our services at any time, with or without cause, with or without notice. You may terminate your account at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Disclaimers</h2>
            <p>
              Our services are provided "as is" without warranties of any kind. We do not guarantee that our services will be uninterrupted, secure, or error-free. We are not responsible for the accuracy, completeness, or usefulness of any information provided by other members.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, MindHub Club shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless MindHub Club from any claims, damages, or expenses arising from your use of our services or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which MindHub Club operates, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of significant changes by posting the updated Terms on our website. Your continued use of our services after such changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-muted p-4 rounded-lg mt-4">
              <p className="font-medium">MindHub Club</p>
              <p>Email: <a href="mailto:legal@mindhub.club" className="text-primary hover:underline">legal@mindhub.club</a></p>
              <p>General Contact: <a href="mailto:contact@mindhub.club" className="text-primary hover:underline">contact@mindhub.club</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
