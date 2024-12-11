'use client';

import styles from "@/app/page.module.css";
import { LoadPuzzle } from '@/app/lib/data';

export default function Page() {
    const puzzle = LoadPuzzle('current');
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>NYTXNG - puzzle page</h1>
                <h2 id="puzTitle"></h2>
                <p id="puzAuthor"></p>
                <div id="puzNotepad"></div>
                <table id="puzTable"></table>
                <div id="puzCopy" className="copy"></div>
                <div className="clue"><div className="cluehead">Across</div><div id="across"></div></div>
                <div className="clue"><div className="cluehead">Down</div><div id="down"></div></div>
            </main>
        </div>
    );
}
