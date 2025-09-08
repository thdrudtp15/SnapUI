import { RefObject, useEffect, useRef, useState } from 'react';
import styles from './Render.module.css';
import UiControl from './UiControl';
import { scopeCSS } from '@/utils/scopeCss';

const Render = ({
    html,
    css,
    mode,
}: {
    html: string;
    css: string;
    mode: 'developer' | 'designer' | 'production';
}) => {
    const [selectTag, setSelectTag] = useState<HTMLElement | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    console.log(scopeCSS(css, 'preview'));

    const onClickEvent = (e: MouseEvent) => {
        setSelectTag(e.target as HTMLElement);
    };

    useEffect(() => {
        if (iframeRef.current) {
            const doc = iframeRef.current?.contentDocument;
            if (doc) {
                doc.open();
                doc.write(`
              <!DOCTYPE html>
              <html lang="ko">
              <head>
                <meta charset="UTF-8" />
                <style>
                ${css || ''}
                 body { margin: 0; height : 100%;}  
                </style>
              </head>
              <body>
                ${html || ''}
              </body>
              </html>
            `);
                doc.close();
            }
        }
    }, [html, css]);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const attachListeners = () => {
            const doc = iframe.contentDocument;
            if (!doc) return;

            if (mode === 'designer') {
                doc.addEventListener('click', onClickEvent);
            }

            return () => {
                doc.removeEventListener('click', onClickEvent);
            };
        };

        // iframe이 이미 로드됐으면 바로 실행
        if (iframe.contentDocument?.readyState === 'complete') {
            return attachListeners();
        }

        // 아니면 load 이벤트 대기
        const onLoad = () => attachListeners();
        iframe.addEventListener('load', onLoad);

        return () => {
            iframe.removeEventListener('load', onLoad);
        };
    }, [mode, html, css]);

    return (
        <div style={{ height: 'fit-content' }}>
            <iframe
                ref={iframeRef}
                sandbox="allow-scripts allow-same-origin"
                style={{ width: '100%', border: 'none', height: '100%' }}
            />
            <UiControl selectTag={selectTag} />
        </div>
    );
};

export default Render;
