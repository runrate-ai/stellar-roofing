const config = {
  business: {
    name: "Stellar Roofing & Restorations",
    legalName: "Stellar Roofing & Restorations LLC",
    tagline: "Out of This World Roofing",
    ownerName: "Nate",
    yearFounded: 2020,
    website: "https://thestellarroofing.com",
    // Nashville is the default for non-location pages (about, contact, etc.)
    phone: "(629) 277-4249",
    phoneRaw: "6292774249",
    email: "Office@thestellarroofing.com",
    description: "Trusted roofing company providing residential and commercial roofing services with lifetime warranties and free inspections.",
    address: {
      type: "service-area",
      city: "Nashville",
      state: "TN",
      stateFullName: "Tennessee",
      country: "US",
    },
    hours: {
      weekdays: "7:00 AM - 7:00 PM",
      saturday: "8:00 AM - 5:00 PM",
      sunday: "Closed",
      schemaFormat: ["Mo-Fr 07:00-19:00", "Sa 08:00-17:00"],
    },
  },

  locations: {
    nashville: {
      slug: "nashville",
      city: "Nashville",
      state: "TN",
      stateFullName: "Tennessee",
      region: "Middle Tennessee",
      phone: "(629) 277-4249",
      phoneRaw: "6292774249",
      email: "Office@thestellarroofing.com",
      description: "Nashville's trusted roofing company providing residential and commercial roofing services with lifetime warranties and free inspections.",
      heroImage: "/images/hero.jpg",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d824213.1065563732!2d-86.90376095!3d36.20103555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8b60ff0d0201d7bd%3A0x43175739b4a32d43!2sStellar%20Roofing%20%26%20Restoration!5e0!3m2!1sen!2sus!4v1774886295627!5m2!1sen!2sus",
      hours: {
        weekdays: "7:00 AM - 7:00 PM",
        saturday: "8:00 AM - 5:00 PM",
        sunday: "Closed",
        schemaFormat: ["Mo-Fr 07:00-19:00", "Sa 08:00-17:00"],
      },
      serviceAreas: [
        { city: "Nashville", state: "TN", slug: "nashville" },
        { city: "Murfreesboro", state: "TN", slug: "murfreesboro" },
        { city: "Clarksville", state: "TN", slug: "clarksville" },
        { city: "Franklin", state: "TN", slug: "franklin" },
        { city: "Brentwood", state: "TN", slug: "brentwood" },
        { city: "Hendersonville", state: "TN", slug: "hendersonville" },
        { city: "Gallatin", state: "TN", slug: "gallatin" },
        { city: "Smyrna", state: "TN", slug: "smyrna" },
        { city: "Spring Hill", state: "TN", slug: "spring-hill" },
        { city: "Mount Juliet", state: "TN", slug: "mount-juliet" },
        { city: "Lebanon", state: "TN", slug: "lebanon" },
      ],
      expansionAreas: [],
    },
    boise: {
      slug: "boise",
      city: "Boise",
      state: "ID",
      stateFullName: "Idaho",
      region: "Treasure Valley",
      phone: "(208) 370-8599",
      phoneRaw: "2083708599",
      email: "Office@thestellarroofing.com",
      description: "Boise's trusted roofing company providing residential and commercial roofing services with lifetime warranties and free inspections.",
      heroImage: "/images/hero.jpg",
      mapEmbed: "", // TODO: Add Boise Google Business Profile map embed URL
      hours: {
        weekdays: "7:00 AM - 7:00 PM",
        saturday: "8:00 AM - 5:00 PM",
        sunday: "Closed",
        schemaFormat: ["Mo-Fr 07:00-19:00", "Sa 08:00-17:00"],
      },
      serviceAreas: [
        { city: "Boise", state: "ID", slug: "boise" },
        { city: "Meridian", state: "ID", slug: "meridian" },
        { city: "Nampa", state: "ID", slug: "nampa" },
        { city: "Eagle", state: "ID", slug: "eagle" },
        { city: "Caldwell", state: "ID", slug: "caldwell" },
        { city: "Kuna", state: "ID", slug: "kuna" },
        { city: "Star", state: "ID", slug: "star" },
        { city: "Middleton", state: "ID", slug: "middleton" },
        { city: "Garden City", state: "ID", slug: "garden-city" },
        { city: "Mountain Home", state: "ID", slug: "mountain-home" },
      ],
      expansionAreas: [],
    },
  },

  brand: {
    colors: {
      primary: "#0B1547",
      primaryLight: "#1a2a6b",
      accent: "#FFFFFF",
      accentHover: "#F1F5F9",
    },
    logo: {
      primary: "/images/logo.png",
      mascotThumbsup: "/images/logo-mascot-thumbsup.png",
      mascotPhone: "/images/logo-mascot-phone.png",
      width: 180,
      height: 60,
    },
  },

  photos: {
    hero: "hero.jpg",
    serviceRoofReplacement: "service-roof-replacement.jpg",
    serviceRoofRepair: "service-roof-repair.jpg",
    serviceStormDamage: "service-storm-damage.jpg",
    serviceStormDamageHome: "service-storm-damage-home.jpg",
    serviceInspection: "service-inspection.jpg",
    serviceCommercial: "service-commercial.jpg",
    serviceEmergency: "service-storm-damage.jpg",
    crewWorking: "crew-working.jpg",
    crewWorking02: "crew-working-02.jpg",
    project01: "project-01.jpg",
    project02: "project-02.jpg",
  },

  services: [
    { name: "Roof Replacement", slug: "roof-replacement", shortDescription: "Complete roof replacement with premium materials and lifetime warranty.", icon: "Home", photo: "service-roof-replacement.jpg" },
    { name: "Roof Repair", slug: "roof-repair", shortDescription: "Fast, reliable roof repairs for leaks, missing shingles, and storm damage.", icon: "Wrench", photo: "service-roof-repair.jpg" },
    { name: "Storm Damage Repair", slug: "storm-damage-repair", shortDescription: "Expert storm damage assessment and repair with insurance claims assistance.", icon: "CloudLightning", photo: "service-storm-damage.jpg" },
    { name: "Roof Inspection", slug: "roof-inspection", shortDescription: "Free, no-obligation roof inspections with honest assessments.", icon: "Search", photo: "service-inspection.jpg" },
    { name: "Commercial Roofing", slug: "commercial-roofing", shortDescription: "Commercial roofing solutions for businesses of all sizes.", icon: "Building2", photo: "service-commercial.jpg" },
    { name: "Emergency Roof Repair", slug: "emergency-roof-repair", shortDescription: "Fast emergency response for urgent roof problems and active leaks.", icon: "AlertTriangle", photo: "service-storm-damage.jpg" },
  ],

  // Legacy — kept for non-location pages
  serviceAreas: {
    primary: { city: "Nashville", state: "TN", slug: "nashville" },
    mvp: [
      { city: "Nashville", state: "TN", slug: "nashville" },
      { city: "Murfreesboro", state: "TN", slug: "murfreesboro" },
      { city: "Clarksville", state: "TN", slug: "clarksville" },
      { city: "Franklin", state: "TN", slug: "franklin" },
      { city: "Brentwood", state: "TN", slug: "brentwood" },
    ],
    expansion: [
      { city: "Hendersonville", state: "TN", slug: "hendersonville" },
      { city: "Gallatin", state: "TN", slug: "gallatin" },
      { city: "Smyrna", state: "TN", slug: "smyrna" },
      { city: "Spring Hill", state: "TN", slug: "spring-hill" },
      { city: "Mount Juliet", state: "TN", slug: "mount-juliet" },
      { city: "Lebanon", state: "TN", slug: "lebanon" },
    ],
  },

  trustSignals: [
    { label: "Lifetime Warranty", icon: "Shield" },
    { label: "Free Inspections", icon: "SearchCheck" },
    { label: "Licensed & Insured", icon: "BadgeCheck" },
    { label: "Insurance Claims Help", icon: "FileCheck" },
  ],

  ghl: {
    quoteFormId: "REPLACE_WITH_GHL_FORM_ID",
    contactFormId: "REPLACE_WITH_GHL_CONTACT_FORM_ID",
    reviewWidgetId: "REPLACE_WITH_GHL_REVIEW_WIDGET_ID",
  },

  seo: {
    titleSuffix: " | Stellar Roofing & Restorations",
    defaultOgImage: "/images/hero.jpg",
  },
};

export default config;
