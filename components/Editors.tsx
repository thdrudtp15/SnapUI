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

import { uncommentCss } from '@/utils/uncommentCss';
import { useRouter } from 'next/navigation';

const Editors = ({ content, highlight }: { content: string; highlight: string }) => {
    const [editorContent, setEditorContent] = useState<string>(content);

    const router = useRouter();
    const editorRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);

    const highlighterExtension = highlight === 'html' ? html() : css();

    useEffect(() => {
        // 내용 변경 시 url 반영 (디바운스)
        const STO = setTimeout(() => {
            const params = new URLSearchParams(window.location.search);
            params.set(highlight, uncommentCss(editorContent));
            router.replace(`/?${params.toString()}`);
        }, 500);

        return () => clearTimeout(STO);
    }, [editorContent]);

    const customKeyMap = keymap.of([
        {
            key: 'Mod-s', // Ctrl+S (Win/Linux), Cmd+S (Mac)
            preventDefault: true,
            run: (view) => {
                const doc = view.state.doc.toString();
                const save = async () => {
                    const formatted =
                        highlight === 'html' ? await formatHtml(doc) : await formatCss(doc);

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
        if (viewRef.current && !viewRef.current.hasFocus) {
            const view = viewRef.current;
            // 내용 업데이트 (포커스 없을 때만)
            // 포커스가 있는 상태로 업데이트 할 경우 에디터 커서 및 자동완성 기능 버그 발생
            const transaction = view.state.update({
                changes: { from: 0, to: view.state.doc.length, insert: content },
            });
            view.update([transaction]);
        }
    }, [content]);

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

    return <div ref={editorRef}></div>;
};

export default Editors;
