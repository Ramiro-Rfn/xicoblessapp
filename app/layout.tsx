import ProviderComponent from '@/components/layouts/provider-component';
import { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';

export const metadata: Metadata = {
    title: {
        template: '%s | Xicobless Engenharia',
        default: 'Xicobless Engenharia',
    },
};
const nunito = Nunito({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-nunito',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={nunito.variable}>
                <ProviderComponent>{children}</ProviderComponent>
            </body>
        </html>
    );
}
