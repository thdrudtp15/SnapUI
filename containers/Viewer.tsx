'use client';
import { useEffect, useRef, useState } from 'react';

import Render from '@/components/Render';

import styles from './Viewer.module.css';

const Viewer = ({ html, css }: { html: string; css: string }) => {
    const [mode, setMode] = useState<'developer' | 'designer' | 'production'>('developer');

    return (
        <div className={styles.viewer_container}>
            <button onClick={() => setMode('designer')}>디자이너 모드</button>
            <button onClick={() => setMode('production')}>프로덕션 모드</button>
            <Render html={html} css={css} mode={mode} />
        </div>
    );
};

export default Viewer;

// 스타일 태그 내의 css가 모든 태그에 영향을 미치는 문제 수정
//
