import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileCTABar from '../components/MobileCTABar';
import AnimationProvider from '../components/AnimationProvider';
import config from '../lib/config';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: {
    default: `${config.business.name} | Nashville's Trusted Roofing Company`,
    template: `%s | Stellar Roofing & Restorations`,
  },
  description: config.business.description,
  metadataBase: new URL(config.business.website),
  openGraph: {
    siteName: config.business.name,
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://appcdn.leadconnectorhq.com" />
        <link rel="preconnect" href="https://reputationhub.site" />
      </head>
      <body className="bg-white text-text-dark antialiased">
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MCP6RQRL');`}}
        />
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MCP6RQRL" height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
        <Navbar />
        <main>
          <AnimationProvider>
            {children}
          </AnimationProvider>
        </main>
        <Footer />
        <MobileCTABar />
      </body>
    </html>
  );
}
