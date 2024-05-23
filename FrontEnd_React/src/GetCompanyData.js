// GetCompanyData.js
import { useState, useEffect } from 'react';
//import './css/gcd.css';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import Tabs from './Tabs';
import { StarFill } from 'bootstrap-icons-react';
import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PortfolioModal from "./Models/PortfolioModal";
import PortFolioSellModal from "./Models/PortFolioSellModal";
import { Modal, Form, Button, ModalBody } from 'react-bootstrap';


const GetCompanyData = (props) => {

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: blue;
    `;


    const { selectedValue } = props;
    const [currentTimestamp, setCurrentTimestamp] = useState(JSON.parse(window.localStorage.getItem("currentTimestamp")) ||null);
    const [checkTime, setcheckTime] = useState(Date.now());
    const [currentTimestamp2, setCurrentTimestamp2] = useState( JSON.parse(window.localStorage.getItem("currentTimestamp2")) ||null);
    //console.log(selectedValue);
    const [companyData, setCompanyData] = useState( JSON.parse(window.localStorage.getItem("companyData")) ||{});
    const [stockData, setStockData] = useState( JSON.parse(window.localStorage.getItem("stockData")) || {});
    const [chartData, setChartData] = useState(JSON.parse(window.localStorage.getItem("chartData")) || {});
    const [hourchartData, setHourChartData] = useState( JSON.parse(window.localStorage.getItem("hourchartData")) || {});
    const [peersData, setPeersData] = useState(JSON.parse(window.localStorage.getItem("peersData")) || {});
    const [newsData, setNewsData] = useState(JSON.parse(window.localStorage.getItem("newsData")) || {});
    const [insiderData, setInsiderData] = useState(JSON.parse(window.localStorage.getItem("insiderData")) || {});
    const [recommendationData, setRecommendationData] = useState(JSON.parse(window.localStorage.getItem("recommendationData")) || {});
    const [earningsData, setEarningsData] = useState(JSON.parse(window.localStorage.getItem("earningsData")) || {});
    const [PortfolioData, setPortfolioData] = useState({});
    const [WatchListData, setWatchlistData] = useState(JSON.parse(window.localStorage.getItem("WatchListData")) || {});
    const [isIt, setisIt] = useState({});
    const [showUpperdiv, setshowUpperdiv] = useState(false);
    const [secondUpperdiv, setsecondUpperdiv] = useState(false);
    const [redUpperdiv, setredUpperdiv] = useState(false);
    const [redSeconddiv, setredSeconddiv] = useState(false);
    const [isCompanyTick, setisCompanyTic] = useState(false);
    const localStorageValue = JSON.parse(window.localStorage.getItem("isStar"));
    const defaultIsStarValue = localStorageValue === null || localStorageValue === undefined ? true : localStorageValue;
    const [isStar, setisStar] = useState(defaultIsStarValue);

    const [isSell, setisSell] = useState(JSON.parse(window.localStorage.getItem("isSell")) || false);


    const [loading, setLoading] = useState(true);
    const [formattedDateTime, setFormattedDateTime] = useState( JSON.parse(window.localStorage.getItem("formattedDateTime")) ||null);
    const navigate = useNavigate();


    const visibleUpperdiv =  async  () => {

        const dataToSend = {
            ticker: companyData.ticker,
            name: companyData.name,
            c: stockData.c,
            d: stockData.d,
            dp: stockData.dp

        };

        await axios.post('https://web3-571-ass3-darsh.uc.r.appspot.com/insert/watchlist', dataToSend)

            .then(response => {
                // console.log(response.data);
                setshowUpperdiv(true);

                setisStar(false);
                // Handle response here
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });

            // console.log("hey", isStar);
    };

    const removeUpperdiv = () => {
        setshowUpperdiv(false);

    };

    const visibleseconddiv = () => {
        setsecondUpperdiv(true);

    };

    const removeseconddiv = () => {
        setsecondUpperdiv(false);
    };

    const redfdiv =  () => {
        setredUpperdiv(true);
        const d = {
            ticker: companyData.ticker

        };

   axios.post('https://web3-571-ass3-darsh.uc.r.appspot.com/delete/watchlist', d)

            .then(response => {
                // console.log(response.data);
                // setshowUpperdiv(true);

                setisStar(true);
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });

            // console.log("other", isStar);
    };

    const removefreddiv = () => {
        setredUpperdiv(false);
    };

    const redsdiv = () => {
        setredSeconddiv(true);
    };

    const removesredsdiv = () => {
        setredSeconddiv(false);
    };


    // brfore useeffect from here is for portfolio buy sell


    const [walletData, setWalletData] = useState(JSON.parse(window.localStorage.getItem("walletData")) || []);   /// this one for wallet 
    const [getsellModel, setGetSellModel] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [modalData, setModalData] = useState({});
    const [modalsellData, setModalSellData] = useState({});
    const [makeC,setMakec]=useState(0);

    // Quantity State Handling 
    const [quantity, setQuantity] = useState('');

    const handleQuantityChange = (event) => {
        const value = event.target.value;
        const parsedQuantity = parseFloat(value);
        // console.log(quantity);
        setQuantity(parsedQuantity || '');
    }

    const openModal = ({ stock, companyData }) => {
        // setGetSellModel(false);
        // setGetOurModel(true);
        let obj = {};
        obj.current = stock.c;
        obj.company_name = companyData.name;
        obj.ticker = companyData.ticker;
        // console.log("wallet Data:", walletData[0].w);
        obj.wallet = walletData[0].w;
        setShowModel(true);
        setModalData(obj);
    };

    const openSellModal = ({  stock, companyData, PortfolioData }) => {
        let obj = {};
        obj.current = stock.c;
        obj.company_name = companyData.name;
        obj.ticker = companyData.ticker;
        // console.log("wallet Data:", walletData[0].w);
        obj.wallet = walletData[0].w;
        obj.Q = PortfolioData.find(item => item.company_t === companyData.ticker)?.Quantity;
        // console.log("qp",PortfolioData);
        // console.log("Object in for selling ",obj.Q);
        setGetSellModel(true);
        setModalSellData(obj);
    };

    const handleCloseModel = () => {
        setShowModel(false);
        // setModalData({});
    };


    const updateportf = async ({qu, wc}) => {
        // console.log(qu);
        const dataToSend = {
            ticker: companyData.ticker,
            name: companyData.name,
            c: stockData.c,
            q: qu,
            p: wc

        };

        await axios.post('https://web3-571-ass3-darsh.uc.r.appspot.com/insert/portfolio', dataToSend)

            .then(response => {
                // console.log(response.data);
                setShowModel(false);
                setisSell(true);
                setQuantity('');
                let k=makeC;
                k=k+1
                setMakec(k);
                
                // console.log(k);
               
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    };

    const updateportf2 = async ({qu, wc}) => {
        const nqu=qu*(-1);
        const nwc=wc*(-1);
        const dataToSend = {
            ticker: companyData.ticker,
            name: companyData.name,
            c: stockData.c*(-1),
            q: nqu,
            p: nwc

        };

        await axios.post('https://web3-571-ass3-darsh.uc.r.appspot.com/insert/portfolio', dataToSend)

            .then(response => {
                // console.log(response.data);
                setGetSellModel(false);
                setQuantity('');
                const x=PortfolioData.find(item => item.company_t === companyData.ticker)?.Quantity;
                if(x==qu){
                    setisSell(false);
                }
                let k=makeC;
                k=k+1
                setMakec(k);
                // console.log(k);
                
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://web3-571-ass3-darsh.uc.r.appspot.com/gd/portfolio');
                const response2 = await fetch('https://web3-571-ass3-darsh.uc.r.appspot.com/gd/uwallet');
                const data = await response.json();
                setPortfolioData(data);
                const data2 = await response2.json();
                setWalletData(data2);

            } catch (error) {
                console.error('Error fetching portfolio data:', error);
            }
        };

        fetchData();
    }, [showModel,getsellModel,isSell,makeC]); //, walletData


    useEffect(() => {
        const fetchData = async () => {
            // setshowUpperdiv(false);

            navigate(`/search/${selectedValue}`);


            const ft = (t) => {
                const date = new Date(t); // Convert seconds to milliseconds

                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');

                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            };

            try {
                if (Object.keys(companyData).length === 0 )
                {
                var companyname = "";
                var s = selectedValue.trim();
                var i = 0
                while (i < s.length && s[i] !== '|') {
                    companyname += s[i];
                    i += 1;
                }
                // console.log(companyname);
                const companySymbol = companyname.trim().toUpperCase();


                const urls = [
                    `https://web3-571-ass3-darsh.uc.r.appspot.com/get_data/${companySymbol}`,
                    `https://web3-571-ass3-darsh.uc.r.appspot.com/get_price_stock/${companySymbol}`,
                    `https://web3-571-ass3-darsh.uc.r.appspot.com/highchart_company/${companySymbol}`,
                    `https://web3-571-ass3-darsh.uc.r.appspot.com/peers/${companySymbol}`,
                    `https://web3-571-ass3-darsh.uc.r.appspot.com/company_news/${companySymbol}`,
                    `https://web3-571-ass3-darsh.uc.r.appspot.com/Insider_Sentiment/${companySymbol}`,
                    `https://web3-571-ass3-darsh.uc.r.appspot.com/Recommendation_Trends/${companySymbol}`,
                    `https://web3-571-ass3-darsh.uc.r.appspot.com/earnings/${companySymbol}`,
                    `https://web3-571-ass3-darsh.uc.r.appspot.com/gd/watchlist`,
                    `https://web3-571-ass3-darsh.uc.r.appspot.com/gd/portfolio`,
                    `https://web3-571-ass3-darsh.uc.r.appspot.com/day_data/${companySymbol}`,
                    `https://web3-571-ass3-darsh.uc.r.appspot.com/gd/uwallet`,
                ];

                // Use Promise.all to parallelize the requests
                const responses = await Promise.all(urls.map(url => fetch(url)));
                const dataArr = await Promise.all(responses.map(response => response.json()));

                // Set the data for the first response (you might want to handle multiple responses accordingly)
                let check_isit = true;
                for (let i = 0; i < 8; i++) {
                    check_isit = (check_isit && dataArr[i].ok)
                }
                setisIt(check_isit);
                //console.log(check_isit);
                setCompanyData(dataArr[0].finnhubData);
                setChartData(dataArr[2].finnhubData);
                setPeersData(dataArr[3].finnhubData);
                setNewsData(dataArr[4].finnhubData);
                setInsiderData(dataArr[5].finnhubData);
                setRecommendationData(dataArr[6].finnhubData);
                setEarningsData(dataArr[7].finnhubData);
                setWatchlistData(dataArr[8]);
                setPortfolioData(dataArr[9]);
                setHourChartData(dataArr[10].finnhubData);
                setWalletData(dataArr[11]);
            

                for (let i = 0; i < dataArr[9].length; i++) {
                    if (dataArr[9][i].company_t.toUpperCase() === selectedValue.toUpperCase()) {
                        // console.log(dataArr[9][i]);
                        setisSell(true);
                        break; // Stop the loop once the value is found
                    }
                }
     

                let timestamp = Date.now();


                // the below few lines are for time 
                const updateTime = async () => {
                    const x = Date.now();


                    if ((x - timestamp) >= 15001 && (x - timestamp) <= 15500) {
                        timestamp = x;
                        let d = ft(timestamp)
                        setCurrentTimestamp2(d);
                        const o = await fetch(`https://web3-571-ass3-darsh.uc.r.appspot.com/get_price_stock/${companySymbol}`);
                        const d2 = await o.json();
                        // console.log(d2.finnhubData, d);

                    }

                    // THE BELOW DON'T TAKE IT BACK
                    // setshowUpperdiv(false);
                    //setStockData(d2.finnhubData);
                };



                if (dataArr[1].finnhubData.t !== undefined) {
                    setStockData(dataArr[1].finnhubData);

                    const fetchedTimestamp = dataArr[1].finnhubData.t;
                  
                    const timeDifference = checkTime - fetchedTimestamp * 1000;

                    const fiveMinutesInMillis = 5 * 60 * 1000;

                    if (timeDifference >= 0 && timeDifference <= fiveMinutesInMillis) {
                        // console.log("The difference is within 5 minutes.", timeDifference);
                        setCurrentTimestamp(true);
                    } else {
                        // console.log("The difference is not within 5 minutes.", timeDifference);
                        setCurrentTimestamp(false);
                    }

                    let d = ft(fetchedTimestamp * 1000);
                    setFormattedDateTime(d);
                    d = ft(timestamp)
                    setCurrentTimestamp2(d);
                    const intervalId = setInterval(updateTime, 1000);
                    setLoading(false);
                } else {
                    console.error('Timestamp not available:', dataArr[1].finnhubData);
                    setLoading(false);
                }
            }
            else{
                setLoading(false);
            }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedValue, navigate]);

    useEffect(() => {
     //   console.log("Sotrage console data", companyData);
        if(companyData !== null){
            window.localStorage.setItem("companyData", JSON.stringify(companyData));
        }
    }, [companyData]);

    useEffect(() => {
     //   console.log("Sotrage stock console data", stockData);
        if(companyData !== null){
            window.localStorage.setItem("stockData", JSON.stringify(stockData));
        }
    }, [stockData]);

    useEffect(() => {
     //  console.log("Sotrage chartData console data", chartData);
        if(companyData !== null){
            window.localStorage.setItem("chartData", JSON.stringify(chartData));
        }
    }, [chartData]);

    useEffect(() => {
      //  console.log("Sotrage news Data console data", newsData);
        if(companyData !== null){
            window.localStorage.setItem("newsData", JSON.stringify(newsData));
        }
    }, [newsData]);



    useEffect(() => {
    //    console.log("Sotrage Inside Data console data", insiderData);
        if(companyData !== null){
            window.localStorage.setItem("insiderData", JSON.stringify(insiderData));
        }
    }, [insiderData]);

    useEffect(() => {
     //   console.log("Sotrage recommendation Data console data", recommendationData);
        if(companyData !== null){
            window.localStorage.setItem("recommendationData", JSON.stringify(recommendationData));
        }
    }, [recommendationData]);

    useEffect(() => {
      //  console.log("Sotrage Hours Data console data", hourchartData);
        if(companyData !== null){
            window.localStorage.setItem("hourchartData", JSON.stringify(hourchartData));
        }
    }, [hourchartData]);

    useEffect( () => {
       // console.log("Sotrage peersData console data", peersData);
        if(peersData !== null){
            window.localStorage.setItem("peersData", JSON.stringify(peersData));
        }
    }, [peersData]);

    useEffect( () => {
      //  console.log("Sotrage Earnings console data", earningsData);
        if(earningsData!== null){
            window.localStorage.setItem("earningsData", JSON.stringify(earningsData));
        }
    }, [earningsData]);

    useEffect( () => {
       // console.log("Sotrage Earnings console data", currentTimestamp2);
        if(currentTimestamp2 !== null){
            window.localStorage.setItem("currentTimestamp2", JSON.stringify(currentTimestamp2));
        }
    }, [currentTimestamp2]);

    useEffect( () => {
     //   console.log("Sotrage Earnings console data", currentTimestamp);
        if(currentTimestamp !== null){
            window.localStorage.setItem("currentTimestamp", JSON.stringify(currentTimestamp));
        }
    }, [currentTimestamp]);
    
    useEffect( () => {
       // console.log("Sotrage Earnings console data", formattedDateTime);
        if(formattedDateTime!== null){
            window.localStorage.setItem("formattedDateTime", JSON.stringify(formattedDateTime));
        }
    }, [formattedDateTime]);
    
    useEffect( () => {
        // console.log("is star", isStar, JSON.stringify(isStar));
        
        window.localStorage.setItem("isStar", isStar);
        
    }, [isStar]);

    useEffect( () => {
        //console.log("is sell", isSell);
        if(isSell!== null){
            window.localStorage.setItem("isSell", JSON.stringify(isSell));
        }
    }, [isSell]);

    useEffect( () => {
        //console.log("is sell", WatchListData);
        if(WatchListData!== null){
            window.localStorage.setItem("WatchListData", JSON.stringify(WatchListData));
        }
    }, [WatchListData]);

    useEffect( () => {
       // console.log("is sell", walletData);
        if(walletData!== null){
            window.localStorage.setItem("walletData", JSON.stringify(walletData));
        }
    }, [walletData]);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://web3-571-ass3-darsh.uc.r.appspot.com/gd/watchlist');
                const data = await response.json();
                setWatchlistData(data);
            } catch (error) {
                console.error('Error occurred while fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    
    useEffect(() => {
        if (WatchListData.length > 0) {
            const watchListTickers = WatchListData.map(item => item.company_t.toUpperCase());
            const istickerInWatchList = watchListTickers.includes(selectedValue.toUpperCase());
            if (istickerInWatchList) {
                setisStar(false);
            } else {
                setisStar(true);
            }
        }
    }, [WatchListData, selectedValue]);
    

    return (
        <div className='d-flex col-12 justify-content-center align-items-center'>
            {loading ? (
                <div style={{ width: "100%" }} className="d-flex justify-content-center align-items-center">

                    <ClipLoader color={'rgb(3, 3, 169)'} loading={loading} size={45} />
                </div>

            ) : (isIt ? (
                <div className='d-flex flex-column col-12 justify-content-center align-items-center'>
                    {showUpperdiv ? (
                        <div className='col-lg-9 col-11 d-flex justify-content-between align-items-center pt-2 pb-2 mb-3' style={{ backgroundColor: 'rgba(215,234,226,255)', color: 'green', border: '2px solid rgba(89, 141, 121, 0.3)', borderRadius: '10px' }}>
                            <div className="text-center flex-grow-1 fs-9">{companyData.ticker} added to Watchlist</div>
                            {/* <img className='pe-2' height={'25px'} src="/x.svg" onClick={() => setshowUpperdiv(false)} alt="Close" /> */}

                            <button className="pe-3 Bootstrap_search" type="button" onClick={() => removeUpperdiv()} >
                                &#10006;
                            </button>
                        </div>

                    ) : (
                        <div></div>
                    )}

                    {redUpperdiv ? (

                        <div className='col-lg-9 col-11 d-flex justify-content-between align-items-center pt-2 pb-2 mb-3' style={{ backgroundColor: '#f5d7d8', color: 'Red', border: '2px solid #c1969c', borderRadius: '10px' }}>
                            <div className="text-center flex-grow-1 fs-9">{companyData.ticker} removed from the Watchlist</div>
                            <button className="pe-3 Bootstrap_search" type="button" onClick={() => removefreddiv()} >
                                &#10006;
                            </button>
                        </div>

                    ) : (
                        <div></div>
                    )}

                    {secondUpperdiv ? (


                        <div className='col-lg-9 col-11 d-flex justify-content-between align-items-center pt-2 pb-2 mb-3' style={{ backgroundColor: 'rgba(215,234,226,255)', color: 'green', border: '2px solid rgba(89, 141, 121, 0.3)', borderRadius: '10px' }}>
                            <div className="text-center flex-grow-1 fs-9">{companyData.ticker} bought successfully </div>
                            <button className="pe-3 Bootstrap_search" type="button" onClick={() => removeseconddiv()} >
                                &#10006;
                            </button>

                            {/* <PortfolioModal showModel={showModel} handleCloseModel={handleCloseModel} data={modalData} purse={walletData[0].w}> </PortfolioModal> */}


                        </div>




                    ) : (
                        <div></div>
                    )}

                    {redSeconddiv ? (
                        <div className='col-lg-9 col-11 d-flex justify-content-between align-items-center pt-2 pb-2 mb-3' style={{ backgroundColor: '#f5d7d8', color: 'Red', border: '2px solid #c1969c', borderRadius: '10px' }}>
                            <div className="text-center flex-grow-1 fs-9">{companyData.ticker} sold successfully</div>
                            {/* <img className='pe-2' height={'25px'} src="/x.svg" onClick={() => setshowUpperdiv(false)} alt="Close" /> */}

                            <button className="pe-3 Bootstrap_search" type="button" onClick={() => removesredsdiv()} >
                                &#10006;
                            </button>
                        </div>
                    ) : (
                        <div></div>
                    )}

                    <div className="d-flex flex-row col-lg-9 col-12 justify-content-center align-items-center">

                        <Modal show={showModel} keyboard={false}>
                            <Modal.Header >
                                <div className="col-lg-10 col-9 ms-lg-0 mb-lg-3" >{modalData.ticker}</div>

                                <div className='ms-auto'>
                                    <img className='mb-lg-3' height={'15px'} src="/x.svg" onClick={() => { setShowModel(false); setQuantity(''); setMakec(1200)}} alt="Close" style={{ borderBottom: '1px solid blue' }} />
                                </div>

                            </Modal.Header>
                            <Modal.Body className='mt-1 mb-1 fs-10'>
                                Current Price: {modalData.current}<br></br>
                                Money in Wallet:{modalData.wallet && (modalData.wallet).toFixed(2)}<br></br>
                                <div className="row align-items-center">
                                    <div className="col-2">
                                        Quantity:
                                    </div>
                                    <div className="col-10">
                                        <Form.Control
                                            type="Number"
                                            placeholder="0"
                                            value={quantity}
                                            onChange={(e) => { handleQuantityChange(e); }}
                                            min={0}
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                {quantity * modalData.current > modalData.wallet ? (
                                    <div className='mt-1' style={{ fontSize: '14px', color: 'red' }}>Not enough money in wallet!</div>
                                ) : (
                                    <div></div>
                                )}

                            </Modal.Body>
                            <Modal.Footer>

                                <div className={`d-flex flex-row col-12 ${quantity * modalData.current > modalData.wallet ? "opacity-25": ""}`}>
                                    <div className="col-lg-10 col-9 ms-lg-0 " >Total : {(modalData.current * quantity).toFixed(2)}</div>
                                    <div></div>

                                    <Button variant="success" 
                                        className={`col-2 ${quantity * modalData.current > modalData.wallet ? "disabled": ""} ${quantity === '' ? "disabled":""}`} 
                                        onClick={() => {visibleseconddiv(); setMakec( Math.floor(Math.random() * 1001)); updateportf({qu:quantity , wc:quantity * modalData.current} )}}
                                    >
                                            Buy
                                    </Button>
                                </div>

                            </Modal.Footer>
                        </Modal>

                        <Modal show={getsellModel} keyboard={false}>
                        <Modal.Header >
                                <div className="col-lg-10 col-9 ms-lg-0 mb-lg-3" >{modalsellData.ticker}</div>

                                <div className='ms-auto'>
                                    <img className='mb-lg-3' height={'15px'} src="/x.svg" onClick={() => { setGetSellModel(false); setQuantity(''); setMakec( Math.floor(Math.random() * 1001));}} alt="Close" style={{ borderBottom: '1px solid blue' }} />
                                </div>

                            </Modal.Header>
                            <Modal.Body className='mt-1 mb-1 fs-10'>
                                Current Price: {modalsellData.current}<br></br>
                                Money in Wallet: {walletData[0].w && (walletData[0].w).toFixed(2)}<br></br>
                                <div className="row align-items-center">
                                    <div className="col-2">
                                        Quantity:
                                    </div>
                                    <div className="col-10">
                                        <Form.Control
                                            type="Number"
                                            placeholder="0"
                                            value={quantity}
                                            onChange={(e) => { handleQuantityChange(e); }}
                                            min={0}
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                {quantity  >   modalsellData.Q ? (
                                    <div className='mt-1' style={{ fontSize: '14px', color: 'red' }}>You can't sell the stocks you don't have!</div>
                                ) : (
                                    <div></div>
                                )}

                            </Modal.Body>
                            <Modal.Footer>

                                <div className={`d-flex flex-row col-12 ${quantity  >   modalsellData.Q ? "opacity-25": ""}`}>
                                    <div className="col-lg-10 col-9 ms-lg-0 " >Total : {(modalsellData.current * quantity).toFixed(2)}</div>
                                    <div></div>

                                    <Button variant="success" 
                                        className={`col-2 ${quantity  >   modalsellData.Q ? "disabled": ""} ${quantity === '' ? "disabled":""}`} 
                                        onClick={() => {redsdiv(); setMakec( Math.floor(Math.random() * 1001)); updateportf2({qu:quantity , wc:quantity * modalData.current} )}}
                                    >
                                            Sell
                                    </Button>
                                </div>

                            </Modal.Footer>
                        </Modal>


                        <div className='col-lg-3 col-5 align-self-start mt-lg-0 '>
                            <div className="fs-1">{companyData.ticker}
                                {isStar ? (
                                    <i className="bi bi-star" onClick={visibleUpperdiv}></i>
                                ) : (
                                    <i className="bi bi-star-fill" onClick={redfdiv} style={{ color: 'gold' }}></i>
                                )}
                            </div>
                            <div className="fs-4">{companyData.name} </div>
                            <div className="fs-6">{companyData.exchange}</div>
                            <div className='d-flex flex-row justify-content-center pt-2'>

                                <button className='btn btn-success me-lg-2 me-1 fs-6 ms-lg-0 ms-2'
                                    onClick={() => { openModal({ stock: stockData, companyData: companyData }) }}>
                                    Buy
                                </button>
                                {/* <button className='btn btn-success me-lg-2 me-1 fs-6 ms-lg-0 ms-2' onClick={checking}>Buy</button>  */}
                                {isSell ? (<button className='btn btn-danger ms-lg-2 ms-1 fs-6 me-lg-0 me-2' onClick={() => {openSellModal({ stock: stockData, companyData: companyData, PortfolioData: PortfolioData }) }}>Sell</button>) : (<div></div>)}

                              
                            </div>
                        </div>
                        <div className='col-lg-3 me-col-2 align-self-start mt-lg-0 mt-3 ms-lg-0 ms-2' > <img src={companyData.logo} alt="Company Logo" className="" style={{ height: '9vw', width: '9vw' }} /></div>

                        <div className=' col-lg-3 col-5 align-self-start mt-lg-0 mt-0'>
                            <div style={{ color: stockData.dp >= 0 ? 'green' : 'red' }}>

                                <div className="fs-1" >{stockData.c} </div>
                                <div className="fs-4">
                                    {stockData.dp >= 0 ? (
                                        <i className="bi bi-caret-up-fill" style={{ color: 'green' }}></i>
                                    ) : (
                                        <i className="bi bi-caret-down-fill" style={{ color: 'red' }}></i>
                                    )}
                                    {stockData.d.toFixed(2)} ({stockData.dp.toFixed(2)}%)</div>
                            </div>
                            <div className=" fs-7">{currentTimestamp2}</div>
                        </div>
                    </div>
                    <div style={{ color: currentTimestamp ? 'green' : 'red' }} className='pt-2 pb-2 fs-6 mt-2 mb-4'>
                        Market is {currentTimestamp ? 'Open' : `Closed on ${formattedDateTime}`}
                    </div>
                    {

                        <Tabs
                            companyData={companyData}
                            stockData={stockData}
                            chartData={chartData}
                            peersData={peersData}
                            newsData={newsData}
                            insiderData={insiderData}
                            recommendationData={recommendationData}
                            earningsData={earningsData}
                            hourchartData={hourchartData}
                        />
                    }

                </div>) : (
                <div className='col-lg-9 col-11 d-flex justify-content-center align-items-center pt-2 pb-2 mb-3' style={{ backgroundColor: '#f5d7d8', border: '2px solid #c1969c', borderRadius: '10px', textAlign: 'center' }}>No data found. Please enter a valid Ticker</div>
            )
            )}
        </div>
    );
};

export default GetCompanyData;
