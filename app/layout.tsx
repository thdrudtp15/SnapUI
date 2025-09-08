import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const inter = Inter();

export const metadata: Metadata = {
    title: 'SNAP UI',
    description: '컴포넌트를 공유해보세요',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} ${geistSans.variable} ${geistMono.variable}`}>
                <Header />
                {children}
            </body>
        </html>
    );
}
