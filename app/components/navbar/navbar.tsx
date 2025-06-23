import Link from "next/link";
import { LanguageSwitcher } from "../language-switcher";
import { NavMenu } from "./nav-menu";

type NavbarProps = {
  locale: string;
};

export const Navbar = ({ locale }: NavbarProps) => {
  const navbars = [
    { label: "youtube", url: "https://www.youtube.com/user/ResidentEvil" },
    { label: "x", url: "https://x.com/RE_games" },
    { label: "facebook", url: "https://www.facebook.com/residentevil" },
    { label: "instagram", url: "https://www.instagram.com/re_games" },
  ];
  return (
    <nav className="absolute top-0 left-0 w-full bg-transparent z-50 flex items-start justify-between p-4 gap-4">
      <section className="flex flex-col mr-auto">
        {navbars.map((item) => (
          <Link
            key={item.label}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-secondary font-semibold capitalize text-sm hover:underline hover:text-primary transition-transform duration-200 ease-in-out hover:scale-105"
          >
            {item.label}
          </Link>
        ))}
      </section>

      <LanguageSwitcher locale={locale} />
      <NavMenu />
    </nav>
  );
};
