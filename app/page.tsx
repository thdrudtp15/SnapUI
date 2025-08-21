import DashBoard from '@/containers/DashBoard';

import Viewer from '@/containers/Viewer';

import styles from './page.module.css';

type Props = {
    searchParams: Promise<{ html: string; css: string }>;
};

export default async function Home({ searchParams }: Props) {
    const { html, css } = await searchParams;

    return (
        <main className={styles.main}>
            <DashBoard />
            <Viewer />
        </main>
    );
}
