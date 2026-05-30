/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Old service URLs → Nashville (301 permanent)
      { source: '/services/roof-replacement', destination: '/nashville/services/roof-replacement', permanent: true },
      { source: '/services/roof-repair', destination: '/nashville/services/roof-repair', permanent: true },
      { source: '/services/storm-damage-repair', destination: '/nashville/services/storm-damage-repair', permanent: true },
      { source: '/services/roof-inspection', destination: '/nashville/services/roof-inspection', permanent: true },
      { source: '/services/commercial-roofing', destination: '/nashville/services/commercial-roofing', permanent: true },
      { source: '/services/emergency-roof-repair', destination: '/nashville/services/emergency-roof-repair', permanent: true },
      // Old service area URLs → Nashville (301 permanent)
      { source: '/service-areas/nashville', destination: '/nashville/service-areas/nashville', permanent: true },
      { source: '/service-areas/murfreesboro', destination: '/nashville/service-areas/murfreesboro', permanent: true },
      { source: '/service-areas/clarksville', destination: '/nashville/service-areas/clarksville', permanent: true },
      { source: '/service-areas/franklin', destination: '/nashville/service-areas/franklin', permanent: true },
      { source: '/service-areas/brentwood', destination: '/nashville/service-areas/brentwood', permanent: true },
    ];
  },
};
module.exports = nextConfig;
