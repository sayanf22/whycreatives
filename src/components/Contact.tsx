import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, MapPin } from "lucide-react";

export const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `*New Quote Request*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone || "Not provided"}%0A*Service:* ${formData.service || "Not specified"}%0A%0A*Message:*%0A${formData.message}`;
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/918119811655?text=${message}`, "_blank");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-secondary">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-3 sm:mb-4">
            Let's Talk
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
            Ready to save 90%? Get your free quote today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-foreground h-12 sm:h-14 text-base sm:text-lg"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-foreground h-12 sm:h-14 text-base sm:text-lg"
                />
              </div>
              <div>
                <Input
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-background border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-foreground h-12 sm:h-14 text-base sm:text-lg"
                />
              </div>
              <div>
                <Input
                  placeholder="Service Interested In"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="bg-background border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-foreground h-12 sm:h-14 text-base sm:text-lg"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="bg-background border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-foreground text-base sm:text-lg resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-foreground text-background hover:bg-muted-foreground h-12 sm:h-14 text-base sm:text-lg font-bold"
              >
                Send Quote Request
              </Button>
            </form>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-foreground mt-1" />
                  <div>
                    <div className="font-semibold text-foreground">Email</div>
                    <a
                      href="mailto:hello@whycreatives.in"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      hello@whycreatives.in
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-foreground mt-1" />
                  <div>
                    <div className="font-semibold text-foreground">Phone</div>
                    <a
                      href="tel:+918119811655"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      +91 81198 11655
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-foreground mt-1" />
                  <div>
                    <div className="font-semibold text-foreground">Location</div>
                    <p className="text-muted-foreground">Agartala, Tripura, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-border pt-8">
              <h4 className="text-xl font-bold text-foreground mb-4">Why Choose Us?</h4>
              <ul className="space-y-3">
                {[
                  "Transparent pricing with no hidden costs",
                  "Local team with global standards",
                  "90% savings compared to other agencies",
                  "Fast turnaround times",
                  "Dedicated project manager",
                ].map((item) => (
                  <li key={item} className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 bg-foreground rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
