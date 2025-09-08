'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './DashBoard.module.css';
import ControlBar from '@/components/ControlBar';
import Editors from '@/components/Editors';

import htmlIcon from '@/public/html5.svg';
import cssIcon from '@/public/css3.svg';

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
                    <Image src={htmlIcon} width={24} height={24} alt="html icon" priority />
                    HTML
                </button>
                <button
                    type="button"
                    className={`${styles.nav_item} ${select === 'css' ? styles.select : ''}`}
                    onClick={() => setSelect('css')}
                >
                    <Image src={cssIcon} width={24} height={24} alt="css icon" priority />
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
