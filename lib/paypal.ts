const PAYPAL_ENV = process.env.PAYPAL_ENV === "production" ? "production" : "sandbox";

const BASE_URL =
  PAYPAL_ENV === "production"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET manquants. Configure ces variables d'environnement."
    );
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Impossible d'obtenir un token PayPal");
  }

  const data = await res.json();
  return data.access_token;
}

export async function createPaypalOrder(params: {
  amount: string;
  currency: string;
  reference: string;
  description: string;
}) {
  const accessToken = await getAccessToken();

  const res = await fetch(`${BASE_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: params.reference,
          description: params.description,
          amount: {
            currency_code: params.currency,
            value: params.amount,
          },
        },
      ],
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Création de commande PayPal échouée: ${errBody}`);
  }

  return res.json();
}

export async function capturePaypalOrder(orderId: string) {
  const accessToken = await getAccessToken();

  const res = await fetch(`${BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    return { ok: false as const, status: res.status, data };
  }

  return { ok: true as const, status: res.status, data };
}

export const paypalEnv = PAYPAL_ENV;
export const paypalClientIdPublic = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
