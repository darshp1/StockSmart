import React, { useState, useEffect } from 'react';
import { ModalBody } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PortfolioModal = ({showModel, handleCloseModel, data, purse,s}) => {
    const [show, setShow] = useState(showModel);
    const [modalData, setModalData] = useState({});
    const handleClose = () => {
        setShow(false);
        handleCloseModel(false);
        setModalData({});
        setQuantity('');

        // navigate(`/portfolio`);
    }
    const navigate = useNavigate();
  

    const [quantity, setQuantity] = useState('');

    const handleQuantityChange = (event) => {
        const value = event.target.value;
        const parsedQuantity = parseFloat(value); 
        setQuantity(parsedQuantity || '');
    }

    useEffect(() => {
        setShow(showModel);
        setModalData(data);
    }, [showModel,data,purse]);
    

    return (<>
        <Modal
            show={show}
            keyboard={false}
        >
            <Modal.Header >
                
                <div className="col-lg-10 col-9 ms-lg-0 mb-lg-3" >{modalData.ticker}</div>

                <div className='ms-auto'>
                    <img className='mb-lg-3' height={'15px'} src="/x.svg" onClick={handleClose} alt="Close" style={{ borderBottom: '1px solid blue' }} />
                </div>
                
            </Modal.Header>
            <Modal.Body className='mt-1 mb-1 fs-10'>
                Current Price: {modalData.cp}<br></br>
                Money in Wallet: ${purse.toFixed(2)}<br></br>
                <div className="row align-items-center">
                    <div className="col-2">
                        Quantity:
                    </div>
                    <div className="col-10">
                        <Form.Control
                            type="Number"
                            placeholder="0"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min={0}
                            autoFocus
                        />
                    </div>
                </div>
                {quantity * modalData.cp > purse ? (
                    <div className='mt-1'style={{ fontSize: '14px', color: 'red' }}>Not enough money in wallet!</div>
                ) : (
                    <div></div>
                )}

            </Modal.Body>
            <Modal.Footer>

                    <div className={`d-flex flex-row col-12 ${quantity * modalData.cp > purse ? "opacity-50":""}`}>
                    <div className="col-lg-10 col-9 ms-lg-0 " >Total : {(quantity* modalData.cp).toFixed(2)}</div>
                    <div></div>
                    
                    <Button variant="success"   className={`col-2 ${quantity * modalData.cp > purse ? "disabled":""}` } >Buy</Button>
                    </div>
                    
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default PortfolioModal;