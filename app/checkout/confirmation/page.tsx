import { getOrder } from "@/lib/orders";
import { ConfirmationView } from "@/components/ConfirmationView";

// Cette page affiche le statut EN TEMPS RÉEL d'une commande (le client peut y
// revenir plusieurs fois pendant que l'admin traite sa commande) : elle ne
// doit donc jamais être mise en cache, sous peine d'afficher un statut périmé.
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  const order = searchParams.orderId ? await getOrder(searchParams.orderId) : null;
  return <ConfirmationView order={order} />;
}