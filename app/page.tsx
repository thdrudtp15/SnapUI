import DashBoard from '@/containers/DashBoard';

import Viewer from '@/containers/Viewer';

import styles from './page.module.css';
import { formatHtml } from '@/utils/formatHtml';

type Props = {
    searchParams: Promise<{ html: string; css: string }>;
};

export default async function Home({ searchParams }: Props) {
    const { html, css } = await searchParams;

    const formatedHtml = (await formatHtml(html)) || '';

    return (
        <main className={styles.main}>
            <DashBoard html={formatedHtml} />
            <Viewer html={html} css={css} />
        </main>
    );
}
