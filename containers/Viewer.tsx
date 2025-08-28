import styles from './Viewer.module.css';

const Viewer = async ({ html, css }: { html: string; css: string }) => {
    return <div className={styles.viewer} dangerouslySetInnerHTML={{ __html: html || '' }}></div>;
};

export default Viewer;
