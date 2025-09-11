'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './BgColorPicker.module.css';
import { HexColorPicker } from 'react-colorful';
import { useRouter, useSearchParams } from 'next/navigation';
import useOnClickOutside from '@/hooks/useClickOutside';

const BgColorPicker = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const ref = useRef(null);

    const [isEnable, setIsEnable] = useState(false);
    const [bgHex, setBgHex] = useState(searchParams.get('bg') || '#ffffff');

    useOnClickOutside({ ref: ref, onClickOutside: () => setIsEnable(false) });

    useEffect(() => {
        if (!isEnable) return;

        const STO = setTimeout(() => {
            const params = new URLSearchParams(window.location.search);
            params.set('bg', bgHex);
            router.replace(`/?${params.toString()}`);
        }, 500);

        return () => clearTimeout(STO);
    }, [bgHex]);

    return (
        <div className={styles.container} ref={ref}>
            <div className={styles.toggle_wrap}>
                <button
                    type="button"
                    className={styles.toggle}
                    onClick={() => setIsEnable((prev: boolean) => !prev)}
                >
                    <div className={styles.color} style={{ backgroundColor: bgHex }} />
                </button>
                <span className={styles.hex_text}>{bgHex}</span>
            </div>
            {isEnable && (
                <HexColorPicker
                    className={styles.picker}
                    color={bgHex}
                    onChange={(e) => setBgHex(e)}
                />
            )}
        </div>
    );
};

export default BgColorPicker;
