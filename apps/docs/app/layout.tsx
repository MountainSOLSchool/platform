import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-docs/style.css';
import './global.css';
import type { ReactNode } from 'react';

export const metadata = {
    title: {
        default: 'Mountain SOL Admin Guide',
        template: '%s — Mountain SOL Admin Guide',
    },
    description:
        'Reference for Mountain SOL admins — every admin tool and workflow, plus how to help families who reach out.',
    // Internal reference; not for public search indexing until visibility is
    // decided (#259).
    robots: { index: false, follow: false },
};

const navbar = <Navbar logo={<b>Mountain SOL Admin Guide</b>} />;

const footer = (
    <Footer>
        Mountain SOL — internal admin reference. © {new Date().getFullYear()}
    </Footer>
);

export default async function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en" dir="ltr" suppressHydrationWarning>
            <Head />
            <body>
                <Layout
                    navbar={navbar}
                    footer={footer}
                    pageMap={await getPageMap()}
                    docsRepositoryBase="https://github.com/MountainSOLSchool/platform/tree/main/apps/docs"
                    editLink="Edit this page on GitHub"
                    sidebar={{ defaultMenuCollapseLevel: 1 }}
                >
                    {children}
                </Layout>
            </body>
        </html>
    );
}
