import React,  { useState }  from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

require('highcharts/indicators/indicators')(Highcharts);
require('highcharts/indicators/volume-by-price')(Highcharts);

const calculateSMA = (data, period) => {
  const sma = [];
  for (let i = 0; i < data.length; i++) {
    if (i >= period - 1) {
      const sum = data.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val[1], 0);
      sma.push([data[i][0], sum / period]);
    } else {
      sma.push([data[i][0], null]);
    }
  }
  return sma;
};



const calculateVBP = (data, numBins) => {
    const priceRange = data.map(item => item[1] - item[2]); // High - Low
    const maxPriceRange = Math.max(...priceRange);
    const binSize = maxPriceRange / numBins;
  
    const vbpData = Array(numBins).fill(0);
  
    data.forEach(item => {
      const binIndex = Math.floor((item[2] - item[3]) / binSize); // High - Low
      vbpData[binIndex] += item[4]; // Closing price as the volume weight
    });
  
    return vbpData;
  };

const MainChart = ({ chartData }) => {

  const result = chartData.results;
  let name = chartData.ticker;
  let volume_t_arr = [];
  let ohlc = [];
  let closingPrices = [];
  let smaData = [];
  let vbpData = [];
  
  if (result !== undefined) {
    name = chartData.ticker;
  
    volume_t_arr = result.map(item => [item.t, item.v]);
  
    // Dynamic OHLC data
    ohlc = result.map(item => [item.t, item.o, item.h, item.l, item.c]);
  
    // Dynamic closing prices data
    closingPrices = result.map(item => [item.t, item.c]);
  
    // Calculate SMA for closing prices
    const period = 14;
    smaData = calculateSMA(closingPrices, period);
  
    // Calculate Volume by Price
    const numBins = 14;
    vbpData = calculateVBP(ohlc, numBins);
  }
    const [selectedButton, setSelectedButton] = useState(2);
  

  // console.log(volume_t_arr,ohlc);
  const options = {
    chart: {
      type: 'stock',
      verticalAlign: 'top',

    },
    rangeSelector: {
      
      selected: selectedButton,

        buttons: [
            {
              type: 'month',
              count: 1,
              text: '1m',
              dataGrouping: {
                forced: true,
                units: [['day', [1]]],
              },
              events: {
                click: () => setSelectedButton(0),
              },
            },
            {
              type: 'month',
              count: 3,
              text: '3m',
              dataGrouping: {
                forced: true,
                units: [['day', [1]]],
              },
              events: {
                click: () => setSelectedButton(1),
              },
            },
            {
              type: 'month',
              count: 6,
              text: '6m',
              dataGrouping: {
                forced: true,
                units: [['day', [1]]],
              },
              events: {
                click: () => setSelectedButton(2),
              },
            },
            {
              type: 'ytd',
              text: 'YTD',
              events: {
                click: () => setSelectedButton(3),
              },
            },
            {
              type: 'year',
              count: 1,
              text: '1y',
              dataGrouping: {
                forced: true,
                units: [['day', [1]]],
              },
              events: {
                click: () => setSelectedButton(4),
              },
            },
            {
              type: 'all',
              text: 'All',
              dataGrouping: {
                forced: true,
                units: [['day', [1]]],
              },
              events: {
                click: () => setSelectedButton(5),
              },
            },
          ],
       
    },

    title: {
        text: name+' Historical',
    },
 

    subtitle: {
        text: 'With SMA and Volume by Price technical indicators'
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: [
        {
            startOnTick: false,
            endOnTick: false,
            labels: {
                align: 'right',
                x: -3,
                formatter: function () {
                    // Hide the first and last labels
                    if (this.isFirst || this.isLast) {
                        return '';
                    }
                    return this.value;
                },
            },
    
        title: {
          text: 'OHLC',
        },
        height: '60%',
        lineWidth: 2,
        tickAmount: 7,
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
            align: 'right',
            x: -3
        },
        title: {
          text: 'Volume',
        },
        top: '70%',
        height: '30%',
        offset: 0,
        lineWidth: 2,
        tickAmount: 4,
      },
    ],
    tooltip: {
        split: true
    },
    series: [
      {
        type: 'candlestick',
        name: name, // aapl 
        id: 'aapl',
        zIndex: 2,
        data: ohlc
      },
      {
        type: 'column',
        name: 'Volume',
        id: 'volume',
        data: volume_t_arr,
        yAxis: 1
      },
      {
        type: 'vbp',
        linkedTo: 'aapl',
        params: {
          volumeSeriesID: 'volume'
        },
        dataLabels: {
          enabled: false
        },
        zoneLines: {
          enabled: false
        }
      },
      {
        type: 'sma',
        linkedTo: 'aapl',
        zIndex: 1,
        marker: {
          enabled: false
        }
      }
    ],
    plotOptions: {
      series: {
        dataGrouping: {
          units: [['week', [1]], ['month', [1, 2, 3, 4, 6]]],
        },
      },
    },
  };

  return (
    <div className='col-lg-12 col-11' style={{ height: '80vh' }} >
       <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={options} containerProps={{ style: { height: "100%" } }}/> 
 
    </div>
  );
};

export default MainChart;




/*import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const calculateSMA = (data, period) => {
  const sma = [];
  for (let i = 0; i < data.length; i++) {
    if (i >= period - 1) {
      const sum = data.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val[1], 0);
      sma.push([data[i][0], sum / period]);
    } else {
      sma.push([data[i][0], null]);
    }
  }
  return sma;
};

const MainChart = ({ chartData }) => {
  const result = chartData.results;
  const volume_t_arr = result.map(item => [item.t, item.v]);

  // Dynamic OHLC data
  const ohlc = result.map(item => [item.t, item.o, item.h, item.l, item.c]);

  // Dynamic closing prices data
  const closingPrices = result.map(item => [item.t, item.c]);

  // Calculate SMA for closing prices
  const period = 10; // You can adjust the period as needed
  const smaData = calculateSMA(closingPrices, period);

  const options = {
    chart: {
      type: 'stock',
    },
    title: {
      text: 'OHLC Data with Volume and SMA',
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: [
      {
        title: {
          text: 'OHLC',
        },
        height: '60%',
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        title: {
          text: 'Volume',
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2,
      },
    ],
    series: [
      {
        type: 'candlestick',
        name: 'OHLC',
        data: ohlc,
      },
      {
        type: 'column',
        name: 'Volume',
        data: volume_t_arr,
        yAxis: 1,
      },
      {
        type: 'line',
        name: `SMA(${period})`,
        data: smaData,
        yAxis: 0,
      },
      {
        type: 'line',
        name: 'Closing Prices',
        data: closingPrices,
        yAxis: 0,
      },
    ],
    plotOptions: {
      series: {
        dataGrouping: {
          units: [['week', [1]], ['month', [1, 2, 3, 4, 6]]],
        },
      },
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default MainChart;
*/