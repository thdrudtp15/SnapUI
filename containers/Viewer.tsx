'use client';
import { useEffect, useRef, useState } from 'react';

import Render from '@/components/Render';

import styles from './Viewer.module.css';

const Viewer = ({ html, css }: { html: string; css: string }) => {
    const [mode, setMode] = useState<'developer' | 'designer' | 'production'>('developer');
    const viewerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const developerFn = (e: MouseEvent) => {
            console.log(e.target);
        };

        const designerFn = (e: MouseEvent) => {
            console.log(getComputedStyle(e.target as HTMLElement));
        };

        if (mode === 'developer') {
            viewerRef.current?.addEventListener('click', developerFn);
        } else if (mode === 'designer') {
            viewerRef.current?.addEventListener('click', designerFn);
        } else {
            viewerRef.current?.removeEventListener('click', developerFn);
            viewerRef.current?.removeEventListener('click', designerFn);
        }

        return () => {
            viewerRef.current?.removeEventListener('click', developerFn);
            viewerRef.current?.removeEventListener('click', designerFn);
        };
    }, [mode]);

    return (
        <div className={styles.viewer_container}>
            <button onClick={() => setMode('developer')}>개발자 모드</button>
            <button onClick={() => setMode('designer')}>디자이너 모드</button>
            <button onClick={() => setMode('production')}>프로덕션 모드</button>
            <Render ref={viewerRef} html={html} css={css} mode={mode} />
        </div>
    );
};

export default Viewer;

// 스타일 태그 내의 css가 모든 태그에 영향을 미치는 문제 수정
//
