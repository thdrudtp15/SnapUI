'use client';

import { basicSetup, EditorView } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { keymap, lineNumbers } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { html } from '@codemirror/lang-html';
// import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

const Editor = ({
    setter,
    content,
}: {
    setter: Dispatch<SetStateAction<string>>;
    content: string;
}) => {
    const [editorContent, setEditorContent] = useState<string>(content);

    const editorRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);

    useEffect(() => {
        const STO = setTimeout(() => {
            setter(editorContent);
        }, 500);

        return () => {
            clearTimeout(STO);
        };
    }, [editorContent]);

    useEffect(() => {
        if (!editorRef.current) return;
        if (viewRef.current) return;
        const startState = EditorState.create({
            doc: editorContent,
            extensions: [
                basicSetup,
                html(),
                lineNumbers(),
                oneDark,
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

export default Editor;
