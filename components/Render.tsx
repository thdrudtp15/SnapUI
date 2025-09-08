import { useEffect, useRef, useState } from 'react';
import styles from './Render.module.css';
import UiControl from './UiControl';
import { scopeCSS } from '@/utils/scopeCss';

const Render = ({ html, css, mode }: { html: string; css: string; mode: boolean }) => {
    const [selectTag, setSelectTag] = useState<HTMLElement | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element || !mode) {
            setSelectTag(null);
            return;
        }
        const onClickElement = (e: MouseEvent) => {
            if (e.target === ref.current) {
                setSelectTag(null);
                return;
            }
            setSelectTag(e.target as HTMLElement);
        };
        element.addEventListener('click', onClickElement);
        return () => {
            element.removeEventListener('click', onClickElement);
        };
    }, [ref.current, mode]);

    return (
        <div className={styles.renderer} ref={ref}>
            <div
                id="preview_wrap"
                dangerouslySetInnerHTML={{
                    __html: `${html || ''} <style>${scopeCSS(css, '#preview_wrap') || ''}</style>`,
                }}
            ></div>
            {selectTag && mode && <UiControl selectTag={selectTag} />}
        </div>
    );
};

export default Render;
