const TARGET =
  "https://script.google.com/a/macros/aiesec.net/s/AKfycbyu6bDqAHfJVj9jYq8kTvMCvIjk01CWTy9liYUfUV5aXhCd7EUCVdOthxrm7ijaOq01Xg/exec";

export async function onRequest(context) {
  const requestUrl = new URL(context.request.url);

  const response = await fetch(TARGET + requestUrl.search, {
    method: context.request.method,
    headers: context.request.headers,
    body:
      context.request.method === "GET" ||
      context.request.method === "HEAD"
        ? undefined
        : context.request.body,
    redirect: "manual",
  });

  const headers = new Headers(response.headers);

  // Prevent Google from redirecting the visitor away from pages.dev
  const location = headers.get("Location");

  if (location) {
    const target = new URL(location, TARGET);

    // Keep the visitor on our Pages domain
    const newLocation =
      requestUrl.origin + target.pathname + target.search;

    headers.set("Location", newLocation);
  }

  return new Response(response.body, {
    status: response.status,
    headers,
  });
}
