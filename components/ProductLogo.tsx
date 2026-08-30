import Image from "next/image";
import { CatalogIcon } from "@/components/catalog-icons";

/**
 * Affiche le vrai logo officiel du produit (PNG/JPG dans /public/logos) s'il
 * est renseigné dans le catalogue, sinon retombe sur l'icône SVG monochrome
 * de secours (components/catalog-icons.tsx).
 */
export function ProductLogo({
  logo,
  icon,
  size = 32,
}: {
  logo?: string;
  icon: string;
  size?: number;
}) {
  if (logo) {
    return (
      <div
        className="relative overflow-hidden rounded-full bg-white/90"
        style={{ width: size, height: size }}
      >
        <Image src={logo} alt="" fill className="object-cover" sizes={`${size}px`} />
      </div>
    );
  }
  return <CatalogIcon name={icon} />;
}
