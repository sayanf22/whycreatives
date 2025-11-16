import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { FadeInWhenVisible } from '@/components/FadeInWhenVisible';
import { Instagram, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react';

interface ContactSectionProps {
  /**
   * The title for the contact section.
   */
  title?: string;
  /**
   * The subtitle or main message for the introductory part.
   */
  mainMessage?: string;
  /**
   * The contact email to display.
   */
  contactEmail?: string;
  /**
   * Array of social media links. Each object should have an 'id', 'name', 'icon', and 'href'.
   */
  socialLinks?: Array<{ id: string; name: string; icon: React.ReactNode; href: string }>;
  /**
   * Placeholder image for the background.
   */
  backgroundImageSrc?: string;
  /**
   * Callback function when the form is submitted.
   * @param data The form data.
   */
  onSubmit?: (data: any) => void;
}

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const defaultSocialLinks = [
  { 
    id: '1', 
    name: 'Instagram', 
    icon: <Instagram className="h-5 w-5" />, 
    href: 'https://www.instagram.com/why.creatives/' 
  },
  { 
    id: '2', 
    name: 'LinkedIn', 
    icon: <Linkedin className="h-5 w-5" />, 
    href: '#linkedin' 
  },
  { 
    id: '3', 
    name: 'X (Twitter)', 
    icon: <XIcon />, 
    href: '#twitter' 
  },
];

export const ContactSection: React.FC<ContactSectionProps> = ({
  title = "We can turn your dream project into reality",
  mainMessage = "Let's talk! 👋",
  contactEmail = "hello@whycreatives.in",
  socialLinks = defaultSocialLinks,
  backgroundImageSrc = "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop",
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
    projectType: [] as string[],
    otherProjectType: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (type: string, checked: boolean) => {
    setFormData((prev) => {
      const currentTypes = prev.projectType;
      if (checked) {
        return { ...prev, projectType: [...currentTypes, type] };
      } else {
        return { ...prev, projectType: currentTypes.filter((t) => t !== type) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSubmit) {
      onSubmit(formData);
    } else {
      // Default WhatsApp integration
      const message = `*New Project Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Project Types:* ${formData.projectType.join(', ') || 'Not specified'}%0A%0A*Message:*%0A${formData.message}`;
      window.open(`https://wa.me/918119811655?text=${message}`, "_blank");
    }
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: '',
      projectType: [],
      otherProjectType: '',
    });
  };

  const projectTypeOptions = [
    'Video Editing',
    'Website Design',
    'Web App',
    'E-Commerce',
    'Brand Identity',
    'Motion Graphics',
    'Social Media Marketing',
    'Ad Campaigns',
    'Other'
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center w-full min-h-screen pt-24 pb-12 px-4 md:px-8 lg:px-12">
        {/* Main Section - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full max-w-7xl">
          {/* Left Side: Title & Info */}
          <FadeInWhenVisible>
            <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground leading-tight mb-4">
                  {title}
                </h1>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Ready to bring your creative vision to life? Let's discuss your project and create something amazing together.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-3">
                <FadeInWhenVisible delay={0.1}>
                  <div className="group flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-border/50 hover:border-primary/50 hover:bg-secondary/80 transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-muted-foreground mb-0.5 uppercase tracking-wide">Email us</p>
                      <a 
                        href={`mailto:${contactEmail}`} 
                        className="text-foreground hover:text-primary transition-colors font-semibold text-sm truncate block"
                      >
                        {contactEmail}
                      </a>
                    </div>
                  </div>
                </FadeInWhenVisible>

                <FadeInWhenVisible delay={0.2}>
                  <div className="group flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-border/50 hover:border-primary/50 hover:bg-secondary/80 transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-muted-foreground mb-0.5 uppercase tracking-wide">Call us</p>
                      <a 
                        href="tel:+918119811655" 
                        className="text-foreground hover:text-primary transition-colors font-semibold text-sm"
                      >
                        +91 81198 11655
                      </a>
                    </div>
                  </div>
                </FadeInWhenVisible>

                <FadeInWhenVisible delay={0.3}>
                  <div className="group flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-border/50 hover:border-primary/50 hover:bg-secondary/80 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-muted-foreground mb-0.5 uppercase tracking-wide">Location</p>
                      <p className="text-foreground font-semibold text-sm">Agartala, Tripura 🇮🇳</p>
                    </div>
                  </div>
                </FadeInWhenVisible>
              </div>

              {/* Social Links */}
              <FadeInWhenVisible delay={0.4}>
                <div>
                  <p className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wide">Follow us</p>
                  <div className="flex items-center gap-2">
                    {socialLinks.map((link, index) => (
                      <Button 
                        key={link.id} 
                        variant="outline" 
                        size="icon" 
                        className="w-12 h-12 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110 transition-all duration-300"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        asChild
                      >
                        <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                          {link.icon}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
          </FadeInWhenVisible>

          {/* Right Side: Contact Form */}
          <FadeInWhenVisible delay={0.2}>
            <div className="bg-card p-6 md:p-8 rounded-3xl shadow-2xl border border-border">
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">{mainMessage}</h2>
                  <p className="text-sm text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold">Your name *</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="John Doe" 
                      value={formData.name} 
                      onChange={handleChange}
                      className="h-12 rounded-2xl border-border/50 focus:border-primary transition-all"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">Email address *</Label>
                    <Input 
                      id="email" 
                      name="name" 
                      type="email" 
                      placeholder="john@example.com" 
                      value={formData.email} 
                      onChange={handleChange}
                      className="h-12 rounded-2xl border-border/50 focus:border-primary transition-all"
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-semibold">Tell us about your project *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="I'm looking for help with..."
                    className="min-h-[120px] rounded-2xl resize-none border-border/50 focus:border-primary transition-all"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Services you're interested in</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {projectTypeOptions.map((option, index) => (
                      <div 
                        key={option} 
                        className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300 cursor-pointer group"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <Checkbox
                          id={option.replace(/\s/g, '-').toLowerCase()}
                          checked={formData.projectType.includes(option)}
                          onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-md flex-shrink-0"
                        />
                        <Label 
                          htmlFor={option.replace(/\s/g, '-').toLowerCase()} 
                          className="text-sm font-medium cursor-pointer flex-1 group-hover:text-primary transition-colors"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  {/* Show text input when "Other" is selected */}
                  {formData.projectType.includes('Other') && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <Label htmlFor="otherProjectType" className="text-sm font-semibold">Please specify</Label>
                      <Input
                        id="otherProjectType"
                        name="otherProjectType"
                        placeholder="Tell us what you need..."
                        value={formData.otherProjectType}
                        onChange={handleChange}
                        className="h-12 rounded-xl"
                      />
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-12 md:h-14 rounded-2xl text-sm md:text-base font-bold group hover:shadow-xl transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    Send Message
                    <Send className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                </Button>

                <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    24h response
                  </span>
                  <span>•</span>
                  <span>Secure</span>
                </p>
              </form>
            </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};
