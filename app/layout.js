import { Inter, Cormorant_Garamond, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata = {
  title: { default: 'Alvin Loria Novels', template: '%s | Alvin Loria Novels' },
  description: 'Immersive web novels by Alvin Loria. Fantasy, sci-fi, horror, and more.',
  openGraph: { type: 'website', siteName: 'Alvin Loria Novels' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${playfair.variable}`}>
      <body className="antialiased bg-[#fcfaf7] text-stone-900">
        {children}
      </body>
    </html>
  );
}

