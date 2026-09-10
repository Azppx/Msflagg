import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/lib/catalog";
import { ProductView } from "@/components/ProductView";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <main style={{ position: "relative", zIndex: 1, maxWidth: 460, margin: "0 auto", padding: "20px 20px 100px" }}>
      <ProductView product={product} />
    </main>
  );
}
