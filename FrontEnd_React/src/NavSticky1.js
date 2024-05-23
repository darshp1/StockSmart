import React, { useEffect, useRef, useState } from 'react';

const NavSticky1 = ({ selectedNews, setSelectedNews }) => {
    const ft = (t) => {
        const date = new Date(t); // Convert seconds to milliseconds

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const year = date.getFullYear();
        const month = monthNames[date.getMonth()]; // Month is zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${month} ${day}, ${year} `;
    };
    const containerRef = useRef(null);
    const [focusContainer, setFocusContainer] = useState(false);

    useEffect(() => {
        if (selectedNews) {
            setFocusContainer(true);
        }
    }, [selectedNews]);

    useEffect(() => {
        if (focusContainer && containerRef.current) {
            containerRef.current.focus();
            setFocusContainer(false);
        }
    }, [focusContainer]);

    return (
        selectedNews ? (
            <div className="selected-news-container" style={{ zIndex: 2000, position: 'fixed', top: '23%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', borderRadius: '10px', maxHeight: '42vh', width: '30vw', overflow: 'hidden', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' , paddingBottom: '2vw'}}>
                <div style={{ display: 'flex', textAlign: 'left', borderBottom: '1px solid #ccc', alignItems: 'center', padding: '0vw 1vw 0vw 1vw' }}>
                    <div style={{ marginTop: '1vw' }}>
                        <strong>
                            <span style={{ fontSize: '2vw' }}>{selectedNews.source}</span>
                            <div style={{ fontSize: '0.8vw', color: 'gray' }}>{ft(selectedNews.datetime * 1000)}</div>
                        </strong>
                    </div>
                    <img src="/x.svg" style={{ height: '1.2vw', width: '1.2vw', borderBottom: '1px solid blue', cursor: 'pointer', alignItems: 'center', marginLeft: 'auto', marginTop: '1vw' }} onClick={() => setSelectedNews(null)} alt="Close"></img>
                </div>
                <div className="selected-news" style={{ padding: '0 1vw 0 1vw', textAlign: 'left' }}>
                    <div style={{ fontSize: '1.2vw', paddingTop: '1vw' }}><strong>{selectedNews.headline}</strong> </div>
                    <div style={{ maxHeight: `6.5vh`, overflow: 'auto', fontSize: '0.8vw' }}>{selectedNews.summary}</div>
                    <p style={{ fontSize: '0.8vw', color: 'gray' }}>For more details click <a href={selectedNews.url} target='_blank'>here</a></p>
                    <div style={{ border: '1px solid gray', padding: '1vw', display: 'flex', alignItems: 'center', flexDirection: 'column', borderRadius: '10px' }}>
                        <span style={{ marginRight: 'auto', paddingBottom: '1vw', fontSize: '0.9vw', color: 'gray' }}>Share</span>

                        <div style={{ display: 'flex', marginRight: 'auto', paddingRight: '2vw' }}>
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedNews.headline)}&url=${encodeURIComponent(selectedNews.url)}`}
                                target="_blank"
                                style={{paddingRight:'0.5vw'}}
                            >
                                <img src='/x-twitter.svg' alt="Twitter" style={{ height: '2vw', width: '2vw' }}></img>
                            </a>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(selectedNews.url)}`}
                                target="_blank"
                                rel="noopener noreferrer"  
                            >
                                
                                <img src='/fb.svg' alt="Facebook" style={{ height: '2vw', width: '2vw', }}></img>
                            </a>
                            
                        </div>
                    </div>
                </div>
            </div>
        ) : null
    );
};

export default NavSticky1;