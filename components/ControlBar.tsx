'use client';

import { RefObject, useEffect, useRef } from 'react';
import styles from './ControlBar.module.css';

type Props = {
    targetRef: RefObject<HTMLDivElement | null>;
};

const ControlBar = ({ targetRef }: Props) => {
    const click = useRef<boolean>(false);

    const move = (e: MouseEvent) => {
        e.preventDefault();
        const { clientX } = e;

        if (!click.current || clientX < 200 || clientX > 400 || !targetRef.current) return;
        targetRef.current.style.width = `${clientX}px`;
    };

    const mouseUp = () => {
        click.current = false;
    };

    useEffect(() => {
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', mouseUp);

        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseup', mouseUp);
        };
    }, []);

    return <div className={styles.controlBar} onMouseDown={() => (click.current = true)}></div>;
};

export default ControlBar;
