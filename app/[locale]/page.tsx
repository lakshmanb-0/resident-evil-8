import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <h2>{t("subtitle")}</h2>
      <p>{t("description")}</p>
      <button>{t("cta")}</button>
      <div>
        <strong>{t("funFactLabel")}</strong> {t("funFact")}
      </div>
      <div>
        <span>
          {t("randomNumberLabel")}: {Math.floor(Math.random() * 100)}
        </span>
      </div>
    </div>
  );
}
