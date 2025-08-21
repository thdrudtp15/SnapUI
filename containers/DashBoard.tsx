'use client';
import { useEffect, useRef } from 'react';
import styles from './DashBoard.module.css';
import ControlBar from '@/components/ControlBar';

export default function DashBoard() {
    const dashboard = useRef<HTMLDivElement | null>(null);

    return (
        <div className={styles.dashboard} ref={dashboard} style={{ width: 200 }} id="dashboard">
            <ControlBar ref={dashboard} />
        </div>
    );
}
