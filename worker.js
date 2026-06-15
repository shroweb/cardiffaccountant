const REDIRECTS = {
  // Deleted Hull location pages
  '/locations/accountants-anlaby/': '/locations/',
  '/locations/accountants-beverley/': '/locations/',
  '/locations/accountants-cottingham/': '/locations/',
  '/locations/accountants-east-yorkshire/': '/locations/',
  '/locations/accountants-hessle/': '/locations/',
  '/locations/accountants-hull/': '/locations/',
  '/locations/accountants-kingswood/': '/locations/',
  '/locations/accountants-kirk-ella/': '/locations/',
  '/locations/accountants-willerby/': '/locations/',
  // Deleted blog pages
  '/blog/': '/',
  '/blog/can-you-employ-your-children-and-claim-tax-relief/': '/',
  '/blog/holding-companies-for-tax-efficiency/': '/',
  '/blog/making-tax-digital-for-sole-traders-and-landlords/': '/',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'www.thecardiffaccountant.co.uk') {
      url.hostname = 'thecardiffaccountant.co.uk';
      return Response.redirect(url.toString(), 301);
    }
    const redirect = REDIRECTS[url.pathname];
    if (redirect) {
      url.pathname = redirect;
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  }
};
