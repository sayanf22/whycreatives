import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { FadeInWhenVisible } from '@/components/FadeInWhenVisible';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

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

const defaultSocialLinks = [
  { 
    id: '1', 
    name: 'Instagram', 
    icon: <Instagram className="h-4 w-4" />, 
    href: 'https://www.instagram.com/why.creatives/' 
  },
  { 
    id: '2', 
    name: 'LinkedIn', 
    icon: <Linkedin className="h-4 w-4" />, 
    href: '#linkedin' 
  },
  { 
    id: '3', 
    name: 'Twitter', 
    icon: <Twitter className="h-4 w-4" />, 
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
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 md:p-8 lg:p-12">
        {/* Main Section - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl p-4 md:p-8">
          {/* Left Side: Title */}
          <FadeInWhenVisible>
            <div className="flex flex-col justify-center p-4 lg:p-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight max-w-lg">
                {title}
              </h1>
            </div>
          </FadeInWhenVisible>

          {/* Right Side: Contact Form */}
          <FadeInWhenVisible delay={0.2}>
            <div className="bg-card p-6 md:p-8 rounded-2xl shadow-2xl border border-border">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">{mainMessage}</h2>

              {/* Email & Socials */}
              <div>
                <p className="text-muted-foreground mb-2">Mail us at</p>
                <a 
                  href={`mailto:${contactEmail}`} 
                  className="text-primary hover:underline font-medium"
                >
                  {contactEmail}
                </a>
                <div className="flex items-center space-x-3 mt-4">
                  <span className="text-muted-foreground">OR</span>
                  {socialLinks.map((link) => (
                    <Button key={link.id} variant="outline" size="icon" asChild>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                        {link.icon}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>

              <hr className="border-border" />

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-muted-foreground">Leave us a brief message</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="Your name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="Email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Briefly describe your project idea...</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Briefly describe your project idea..."
                    className="min-h-[80px]"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground">I'm looking for...</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {projectTypeOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.replace(/\s/g, '-').toLowerCase()}
                          checked={formData.projectType.includes(option)}
                          onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                        />
                        <Label 
                          htmlFor={option.replace(/\s/g, '-').toLowerCase()} 
                          className="text-sm font-normal cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  {/* Show text input when "Other" is selected */}
                  {formData.projectType.includes('Other') && (
                    <div className="space-y-2 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <Label htmlFor="otherProjectType">Please specify what you're looking for</Label>
                      <Input
                        id="otherProjectType"
                        name="otherProjectType"
                        placeholder="Tell us what you need..."
                        value={formData.otherProjectType}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Send a message
                </Button>
              </form>
            </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};
