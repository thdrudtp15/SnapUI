import { Anton } from 'next/font/google';

import styles from './Header.module.css';

const anton = Anton({ weight: '400' });

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={`${styles.logo} ${anton.className}`}>SNAP UI</div>
        </header>
    );
};

export default Header;
