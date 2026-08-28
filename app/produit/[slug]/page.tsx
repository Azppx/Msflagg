import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { ProductView } from "@/components/ProductView";
import { catalogProducts, getProductBySlug } from "@/lib/catalog";

export function generateStaticParams() {
  return catalogProducts.map((p) => ({ slug: p.slug }));
}

export default function CatalogProductPage({ params }: { params: { slug: string } }) {
  const item = getProductBySlug(params.slug);
  if (!item) notFound();

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow={item.category} title={item.name.toUpperCase()} backHref="/premium" showCart />

      <div className="px-5">
        <ProductView item={item} />
      </div>
    </main>
  );
}
