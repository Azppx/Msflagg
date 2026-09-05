import Image from "next/image";
import { CatalogIcon } from "@/components/catalog-icons";

/**
 * Affiche le vrai logo officiel du produit (PNG/JPG dans /public/logos) s'il
 * est renseigné dans le catalogue, sinon retombe sur l'icône SVG monochrome
 * de secours (components/catalog-icons.tsx).
 *
 * Le logo est rendu sans fond imposé : c'est le cadre qui l'entoure
 * (.kyzen-logo-frame) qui porte la couleur/profondeur, pour rester cohérent
 * avec le thème du produit plutôt que d'imposer un disque blanc uniforme.
 * Un petit fond clair arrondi reste appliqué uniquement pour les logos à
 * fond transparent qui contiennent du blanc/texte sombre (ex: Discord,
 * Netflix) afin qu'ils restent lisibles sur l'arrière-plan sombre du site.
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
        className="kyzen-logo-chip relative overflow-hidden rounded-[14px]"
        style={{ width: size, height: size }}
      >
        <Image
          src={logo}
          alt=""
          fill
          className="object-cover"
          sizes={`${size}px`}
        />
      </div>
    );
  }
  return <CatalogIcon name={icon} />;
}
