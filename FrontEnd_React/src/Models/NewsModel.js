import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function NewsModel({ showModel, handleCloseModel, data }) {
    const [show, setShow] = useState(showModel);
    const [modalData, setModalData] = useState({});
    const handleClose = () => {
        setShow(false);
        handleCloseModel(false);
        setModalData({});
    }

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


    useEffect(() => {
        setShow(showModel);
        setModalData(data);
    }, [showModel]);

    function checkSummary(summary, maxLength) {
        const words = summary.split(" ");
        const truncatedSummary = words.slice(0, maxLength).join(" ");
        if (words.length > maxLength) {
            return `${truncatedSummary} ...`;
        }
        return truncatedSummary;
    }
    return (
        <>
            <Modal
                show={show}
                keyboard={false}
            >
                <Modal.Header >
                    <div className='d-flex flex-row col-12 align-items-center'>
                        <div className='col-11'>
                            <div className='fs-1 '>{modalData.source}</div>
                            <div className='fs-7' style={{ color: 'gray' }}>{ft(modalData.datetime*1000)}</div>
                        </div>


                        <div className='col-1 '>
                            <img className='' height={'20px'} src="/x.svg" onClick={handleClose} alt="Close" style={{ borderBottom: '1px solid blue' }} />
                        </div>
                    </div>

                </Modal.Header>
                <Modal.Body>

                    <div className='fs-4 mb-1'>
                        {modalData.headline}
                    </div>
                    <div>
                        
                    {modalData.summary && checkSummary(modalData.summary, 20)}
                    </div>
                    <div style={{ color: 'gray' }} className='mb-5'>
                        For more details click <a href={modalData.url} target='_blank'>here.</a>
                    </div>
                    <div style={{ border: '1px solid gray', display: 'flex', alignItems: 'center', flexDirection: 'column', borderRadius: '10px' }} className='p-3 mt-2'>
                        <span style={{ marginRight: 'auto', paddingBottom: '10px', fontSize: '15px', color: 'gray' }}>Share</span>

                        <div style={{ display: 'flex', marginRight: 'auto', paddingRight: '10px' }}>
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(modalData.headline)}&url=${encodeURIComponent(modalData.url)}`}
                                target="_blank"
                                style={{ paddingRight: '10px' }}
                            >
                                <img src='/x-twitter.svg' alt="Twitter" style={{ height: '50px', width: '50px' }}></img>
                            </a>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(modalData.url)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >

                                <img src='/fb.svg' alt="Facebook" style={{ height: '50px', width: '50px', }}></img>
                            </a>

                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default NewsModel;
