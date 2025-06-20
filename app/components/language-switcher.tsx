"use client";
import { LOCALES } from "@/i18n/routing";
import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const segments = pathname.split("/");
    // segments[0] is always '', segments[1] is the locale
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.replace(newPath);
  };

  return (
    <select value={locale} onChange={handleChange} style={{ margin: 8 }}>
      {LOCALES.map((loc) => (
        <option key={loc.short} value={loc.short}>
          {loc.long}
        </option>
      ))}
    </select>
  );
}
