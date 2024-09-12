'use client'
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './globals.css'; // Import the CSS file

export default function PopupGfg() {
    return (
        <div>
            <h4>Next.js Popup - GeeksforGeeks</h4>
            <Popup trigger={<button className="trigger-button">Click to open popup</button>} position="right center" modal nested>
                {(close: React.MouseEventHandler<HTMLButtonElement> | undefined) => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                        <div className="header"> GeeksforGeeks </div>
                        <div className="content">
                            This is a simple popup example.
                        </div>
                        <div className="actions">
                            <button className="button" onClick={() => {
                                console.log('Button clicked');
                                close();
                            }}>Click here</button>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    );
}
