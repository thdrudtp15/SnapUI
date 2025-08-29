'use client';
import { useRef, useState } from 'react';
import styles from './DashBoard.module.css';
import ControlBar from '@/components/ControlBar';
import Editor from '@/components/Editor';

const DashBoard = ({
    formattedHtml,
    formattedCss,
}: {
    formattedHtml: string;
    formattedCss: string;
}) => {
    const [select, setSelect] = useState<'html' | 'css'>('html');

    const dashboard = useRef<HTMLDivElement | null>(null);

    return (
        <div className={styles.dashboard} ref={dashboard} id="dashboard">
            <nav className={styles.nav}>
                <button
                    type="button"
                    className={`${styles.nav_item} ${select === 'html' ? styles.select : ''}`}
                    onClick={() => setSelect('html')}
                >
                    Html
                </button>
                <button
                    type="button"
                    className={`${styles.nav_item} ${select === 'css' ? styles.select : ''}`}
                    onClick={() => setSelect('css')}
                >
                    Css
                </button>
            </nav>
            {select === 'html' && <Editor queryKey="html" content={formattedHtml} />}
            {select === 'css' && <Editor queryKey="css" content={formattedCss} />}
            <ControlBar targetRef={dashboard} />
        </div>
    );
};

export default DashBoard;
