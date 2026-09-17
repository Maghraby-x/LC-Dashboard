const TARGET =
  "https://script.google.com/a/macros/aiesec.net/s/AKfycbyu6bDqAHfJVj9jYq8kTvMCvIjk01CWTy9liYUfUV5aXhCd7EUCVdOthxrm7ijaOq01Xg/exec";

export async function onRequest(context) {
  const requestUrl = new URL(context.request.url);
  const targetUrl = new URL(TARGET);

  targetUrl.pathname = requestUrl.pathname;
  targetUrl.search = requestUrl.search;

  const response = await fetch(targetUrl, {
    method: context.request.method,
    headers: context.request.headers,
    body:
      context.request.method === "GET" ||
      context.request.method === "HEAD"
        ? undefined
        : context.request.body,
    redirect: "follow",
  });

  const headers = new Headers(response.headers);

  return new Response(response.body, {
    status: response.status,
    headers,
  });
}
