import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://thecardiffaccountant.co.uk";
const instagramUrl = "https://www.instagram.com/the_cardiff_accountant";
const bookingUrl = "https://calendly.com/the_cardiff_accountant";
const googleMapsUrl = "https://www.google.com/maps";
const googleMapEmbedUrl = "https://www.google.com/maps?q=Cardiff&output=embed";
const openingHours = [
  ["Monday", "8:30 AM - 5:00 PM"],
  ["Tuesday", "8:30 AM - 5:00 PM"],
  ["Wednesday", "8:30 AM - 5:00 PM"],
  ["Thursday", "8:30 AM - 5:00 PM"],
  ["Friday", "8:30 AM - 5:00 PM"]
];

const openingHoursSpecification = openingHours.map(([day]) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: day,
  opens: "08:30",
  closes: "17:00"
}));

const services = [
  {
    slug: "limited-company-accounts",
    title: "Limited Company Accounts",
    summary: "Year-end accounts, Companies House filing, Corporation Tax returns and clear director guidance for small limited companies.",
    keywords: "limited company accounts Cardiff, company accountant Cardiff",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=80",
    includes: ["Statutory accounts", "Corporation Tax return", "Director salary and dividend planning", "Companies House filing reminders", "Plain-English tax review"],
    audience: "Owner-managed companies, contractors, consultants and growing local businesses that want accounts handled accurately without losing sight of cash flow."
  },
  {
    slug: "sole-trader-accounts",
    title: "Sole Trader Accounts",
    summary: "Straightforward annual accounts and self assessment support for sole traders, freelancers and self-employed people.",
    keywords: "sole trader accountant Cardiff, self employed accountant Cardiff",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
    includes: ["Income and expense review", "Self assessment preparation", "Allowable expense guidance", "Payment on account planning", "Simple record keeping advice"],
    audience: "Self-employed people who need their figures organised, deadlines covered and tax explained clearly."
  },
  {
    slug: "management-accounts",
    title: "Management Accounts",
    summary: "Regular reporting that shows how the business is performing before the year end arrives.",
    keywords: "management accounts Cardiff, business accountant Cardiff",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
    includes: ["Monthly or quarterly profit reports", "Cash-flow commentary", "VAT and payroll checks", "Director-level review", "Action points for the next period"],
    audience: "Business owners who want reliable numbers for decisions, funding conversations or steady growth."
  },
  {
    slug: "bookkeeping",
    title: "Bookkeeping",
    summary: "Accurate bookkeeping support that keeps your records tidy, current and ready for tax, VAT and management reporting.",
    keywords: "bookkeeper Cardiff, bookkeeping services Cardiff",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=900&q=80",
    includes: ["Sales and purchase records", "Bank reconciliation", "Cloud software support", "Receipt and expense organisation", "Regular tidy-up reviews"],
    audience: "Businesses that want clean records without spending evenings catching up on admin."
  },
  {
    slug: "vat-returns",
    title: "VAT Returns",
    summary: "VAT return preparation and submission, with checks for common issues before the return goes to HMRC.",
    keywords: "VAT returns Cardiff, VAT accountant Cardiff",
    image: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&w=900&q=80",
    includes: ["VAT return preparation", "Making Tax Digital support", "Input and output VAT checks", "Flat rate and standard scheme review", "HMRC submission reminders"],
    audience: "VAT-registered businesses that want accurate returns and fewer surprises."
  },
  {
    slug: "payroll",
    title: "Payroll",
    summary: "Payroll processing for small employers, covering payslips, RTI submissions, starters, leavers and pension duties.",
    keywords: "payroll services Cardiff, small business payroll Cardiff",
    image: "https://images.unsplash.com/photo-1707902665498-a202981fb5ac?auto=format&fit=crop&w=900&q=80",
    includes: ["Weekly or monthly payroll", "Payslips and payroll reports", "RTI submissions", "Starter and leaver processing", "Workplace pension coordination"],
    audience: "Small employers that need payroll handled reliably and on time."
  },
  {
    slug: "personal-tax-returns",
    title: "Personal Tax Returns",
    summary: "Self assessment returns for directors, landlords, sole traders and individuals with additional income.",
    keywords: "personal tax return Cardiff, self assessment Cardiff",
    image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=900&q=80",
    includes: ["Income source review", "Tax return preparation", "Relief and allowance checks", "HMRC submission", "Tax payment planning"],
    audience: "Individuals who want their return done properly and submitted before the deadline pressure begins."
  },
  {
    slug: "company-tax-returns",
    title: "Company Tax Returns",
    summary: "Corporation Tax return preparation alongside your company accounts, with clear explanations of what is due and when.",
    keywords: "company tax return Cardiff, corporation tax accountant Cardiff",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    includes: ["Corporation Tax computation", "CT600 submission", "Capital allowance review", "Director tax considerations", "Payment deadline reminders"],
    audience: "Limited companies that need compliant filing and practical tax planning."
  },
  {
    slug: "partnership-accounts",
    title: "Partnership Accounts",
    summary: "Accounts and partnership tax return support for trading partnerships and family-run businesses.",
    keywords: "partnership accounts Cardiff, partnership tax return Cardiff",
    image: "https://images.unsplash.com/photo-1626266061368-46a8f578ddd6?auto=format&fit=crop&w=900&q=80",
    includes: ["Partnership accounts", "Profit share calculations", "Partnership tax return", "Partner self assessment links", "Record keeping guidance"],
    audience: "Partnerships that need clean accounts and joined-up tax return handling for each partner."
  },
  {
    slug: "company-formations",
    title: "Company Formations",
    summary: "Company setup support, including basic structure guidance and the first accounting deadlines to keep on the radar.",
    keywords: "company formation Cardiff, start a limited company Cardiff",
    image: "https://images.unsplash.com/photo-1709880945165-d2208c6ad2ec?auto=format&fit=crop&w=900&q=80",
    includes: ["Company setup guidance", "Companies House registration support", "Director and shareholder basics", "First tax deadline checklist", "Bookkeeping setup advice"],
    audience: "New businesses deciding whether a limited company is the right structure."
  },
  {
    slug: "cis-returns",
    title: "CIS Returns",
    summary: "Construction Industry Scheme return support for contractors and subcontractors.",
    keywords: "CIS returns Cardiff, construction accountant Cardiff",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    includes: ["Monthly CIS return preparation", "Subcontractor verification guidance", "Deduction statements", "CIS record checks", "Tax return coordination"],
    audience: "Construction businesses that need CIS handled accurately month by month."
  },
  {
    slug: "tax-planning",
    title: "Tax Planning",
    summary: "Personal and business tax planning before key deadlines, so decisions are made while there is still time to act.",
    keywords: "tax planning Cardiff, personal tax planning Cardiff",
    image: "https://images.unsplash.com/photo-1554224155-3a58922a22c3?auto=format&fit=crop&w=900&q=80",
    includes: ["Pre-year-end tax review", "Director remuneration planning", "Personal tax allowance review", "Dividend and pension considerations", "Practical next steps"],
    audience: "Business owners and individuals who want proactive guidance rather than last-minute filing."
  }
];

const serviceInternalLinks = {
  "limited-company-accounts": [
    ["Company Tax Returns", "/services/company-tax-returns/"],
    ["Bookkeeping", "/services/bookkeeping/"],
    ["Payroll", "/services/payroll/"],
    ["VAT Returns", "/services/vat-returns/"]
  ],
  "sole-trader-accounts": [
    ["Personal Tax Returns", "/services/personal-tax-returns/"],
    ["Bookkeeping", "/services/bookkeeping/"],
    ["Tax Planning", "/services/tax-planning/"]
  ],
  payroll: [
    ["Bookkeeping", "/services/bookkeeping/"],
    ["Limited Company Accounts", "/services/limited-company-accounts/"]
  ],
  "vat-returns": [
    ["Bookkeeping", "/services/bookkeeping/"],
    ["Management Accounts", "/services/management-accounts/"]
  ],
  "company-formations": [
    ["Limited Company Accounts", "/services/limited-company-accounts/"],
    ["Bookkeeping", "/services/bookkeeping/"],
    ["Payroll", "/services/payroll/"]
  ]
};

const locations = [
  {
    slug: "accountants-cardiff",
    title: "Accountants in Cardiff",
    place: "Cardiff",
    summary: "Simple, reliable accountancy for sole traders and limited companies in Cardiff.",
    angle: "Cardiff business owners need accounts, bookkeeping, VAT, payroll and Making Tax Digital support that fits around real working life. The Cardiff Accountant keeps the numbers clear, organised and easier to act on."
  },
  {
    slug: "accountants-penarth",
    title: "Accountants in Penarth",
    place: "Penarth",
    summary: "Accounts, bookkeeping, VAT and payroll support for small businesses in Penarth.",
    angle: "Penarth has a strong mix of consultants, creatives, trades and owner-managed companies. The Cardiff Accountant helps keep records current, deadlines visible and tax questions explained in plain English."
  },
  {
    slug: "accountants-barry",
    title: "Accountants in Barry",
    place: "Barry",
    summary: "Straightforward accounts and bookkeeping for sole traders and companies in Barry.",
    angle: "From side hustles to limited companies, Barry businesses need clean records and calm tax support. The Cardiff Accountant helps with accounts, VAT, payroll and self assessment without the jargon."
  },
  {
    slug: "accountants-pontypridd",
    title: "Accountants in Pontypridd",
    place: "Pontypridd",
    summary: "Small business accountancy, VAT, bookkeeping and payroll support in Pontypridd.",
    angle: "The Cardiff Accountant supports Pontypridd business owners who want clear monthly numbers, reliable filings and someone to explain what needs doing before deadlines become stressful."
  },
  {
    slug: "accountants-vale-of-glamorgan",
    title: "Accountants in the Vale of Glamorgan",
    place: "Vale of Glamorgan",
    summary: "Accounts, bookkeeping and tax support for businesses across the Vale of Glamorgan.",
    angle: "Business owners across the Vale of Glamorgan can work remotely with The Cardiff Accountant for accounts, bookkeeping, VAT returns, payroll and MTD support that is easy to understand."
  },
  {
    slug: "accountants-newport",
    title: "Accountants in Newport",
    place: "Newport",
    summary: "Accountancy for sole traders, limited companies and small employers in Newport.",
    angle: "The Cardiff Accountant helps Newport clients stay on top of accounts, bookkeeping, VAT and payroll with clear communication and practical support for business owners."
  },
  {
    slug: "accountants-caerphilly",
    title: "Accountants in Caerphilly",
    place: "Caerphilly",
    summary: "Bookkeeping, VAT, payroll and accounts support for Caerphilly businesses.",
    angle: "Caerphilly business owners can get reliable, plain-English support from The Cardiff Accountant for everything from bookkeeping and VAT to company accounts and payroll."
  },
  {
    slug: "accountants-bridgend",
    title: "Accountants in Bridgend",
    place: "Bridgend",
    summary: "Simple accounting support for sole traders and limited companies in Bridgend.",
    angle: "The Cardiff Accountant works with Bridgend clients who want organised records, clear deadlines and practical answers around bookkeeping, VAT, payroll and accounts."
  },
  {
    slug: "accountants-canton",
    title: "Accountants in Canton",
    place: "Canton",
    summary: "Local accountancy for sole traders, freelancers and companies in Canton and west Cardiff.",
    angle: "Canton has a busy self-employed and small business community. The Cardiff Accountant helps local owners keep bookkeeping, accounts, VAT and payroll under control."
  }
];


const testimonials = [
  {
    quote: "I would highly recommend The Cardiff Accountant to anyone who needs a clear and professional service.",
    name: "Sam Llad"
  },
  {
    quote: "Professional, knowledgeable and genuinely easy to work with. Everything is explained clearly and the process feels stress-free.",
    name: "Vinny Hutson"
  },
  {
    quote: "Excellent support every time. No question feels too small, and help is always clear and practical.",
    name: "Olivia and Matty"
  },
  {
    quote: "Very responsive, helpful and friendly. I could not recommend the service enough.",
    name: "Owen Taylor"
  },
  {
    quote: "Really happy with the service. Sorting the tax return felt simple and much less stressful.",
    name: "James Haigh"
  },
  {
    quote: "The support is helpful, thoughtful and genuinely focused on the business.",
    name: "Marissa Spencer"
  },
  {
    quote: "Great throughout the full process, with clear updates and quick replies.",
    name: "Shaun Butler"
  }
];

const nav = [
  ["/about/", "About"],
  ["/services/", "Services"],
  ["/locations/", "Areas"],
  ["/contact/", "Contact"]
];

const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}[char]));

const url = (pathName) => `${siteUrl}${pathName}`;
const starIcons = `<i class="fa-solid fa-star" aria-hidden="true"></i><i class="fa-solid fa-star" aria-hidden="true"></i><i class="fa-solid fa-star" aria-hidden="true"></i><i class="fa-solid fa-star" aria-hidden="true"></i><i class="fa-solid fa-star" aria-hidden="true"></i>`;
const inlineLinks = (items) => items.map(([label, href]) => `<a href="${href}">${esc(label)}</a>`).join(", ");
const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
const serviceImageAlt = (service) => `Accounting paperwork and business records for ${service.title.toLowerCase()} clients`;
const absoluteImage = (src) => src.startsWith("http") ? src : `${siteUrl}${src}`;

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: url(item.href || "/")
      }))
    ]
  };
}

function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer
      }
    }))
  };
}

function localBusinessSchema(location) {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: `The Cardiff Accountant - ${location.place}`,
    url: url(`/locations/${location.slug}/`),
    image: `${siteUrl}/assets/logo.png`,
    priceRange: "GBP",
    areaServed: {
      "@type": "Place",
      name: location.place
    },
    parentOrganization: {
      "@type": "AccountingService",
      name: "The Cardiff Accountant",
      url: siteUrl
    },
    openingHoursSpecification
  };
}

function layout({ title, description, pathName, body, schema = [] }) {
  const current = pathName.split("/")[1];
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "AccountingService",
      name: "The Cardiff Accountant",
      url: siteUrl,
      areaServed: locations.map((location) => location.place),
      priceRange: "GBP",
      openingHoursSpecification
    },
    ...schema
  ];

  return `<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${url(pathName)}">
  <link rel="icon" type="image/png" href="/favicon.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <meta name="theme-color" content="#214760">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url(pathName)}">
  <meta property="og:image" content="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600;1,700&display=swap" rel="stylesheet">
  <link rel="preconnect" href="https://images.unsplash.com">
  <link rel="stylesheet" href="/assets/fontawesome/css/all.min.css">
  <link rel="stylesheet" href="/assets/styles.css">
  <script type="application/ld+json">${JSON.stringify(schemas)}</script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-SFBVHJBN28"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-SFBVHJBN28');
  </script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="/" aria-label="The Cardiff Accountant home">
        <img class="brand-logo" src="/assets/logo.png" alt="The Cardiff Accountant">
      </a>
      <button class="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-nav-toggle>
        <span></span><span></span><span></span>
      </button>
      <nav class="site-nav" aria-label="Main navigation" data-nav-menu>
        ${nav.map(([href, label]) => `<a href="${href}" ${href.includes(`/${current}/`) ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
        <a class="button" href="${bookingUrl}" target="_blank" rel="noopener"><i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Book a call</a>
      </nav>
    </div>
  </header>
  <main id="main">${body}</main>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-grid">
        <div>
          <h2>The Cardiff Accountant</h2>
          <p>Making accounting simple for business owners with bookkeeping, VAT, payroll and accounts support for Cardiff and South Wales.</p>
        </div>
        <div>
          <h3>Services</h3>
          ${services.slice(0, 5).map((service) => `<a href="/services/${service.slug}/">${service.title}</a>`).join("")}
        </div>
        <div>
          <h3>Service areas</h3>
          ${locations.map((location) => `<a href="/locations/${location.slug}/">${location.place}</a>`).join("")}
        </div>
        <div>
          <h3>Contact</h3>
          <p><i class="fa-brands fa-instagram" aria-hidden="true"></i> @the_cardiff_accountant</p>
          <p><i class="fa-regular fa-clock" aria-hidden="true"></i> Mon–Fri: 8:30 AM – 5:00 PM</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; <span data-year></span> The Cardiff Accountant. All rights reserved.</span>
        <span>Web design by <a href="https://swift7.co.uk" target="_blank" rel="noopener">Swift7</a>.</span>
      </div>
    </div>
  </footer>
  <script src="/assets/main.js" defer></script>
</body>
</html>`;
}

function serviceCards(items = services) {
  return `<div class="grid cards-3">${items.map((service) => `
    <article class="card service-card">
      <div class="card-media"><img src="${esc(service.image)}" alt="${esc(serviceImageAlt(service))}"></div>
      <h3>${esc(service.title)}</h3>
      <p>${esc(service.summary)}</p>
      <a class="text-link" href="/services/${service.slug}/">View service <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
    </article>`).join("")}</div>`;
}

function locationCards() {
  return `<div class="grid location-grid">${locations.map((location) => `
    <a class="location-card" href="/locations/${location.slug}/">
      <span>${esc(location.place)}</span>
      <h3>${esc(location.title)}</h3>
      <p>${esc(location.summary)}</p>
      <strong>View local page <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></strong>
    </a>`).join("")}</div>`;
}


function serviceSummaryStrip() {
  return `<div class="service-summary-strip">
    <div>
      <strong>Accounts</strong>
      <span>Annual accounts, Companies House filings and clear year-end support.</span>
    </div>
    <div>
      <strong>Tax</strong>
      <span>Personal, partnership and company tax returns handled before deadlines bite.</span>
    </div>
    <div>
      <strong>Bookkeeping</strong>
      <span>Practical record keeping that keeps VAT, payroll and accounts moving.</span>
    </div>
  </div>`;
}

function breadcrumbTrail(items) {
  return `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a>${items.map((item) => item.href ? ` <span aria-hidden="true">/</span> <a href="${item.href}">${esc(item.label)}</a>` : ` <span aria-hidden="true">/</span> <strong>${esc(item.label)}</strong>`).join("")}</nav>`;
}

function pageHero({ eyebrow, title, summary, fact, breadcrumbs }) {
  const trail = breadcrumbs || [{ label: eyebrow }];
  return `<section class="page-hero">
    <div class="section-inner">
      <div class="page-hero-copy">
        ${breadcrumbTrail(trail)}
        <p class="eyebrow">${esc(eyebrow)}</p>
        <h1>${esc(title)}</h1>
        <p class="page-summary">${esc(summary)}</p>
      </div>
      <aside class="fact-box page-hero-fact">
        <h2>${esc(fact.title)}</h2>
        <p>${esc(fact.text)}</p>
        <a class="button" href="${bookingUrl}" target="_blank" rel="noopener"><i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Book a call</a>
      </aside>
    </div>
  </section>`;
}

function contactHero() {
  return `<section class="page-hero contact-hero">
    <div class="section-inner">
      <div>
        ${breadcrumbTrail([{ label: "Contact" }])}
        <p class="eyebrow">Contact</p>
        <h1>Get clear help with your accounts.</h1>
        <p class="page-summary">Send a short message about your bookkeeping, VAT, payroll or accounts. You will get a clear reply on what records are needed and what happens next.</p>
        <div class="section-actions">
          <a class="button" href="${bookingUrl}" target="_blank" rel="noopener"><i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Book a call</a>
        </div>
      </div>
      <aside class="contact-summary-card">
        <h2>Contact details</h2>
        <ul class="contact-list">
          <li><i class="fa-regular fa-calendar-check" aria-hidden="true"></i><span><strong>Book a call</strong><a href="${bookingUrl}" target="_blank" rel="noopener">Choose a time on Calendly</a></span></li>
          <li><i class="fa-brands fa-instagram" aria-hidden="true"></i><span><strong>Instagram</strong><a href="${instagramUrl}" target="_blank" rel="noopener">@the_cardiff_accountant</a></span></li>
          <li><i class="fa-regular fa-clock" aria-hidden="true"></i><span><strong>Hours</strong>Monday to Friday, 8:30 AM – 5:00 PM</span></li>
        </ul>
      </aside>
    </div>
  </section>`;
}

function cta() {
  return `<section class="section navy cta-section">
    <div class="section-inner">
      <div class="cta-band">
        <div>
          <p class="eyebrow">Book a call</p>
          <h2>Need a hand with your numbers?</h2>
          <p>Send a short summary of what you need help with. We will explain the next step clearly, whether it is bookkeeping, VAT, payroll or annual accounts.</p>
        </div>
        <div class="section-actions">
          <a class="button" href="${bookingUrl}" target="_blank" rel="noopener"><i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Book a call</a>
        </div>
      </div>
    </div>
  </section>`;
}

function faqSection() {
  const faqs = [
    ["Do I need to be based in Cardiff?", "No. We work with Cardiff and South Wales business owners, and most records can be shared remotely if that is easier."],
    ["Can The Cardiff Accountant take over from my current accountant?", "Yes. We can explain what is needed and handle the usual professional clearance process once you are ready to move."],
    ["What should I send first?", "Start with the basics: what you need help with, your deadline if you know it, and any recent accounts, tax returns, bookkeeping records or HMRC letters."],
    ["Do you work with both companies and sole traders?", "Yes. We support limited companies, sole traders, freelancers, small employers and business owners who need clearer numbers."],
    ["Can you help if I am behind with accounts or tax?", "Yes. Get in touch as soon as you can. We will look at what is outstanding and help you deal with the most urgent deadlines first."]
  ];

  return `<section class="section faq-section">
    <div class="section-inner faq-wrap">
      <div>
        <p class="eyebrow">FAQ</p>
        <h2>Common questions.</h2>
        <p>Quick answers before you book a call.</p>
      </div>
      <div class="faq-list">
        ${faqs.map(([question, answer]) => `<details><summary>${esc(question)}</summary><p>${esc(answer)}</p></details>`).join("")}
      </div>
    </div>
  </section>`;
}

function contactOptions() {
  return `<div class="contact-options" aria-label="Contact options">
    <a class="contact-option" href="${bookingUrl}" target="_blank" rel="noopener">
      <i class="fa-regular fa-calendar-check" aria-hidden="true"></i>
      <strong>Book a call</strong>
      <span>Choose a time on Calendly</span>
    </a>
    <a class="contact-option" href="${instagramUrl}" target="_blank" rel="noopener">
      <i class="fa-brands fa-instagram" aria-hidden="true"></i>
      <strong>Instagram</strong>
      <span>@the_cardiff_accountant</span>
    </a>
  </div>`;
}

function serviceNextSteps(service) {
  const related = serviceInternalLinks[service.slug] || services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3)
    .map((item) => [item.title, `/services/${item.slug}/`]);

  return `<div class="next-step-panel">
    <div>
      <p class="eyebrow">Often handled together</p>
      <h2>Useful next steps</h2>
      <p>Most accounts jobs touch another deadline. These are the pages clients commonly need next.</p>
    </div>
    <div class="next-step-links">
      ${related.slice(0, 3).map(([label, href]) => `<a href="${href}">${esc(label)} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>`).join("")}
      <a href="${bookingUrl}" target="_blank" rel="noopener">Book a call <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
    </div>
  </div>`;
}

const serviceFaqBySlug = {
  "limited-company-accounts": [
    ["When are limited company accounts due?", "Companies House accounts are usually due 9 months after the company year end. Corporation Tax is usually due 9 months and 1 day after the period ends."],
    ["Can you file both Companies House accounts and the CT600?", "Yes. The Cardiff Accountant can prepare the year-end accounts, Corporation Tax calculation and CT600 so the filings match."]
  ],
  "sole-trader-accounts": [
    ["Do sole traders need full accounts?", "You usually need reliable profit figures for your Self Assessment tax return. We can turn your records into the figures needed for HMRC."],
    ["Can you help with payment on account?", "Yes. The Cardiff Accountant can explain what payments on account mean and help you plan for the January and July tax payments."]
  ],
  "management-accounts": [
    ["How often should management accounts be prepared?", "Monthly or quarterly usually works best, depending on how quickly you need figures for decisions, cash flow or funding conversations."],
    ["What do management accounts show?", "They can show profit, costs, cash-flow pressure, VAT and payroll checks, and the areas that need attention before the year end."]
  ],
  bookkeeping: [
    ["Can you tidy up old bookkeeping?", "Yes. The Cardiff Accountant can review the records, reconcile the bank and sort missing receipts or unclear transactions before accounts or VAT returns are prepared."],
    ["Do I need cloud bookkeeping software?", "Not always, but it often makes the process easier. We can advise on a practical setup for the size of the business."]
  ],
  "vat-returns": [
    ["Can you submit VAT returns through Making Tax Digital?", "Yes. The Cardiff Accountant can prepare and submit VAT returns using MTD-compatible records."],
    ["Can you check which VAT scheme I should use?", "Yes. We can review whether the standard, flat rate or another VAT approach is suitable for the business."]
  ],
  payroll: [
    ["Can you run monthly payroll for a small team?", "Yes. The Cardiff Accountant can handle payslips, payroll reports, RTI submissions, starters, leavers and pension admin for small employers."],
    ["Do directors need payroll?", "Often, yes. Director salary planning can be part of payroll and wider company tax planning."]
  ],
  "personal-tax-returns": [
    ["Who needs a personal tax return?", "Directors, landlords, sole traders and people with untaxed income often need to complete Self Assessment."],
    ["Can you deal with HMRC on my behalf?", "Yes. Once authorised, The Cardiff Accountant can deal with HMRC for the relevant tax return work."]
  ],
  "company-tax-returns": [
    ["Is the company tax return separate from the accounts?", "Yes. The CT600 is the Corporation Tax return, but it is prepared from the company accounts and tax calculation."],
    ["Can you help reduce Corporation Tax legally?", "Yes. We can check expenses, capital allowances and director planning points before the return is filed."]
  ],
  "partnership-accounts": [
    ["Do partnerships need a separate tax return?", "Yes. A partnership return is usually needed, and each partner may also need their own Self Assessment return."],
    ["Can you split profits between partners?", "Yes. The Cardiff Accountant can prepare the partnership accounts and calculate profit shares for the partners."]
  ],
  "company-formations": [
    ["Can you set up the limited company for me?", "Yes. The Cardiff Accountant can help with formation and explain the first accounting, tax and bookkeeping deadlines."],
    ["Should I be a sole trader or limited company?", "That depends on profit, risk, admin and tax position. We can talk through the pros and cons before you decide."]
  ],
  "cis-returns": [
    ["When are CIS returns due?", "Monthly CIS returns are usually due by the 19th after the tax month ends."],
    ["Can you help verify subcontractors?", "Yes. The Cardiff Accountant can advise on verification, deduction statements and monthly CIS record keeping."]
  ],
  "tax-planning": [
    ["When should tax planning be done?", "Before the year end is usually best, because there is still time to make decisions rather than just report what already happened."],
    ["Can tax planning cover both business and personal tax?", "Yes. Director salary, dividends, pension contributions, allowances and personal income can be reviewed together."]
  ]
};

function serviceFaqs(service) {
  return [
    ...(serviceFaqBySlug[service.slug] || []),
    [`Do I need ${service.title.toLowerCase()}?`, `If the records, deadlines or tax questions are taking time away from running things, it is worth getting help before the deadline gets close.`],
    ["Can The Cardiff Accountant work with my existing records?", "Yes. We can look at what you already have, point out any gaps and explain what is needed to finish the work properly."],
    ["How do I get started?", "Send the basics or book a call. We will confirm what records are needed and whether a meeting, phone call or remote handover makes most sense."]
  ];
}

function localServiceLinks(place) {
  const localLinks = [
    ["Limited company accounts", "limited-company-accounts"],
    ["Sole trader accounts", "sole-trader-accounts"],
    ["Bookkeeping", "bookkeeping"],
    ["VAT returns", "vat-returns"],
    ["Payroll", "payroll"],
    ["Personal tax returns", "personal-tax-returns"]
  ];

  return `<div class="local-links" aria-label="Local service links">
    ${localLinks.map(([label, slug]) => `<a href="/services/${slug}/"><span>${esc(label)}</span><strong>${esc(label)} in ${esc(place)}</strong></a>`).join("")}
  </div>`;
}

function audienceSection() {
  const audiences = [
    {
      icon: "fa-store",
      title: "Sole traders",
      text: "Self assessment, allowable expenses, payment dates and cleaner records without the end-of-year panic."
    },
    {
      icon: "fa-building",
      title: "Limited companies",
      text: "Accounts, Corporation Tax, director payroll and bookkeeping that keeps the company ready for filing."
    },
    {
      icon: "fa-chart-line",
      title: "Growing businesses",
      text: "Monthly numbers, VAT awareness and payroll support so decisions are based on what is actually happening."
    }
  ];

  return `<section class="section audience-section">
    <div class="section-inner">
      <div class="section-kicker">
        <p class="eyebrow">Built around owners</p>
        <h2>Accounting support that fits the way you trade.</h2>
        <p>Whether you are just starting, catching up or growing fast, the focus is the same: clear records, visible deadlines and useful answers.</p>
      </div>
      <div class="audience-grid">
        ${audiences.map((item) => `<article class="audience-card">
          <span class="icon-badge"><i class="fa-solid ${item.icon}" aria-hidden="true"></i></span>
          <h3>${esc(item.title)}</h3>
          <p>${esc(item.text)}</p>
        </article>`).join("")}
      </div>
    </div>
  </section>`;
}

function monthlyWorkflowSection() {
  const steps = [
    ["01", "Send records", "Share bank statements, receipts, invoices or cloud bookkeeping access."],
    ["02", "Books reviewed", "Transactions are reconciled, gaps are flagged and deadlines are checked."],
    ["03", "Numbers explained", "You get plain-English notes on VAT, cash flow, payroll and next actions."],
    ["04", "Filings handled", "Returns, payroll and accounts are prepared with time to review before submission."]
  ];

  return `<section class="section workflow-section">
    <div class="section-inner workflow-layout">
      <div class="workflow-copy">
        <p class="eyebrow">The monthly rhythm</p>
        <h2>No messy books. No guessing what is next.</h2>
        <p>A premium accounting service should feel calm and predictable. The process keeps routine admin moving, while leaving room for questions when the numbers need context.</p>
        <a class="button" href="${bookingUrl}" target="_blank" rel="noopener"><i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Book a call</a>
      </div>
      <div class="workflow-steps">
        ${steps.map(([number, title, text]) => `<div class="workflow-step">
          <span>${number}</span>
          <div><h3>${esc(title)}</h3><p>${esc(text)}</p></div>
        </div>`).join("")}
      </div>
    </div>
  </section>`;
}

function insightSection() {
  const insights = [
    ["VAT position", "Know when your turnover is approaching the threshold and what needs filing."],
    ["Cash clarity", "See what is coming in, what is going out and what tax needs setting aside."],
    ["Payroll dates", "Keep payslips, RTI, pensions, starters and leavers under control."],
    ["Year-end readiness", "Keep records tidy enough that annual accounts do not become a scramble."]
  ];

  return `<section class="section insight-section">
    <div class="section-inner insight-panel">
      <div>
        <p class="eyebrow">What you will know</p>
        <h2>Useful numbers, not just tidy paperwork.</h2>
        <p>Good bookkeeping should make the business easier to run. These are the areas we keep visible, so you can make decisions before deadlines force them.</p>
      </div>
      <div class="insight-list">
        ${insights.map(([title, text]) => `<div>
          <i class="fa-solid fa-check" aria-hidden="true"></i>
          <h3>${esc(title)}</h3>
          <p>${esc(text)}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>`;
}

function credibilityStrip() {
  return `<section class="cred-strip" aria-label="Service qualities">
    <div class="section-inner">
      <div><strong>MTD-ready</strong><span>Digital records and VAT submissions</span></div>
      <div><strong>Xero-friendly</strong><span>Setup, clean-up and practical support</span></div>
      <div><strong>Deadline-led</strong><span>Dates tracked before they become urgent</span></div>
      <div><strong>Owner-focused</strong><span>Plain-English guidance, not jargon</span></div>
    </div>
  </section>`;
}

const home = layout({
  title: "The Cardiff Accountant | Accountant in Cardiff for Business Owners",
  description: "The Cardiff Accountant makes accounting simple for business owners with bookkeeping, VAT, payroll, accounts and Making Tax Digital support.",
  pathName: "/",
  body: `<section class="hero">
    <div class="hero-inner">
      <div>
        <h1>Making accounting simple for business owners.</h1>
        <p class="hero-subtitle">Bookkeeping | VAT | Payroll | Accounts</p>
        <p class="hero-copy">Your go-to for sole trader and limited company finances in Cardiff. We keep your books clear, your deadlines visible and your numbers easier to understand, so you can run the business with more confidence.</p>
        <div class="hero-actions">
          <a class="button" href="${bookingUrl}" target="_blank" rel="noopener"><i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Book a call</a>
        </div>
      </div>
    </div>
  </section>
  <section class="trust-strip" aria-label="Key services">
    <div class="section-inner">
      <a class="trust-item" href="/services/bookkeeping/"><strong>Bookkeeping</strong><span>Clean records and consistent monthly habits.</span></a>
      <a class="trust-item" href="/services/vat-returns/"><strong>VAT</strong><span>MTD-ready VAT returns and threshold guidance.</span></a>
      <a class="trust-item" href="/services/payroll/"><strong>Payroll</strong><span>Payslips, RTI, starters, leavers and pensions.</span></a>
      <a class="trust-item" href="/services/limited-company-accounts/"><strong>Accounts</strong><span>Sole trader and limited company accounts.</span></a>
    </div>
  </section>
  ${credibilityStrip()}
  ${audienceSection()}
  <section class="section">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <p class="eyebrow">Accountancy services</p>
          <h2>Choose the support your business needs now.</h2>
        </div>
        <p>Start with the service causing pressure today, then add bookkeeping, VAT, payroll or accounts support as the business grows.</p>
      </div>
      ${serviceCards(services.slice(0, 6))}
      <div class="section-actions"><a class="button secondary" href="${bookingUrl}" target="_blank" rel="noopener"><i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Book a call</a></div>
    </div>
  </section>
  ${monthlyWorkflowSection()}
  ${insightSection()}
  <section class="section alt">
    <div class="section-inner split">
      <div>
        <p class="eyebrow">Our approach</p>
          <h2>Stress-free, reliable accounting for busy owners.</h2>
        <p>The Cardiff Accountant is built for business owners who want the numbers explained clearly. That means tidy bookkeeping, practical reminders, accurate filings and advice you can use before a deadline becomes a problem.</p>
        <p>The tone is calm and straightforward: no confusing jargon, no messy handover, and no waiting until the last minute to understand where the business stands.</p>
        <div class="section-actions"><a class="button" href="${bookingUrl}" target="_blank" rel="noopener"><i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Book a call</a></div>
      </div>
      <div class="portrait"><img src="https://images.unsplash.com/photo-1660081110752-47149e654557?auto=format&amp;fit=crop&amp;w=1100&amp;q=82" alt="The Cardiff Accountant helping a business owner with accounts"></div>
    </div>
  </section>
  <section class="section navy reviews-section">
    <div class="section-inner">
      <div class="section-head quote-head value-head">
        <div>
          <p class="eyebrow">Why it matters</p>
          <h2>Clean books equal peace of mind.</h2>
          <p>Know what is due, what is paid and what needs attention before small admin jobs become expensive surprises.</p>
        </div>
      </div>
      <div class="quote-grid value-grid">
        <figure class="quote"><div class="stars" aria-hidden="true"><i class="fa-solid fa-receipt"></i></div><figcaption><span><cite>Clean records</cite><small>Bookkeeping kept current</small></span></figcaption><blockquote>Monthly bookkeeping that keeps VAT, tax and accounts from turning into a last-minute scramble.</blockquote></figure>
        <figure class="quote"><div class="stars" aria-hidden="true"><i class="fa-regular fa-calendar-check"></i></div><figcaption><span><cite>Clear deadlines</cite><small>No forgotten dates</small></span></figcaption><blockquote>Practical reminders for VAT thresholds, payment dates, payroll runs and the filings business owners often miss.</blockquote></figure>
        <figure class="quote"><div class="stars" aria-hidden="true"><i class="fa-solid fa-chart-line"></i></div><figcaption><span><cite>Better decisions</cite><small>Numbers explained simply</small></span></figcaption><blockquote>Plain-English guidance on what your numbers mean, where cash is going and what to sort before tax season.</blockquote></figure>
      </div>
      <div class="section-actions review-actions">
        <a class="button secondary" href="${bookingUrl}" target="_blank" rel="noopener"><i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Book a call</a>
      </div>
    </div>
  </section>
  ${faqSection()}
  ${cta()}`
});

const about = layout({
  title: "About The Cardiff Accountant | Accountant in Cardiff",
  description: "Learn about The Cardiff Accountant, making accounting simple for business owners with bookkeeping, VAT, payroll and accounts support.",
  pathName: "/about/",
  body: `${pageHero({
    eyebrow: "About",
    title: "Accounting made simpler for busy business owners.",
    summary: "The Cardiff Accountant supports sole traders and limited companies with bookkeeping, VAT, payroll, accounts and practical finance guidance.",
    fact: { title: "12+ years", text: "Experienced support for business owners who want clear numbers and less financial stress." }
  })}
  <section class="section">
    <div class="section-inner split">
      <div class="prose">
        <p class="eyebrow">The practice</p>
        <h2>Clear accounts, plain-English replies and no deadline drama.</h2>
        <p>The Cardiff Accountant exists for business owners who want their finances to feel organised instead of messy. The work covers the essentials: accounts, bookkeeping, VAT, payroll, Xero and Making Tax Digital support.</p>
        <p>The approach is simple: understand what you need, explain the next step, then keep the work moving. No mystery, no unnecessary jargon, and no leaving everything until the last minute.</p>
        <div class="about-points">
          <div><strong>Clear</strong><span>Know what is needed, what is missing and what happens next.</span></div>
          <div><strong>Practical</strong><span>Advice is based around what needs doing now and what can wait.</span></div>
          <div><strong>Organised</strong><span>Bookkeeping, VAT, payroll and accounts kept moving through the year.</span></div>
        </div>
        <h2>Who we work with</h2>
        <ul class="feature-list">
          <li><a href="/services/limited-company-accounts/">Limited company directors</a> who need accounts, Corporation Tax and practical planning.</li>
          <li><a href="/services/sole-trader-accounts/">Sole traders and freelancers</a> who want self assessment handled accurately.</li>
          <li>Business owners who want cleaner books and a better grip on cash flow.</li>
          <li>Small employers who want <a href="/services/payroll/">payroll</a> and pension admin handled reliably.</li>
          <li>Individuals with rental income, side income or other <a href="/services/personal-tax-returns/">self assessment</a> needs.</li>
        </ul>
      </div>
      <div class="portrait"><img src="https://images.unsplash.com/photo-1660081110752-47149e654557?auto=format&amp;fit=crop&amp;w=1100&amp;q=82" alt="The Cardiff Accountant working with a business owner"></div>
    </div>
  </section>
  <section class="section alt">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <p class="eyebrow">How we help</p>
          <h2>Support that follows your business rhythm.</h2>
        </div>
        <p>Some owners need monthly bookkeeping. Others need VAT sorted, payroll run or annual accounts filed. The support flexes around where your business is now.</p>
      </div>
      <div class="office-feature">
        <div class="office-image">
          <img src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=800&q=80" alt="The Cardiff Accountant service support">
        </div>
        <div class="office-copy">
          <p class="eyebrow">Simple next steps</p>
          <h3>Bookkeeping, VAT, payroll and accounts</h3>
          <p>Start with the issue in front of you. We will confirm what records are needed, what can be dealt with now and what needs tracking for the next deadline.</p>
          <ul class="feature-list compact-list">
            <li>Remote support available for Cardiff and South Wales businesses.</li>
            <li>Support for accounts, tax returns, VAT, payroll and bookkeeping.</li>
            <li>Plain-English explanations for business owners.</li>
          </ul>
          <a class="text-link" href="${bookingUrl}" target="_blank" rel="noopener">Book a call <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
        </div>
      </div>
    </div>
  </section>
  ${cta()}`
});

const servicesIndex = layout({
  title: "Accountancy Services in Cardiff | The Cardiff Accountant",
  description: "Explore The Cardiff Accountant services: bookkeeping, VAT, payroll, accounts, Xero and Making Tax Digital support for business owners.",
  pathName: "/services/",
  body: `${pageHero({
    eyebrow: "Services",
    title: "Bookkeeping, VAT, payroll and accounts without the fuss.",
    summary: "Choose the service you need now, or book a call if you are not sure where to start. The Cardiff Accountant helps business owners get organised and stay compliant.",
    fact: { title: "Start where you are", text: "Bring the records you have. We will explain what is missing and what needs doing first." }
  })}
  <section class="section services-intro">
    <div class="section-inner">
      ${serviceSummaryStrip()}
    </div>
  </section>
  <section class="section">
    <div class="section-inner">
      <div class="section-head compact-head">
        <div>
          <p class="eyebrow">What we handle</p>
          <h2>Core services.</h2>
        </div>
        <p>Most clients start with bookkeeping, accounts or VAT, then add payroll, Xero support, MTD setup or planning as the business grows.</p>
      </div>
      ${serviceCards()}
    </div>
  </section>
  ${cta()}`
});

const locationsIndex = layout({
  title: "Accountants in Cardiff and South Wales | The Cardiff Accountant",
  description: "The Cardiff Accountant supports clients in Cardiff, Penarth, Barry, Pontypridd and across South Wales with bookkeeping, VAT, payroll and accounts.",
  pathName: "/locations/",
  body: `${pageHero({
    eyebrow: "Locations",
    title: "Accountants across Cardiff and South Wales.",
    summary: "The Cardiff Accountant works with business owners, sole traders and limited companies across Cardiff and nearby areas.",
    fact: { title: "Remote-friendly", text: "Book a call, send records remotely and keep your finances moving." }
  })}
  <section class="section">
    <div class="section-inner">
      ${locationCards()}
    </div>
  </section>
  ${cta()}`
});


const contact = layout({
  title: "Contact The Cardiff Accountant | Accountant in Cardiff",
  description: "Contact The Cardiff Accountant about bookkeeping, VAT, payroll, accounts, Xero or Making Tax Digital support.",
  pathName: "/contact/",
  body: `${contactHero()}
  <section class="section alt contact-main-section">
    <div class="section-inner contact-grid">
      <div class="card">
        <div class="contact-photo"><img src="https://images.unsplash.com/photo-1709880945165-d2208c6ad2ec?auto=format&fit=crop&w=800&q=80" alt="Accountant desk with calculator and financial documents"></div>
        <p class="eyebrow">Send a message</p>
        <h2>Tell us what you need help with.</h2>
        <p>Share what you need help with, whether it is a tax return, limited company accounts, payroll, VAT, bookkeeping or a new business setup.</p>
        <ul class="check-list">
          <li>Your deadline, if you know it</li>
          <li>The service you need help with</li>
          <li>Whether your records are already prepared</li>
        </ul>
      </div>
      <form class="card form" action="https://api.web3forms.com/submit" method="POST">
        <h2>Enquiry form</h2>
        <input type="hidden" name="access_key" value="bb006b3c-616a-4761-9f1c-db830e94fe39">
        <input type="hidden" name="subject" value="New Enquiry from The Cardiff Accountant">
        <input type="hidden" name="from_name" value="The Cardiff Accountant Website">
        <label>Name <input name="name" autocomplete="name" required></label>
        <label>Email <input type="email" name="email" autocomplete="email" required></label>
        <label>Service <select name="service">${services.map((service) => `<option>${esc(service.title)}</option>`).join("")}</select></label>
        <label>Message <textarea name="message" required></textarea></label>
        <button class="button" type="submit"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Send enquiry</button>
      </form>
    </div>
  </section>
  <section class="section">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <p class="eyebrow">Book online</p>
          <h2>Start with a simple call.</h2>
        </div>
        <p>Use the Calendly link from Instagram to book a call, or send a message with the service you need and your deadline if you know it.</p>
      </div>
      <div class="hours-strip" aria-label="Opening hours">
        ${openingHours.map(([day, hours]) => `<div><i class="fa-regular fa-clock" aria-hidden="true"></i><strong>${day}</strong><span>${hours}</span></div>`).join("")}
      </div>
      <div class="map-embed">
        <iframe title="Google Map showing Cardiff" src="${googleMapEmbedUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div class="section-actions">
        <a class="button secondary" href="${bookingUrl}" target="_blank" rel="noopener"><i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Book a call</a>
      </div>
    </div>
  </section>`
});

function servicePage(service) {
  const relatedLinks = serviceInternalLinks[service.slug] || [];
  const relatedParagraph = relatedLinks.length
    ? `<p>This work often connects with ${inlineLinks(relatedLinks)}, depending on how your records, filings and tax position fit together.</p>`
    : "";
  const faq = serviceFaqs(service);
  return layout({
    title: `${service.title} in Cardiff | The Cardiff Accountant`,
    description: `${service.title} in Cardiff from The Cardiff Accountant. ${service.summary}`,
    pathName: `/services/${service.slug}/`,
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        provider: { "@type": "AccountingService", name: "The Cardiff Accountant", url: siteUrl },
        areaServed: ["Cardiff", "South Wales"],
        description: service.summary,
        url: url(`/services/${service.slug}/`)
      },
      faqSchema(faq),
      breadcrumbSchema([{ label: "Services", href: "/services/" }, { label: service.title, href: `/services/${service.slug}/` }])
    ],
    body: `${pageHero({
      eyebrow: "Service",
      title: service.title,
      summary: service.summary,
      fact: { title: "Ideal for", text: service.audience },
      breadcrumbs: [{ label: "Services", href: "/services/" }, { label: service.title }]
    })}
    <section class="section service-page-section">
      <div class="section-inner content-grid service-layout">
        <article class="prose service-detail">
          <div class="service-intro-panel">
            <p class="eyebrow">How it works</p>
            <h2>Clear support from first record to final filing.</h2>
            <div class="service-intro-copy">
              <p>${esc(service.audience)} We will confirm what is needed, check the figures and keep you updated before anything is filed.</p>
              <p>${esc(service.title)} work is available for clients in <a href="/locations/accountants-cardiff/">Cardiff</a> and across South Wales, with remote working available when it suits better.</p>
              <p>Most clients want the same thing: tidy records, no missed dates and a straight answer when they ask a question.</p>
              ${relatedParagraph}
            </div>
          </div>
          <div class="service-includes-panel">
            <div>
              <p class="eyebrow">Included</p>
              <h2>What The Cardiff Accountant can handle.</h2>
            </div>
            <ul class="feature-list">${service.includes.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
          </div>
          <div class="service-proof-panel">
            <p class="eyebrow">Why clients choose us</p>
            <h2>Reliable deadlines, direct contact and plain English answers.</h2>
            <p>Deadlines are tracked, questions are answered and the work is explained in normal language.</p>
            <div class="proof-pillars">
              <div class="proof-pillar">
                <i class="fa-regular fa-calendar-check" aria-hidden="true"></i>
                <strong>Deadlines tracked</strong>
                <span>No last-minute scramble. We track what is due and keep it moving.</span>
              </div>
              <div class="proof-pillar">
                <i class="fa-regular fa-comment" aria-hidden="true"></i>
                <strong>Plain English</strong>
                <span>No jargon. We explain what is needed and why in clear, straightforward language.</span>
              </div>
              <div class="proof-pillar">
                <i class="fa-solid fa-phone" aria-hidden="true"></i>
                <strong>Direct contact</strong>
                <span>You get a clear response, not an automated reply or a long wait.</span>
              </div>
            </div>
          </div>
          ${serviceNextSteps(service)}
          <div class="service-faq">
            <h2>Common questions</h2>
            <div class="faq-list">
              ${faq.map(([q, a], index) => `<details${index === 0 ? " open" : ""}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}
            </div>
          </div>
        </article>
        <aside class="sidebar service-sidebar">
          <div class="fact-box service-contact-card">
            <h2>Need help?</h2>
            <p>Book a call to talk through what you need and what records are needed next.</p>
            <a class="button" href="${bookingUrl}" target="_blank" rel="noopener"><i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Book a call</a>
          </div>
          <nav class="card mini-nav" aria-label="Other services">
            <h3>Related services</h3>
            ${services.filter((item) => item.slug !== service.slug).slice(0, 6).map((item) => `<a href="/services/${item.slug}/">${esc(item.title)}</a>`).join("")}
          </nav>
        </aside>
      </div>
    </section>
    ${cta()}`
  });
}


function locationPage(location) {
  const place = esc(location.place);
  const seoTitle = `Accountants in ${location.place}`;
  return layout({
    title: `${seoTitle} | The Cardiff Accountant`,
    description: `${seoTitle} for small businesses, sole traders and personal tax clients. ${location.summary}`,
    pathName: `/locations/${location.slug}/`,
    schema: [
      localBusinessSchema(location),
      breadcrumbSchema([{ label: "Locations", href: "/locations/" }, { label: seoTitle, href: `/locations/${location.slug}/` }])
    ],
    body: `${pageHero({
      eyebrow: "Location",
      title: location.title,
      summary: location.summary,
      fact: { title: "Local service area", text: `Accountancy support for clients in ${location.place} and nearby areas.` },
      breadcrumbs: [{ label: "Locations", href: "/locations/" }, { label: location.title }]
    })}
    <section class="section">
      <div class="section-inner content-grid">
        <article class="prose">
          <h2>Accountancy support in ${esc(location.place)}</h2>
          <p>${esc(location.angle)}</p>
          <p>Services include <a href="/services/limited-company-accounts/">limited company accounts in ${place}</a>, <a href="/services/sole-trader-accounts/">sole trader accounts in ${place}</a>, <a href="/services/personal-tax-returns/">personal tax returns in ${place}</a>, <a href="/services/vat-returns/">VAT returns in ${place}</a>, <a href="/services/payroll/">payroll support in ${place}</a>, <a href="/services/bookkeeping/">bookkeeping in ${place}</a>, partnership accounts, CIS returns and tax planning.</p>
          <h2>Services available locally</h2>
          ${localServiceLinks(location.place)}
          <ul class="feature-list">${services.slice(0, 8).map((service) => `<li><a href="/services/${service.slug}/">${esc(service.title)}</a> - ${esc(service.summary)}</li>`).join("")}</ul>
          <h2>A clear process</h2>
          <p>Start by sending the basics or booking a call. The Cardiff Accountant will confirm what records are needed and how the work can be handled.</p>
        </article>
        <aside class="sidebar">
          <div class="fact-box">
            <h2>Book a call</h2>
            <p>Talk through your bookkeeping, VAT, payroll or accounts and what records are needed next.</p>
            <a class="button" href="${bookingUrl}" target="_blank" rel="noopener"><i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Book a call</a>
          </div>
          <nav class="card mini-nav" aria-label="Nearby locations">
            <h3>Nearby areas</h3>
            ${locations.filter((item) => item.slug !== location.slug).map((item) => `<a href="/locations/${item.slug}/">${esc(item.place)}</a>`).join("")}
          </nav>
        </aside>
      </div>
    </section>
    ${cta()}`
  });
}

const pages = [
  // index.html is maintained manually — do not add it here or the build will overwrite the custom homepage
  ["/about/index.html", about],
  ["/services/index.html", servicesIndex],
  ["/locations/index.html", locationsIndex],
  ["/contact/index.html", contact],
  ...services.map((service) => [`/services/${service.slug}/index.html`, servicePage(service)]),
  ...locations.map((location) => [`/locations/${location.slug}/index.html`, locationPage(location)])
];

await Promise.all([
  rm(path.join(root, "about"), { recursive: true, force: true }),
  rm(path.join(root, "services"), { recursive: true, force: true }),
  rm(path.join(root, "locations"), { recursive: true, force: true }),
  rm(path.join(root, "contact"), { recursive: true, force: true })
]);

for (const [file, content] of pages) {
  const fullPath = path.join(root, file);
  await mkdir(path.dirname(fullPath), { recursive: true });
  await writeFile(fullPath, content);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([file]) => {
  const pathName = file.replace(/index\.html$/, "");
  return `  <url><loc>${url(pathName)}</loc></url>`;
}).join("\n")}
</urlset>
`;

await writeFile(path.join(root, "sitemap.xml"), sitemap);
await writeFile(path.join(root, "robots.txt"), `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`);

await writeFile(path.join(root, ".htaccess"), `RewriteEngine On
Redirect 301 /ourservices /services/
Redirect 301 /aboutus /about/
Redirect 301 /contactus /contact/
Redirect 301 /our-services /services/
Redirect 301 /contact-us /contact/
`);

await writeFile(path.join(root, "README.md"), `# The Cardiff Accountant website

Static HTML website for The Cardiff Accountant.

## Commands

- \`npm run build\` regenerates the HTML pages from \`scripts/build-site.mjs\`.
- \`npm run dev\` serves the site locally at \`http://127.0.0.1:8088\`.

## Pages

- Home, about, services index, locations index and contact page.
- Individual service pages for ${services.length} accountancy services.
- Individual location pages for ${locations.map((location) => location.place).join(", ")}.
`);

console.log(`Generated ${pages.length} pages`);
