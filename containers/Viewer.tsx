import styles from './Viewer.module.css';

const Viewer = async ({ html, css }: { html: string; css: string }) => {
    console.log(css);

    return (
        <div
            className={styles.viewer}
            dangerouslySetInnerHTML={{
                __html:
                    (html || '') +
                    `<style>
                       ${css || ''}
                    </style>`,
            }}
        ></div>
    );
};

export default Viewer;
