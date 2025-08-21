'use client';
import { useRef } from 'react';
import styles from './DashBoard.module.css';
import ControlBar from '@/components/ControlBar';
import Html from '@/components/Html';
import Css from '@/components/Css';

export default function DashBoard() {
    const dashboard = useRef<HTMLDivElement | null>(null);

    return (
        <div className={styles.dashboard} ref={dashboard} style={{ width: 200 }} id="dashboard">
            <Html />
            <Css />
            <ControlBar targetRef={dashboard} />
        </div>
    );
}
