import "./globals.css";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

import {ToastConfig} from "@/app/toast-config";
import { TooltipProvider } from '@/components/ui/tooltip'
import ClientProviders from "@/app/providers";

export const metadata = {
  title: "Loybits - Revolutionizing Customer Loyalty",
  description:
    "Loybits represents an innovative solution that effectively addresses the challenges faced by both SMEs and consumers in the realm of customer loyalty. By providing a platform that balances the needs of both groups",
    metadataBase: 'https://loybits.vercel.app/',
    robots: env.isProduction ? 'all' : 'noindex,nofollow',
    openGraph: {
      type: 'website',
      locale: 'en',
      url: 'https://loybits.vercel.app/',
      siteName: 'Loybits',
      images: [
        {
          url: '/banner.png',
          width: 1280,
          height: 640,
        },
      ],
    },
    twitter: {
      site: '@LoybitsToken',
      creator: '@LoybitsToken',
      card: '/banner.png',
    },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <ClientProviders>
      <TooltipProvider>
      <body className={cx(sfPro.variable, inter.variable)}>
        <div className="fixed h-screen w-full bg-gradient-to-br from-violet-900 via-violet-700 to-violet-500" />
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          {children}
        </main>
        <Footer />
        <VercelAnalytics />
      </body>
        </TooltipProvider>
      <ToastConfig />
    </ClientProviders>
    </html>
  );
}
