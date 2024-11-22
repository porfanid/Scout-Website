import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function GameComponent() {
    useEffect(() => {
        const scripts = [
            '/doom/shaders/program1.js',
            '/doom/jsfxr.js',
            '/doom/audio.js',
            '/doom/utils.js',
            '/doom/objects.js',
            '/doom/graphics.js',
            '/doom/game.js',
            '/doom/map.js',
            '/doom/webgl.js',
        ];

        const loadScriptsSequentially = async (scriptArray) => {
            for (const src of scriptArray) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = src;
                    script.async = false;

                    script.onload = () => resolve();
                    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

                    document.body.appendChild(script);
                });
            }
        };

        loadScriptsSequentially(scripts).catch(error => console.error(error));

        return () => {
            console.log("GameComponent unmounted");
            scripts.forEach((src) => {
                const script = document.querySelector(`script[src="${src}"]`);
                if (script) {
                    document.body.removeChild(script);
                }
            });
        };
    }, []);

    const navigate = useNavigate();

    return (
        <div style={{
            position: 'relative',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textAlign: 'center',
            overflow: 'hidden',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <canvas id="cQ" style={{ height: '100%', width: '80%' }}></canvas>
            <div id="qQ" style={{
                position: 'absolute',
                left: '35%',
                top: '4em',
                fontSize: '2em',
                fontVariant: 'small-caps',
                color: '#aaa',
                animation: 'z 9s'
            }}>
                <div id="hE">
                    Yet Another Doom Clone<br /><br />
                    <div className="b">Loading... <span id="jQ"></span></div>
                    <br /><br />
                    Move: WASD<br />Aim/Shoot: Mouse/Click<br /><br /><br /><br />
                    By Nicholas Carlini
                </div>
                <div id="hQ" style={{
                    top: '0px',
                    width: '10vw',
                    height: '2vh',
                    border: '3px solid #008',
                    borderRadius: '3px',
                    display: 'none'
                }}>
                    <div id="hW" style={{ height: '2vh', background: '#00a', display: 'none' }}></div>
                </div>
            </div>

            <button
                onClick={() => navigate('/',{ replace: true })}
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#001489',
                    color: '#FFC72C',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Go to Home
            </button>

            <style>{`
                @keyframes q {
                    50% { opacity: 0; }
                }
                .b {
                    animation: q 1s linear infinite;
                }
                @keyframes z {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                #fps ~ div {
                    display: none;
                }
            `}</style>
        </div>
    );
}
