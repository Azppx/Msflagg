import Link from "next/link";
import Image from "next/image";

export function KyzenLogo() {
  return (
    <Link href="/" aria-label="KYZEN — accueil" className="flex items-center gap-2">
      <Image
        src="/icons/logo-k.png"
        alt="KYZEN"
        width={30}
        height={30}
        className="h-[30px] w-[30px] object-contain drop-shadow-[0_0_10px_rgba(139,53,255,0.6)]"
        priority
      />
      <span className="font-display text-lg tracking-[0.12em]">KYZEN</span>
    </Link>
  );
}
