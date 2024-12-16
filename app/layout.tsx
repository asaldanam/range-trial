import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Asaldanam Mango range trial',
    description: 'Generated by Asaldanam Mango range trial'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
