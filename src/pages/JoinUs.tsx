import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { Mail, Phone, User, FileText } from "lucide-react";
import { useState } from "react";

const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    portfolio: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `*New Job Application*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Position:* ${formData.position}%0A*Portfolio:* ${formData.portfolio || "Not provided"}%0A%0A*About:*%0A${formData.message}`;
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/918119811655?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6">
                Join Our Team
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Be part of WhyCreatives and help businesses grow with professional creative services
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Location Info */}
          <FadeInWhenVisible delay={0.1}>
            <div className="mb-12 text-center">
              <p className="text-lg text-muted-foreground">
                <span className="font-bold text-white">Location:</span> Tripura, Agartala 🇮🇳
              </p>
              <p className="text-muted-foreground mt-2">
                Remote positions available
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Application Form */}
          <FadeInWhenVisible delay={0.2}>
            <div className="border-2 border-white p-8 md:p-12 rounded-2xl">
            <h2 className="text-3xl font-black text-white mb-8 text-center">
              Apply Now
            </h2>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-white font-bold mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name *
                </label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  className="bg-background border-white/20 text-white placeholder:text-muted-foreground"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address *
                </label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  className="bg-background border-white/20 text-white placeholder:text-muted-foreground"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number *
                </label>
                <Input
                  type="tel"
                  placeholder="+91 81198 11655"
                  className="bg-background border-white/20 text-white placeholder:text-muted-foreground"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2">
                  Position Applying For *
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Video Editor, Web Developer, Social Media Manager"
                  className="bg-background border-white/20 text-white placeholder:text-muted-foreground"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2">
                  Portfolio / Website Link
                </label>
                <Input
                  type="url"
                  placeholder="https://your-portfolio.com"
                  className="bg-background border-white/20 text-white placeholder:text-muted-foreground"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Tell Us About Yourself *
                </label>
                <Textarea
                  placeholder="Share your experience, skills, and why you want to join WhyCreatives..."
                  className="bg-background border-white/20 text-white placeholder:text-muted-foreground min-h-[150px]"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-white text-black hover:bg-muted-foreground font-bold text-lg py-6"
              >
                Submit Application
              </Button>
            </form>
          </div>
          </FadeInWhenVisible>

          {/* Additional Info */}
          <FadeInWhenVisible delay={0.3}>
            <div className="mt-12 text-center">
              <p className="text-muted-foreground">
                We review all applications and will get back to you within 5-7 business days.
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JoinUs;