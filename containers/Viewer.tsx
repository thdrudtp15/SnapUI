'use client';
import { useState } from 'react';

import Render from '@/components/Render';
import { LuMousePointerClick } from 'react-icons/lu';

import styles from './Viewer.module.css';
import { useSearchParams } from 'next/navigation';
import BgColorPicker from '@/components/BgColorPicker';
import ActionPanel from '@/components/ActionPanel';

const Viewer = ({ html, css }: { html: string; css: string }) => {
    const searchParams = useSearchParams();
    const bg = searchParams.get('bg');

    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className={styles.viewer_container}>
            <ActionPanel>
                <button
                    className={`${styles.nav_item} ${isEdit ? styles['edit_on'] : null}`}
                    onClick={() => setIsEdit((prev: boolean) => !prev)}
                >
                    <LuMousePointerClick fontSize={24} />
                    Highlight Styles
                    {/* <span
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <FaRegQuestionCircle fontSize={12} />
                    </span> */}
                </button>
                <BgColorPicker />
            </ActionPanel>
            <Render html={html} css={css} bg={bg as string} mode={isEdit} />
        </div>
    );
};

export default Viewer;

// 스타일 태그 내의 css가 모든 태그에 영향을 미치는 문제 수정
//
