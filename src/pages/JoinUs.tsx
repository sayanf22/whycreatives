import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { Mail, Phone, User, FileText } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

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

  const inputVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="border-2 border-white/20 p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-white mb-2">
                  Apply Now
                </h2>
                <p className="text-muted-foreground">Fill out the form below to join our team</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <motion.div
                  variants={inputVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-white font-bold mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    className="bg-background/50 border-white/20 text-white placeholder:text-muted-foreground focus:border-white/40 transition-colors rounded-xl"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </motion.div>

                <motion.div
                  variants={inputVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-white font-bold mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className="bg-background/50 border-white/20 text-white placeholder:text-muted-foreground focus:border-white/40 transition-colors rounded-xl"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </motion.div>

                <motion.div
                  variants={inputVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-white font-bold mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    placeholder="+91 81198 11655"
                    className="bg-background/50 border-white/20 text-white placeholder:text-muted-foreground focus:border-white/40 transition-colors rounded-xl"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </motion.div>

                <motion.div
                  variants={inputVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-white font-bold mb-2">
                    Position Applying For *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Video Editor, Web Developer, Social Media Manager"
                    className="bg-background/50 border-white/20 text-white placeholder:text-muted-foreground focus:border-white/40 transition-colors rounded-xl"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                  />
                </motion.div>

                <motion.div
                  variants={inputVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-white font-bold mb-2">
                    Portfolio / Website Link
                  </label>
                  <Input
                    type="url"
                    placeholder="https://your-portfolio.com"
                    className="bg-background/50 border-white/20 text-white placeholder:text-muted-foreground focus:border-white/40 transition-colors rounded-xl"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  />
                </motion.div>

                <motion.div
                  variants={inputVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-white font-bold mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Tell Us About Yourself *
                  </label>
                  <Textarea
                    placeholder="Share your experience, skills, and why you want to join WhyCreatives..."
                    className="bg-background/50 border-white/20 text-white placeholder:text-muted-foreground min-h-[150px] focus:border-white/40 transition-colors rounded-xl"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-white text-black hover:bg-white/90 font-bold text-lg py-6 transition-all hover:scale-[1.02] rounded-xl"
                  >
                    Submit Application
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </FadeInWhenVisible>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JoinUs;