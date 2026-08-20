import Link from "next/link";
import Image from "next/image";

export function QulseLogo() {
  return (
    <Link href="/" aria-label="Qulse — accueil" className="flex items-center gap-2">
      <Image
        src="/icons/logo-q.png"
        alt="Qulse"
        width={30}
        height={30}
        className="h-[30px] w-[30px] object-contain"
        priority
      />
      <span className="font-display text-lg tracking-tight">Qulse</span>
    </Link>
  );
}
