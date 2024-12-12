// This script it's a Cloudflare Function and it's meant to work as a proxy for the
// frontend deployed in Cloudflare Page to communicate the frontend with the backend as if
// it was not cross-site communication. CORS policy are still enforced because any
// origin that's not https://session-secure-app-frontend.pages.dev/ will be rejected by the backend

export async function onRequest(context) {
  const ALLOWED_ORIGIN = "https://session-secure-app-frontend.pages.dev/";
  const BACKEND_URL = "https://vps-4547216-x.dattaweb.com";
  const originalRequest = context.request;

  const forwardUrl = getForwardUrl(BACKEND_URL, originalRequest);
  const forwardRequest = new Request(forwardUrl, {
    method: originalRequest.method,
    headers: originalRequest.headers,
    body: originalRequest.body,
  });

  try {
    return await fetch(forwardRequest); // We directly forward the response from the backend
  } catch (error) {
    return new Response(JSON.stringify({ error: "Proxy request failed: " + error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      },
    });
  }
}

function getForwardUrl(BACKEND_URL, originalRequest) {
  const originalUrl = new URL(originalRequest.url);
  const modifiedPathname = originalUrl.pathname.substring(10); // All paths starts with /api-proxy/... Here we are removing that part that it's meant only for the proxy
  return `${BACKEND_URL}${modifiedPathname}${originalUrl.search}`;
}
