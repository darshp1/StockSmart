import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const WatchList = () => {
    const [loading, setLoading] = useState(true);
    const [watchlistData, setWatchlistData] = useState([]);
    const [ansArray, setAnsArray] = useState(null);
    const [apiCallsCompleted, setApiCallsCompleted] = useState(false);
    
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://web3-571-ass3-darsh.uc.r.appspot.com/gd/watchlist');
                const data = await response.json();
                setWatchlistData(data);

            } catch (error) {
                console.error('Error fetching watchlist data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (watchlistData.length > 0 && !apiCallsCompleted) {
            const watchListArray = Object.values(watchlistData);
            const companytickers = watchListArray.map(item => item.company_t);
            const companynames = watchListArray.map(item => item.company_n);

            getlivestocks(companytickers, companynames);
        }
    }, [watchlistData, apiCallsCompleted]);

    const getlivestocks = async (companyTickers, companyNames) => {
        try {
            const promises = companyTickers.map(async (ticker, index) => {
                const response = await fetch(`https://web3-571-ass3-darsh.uc.r.appspot.com/get_price_stock/${ticker}`);
                const data = await response.json();
                console.log('working');
                return { data: data.finnhubData, ticker: ticker, companyName: companyNames[index] };
            });

            const dataArray = await Promise.all(promises);
            const makeans = dataArray.map(item => ({
                sv: item.data.c,
                d: item.data.d,
                dp: item.data.dp,
                ticker: item.ticker,
                companyName: item.companyName
            }));

            setAnsArray(makeans);
            setApiCallsCompleted(true);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching live stocks data:', error);
        }
    };


    const removeShare = (item) => {
        const d= {
            ticker: item.ticker

        };
    
        axios.post('https://web3-571-ass3-darsh.uc.r.appspot.com/delete/watchlist', d)
       
            .then(response => {
                console.log(response.data);
                setAnsArray(prevState => prevState.filter(i => i.ticker !== item.ticker));
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
        try{
            const watchListTickers = watchlistData.map(item => item.company_t.toUpperCase());
            const istickerInWatchList = watchListTickers.includes(item.ticker.toUpperCase());
            if (istickerInWatchList) {
              
                window.localStorage.setItem("isSell", JSON.stringify(false));
            } else {
                
                window.localStorage.setItem("isSell", JSON.stringify(true));
            }
        }
        catch(e){

        }
    };
    
    const goPage = (item) =>{
        window.localStorage.clear();
        navigate(`/search/${item.ticker}`);
    }



    return (
        <div style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {loading ? (
                <div style={{ padding: 50 }}>
                    <ClipLoader color={'rgb(3, 3, 169)'} loading={loading} size={45} />
                </div>
            ) : (
                <>
                    {ansArray.length === 0 ? (
                        <div className='m-3' style={{ backgroundColor: 'rgb(251,243,203)', border: '2px solid rgb(251,243,203)', height: '5vh', width: '80vw', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px' }}>
                            Currently you don't have any stock
                        </div>
                    ) : (
                        <div className='col-lg-9 col-11' >
                            <div style={{ textAlign: 'left' }} className='p-4 fs-1 mt-2 '> My WatchList</div>
                            {ansArray.map((item, index) => (
                                <div key={index} className=" border border-gray m-3 p-3 rounded" >
                                    <div className="mb-3"  style={{ textAlign: 'left' , cursor: 'pointer' }} ><img className='pe-2' height={'15px'} src="/x.svg" onClick={() => removeShare(item)} alt="Close" /></div>
                                    <div className="d-flex flex-column" style={{ cursor: 'pointer' }} onClick={() => goPage(item)}>
                                        <div className="d-flex flex-row fs-2" >
                                            <div className="col-6 text-start">{item.ticker}</div>
                                            <div className="col-6 text-start" style={{ color: item.dp >= 0 ? 'green' : 'red' }}>{item.sv}</div>
                                        </div>
                                        <div className="d-flex flex-row fs-7  " style={{ cursor: 'pointer' }}>
                                            <div className="col-6 text-start" >{item.companyName}</div>
                                            
                                            <div className="col-6 text-start" style={{ cursor: 'pointer' }}>
                                            {item.dp >= 0 ? (
                                                    <i className="bi bi-caret-up-fill " style={{ color: 'green' }} > </i> 
                                                ) : (
                                                    <i className="bi bi-caret-down-fill" style={{ color: 'red' }}></i> 
                                                )}
                                                <span style={{ color: item.dp >= 0 ? 'green' : 'red' }}>{item.d.toFixed(2)} </span>
                                                 <span style={{ color: item.dp >= 0 ? 'green' : 'red' }}>{item.dp.toFixed(2)}% </span>
                                                
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default WatchList;

