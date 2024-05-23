import React, { useState,useEffect } from 'react';
import './css/tabs.css';
import Chart1 from './Chart1';
import InsightChart1 from './InsightChart1';
import InsightChart2 from './InsightChart2';
import MainChart from './MainChart';
// import MainChart_m from './MainChart_m';
import NavSticky1 from './NavSticky1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewsModel from "./Models/NewsModel";
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';


const Tabs = ({
  companyData,
  stockData,
  chartData,
  peersData,
  newsData,
  insiderData,
  recommendationData,
  earningsData,
  hourchartData,
}) => {
  let tmsrp = 0, tchange = 0, pmsrp = 0, nmsrp = 0, pchange = 0, nchange = 0;

  let renderedItems = 0; // Initialize a counter for rendered items

  //console.log(insiderData.data[0]);


  const maxItemsToShow = Math.min(20, newsData.length);

  const newsItems2 = [];

  const minItemsToShow = 10;
  const newsItems1 = [];

  // for news click alert type div
  const [activeTab, setActiveTab] = useState('Summary_div');
  const [selectedNews, setSelectedNews] = useState(null);


  const [sendColor,setsendColor] = useState(null);

  const [timerExpired, setTimerExpired] = useState(false);

  const [tabValue, setTabValue] =  useState('1');

  const handleChangetabs  = (event, newValue) => {
    setTabValue(newValue)
}

const [arrowButtons, setArrowButtons] = useState(false);

useEffect(() => {
  if(window.innerWidth < 700)
    setArrowButtons(true);

}, []);

useEffect(() => {
  const handleResize = () => {
    setArrowButtons(window.innerWidth < 700);
  };

  window.addEventListener('resize', handleResize); // Listen for window resize events

  // Cleanup function
  return () => {
      window.removeEventListener('resize', handleResize); // Remove the event listener on component unmount
  };
}, []);


  useEffect(() => {

    let color = 'blue';
    if (stockData.d<0)
    {
      color='red';
    }
    else{
      color='green';
    }
    setsendColor(color);
    setTimerExpired(false);
    const t2 = setTimeout(() => {
      setTimerExpired(true);
    }, 200);

    return () => clearTimeout(t2);
  }, []);

  const Open_stock_t = (tab_n) => {
    setActiveTab(tab_n);
  };

  const news_open = (
    selectedNews ? (
      <div className="selected-news-container" style={{ zIndex: 1, position: 'sticky', top: '28%', left: '50%', transform: 'translate(-50%, -50%)', width: '25vw', height: '50vh', backgroundColor: 'white', borderRadius: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '1vw 1vw 0vw 1vw' }}>
          <div>
            <h2>{selectedNews.source}</h2>
            <p>{selectedNews.datetime}</p>
          </div>
          <img src='x.svg' style={{ height: '1.2vw', width: '1.2vw', borderBottom: '1px solid blue', cursor: 'pointer', marginLeft: 'auto' }} onClick={() => setSelectedNews(null)} alt="Close"></img>
        </div>
        <div className="selected-news" style={{ padding: '1vw', textAlign: 'left' }}>
          <p><strong>{selectedNews.headline}</strong> </p>
          <p>{selectedNews.summary}</p>
          <p>For more details click <a href={selectedNews.url}>here</a></p>
          <div style={{ border: '1px solid blue', padding: '1vw', display: 'flex', alignItems: 'center', flexDirection: 'column', borderRadius: '10px' }}>
            <span style={{ marginRight: 'auto', paddingBottom: '1vw' }}>Share</span>
            <div style={{ display: 'flex', marginRight: 'auto' }}>
              <img src='fb.svg' alt="Facebook" style={{ height: '3vw', width: '3vw' }}></img>
              <img src='x-twitter.svg' alt="Twitter" style={{ height: '3vw', width: '3vw' }}></img>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div></div>
    )
  );



  const handleDivClick = (news) => {
    // Add your functionality here, using the 'news' object if needed
    console.log('Clicked on news:', news);
    setSelectedNews(news);
  };

  let i = 0;
  let k = 1;
  let itemsWithImages = newsData.filter(item => item.image);
  while ((newsItems1.length < minItemsToShow || newsItems2.length < minItemsToShow) && i < newsData.length) {
    const news = newsData[i];
    const check = news.image && news.headline && news.summary;

    if (check) {
      if (k % 2 === 1) {
        if (newsItems1.length < minItemsToShow) {
          newsItems1.push(
            <div key={i} className='news_divs' onClick={() => handleDivClick(news)}>
              <div className='news_img'>
                <img src={news.image} alt="news" />
              </div>
              <div className='news_txt'>
                <span>{news.headline}</span>
              </div>
            </div>
          );
        }
      } else {
        if (newsItems2.length < minItemsToShow) {
          newsItems2.push(
            <div key={i} className='news_divs' onClick={() => handleDivClick(news)}>
              <div className='news_img'>
                <img src={news.image} alt="news" />
              </div>
              <div className='news_txt'>
                <span>{news.headline}</span>
              </div>
            </div>
          );
        }
      }
      k += 1;
    }

    i += 1;
  }


  for (let i = 0; i < insiderData.data.length; i++) {
    if (typeof insiderData.data[i].mspr === 'number') {
      tmsrp += insiderData.data[i].mspr;
      tchange += insiderData.data[i].change;
      //positive negative msrp
      if (insiderData.data[i].mspr >= 0) {
        pmsrp += insiderData.data[i].mspr;
      }
      else {
        nmsrp += insiderData.data[i].mspr;
      }

      // positive negative change
      if (insiderData.data[i].mspr >= 0) {
        pchange += insiderData.data[i].change;
      }
      else {
        nchange += insiderData.data[i].change;
      }
    }
    //console.log(insiderData.data[i].mspr,typeof insiderData.data[i].msrp);
  }

  //console.log(tmsrp,"yo");

  // for insider data

  const [getOurModel, setGetOurModel] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [modalData, setModalData] = useState({});

    const openModal = ({data}) => {
      setGetOurModel(true);
      setShowModel(true);
      setModalData(data);
  };

  const handleCloseModel = () => {
      setShowModel(false);
      // setModalData({});
  };



  return (
    <div className='col-lg-9 col-12'>
          <Box sx={{ width: '100%' }}>
            <TabContext value={tabValue}>
                <Box sx={{}}>
                    <TabList
                        onChange={handleChangetabs}
                        aria-label='Tabs example'
                        textColor='primary'
                        indicatorColor='primary'
                        variant='scrollable'
                        allowScrollButtonsMobile
                        scrollButtons={arrowButtons}
                        sx={{
                          '& .Mui-selected':{
                            color: 'blue',
                          },
                          '& .Darsh_labels': {
                            textTransform: 'none', 
                          },
                          
                        }}  
                        >
                        <Tab
                            label={<span className="Darsh_labels">Summary</span>}
                            value='1'
                            className='col-lg-3 col-5 Summary_div'
                        />
                        <Tab label={<span className="Darsh_labels">Top News</span>} value='Top_News_div' className='col-lg-3 col-5 Top_News_div' />
                        <Tab label={<span className="Darsh_labels">Charts</span>} value='3' className='col-lg-3 col-5 Charts_div'/>
                        <Tab label={<span className="Darsh_labels">Inshights</span>} value='4' className='col-lg-3 col-5 Insights_div'/>
                    </TabList>
                </Box>
                <TabPanel value='1' className='ps-0 pr-0 pt-1 pb-1'>
                <div className='d-flex flex-lg-row flex-column justify-content-center align-items-center'>
            <div className='div1 col-lg-6 col-10'>
              <div className='Summary_horizontal_div d-flex flex-row col-12  '>
                <div className='col-lg-6 col-12 pt-lg-3 pt-2'>
                  <span className='fs-6'>
                    <span className='fw-bold'>High Price: </span>{stockData.h}
                  </span>
                  <br></br>
                  <span className='fs-6'>
                    <span className='fw-bold'>Low Price: </span>{stockData.l}
                  </span>
                  <br></br>
                  <span className='fs-6'>
                    <span className='fw-bold'>Open Price: </span>{stockData.o}
                  </span>
                  <br></br>
                  <span className='fs-6'>
                    <span className='fw-bold'>Prev. Close: </span>{stockData.pc}
                  </span>

                </div>
                <div className='col-lg-6 col-0'>
                  {/* nothing in here*/}
                </div>
              </div>
              <div className='col-12'>
                <br></br>
                <span className='text-decoration-underline fs-4'>About the company.</span>

                <br></br>
                <br></br>
                <p className='fs-6'>
                  <span className='fw-bold'> IPO Start Date:</span> {companyData.ipo}
                </p>
                <p className='fs-6'>
                  <span className='fw-bold '> Industry:</span> {companyData.finnhubIndustry}
                </p>
                <p className='fs-6'>
                  <span className='fw-bold'>WebPage: </span><a href='{companyData.weburl}'> {companyData.weburl}</a>
                </p>
                <p className='fs-6'>
                  <span className='fw-bold'>Company peers:</span>
                </p>
                <div className='d-flex flex-wrap col-12 justify-content-center mb-3'>
                  {peersData && peersData.length > 0 ? (
                    peersData.map((peer, index) => (
                      <span key={index} className=''>
                        {!peer.includes('.') && (
                          <a href={`https://web-frontend-for-a3.uc.r.appspot.com/search/${peer}`} className='d-inline-block me-2 fs-6'>
                            {peer},
                          </a>
                        )}
                      </span>
                    ))
                  ) : (
                    <p></p>
                  )}
                </div>

              </div>

            </div>
            <div className='div2 col-lg-6 col-10'>
              <Chart1 hcd={hourchartData}
              color2={sendColor}/>
            </div>
          </div>
                </TabPanel>
                <TabPanel value='Top_News_div' className='ps-0 pr-0 pt-3 pb-4'> <div className='d-flex flex-column'>
  

            {itemsWithImages.slice(0, 20).reduce((rows, item, index) => {
              if (renderedItems < 20) { // Check if the counter is less than 20
                if (index % 2 === 0) {
                  rows.push([item]);
                } else {
                  rows[rows.length - 1].push(item);
                }
                renderedItems++; // Increment the counter
              }
              return rows;
            }, []).map((row, rowIndex) => (
              <div key={rowIndex} className={'d-flex flex-lg-row flex-column col-12 mt-lg-2 justify-content-center align-items-center '}>
                {row.map((item, colIndex) => (
                  <div key={colIndex} className={'d-flex flex-lg-row flex-column col-lg-6 col-11 mt-lg-0 mt-2 ms-lg-1 me-lg-1 align-items-center border border-secondary border-opacity-50 rounded-2 bg-body-secondary bg-opacity-50 p-3  '} >
                    <div className={'d-flex flex-lg-row flex-column align-items-center justify-content-center col-12'} onClick= {()=>{openModal({data: item})}}>
                      <div className={'col-lg-3 col-md-4 col-sm-6 col-12 m-1' }  >
                        <img className='news_images rounded-3' src={item.image} alt='some error' style={{ objectFit: "cover", maxWidth: "100%"}}  />
                      </div>
                        <div className={'d-flex flex-row col-lg-9 col-12 justify-content-center align-items-center'}>
                            <p className={'text-center fw-bold fs-6 text-center ps-lg-4 pe-lg-4 mb-lg-0 mb-0'}>{item.headline}</p>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}

<NewsModel showModel={showModel} handleCloseModel={handleCloseModel} data={modalData}></NewsModel>
          </div>
        
                    
                </TabPanel>
                <TabPanel value='3' className='ps-0 pr-0 pt-0 pb-2'>
                <div className='d-flex col-12 justify-content-center align-items-center' >

<MainChart
  chartData={chartData}
/>

</div>
                </TabPanel>
                <TabPanel value='4' className='ps-0 pr-0 pt-0 pb-4 '>
                <div className="">
            <span className="fs-lg-3 fs-2">Insider Sentiment</span>
            <table border="0" className='fs-6'>

              <tr style={{borderBottom: '1px solid rgba(223, 224, 225, 255)'}}>
                <th >{companyData.name}</th>
                <th>MSRP</th>
                <th>Change</th>
              </tr>
              <tr style={{borderBottom: '1px solid rgba(223, 224, 225, 255)'}}>
                <th>Total</th>
                <td>{tmsrp.toFixed(2)}</td>
                <td>{tchange}</td>
              </tr>
              <tr style={{borderBottom: '1px solid rgba(223, 224, 225, 255)'}}>
                <th>Positive</th>
                <td>{pmsrp.toFixed(2)}</td>
                <td>{pchange}</td>
              </tr>
              <tr style={{borderBottom: '1px solid rgba(223, 224, 225, 255)'}}>
                <th>Negative</th>
                <td>{nmsrp.toFixed(2)}</td>
                <td>{nchange}</td>
              </tr>

            </table>
          </div>
          <div className='d-flex flex-lg-row flex-column col-12 justify-content-center align-items-center mt-lg-3 mt-2'>
            <div className='col-lg-6 col-10 me-lg-2'>
              <InsightChart1
                recommendationData={recommendationData}
              />
            </div>
            <div className='col-lg-6 col-10 pt-lg-0 pt-2 ms-lg-2'>
              <InsightChart2
                earningsData={earningsData}
              />
            </div>
          </div>
                </TabPanel>
            </TabContext>
        </Box>

    </div>
  );
};

export default Tabs;
