// import { useTranslations } from "next-intl";

import Image from "next/image";

export default function HomePage() {
  // const t = useTranslations("HomePage");

  return (
    <div>
      <div className="relative">
        <Image
          alt="main-logo"
          src="/home-1.jpg"
          width={1920}
          height={1080}
          priority
          placeholder="blur"
          blurDataURL="/home-1-blur.jpg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1920px"
          className="w-full h-auto"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent"
          aria-hidden="true"
        />
      </div>

      <section>
        <div>{/* video image and trailer open modal  */}</div>
        <div>
          <span className="text-primary">
            The next generation of survival horror{" "}
          </span>
          rises in the form of Resident Evil Village. the eighth major entry in
          the Resident Evil series.
        </div>

        <span className="font-secondary">
          With ultra-realistic graphics powered by the RE Engine, fight for
          survival as danger lurks around every corner.
        </span>
      </section>

      <section>
        <div>{/* image showcase  */}</div>
        <div>{/* image showcase 2  */}</div>
        <span className="font-secondary">OPEN GALLERY</span>
      </section>

      <section>
        <div>{/* image showcase  */}</div>
        <span className="">
          Set a few years after the horrifying events in the critically
          acclaimed{" "}
          <span className="text-primary">Resident Evil 7 biohazard,</span> the
          all-new storyline begins with Ethan Winters and his wife{" "}
          <span className="text-primary">Mia</span> living peacefully in a new
          location, free from their past nightmares.
        </span>
      </section>

      <section>
        <div>{/* image showcase  */}</div>
        <span className="font-secondary">
          Just as they are building their new life together, tragedy befalls
          them once again. When BSAA captain Chris Redfield attacks their home,
        </span>
        <span>
          Ethan must once again head into hell to get his kidnapped daughter
          back
        </span>
      </section>

      <section>
        <div>{/* image showcase  */}</div>
        <div>{/* image showcase  */}</div>
        <span>Ethan Winters returns as the protagonist</span>
        <span className="font-secondary">
          Ethan has been living with his wife Mia and 6-month-old daughter
          Rosemary when Chris Redfield and his men suddenly appear, murder his
          wife in cold blood, and kidnap him and his baby daughter, bringing
          them to a mysterious European village.
        </span>
        <span className="font-secondary">
          Ethan has to traverse the village to rescue Rosemary. The village is
          invaded by werewolf-like mutants called Lycans and governed by four
          different mutant lords, each controlling their own forces from
          strongholds within the village.
        </span>
      </section>

      <section>{/* guide section or page  */}</section>

      <section>{/* footer */}</section>
    </div>
  );
}
