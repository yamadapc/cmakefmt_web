'use client';

import {useEffect, useMemo, useState} from "react";

export default function Editor() {
    const [cmakefmt, setCmakeFmt] = useState(null);
    useEffect(() => {
        import('cmakefmt_web')
            .then((cmakefmt) => {
                setCmakeFmt(cmakefmt)
            });
    }, [])

    const [value, setValue ] = useState('');
    const onChange = (e) => {
        setValue(e.target.value);
    }
    const formattedValue = useMemo(() => {
        try {
            if (!cmakefmt) return '';
            const doc = cmakefmt.parse_doc(value);
            return cmakefmt.format_doc(doc);
        } catch (err) {
            return '';
        }
    }, [value, cmakefmt])

    return (
        <main>
            <section>
                <textarea value={value} onChange={onChange} />
            </section>
            <section>
                <pre>
                    <code>
                        {formattedValue}
                    </code>
                </pre>
            </section>

            <style jsx>{`
                main {
                    display: grid;
                    grid-template: 1fr / 1fr 1fr;
                    gap: 10px;
                }
                
                textarea {
                    width:100%;
                    height: 100%;
                    resize: none;
                    margin: 0;
                    padding: 0;
                }
                
                pre {
                    margin: 0;
                    padding: 0;
                }
            `}</style>
        </main>
    );
}
