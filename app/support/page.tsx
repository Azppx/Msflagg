import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/Button";
import { discordConfig } from "@/lib/config";

export default function SupportPage() {
  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow="ASSISTANCE" title="SUPPORT" backHref="/" />
      <div className="px-5 text-center">
        <p className="text-white/60">
          Une question sur ta commande ou ton accès ? Le moyen le plus rapide de nous
          joindre est le Discord.
        </p>
        <div className="mt-8">
          <ButtonLink href={discordConfig.inviteUrl} variant="ghost">
            OUVRIR LE DISCORD
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
