'use client';
import { useRef, useState } from 'react';
import styles from './DashBoard.module.css';
import ControlBar from '@/components/ControlBar';
import Html from '@/components/Html';

const DashBoard = ({ html }: { html: string }) => {
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
            {select === 'html' && <Html html={html} />}
            {select === 'css' && <div>css</div>}
            <ControlBar targetRef={dashboard} />
        </div>
    );
};

export default DashBoard;
