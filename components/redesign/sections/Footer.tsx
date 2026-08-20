import SocialIcon from "@/components/ui/SocialIcon";
import { socialLinks } from "@/data/redesign/nav";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-rd-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 text-xs text-rd-text-muted sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full border border-rd-purple font-rd-mono text-[0.75rem] font-bold text-rd-purple"
            aria-hidden="true"
          >
            &gt;_
          </span>
          <span>© {new Date().getFullYear()} Brave Alchemy Studio. All rights reserved.</span>
        </div>

        <p>Privacy Policy · Terms &amp; Conditions</p>

        <div className="flex items-center gap-4">
          <span className="uppercase tracking-wide">Follow the Magic</span>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-rd-text-muted transition-colors hover:text-rd-purple"
              >
                <SocialIcon name={social.label} size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
