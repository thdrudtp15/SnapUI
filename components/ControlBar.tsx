'use client';

import { RefObject, useEffect, useRef } from 'react';
import styles from './ControlBar.module.css';

type Props = {
    ref: RefObject<HTMLDivElement | null>;
};

const ControlBar = ({ ref }: Props) => {
    const click = useRef<boolean>(false);

    const move = (e: MouseEvent) => {
        const { clientX } = e;

        if (!click.current || clientX < 200 || clientX > 400 || !ref.current) return;
        ref.current.style.width = `${clientX}px`;
    };

    const mouseUp = () => {
        click.current = false;
    };

    useEffect(() => {
        window.document.addEventListener('mousemove', move);
        window.document.addEventListener('mouseup', mouseUp);

        return () => {
            window.document.removeEventListener('mousemove', move);
            window.document.removeEventListener('mouseup', mouseUp);
        };
    }, []);

    return <div className={styles.controlBar} onMouseDown={() => (click.current = true)}></div>;
};

export default ControlBar;
