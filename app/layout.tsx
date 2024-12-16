import type { Metadata } from 'next';
import Link from 'next/link';
import { SWRConfig } from 'swr';

import { api } from '@/lib/api';
import './globals.css';
import S from './layout.module.css';

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
            <body>
                <div className={S.layout}>
                    <header className={S.header}>
                        <nav className={S.menu}>
                            <Link href="/exercise1">EXERCISE 1</Link>
                            <Link href="/exercise2">EXERCISE 2</Link>
                        </nav>
                    </header>
                    {children}
                </div>
            </body>
        </html>
    );
}
