import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Nexus DC Connector | Data Center Subcontractor & Supplier Directory',
  description:
    'Find verified data center subcontractors and equipment suppliers. Connect with electrical, mechanical, fire protection, cabling, and cooling specialists for your data center project.',
  keywords: [
    'data center subcontractors',
    'data center suppliers',
    'data center construction',
    'electrical subcontractor',
    'mechanical contractor',
    'data center equipment',
    'DC construction directory',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
