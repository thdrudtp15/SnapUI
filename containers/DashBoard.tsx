'use client';
import { useRef, useState } from 'react';

import styles from './DashBoard.module.css';
import ControlBar from '@/components/ControlBar';
import Editors from '@/components/Editors';

import { FaHtml5 } from 'react-icons/fa6';
import { FaCss3Alt } from 'react-icons/fa';

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
                    <FaHtml5 fontSize={24} color="#E44D26" />
                    HTML
                </button>
                <button
                    type="button"
                    className={`${styles.nav_item} ${select === 'css' ? styles.select : ''}`}
                    onClick={() => setSelect('css')}
                >
                    <FaCss3Alt fontSize={24} color="#1572B6" />
                    CSS
                </button>
            </nav>
            <div className={styles.editor_wrap}>
                {select === 'html' && <Editors highlight="html" content={formattedHtml} />}
                {select === 'css' && <Editors highlight="css" content={formattedCss} />}
            </div>
            <ControlBar targetRef={dashboard} />
        </div>
    );
};

export default DashBoard;
