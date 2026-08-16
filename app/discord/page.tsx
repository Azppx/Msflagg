import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/Button";
import { discordConfig } from "@/lib/config";

export default function DiscordPage() {
  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow="COMMUNAUTÉ" title="DISCORD" backHref="/" />
      <div className="px-5 text-center">
        <p className="text-white/60">
          Rejoins notre communauté pour suivre les annonces, poser tes questions et
          récupérer ton accès après commande.
        </p>
        <div className="mt-8">
          <ButtonLink href={discordConfig.inviteUrl} variant="secondary">
            REJOINDRE LE DISCORD
          </ButtonLink>
        </div>
        {discordConfig.inviteUrl.includes("https://discord.gg/k4ayxpryJb") && (
          <p className="mt-4 text-xs text-danger/80">
            Invitation non configurée — définis NEXT_PUBLIC_DISCORD_INVITE_URL.
          </p>
        )}
      </div>
    </main>
  );
}
