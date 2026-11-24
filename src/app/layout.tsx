import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'cafe.te | oficinas y espacios de trabajo',
  description:
    'Alquiler de oficinas privadas y entrepiso en cafe.te. El 100% del valor se acredita en consumición.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${montserrat.className} antialiased bg-white text-[#1A1A1A]`}>
        {children}
      </body>
    </html>
  );
}