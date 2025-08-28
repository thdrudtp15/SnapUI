'use client';
import { useRef, useState } from 'react';
import styles from './DashBoard.module.css';
import ControlBar from '@/components/ControlBar';

export default function DashBoard() {
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
            {select === 'html' && <div>html</div>}
            {select === 'css' && <div>css</div>}
            <ControlBar targetRef={dashboard} />
        </div>
    );
}
