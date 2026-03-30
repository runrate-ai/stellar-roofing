import { Inter } from 'next/font/google';
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
      <body className="bg-white text-text-dark antialiased">
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
