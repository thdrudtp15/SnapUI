import LZString from 'lz-string';

import DashBoard from '@/containers/DashBoard';
import Viewer from '@/containers/Viewer';
import Header from '@/components/Header';

import styles from './page.module.css';
import { formatHtml, formatCss } from '@/utils/format';

type Props = {
    searchParams: Promise<{ html: string; css: string }>;
};

export default async function Home({ searchParams }: Props) {
    const { html, css } = await searchParams;

    const compressed = LZString.compressToEncodedURIComponent(html);

    const formattedHtml = (await formatHtml(html)) || '';
    const formattedCss = (await formatCss(css)) || '';

    return (
        <main className={styles.main}>
            <DashBoard formattedHtml={formattedHtml} formattedCss={formattedCss} />
            <Viewer html={html} css={css} />
        </main>
    );
}
