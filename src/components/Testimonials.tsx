import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee";

export const Testimonials = () => {
  const testimonials = [
    {
      author: {
        name: "Rajesh Kumar",
        handle: "CEO, TechVentures India",
        avatar: "",
      },
      text: "WhyCreatives transformed our brand identity at a fraction of what other agencies quoted. The quality exceeded our expectations and the team was incredibly responsive.",
    },
    {
      author: {
        name: "Priya Sharma",
        handle: "Marketing Director, GrowthHub",
        avatar: "",
      },
      text: "We've been working with WhyCreatives for over a year now. Their video editing and social media management have been instrumental in our 300% growth.",
    },
    {
      author: {
        name: "Amit Patel",
        handle: "Founder, Digital Dreams",
        avatar: "",
      },
      text: "The transparency and communication throughout the project was outstanding. No hidden fees, no surprises - just exceptional work delivered on time.",
    },
    {
      author: {
        name: "Sneha Reddy",
        handle: "CTO, InnovateLabs",
        avatar: "",
      },
      text: "Fast turnaround, professional quality, and amazing value. WhyCreatives has become our go-to partner for all creative needs.",
    },
    {
      author: {
        name: "Vikram Singh",
        handle: "Owner, Cafe Delight",
        avatar: "",
      },
      text: "Their social media management helped us triple our online engagement. The team truly understands what works in today's digital landscape.",
    },
    {
      author: {
        name: "Ananya Iyer",
        handle: "Director, FitLife Gym",
        avatar: "",
      },
      text: "Professional video editing at unbeatable prices. Our promotional videos have never looked better, and our conversion rates prove it.",
    },
    {
      author: {
        name: "Arjun Mehta",
        handle: "Founder, StartupHub",
        avatar: "",
      },
      text: "Working with WhyCreatives was a game-changer for our startup. Their creative solutions helped us stand out in a crowded market.",
    },
    {
      author: {
        name: "Kavya Nair",
        handle: "Marketing Head, EcomPro",
        avatar: "",
      },
      text: "The team's dedication and creativity are unmatched. They delivered beyond our expectations every single time.",
    },
    {
      author: {
        name: "Rohan Gupta",
        handle: "Creative Director, BrandWorks",
        avatar: "",
      },
      text: "Outstanding creative work with lightning-fast delivery. WhyCreatives understands our vision and brings it to life perfectly every time.",
    },
    {
      author: {
        name: "Meera Desai",
        handle: "Founder, StyleHub",
        avatar: "",
      },
      text: "The best investment we made for our business. Their designs are modern, professional, and exactly what we needed to scale.",
    },
    {
      author: {
        name: "Karan Malhotra",
        handle: "CEO, FinTech Solutions",
        avatar: "",
      },
      text: "Reliable, professional, and incredibly talented. WhyCreatives has been our trusted partner for all creative projects.",
    },
    {
      author: {
        name: "Divya Krishnan",
        handle: "Marketing Manager, RetailPro",
        avatar: "",
      },
      text: "Their attention to detail and commitment to quality is impressive. Every project is delivered on time and exceeds expectations.",
    },
  ];

  return (
    <TestimonialsSection
      title="What Our Clients Say"
      description="Don't just take our word for it - hear from businesses we've helped grow"
      testimonials={testimonials}
      className="bg-background"
    />
  );
};
