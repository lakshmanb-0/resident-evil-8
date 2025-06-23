"use client";
import { LOCALES } from "@/i18n/routing";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function LanguageSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.replace(newPath);
  };

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger className="uppercase font-secondary !border-0 !bg-accent !text-accent-foreground">
        {locale}
      </SelectTrigger>
      <SelectContent>
        {LOCALES.map((loc) => (
          <SelectItem key={loc.short} value={loc.short}>
            {loc.long}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
