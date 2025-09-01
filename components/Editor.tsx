'use client';

import { basicSetup, EditorView } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { keymap, lineNumbers } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';
import { useEffect, useRef, useState } from 'react';
import { formatCss, formatHtml } from '@/utils/format';
import { useRouter } from 'next/navigation';

import styles from './Editor.module.css';
const Editor = ({ content, queryKey }: { content: string; queryKey: string }) => {
    const [editorContent, setEditorContent] = useState<string>(content);

    const editorRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);

    const highlighterExtension = queryKey === 'html' ? html() : css();

    const router = useRouter();

    useEffect(() => {
        const STO = setTimeout(() => {
            const params = new URLSearchParams(window.location.search);
            if (queryKey === 'html') {
                params.set('html', editorContent);
            } else if (queryKey === 'css') {
                params.set('css', editorContent);
            }

            router.push(`/?${params.toString()}`);
        }, 500);

        return () => {
            clearTimeout(STO);
        };
    }, [editorContent]);

    const customKeyMap = keymap.of([
        {
            key: 'Mod-s', // Ctrl+S (Win/Linux), Cmd+S (Mac)
            preventDefault: true,
            run: (view) => {
                const doc = view.state.doc.toString();
                const save = async () => {
                    const formatted =
                        queryKey === 'html' ? await formatHtml(doc) : await formatCss(doc);
                    const { selection } = view.state;

                    if (formatted) {
                        view.dispatch({
                            changes: { from: 0, to: view.state.doc.length, insert: formatted },
                            selection: { anchor: formatted.length, head: formatted.length }, // 맨 끝으로
                        });
                    }
                };
                save();
                // state 변경 후 true 리턴
                return true;
            },
        },
    ]);

    useEffect(() => {
        if (!editorRef.current) return;
        if (viewRef.current) return;
        const startState = EditorState.create({
            doc: editorContent,
            extensions: [
                basicSetup,
                highlighterExtension,
                lineNumbers(),
                oneDark,
                customKeyMap,
                keymap.of([indentWithTab]),
                EditorView.lineWrapping,
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        const text = update.state.doc.toString();
                        setEditorContent(text);
                    }
                }),
            ],
        });

        viewRef.current = new EditorView({
            state: startState,
            parent: editorRef.current,
        });

        return () => {
            viewRef.current?.destroy();
            viewRef.current = null;
        };
    }, []);

    return <div className={styles.editor} ref={editorRef}></div>;
};

export default Editor;
