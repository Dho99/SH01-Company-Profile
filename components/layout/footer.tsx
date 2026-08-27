import Link from "next/link";
import { Mail } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { footerNav, site } from "@/lib/site";

const socials = [
  { icon: FaLinkedinIn, href: site.social.linkedin, label: "LinkedIn" },
  { icon: FaInstagram, href: site.social.instagram, label: "Instagram" },
  { icon: FaFacebookF, href: site.social.facebook, label: "Facebook" },
  { icon: FaYoutube, href: site.social.youtube, label: "YouTube" },
];

const addresses = [
  {
    label: "Malaysia Office",
    flagSrc: "https://flagcdn.com/w40/my.png",
    code: "MY",
    address:
      "Jalan Melawis 3 No. 8, Taman Melawis, Bukit Beruang, 75450 Melaka, Malaysia",
  },
  {
    label: "Indonesia Office",
    flagSrc: "https://flagcdn.com/w40/id.png",
    code: "ID",
    address:
      "Jl. Cijoho, Leuwisari, Kabupaten Tasikmalaya 46464, Jawa Barat, Indonesia",
  },
];

const whatsappHref = `https://wa.me/${site.phone.replace(/\D/g, "")}`;

export function Footer() {
  return (
    <footer id="contact" className="bg-navy-deep text-navy-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.85fr_1.1fr_1.75fr_1.35fr]">
          {/* Brand */}
          <div>
            <Logo variant="light" />

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Building digital solutions for a better future through innovation,
              excellence and automation.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-brand hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <FooterColumn title="Navigation" links={footerNav.navigation} />
          </div>

          {/* Services */}
          <div>
            <FooterColumn title="Services" links={footerNav.services} />
          </div>

          {/* Office Address */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Office Address
            </h3>

            <ul className="mt-4 space-y-4 text-sm text-white/70">
              {addresses.map((item) => (
            <li key={item.label} className="flex items-start gap-3">
                <img
                    src={item.flagSrc}
                    alt={`${item.label} flag`}
                    className="mt-0.5 h-3.5 w-5 shrink-0 rounded-[2px] object-cover ring-1 ring-white/20"
                />

                <div>
                    <p className="font-semibold text-white/90">{item.label}</p>

                    <p className="mt-1 max-w-[300px] leading-relaxed text-white/60">
                        {item.address}
                    </p>
                </div>
            </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contact Us
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <FaWhatsapp className="mt-0.5 size-4 shrink-0 text-[#25D366]" />

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Chat with LEXA on WhatsApp at ${site.phone}`}
                  className="whitespace-nowrap text-white/70 transition-colors hover:text-white"
                >
                  {site.phone}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>{site.email}</span>
              </li>
            </ul>

            <h3 className="mt-7 text-sm font-semibold uppercase tracking-wide text-white">
              Newsletter
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Subscribe to get the latest updates and insights.
            </p>

            <form className="mt-4 space-y-2">
              <Input
                type="email"
                required
                placeholder="Your email address"
                className="border-white/15 bg-white/5 text-white placeholder:text-white/40"
              />

              <Button type="submit" className="w-full rounded-md">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/50 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © 2026 {site.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
        {title}
      </h3>

      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-white/70 transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}