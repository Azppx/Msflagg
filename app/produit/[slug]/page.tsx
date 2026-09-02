import Link from "next/link";
import { notFound } from "next/navigation";
import { CartHeaderLink } from "@/components/CartHeaderLink";
import { ProductView } from "@/components/ProductView";
import { catalogProducts, getProductBySlug } from "@/lib/catalog";

export function generateStaticParams() {
  return catalogProducts.map((p) => ({ slug: p.slug }));
}

export default function CatalogProductPage({ params }: { params: { slug: string } }) {
  const item = getProductBySlug(params.slug);
  if (!item) notFound();

  return (
    <main className="mx-auto min-h-screen max-w-md overflow-x-hidden pb-16 pt-8">
      <div className="flex items-center justify-between px-5">
        <Link
          href="/premium"
          aria-label="Retour"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-panelBorder bg-panel/60 text-white/70"
        >
          ←
        </Link>
        <CartHeaderLink />
      </div>

      <div className="px-5">
        <ProductView item={item} />
      </div>
    </main>
  );
}
