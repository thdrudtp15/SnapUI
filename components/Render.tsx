import { useEffect, useRef, useState } from 'react';
import styles from './Render.module.css';
import UiControl from './UiControl';
import { scopeCSS } from '@/utils/scopeCss';

const Render = ({ html, css, mode }: { html: string; css: string; mode: boolean }) => {
    const [selectTag, setSelectTag] = useState<HTMLElement | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);

    const onClickElement = (e: MouseEvent) => {
        if ((e.target && !ref.current?.contains(e.target as Node)) || e.target === ref.current) {
            setSelectTag(null);
            return;
        }
        setSelectTag(e.target as HTMLElement);
    };

    const highlightModeMouseover = (e: MouseEvent) => {
        const element = e.target as HTMLElement;
        element.classList.add('highlight-for-mode');
    };

    const highlightModeMouseout = (e: MouseEvent) => {
        const element = e.target as HTMLElement;
        element.classList.remove('highlight-for-mode');
    };

    useEffect(() => {
        const element = ref.current;
        if (!element || !mode) {
            setSelectTag(null);
            return;
        }

        document.addEventListener('click', onClickElement);
        element.addEventListener('mouseover', highlightModeMouseover);
        element.addEventListener('mouseout', highlightModeMouseout);

        return () => {
            document.removeEventListener('click', onClickElement);
            element.removeEventListener('mouseover', highlightModeMouseover);
            element.removeEventListener('mouseout', highlightModeMouseout);
        };
    }, [ref.current, mode]);

    return (
        <div className={styles.renderer} ref={ref}>
            <div
                id={`preview_wrap`}
                dangerouslySetInnerHTML={{
                    __html: `${html || ''} 
                    <style>
                    #preview_wrap .highlight-for-mode  {
                        position: relative; 
                    }
                        
                    #preview_wrap .highlight-for-mode::after {
                        content: '';
                        position: absolute;
                        top: 0; left: 0; right: 0; bottom: 0;
                        border: 3px dotted black;
                        pointer-events: none; 
                        box-sizing: border-box;
                    }

                    ${scopeCSS(css, '#preview_wrap') || ''}
                    </style>`,
                }}
            ></div>
            {selectTag && mode && <UiControl selectTag={selectTag} />}
        </div>
    );
};

export default Render;
