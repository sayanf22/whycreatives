import { Navigation } from "@/components/Navigation";
import { ContactSection } from "@/components/ui/contact-section";
import { Footer } from "@/components/Footer";

const ContactPage = () => {
  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data);
    // WhatsApp integration is handled by default in ContactSection
    // You can add additional logic here if needed
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ContactSection
        title="Let's create something amazing together"
        mainMessage="Get in touch! 👋"
        contactEmail="hello@whycreatives.in"
        onSubmit={handleFormSubmit}
      />
      <Footer />
    </div>
  );
};

export default ContactPage;
