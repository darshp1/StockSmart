
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import './css/portfolio.css';
import PortfolioModal from "./Models/PortfolioModal";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import PortFolioSellModal from "./Models/PortFolioSellModal";

const PortFolio = () => {

    const [loading, setLoading] = useState(true);
    const [portfolioData, setPortfolioData] = useState([]);
    const [walletData, setWalletData] = useState([]);
    const [ansArray, setAnsArray] = useState([]);
    const [apiCallsCompleted, setApiCallsCompleted] = useState(false);

    const [sold, setSold] = useState(false);
    const [buyB, setBuyB] = useState(false);

    const [getOurModel, setGetOurModel] = useState(false);

    const [getsellModel, setGetSellModel] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [modalData, setModalData] = useState({});

    const [changedState, setChangedState] = useState(0);

    const [changedState2, setChangedState2] = useState(false);
    const [compT, setcompT] = useState(null);
    const [checkagain, setCheckagain] = useState(0);


    const updateportf = async ({ qu, wc }) => {


        const dataToSend = {
            ticker: modalData.ticker,
            name: modalData.name,
            c: modalData.cp,
            q: qu,
            p: wc

        };

        // console.log(dataToSend);
        await axios.post('https://web3-571-ass3-darsh.uc.r.appspot.com/insert/portfolio', dataToSend)

            .then(response => {
                // console.log(response.data);
                setcompT(modalData.ticker);
                setGetOurModel(false);
                setModalData({});
                setQuantity('');
                setSold(true);

                // setTimeout(() => {
                //     window.location.reload();
                // }, 1000);

            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
        setCheckagain(Math.floor(Math.random() * 500000));
        setChangedState(Math.floor(Math.random() * 500000));
    };


    const updateportf2 = async ({ qu, wc }) => {
        // console.log(qu);

        const dataToSend = {
            ticker: modalData.ticker,
            name: modalData.name,
            c: (-1) * modalData.cp,
            q: (-1) * qu,
            p: (-1) * wc

        };


        console.log((-1) * qu, (-1) * wc);
        let l = JSON.parse(localStorage.getItem('chartData'));
        const portfolioQ = portfolioData.map(item => [item.company_t, item.Quantity]);
        const index = portfolioQ.findIndex(item => item[0] === l.ticker);
        await axios.post('https://web3-571-ass3-darsh.uc.r.appspot.com/insert/portfolio', dataToSend)

            .then(response => {
                // console.log(response.data);
                setcompT(modalData.ticker);
                setGetSellModel(false);
                setModalData({});
                setQuantity('');
                setBuyB(true);
                if (l.ticker == modalData.ticker) {
                    // console.log('hey',qu, portfolioQ[index][1]);
                    if (portfolioQ[index][1] - qu == 0) {
                        // console.log('make it false');
                        window.localStorage.setItem("isSell", JSON.stringify(false));
                    }
                }

                // setTimeout(() => {
                //     window.location.reload();
                // }, 1000);


            })
            .catch(error => {
                console.error('Error sending data:', error);
            });

        setChangedState(Math.floor(Math.random() * 500000));
        // console.log("it isn't changing", changedState);
        // setChangedState(prevState => !prevState);
        // console.log('is it', changedState);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://web3-571-ass3-darsh.uc.r.appspot.com/gd/portfolio');
                const response2 = await fetch('https://web3-571-ass3-darsh.uc.r.appspot.com/gd/uwallet');
                const data = await response.json();
                setPortfolioData(data);
                const data2 = await response2.json()
                setWalletData(data2);
                // console.log("coming here");
            } catch (error) {
                console.error('Error fetching portfolio data:', error);
            }
            setCheckagain(Math.floor(Math.random() * 500000));
            setChangedState2(prevState => !prevState);
        };

        fetchData();
    }, [changedState]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2200);

        return () => clearTimeout(timer);
    }, []);



    useEffect(() => {
        if (portfolioData && portfolioData.length > 0 && apiCallsCompleted) {
            const portfolioTickers = portfolioData.map(item => item.company_t);
            const portfolioCompanyNames = portfolioData.map(item => item.company_n);
            const portfolioOldc = portfolioData.map(item => item.old_c);
            const portfolioQ = portfolioData.map(item => item.Quantity);
            getLiveStocks(portfolioTickers, portfolioCompanyNames, portfolioOldc, portfolioQ);
        }
        // console.log("here2222");
        setCheckagain(Math.floor(Math.random() * 500000));
    }, [portfolioData, apiCallsCompleted, changedState]);

    // useEffect(() => {
    //     if (portfolioData && portfolioData.length > 0) {
    //         const portfolioTickers = portfolioData.map(item => item.company_t);
    //         const portfolioCompanyNames = portfolioData.map(item => item.company_n);
    //         const portfolioOldc = portfolioData.map(item => item.old_c);
    //         const portfolioQ = portfolioData.map(item => item.Quantity);
    //         getLiveStocks(portfolioTickers, portfolioCompanyNames, portfolioOldc, portfolioQ);
    //     }
    //      else{

    //         getLiveStocks2();
    //     }
    //     // console.log("here2222");

    // }, [changedState,checkagain]);

    useEffect(() => {
        if (portfolioData && portfolioData.length > 0) {
            const portfolioTickers = portfolioData.map(item => item.company_t);
            const portfolioCompanyNames = portfolioData.map(item => item.company_n);
            const portfolioOldc = portfolioData.map(item => item.old_c);
            const portfolioQ = portfolioData.map(item => item.Quantity);
            getLiveStocks(portfolioTickers, portfolioCompanyNames, portfolioOldc, portfolioQ);
        }
        else {

            getLiveStocks2();
        }
        // console.log("here2222");

    }, [changedState2]);


    const getLiveStocks2 = async () => {
        try {

            setAnsArray([]);

        } catch (error) {
            console.error('Error fetching live stocks data:', error);

        }


    };

    const getLiveStocks = async (companyTickers, companyNames, portfolioOldc, portfolioQ) => {
        try {
            const promises = companyTickers.map(async (ticker, index) => {
                const response = await fetch(`https://web3-571-ass3-darsh.uc.r.appspot.com/get_price_stock/${ticker}`);
                const data = await response.json();
                return { data: data.finnhubData, ticker: ticker, companyName: companyNames[index], portfolioOldc: portfolioOldc[index], portfolioQ: portfolioQ[index] };
            });
            // console.log("ALSO HERE");

            const dataArray = await Promise.all(promises);


            const makeans = dataArray.map(item => ({
                cp: item.data.c,
                // d: item.data.d,
                dp: item.data.c - item.portfolioOldc,
                ticker: item.ticker,
                name: item.companyName,
                op: item.portfolioOldc,
                Q: item.portfolioQ
            }));
            // console.log('hey', makeans);
            setAnsArray(makeans);
            setApiCallsCompleted(true);
            setLoading(false);
            // console.log("hey",makeans);

        } catch (error) {
            console.error('Error fetching live stocks data:', error);

        }
        // console.log('also');


    };


    const openModal = ({ data }) => {
        setGetSellModel(false);
        setGetOurModel(true);
        setShowModel(true);
        setModalData(data);
    };

    const openSellModal = ({ data }) => {
        setGetOurModel(false);
        setGetSellModel(true);
        setShowModel(true);
        setModalData(data);
    };

    const handleCloseModel = () => {
        setGetOurModel(false);
        setModalData({});
        setQuantity('');
        // setModalData({});
    };

    const handleCloseModel2 = () => {
        setGetSellModel(false);
        // setModalData({});
        setModalData({});
        setQuantity('');
    };


    const [quantity, setQuantity] = useState('');

    const handleQuantityChange = (event) => {
        const value = event.target.value;
        const parsedQuantity = parseFloat(value);
        setQuantity(parsedQuantity || '');
    }


    return (
        <div style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {loading ? (
                <div style={{ padding: 50 }}>
                    <ClipLoader color={'rgb(3, 3, 169)'} loading={loading} size={45} />
                </div>
            ) : (

                <>

                    {false ? (
                        <div>
                            <div style={{ textAlign: 'left' }} className='ps-4 pt-4 fs-1 mt-2'> My Portfolio</div>
                            <div style={{ textAlign: 'left' }} className='ps-4 fs-3 '> Money in Wallet: {walletData[0].w && walletData[0].w.toFixed(2)}</div>

                            <div className='m-3' style={{ backgroundColor: 'rgb(251,243,203)', border: '2px solid rgb(231,223,203)', height: '5vh', width: '80vw', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px' }}>
                                Currently you don't have any stock
                            </div>
                        </div>
                    ) : (
                        <>
                            {buyB ? (
                                <div className='col-lg-8 col-11 d-flex justify-content-between align-items-center pt-2 pb-2 mb-3 ms-lg-5 mt-3' style={{ backgroundColor: '#f5d7d8', border: '2px solid #c1969c', borderRadius: '10px' }}>
                                    <div className="text-center flex-grow-1 fs-9">{compT} sold successfully</div>

                                    <button className="pe-3 Bootstrap_search" type="button" onClick={() => setBuyB(false)} >
                                        &#10006;
                                    </button>
                                </div>
                            ) : (
                                <div>
                                </div>
                            )}

                            {sold ? (
                                <div className='col-lg-8 col-11 d-flex justify-content-between align-items-center pt-2 pb-2 mb-3 ms-lg-5 mt-3' style={{ backgroundColor: 'rgba(215,234,226,255)', border: '2px solid rgba(89, 141, 121, 0.3)', borderRadius: '10px' }}>
                                    <div className="text-center flex-grow-1 fs-9">{compT} bought successfully</div>

                                    <button className="pe-3 Bootstrap_search" type="button" onClick={() => setSold(false)} >
                                        &#10006;
                                    </button>
                                </div>
                            ) : (
                                <div>
                                </div>
                            )}
                            {/* Your portfolio display */}
                            <div className="col-lg-8 col-11">

                                <div style={{ textAlign: 'left' }} className='ps-4 pt-4 fs-1 mt-2'> My Portfolio</div>
                                <div style={{ textAlign: 'left' }} className='ps-4 fs-3 '> Money in Wallet: {walletData[0].w && walletData[0].w.toFixed(2)}</div>

                                <div>


                                    {ansArray.length > 0 ? (
                                        ansArray.map((item, index) => (
                                            <div >
                                                <div key={index} className="border border-gray border-2 rounded ms-lg-4 ms-0 justify-content-center align-items-center mt-3 " >
                                                    <div className="border-bottom border-gray  border-2 " style={{ display: 'flex', backgroundColor: '#f4f4f4' }}>
                                                        <div style={{ fontWeight: '600' }} className='fs-2 ms-3 mt-1 d-flex align-self-end pb-1'> {item.ticker}</div>
                                                        <div className='fs-4 ms-3 mt-1 d-flex align-self-end pb-1' style={{ fontWeight: '500', color: 'gray' }} > {item.name}</div>
                                                    </div>
                                                    <div className="d-flex flex-lg-row flex-column fs-4" style={{ fontWeight: '500' }}>
                                                        <div className="col-lg-6 col-12  d-flex flex-column mt-lg-3 mb-lg-3">
                                                            <div className="d-flex flex-row col-12 ">
                                                                <div className="col-lg-8 col-8 d-flex ps-3"  >Quantity:</div>
                                                                <div className="col-lg-8 col-4 d-flex ">{(item.Q).toFixed(2)}</div>
                                                            </div>
                                                            <div className="d-flex flex-row col-12">
                                                                <div className="col-lg-8 col-8 d-flex ps-3"  >Avg Cost/Share:</div>
                                                                <div className="col-lg-8 col-4 d-flex ">{(item.op).toFixed(2)}</div>
                                                            </div>
                                                            <div className="d-flex flex-row col-12">
                                                                <div className="col-lg-8 col-8 d-flex ps-3"  >Total Cost/Share:</div>
                                                                <div className="col-lg-8 col-4 d-flex ">{(item.Q * item.op).toFixed(2)}</div>
                                                            </div>
                                                        </div>


                                                        <div className="col-lg-6 col-12  d-flex flex-column mt-lg-3 mb-lg-3">
                                                            <div className="d-flex flex-row col-12 ">
                                                                <div className="col-lg-8 col-8 d-flex ps-3"  >Change:</div>

                                                                <div className="col-lg-8 col-4 d-flex " style={{ color: item.dp > 0 ? 'green' : (item.dp === 0 ? 'black' : 'red') }}> {item.dp > 0 ? (
                                                                    <i className="bi bi-caret-up-fill" style={{ color: 'green' }}></i>
                                                                ) : item.dp < 0 ? (
                                                                    <i className="bi bi-caret-down-fill" style={{ color: 'red' }}></i>
                                                                ) : null}
                                                                    {(item.dp).toFixed(2)}</div>
                                                            </div>
                                                            <div className="d-flex flex-row col-12">
                                                                <div className="col-lg-8 col-8 d-flex ps-3"  >Curnnet Price:</div>
                                                                <div className="col-lg-8 col-4 d-flex " style={{ color: item.dp > 0 ? 'green' : (item.dp === 0 ? 'black' : 'red') }}>

                                                                    {(item.cp).toFixed(2)}</div>
                                                            </div>
                                                            <div className="d-flex flex-row col-12">
                                                                <div className="col-lg-8 col-8 d-flex ps-3">Market Value:</div>
                                                                <div className="col-lg-8 col-4 d-flex " style={{ color: item.dp > 0 ? 'green' : (item.dp === 0 ? 'black' : 'red') }}>
                                                                    {(item.Q * item.cp).toFixed(2)}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="border-top border-gray  border-2 " style={{ display: 'flex', backgroundColor: '#f4f4f4' }}>
                                                        <div className='fs-2 ms-3 mt-1 d-flex align-self-end pb-1'>

                                                            <button className='btn btn-primary me-lg-2 me-1 fs-6 ms-lg-2 ms-1' style={{ fontWeight: '600' }} onClick={() => { openModal({ data: item }) }}>Buy</button>
                                                            <button className='btn btn-danger ms-lg-2 ms-1 fs-6 me-lg-0 me-2' style={{ fontWeight: '600' }} onClick={() => { openSellModal({ data: item }) }}>Sell</button>

                                                        </div>

                                                        <Modal show={getOurModel} keyboard={false}>
                                                            <Modal.Header >

                                                                <div className="col-lg-10 col-9 ms-lg-0 mb-lg-3" >{modalData.ticker}</div>

                                                                <div className='ms-auto'>
                                                                    <img className='mb-lg-3' height={'15px'} src="/x.svg" onClick={handleCloseModel} alt="Close" style={{ borderBottom: '1px solid blue' }} />
                                                                </div>

                                                            </Modal.Header>
                                                            <Modal.Body className='mt-1 mb-1 fs-10'>
                                                                Current Price: {modalData.cp}<br></br>
                                                                Money in Wallet: ${walletData[0].w && walletData[0].w.toFixed(2)}<br></br>
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
                                                                {quantity * modalData.cp > walletData[0].w ? (
                                                                    <div className='mt-1' style={{ fontSize: '14px', color: 'red' }}>Not enough money in wallet!</div>
                                                                ) : (
                                                                    <div></div>
                                                                )}

                                                            </Modal.Body>
                                                            <Modal.Footer>

                                                                <div className={`d-flex flex-row col-12 ${quantity * modalData.cp > walletData[0].w ? "opacity-50" : ""}`}>
                                                                    <div className="col-lg-10 col-9 ms-lg-0 " >Total : {(quantity * modalData.cp).toFixed(2)}</div>
                                                                    <div></div>

                                                                    <Button variant="success" className={`col-2 ${quantity * modalData.cp > walletData[0].w ? "disabled" : ""} ${quantity === '' ? "disabled" : ""}`}

                                                                        onClick={() => { updateportf({ qu: quantity, wc: quantity * modalData.cp }) }}
                                                                    >Buy</Button>
                                                                </div>
                                                            </Modal.Footer>

                                                        </Modal>


                                                        {/* for sale */}

                                                        <Modal show={getsellModel} keyboard={false}>
                                                            <Modal.Header >

                                                                <div className="col-lg-10 col-9 ms-lg-0 mb-lg-3" >{modalData.ticker}</div>

                                                                <div className='ms-auto'>
                                                                    <img className='mb-lg-3' height={'15px'} src="/x.svg" onClick={handleCloseModel2} alt="Close" style={{ borderBottom: '1px solid blue' }} />
                                                                </div>

                                                            </Modal.Header>
                                                            <Modal.Body className='mt-1 mb-1 fs-10'>
                                                                Current Price: {modalData.cp}<br></br>
                                                                Money in Wallet: ${walletData[0].w && walletData[0].w.toFixed(2)}<br></br>
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
                                                                {quantity > modalData.Q ? (
                                                                    <div className='mt-1' style={{ fontSize: '14px', color: 'red' }}>You cannot sell the stocks that you don't have!</div>
                                                                ) : (
                                                                    <div></div>
                                                                )}

                                                            </Modal.Body>
                                                            <Modal.Footer>

                                                                <div className={`d-flex flex-row col-12 ${quantity > modalData.Q ? "opacity-50" : ""}`}>
                                                                    <div className="col-lg-10 col-9 ms-lg-0 " >Total : {(quantity * modalData.cp).toFixed(2)}</div>
                                                                    <div></div>

                                                                    <Button variant="success" className={`col-2 ${quantity > modalData.Q ? "disabled" : ""} ${quantity === '' ? "disabled" : ""}`}

                                                                        onClick={() => { updateportf2({ qu: quantity, wc: quantity * modalData.cp }) }}
                                                                    >Sell</Button>
                                                                </div>
                                                            </Modal.Footer>
                                                        </Modal>

                                                    </div>

                                                </div>

                                            </div>
                                        ))
                                    ) : (

                                        <div className='m-3 col-lg-12 col-10 ' style={{ backgroundColor: 'rgb(251,243,203)', border: '2px solid rgb(231,223,203)', display: 'flex', height: '5vh', alignItems: 'center', justifyContent: 'center', borderRadius: '10px' }}>
                                            Currently you don't have any stock
                                        </div>

                                    )}

                                </div>
                            </div>
                        </>
                    )}
                </>
            )}

        </div>

    );

}

export default PortFolio;
