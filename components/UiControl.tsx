'use client';
import { useSearchParams } from 'next/navigation';
import styles from './UiControl.module.css';

import React, { useEffect, useState } from 'react';

import Editors from './Editors';
import { extractCSSRules } from '@/utils/extractCssRules';

const UiControl = ({ selectTag }: { selectTag: HTMLElement | null }) => {
    const [extractCss, setExtractCss] = useState<string>('');

    const searchParams = useSearchParams();
    const css = searchParams.get('css');

    useEffect(() => {
        if (!selectTag) {
            return;
        }
        const tagName = selectTag.tagName;
        const classList = Array.from(selectTag.classList);
        const id = selectTag.id;
        const findProperty = () => {
            const result = extractCSSRules(css as string, [
                tagName.toLowerCase(),
                ...classList.map((item) => `.${item}`),
                `#${id}`,
            ]);
            setExtractCss(result);
        };
        findProperty();
    }, [selectTag, css]);

    return (
        <aside className={styles.controller}>
            {/** 랜더링 요소 미리보기 느낌 */}
            <div></div>
            {/** 스타일 컨트롤 부 */}
            <div>{selectTag && <Editors content={extractCss} highlight="css" />}</div>
        </aside>
    );
};

export default UiControl;
