/**
 * Single source of truth for all landing-page content.
 * Icons are referenced by string id and resolved to components inside each
 * section, so this module stays free of JSX.
 */

export const site = {
  name: "LEXA Software House",
  tagline: "Building digital solutions for a better future.",
  email: "info@lexatech.id",
  phone: "+62 853 2013 2014",
  location: "Tasikmalaya - Indonesia",
  social: {
    linkedin: "#",
    instagram: "#",
    facebook: "#",
    youtube: "#",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Services", href: "/#services", hasDropdown: true },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Technologies", href: "/#technologies" },
  { label: "Blog", href: "/#blog" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/#contact" },
] as const;

export const stats = [
  { icon: "rocket", value: "30+", label: "Projects Completed" },
  { icon: "clients", value: "20+", label: "Happy Clients" },
  { icon: "team", value: "10+", label: "Expert Team" },
  { icon: "calendar", value: "2+", label: "Years Experience" },
] as const;

export const aboutPoints = [
  "Innovative and proven solutions",
  "Experienced and professional team",
  "Client-focused approach",
  "Commitment to continuous support",
] as const;

export const services = [
  {
    icon: "code",
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies.",
  },
  {
    icon: "mobile",
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps for iOS and Android.",
  },
  {
    icon: "system",
    title: "System Development",
    description: "Enterprise systems and business applications tailored to your needs.",
  },
  {
    icon: "design",
    title: "UI/UX Design",
    description: "User-centered design that creates meaningful and engaging experiences.",
  },
  {
    icon: "consulting",
    title: "IT Consulting",
    description: "Strategic technology consulting to help your business grow.",
  },
  {
    icon: "support",
    title: "Maintenance & Support",
    description: "Reliable support and maintenance for optimal performance.",
  },
] as const;

export const projects = [
  {
    category: "Corporate",
    title: "Company Profile Website",
    description: "Modern website for corporate profile",
  },
  {
    category: "E-Commerce",
    title: "E-Commerce Mobile App",
    description: "Shopping app with seamless experience",
  },
  {
    category: "Logistics",
    title: "Inventory Management System",
    description: "Inventory and stock management solution",
  },
  {
    category: "Education",
    title: "Learning Management System",
    description: "E-learning platform for online education",
  },
] as const;

export const technologies = [
  { icon: "laravel", label: "Laravel", color: "#FF2D20" },
  { icon: "react", label: "React", color: "#61DAFB" },
  { icon: "nextjs", label: "Next.js", color: "#000000" },
  { icon: "vue", label: "Vue.js", color: "#41B883" },
  { icon: "flutter", label: "Flutter", color: "#02569B" },
  { icon: "node", label: "Node.js", color: "#5FA04E" },
  { icon: "php", label: "PHP", color: "#777BB4" },
  { icon: "python", label: "Python", color: "#3776AB" },
  { icon: "mysql", label: "MySQL", color: "#4479A1" },
  { icon: "aws", label: "AWS", color: "#FF9900" },
  { icon: "docker", label: "Docker", color: "#2496ED" },
  { icon: "git", label: "Git", color: "#F05032" },
] as const;

export const reasons = [
  {
    icon: "quality",
    title: "Quality Solutions",
    description: "We deliver high-quality solutions that drive results.",
  },
  {
    icon: "team",
    title: "Experienced Team",
    description: "Our team has expertise in diverse technologies.",
  },
  {
    icon: "delivery",
    title: "On-Time Delivery",
    description: "We value time and always deliver on deadlines.",
  },
  {
    icon: "satisfaction",
    title: "Client Satisfaction",
    description: "Client satisfaction is our top priority.",
  },
  {
    icon: "support",
    title: "Long-Term Support",
    description: "We provide ongoing support and maintenance.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "LEXA Software House delivered an outstanding website that exceeded our expectations. Their team was professional and responsive.",
    name: "Ardi Pratama",
    role: "CEO, Maju Bersama Indonesia",
  },
  {
    quote:
      "The mobile app developed by LEXA has significantly improved our business performance. Highly recommended!",
    name: "Dewi Lestari",
    role: "Marketing Director, TokoKita",
  },
  {
    quote:
      "Great experience working with LEXA. They understand our needs and provide the best solutions.",
    name: "Budi Santoso",
    role: "CTO, CV. Sumber Abadi",
  },
  {
    quote:
      "LEXA provides reliable digital solutions with a professional workflow and responsive support throughout the project.",
    name: "Rangga Pratama",
    role: "Project Manager, Digital Nusantara",
  },
] as const;

export const footerNav = {
  navigation: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/#about" },
    { label: "Portfolio", href: "/#portfolio" },
    { label: "Technologies", href: "/#technologies" },
    { label: "Career", href: "/career" },
    { label: "Contact", href: "/#contact" },
  ],
  services: [
    { label: "Web Development", href: "#services" },
    { label: "Mobile Development", href: "#services" },
    { label: "System Development", href: "#services" },
    { label: "UI/UX Design", href: "#services" },
    { label: "IT Consulting", href: "#services" },
    { label: "Maintenance & Support", href: "#services" },
  ],
} as const;
