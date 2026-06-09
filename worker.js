export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'www.jtaccountancy.co.uk') {
      url.hostname = 'jtaccountancy.co.uk';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  }
};
