'use client';
import { useSearchParams } from 'next/navigation';
import LZString from 'lz-string';
import styles from './UiControl.module.css';

import React, { useEffect, useState } from 'react';

import Editors from './Editors';
import { extractCSSRules } from '@/utils/extractCssRules';

const UiControl = ({
    selectTag,
    enable,
}: {
    selectTag: HTMLElement | null;
    enable: boolean | null;
}) => {
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
            const result = extractCSSRules(
                LZString.decompressFromEncodedURIComponent(css as string),
                [tagName.toLowerCase(), ...classList.map((item) => `.${item}`), `#${id}`],
            );
            setExtractCss(result);
        };
        findProperty();
    }, [selectTag, css]);

    return (
        <aside
            id="ui-controller"
            className={`${styles.controller} ${enable ? styles.enable : null}`}
        >
            {selectTag && <Editors content={extractCss} highlight="css" />}
        </aside>
    );
};

export default UiControl;
