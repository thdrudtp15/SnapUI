import { RefObject, useEffect } from 'react';
import styles from './Render.module.css';

const Render = ({
    ref,
    html,
    css,
    mode,
}: {
    ref: RefObject<HTMLDivElement | null>;
    html: string;
    css: string;
    mode: 'developer' | 'designer' | 'production';
}) => {
    // Shadow DOM 사용하여 CSS 격리

    useEffect(() => {
        if (!ref.current) return;

        let shadow = ref.current?.shadowRoot;

        if (!shadow) {
            shadow = ref.current.attachShadow({ mode: 'open' });
        } else {
            shadow.innerHTML = '';
        }

        const style = document.createElement('style');
        style.textContent = '';
        style.textContent = `${css || ''}`;

        const elements = document.createElement('div');
        elements.innerHTML = `${html || ''}`;

        shadow.appendChild(style);
        shadow.appendChild(elements);
    }, [html, css]);

    return <div ref={ref} className={`${styles.viewer} ${styles[mode]}`}></div>;
};

export default Render;
