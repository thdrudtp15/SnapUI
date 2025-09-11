import LZString from 'lz-string';

import DashBoard from '@/containers/DashBoard';
import Viewer from '@/containers/Viewer';

import styles from './page.module.css';
import { formatHtml, formatCss } from '@/utils/format';

import DOMPurify from 'isomorphic-dompurify';

type Props = {
    searchParams: Promise<{ html: string; css: string }>;
};

export default async function Home({ searchParams }: Props) {
    const { html, css } = await searchParams;

    const formattedHtml = DOMPurify.sanitize(
        (await formatHtml(LZString.decompressFromEncodedURIComponent(html))) || '',
    );
    const formattedCss = DOMPurify.sanitize(
        (await formatCss(LZString.decompressFromEncodedURIComponent(css))) || '',
    );

    return (
        <main className={styles.main}>
            <DashBoard formattedHtml={formattedHtml} formattedCss={formattedCss} />
            <Viewer html={formattedHtml} css={formattedCss} />
        </main>
    );
}
