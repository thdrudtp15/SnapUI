'use client';

import { useEffect, useState } from 'react';
import Editor from './Editor';
import styles from './Html.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

const Html = ({ html }: { html: string }) => {
    const searchParams = useSearchParams();

    const [queryHtml, setQueryHtml] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        console.log(queryHtml.trim() === '' || !queryHtml, queryHtml.trim());

        if (queryHtml.trim() === '' || !queryHtml) return;
        router.push(`/?html=${queryHtml}`);
    }, [queryHtml]);

    return (
        <div className={styles.html}>
            <Editor setter={setQueryHtml} content={html} />
        </div>
    );
};

export default Html;
