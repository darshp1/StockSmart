import React from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const Chart1 = ({ hcd, color2 }) => {
  let cArray = [1, 2, 1, 4];
  let tArray = [1, 2, 1, 4, 3, 6];
  let options = {}; // Define options object here
  let x=[];

  if (hcd.results !== undefined) {
    // console.log("this is chart", hcd.results);
    // Log the first 32 data points
    x = hcd.results.slice(-24);
    cArray = x.map(item => item.c);
    tArray = x.map(item => item.t);
    // console.log(tArray);
    // console.log(cArray, tArray);
    
    
  }
     options = {
      title: {
        text: `${hcd.ticker} Hourly Price Validation`
      },
      xAxis: {
        // categories: tArray,
        showInLegend: false,
        scrollbar: {
          enabled: true
        }, 
        type: 'datetime',
        dateTimeLabelFormats: {
          hour: '%H:%M'
        },
        tickInterval: 6 * 3600 * 1000 
      },
      yAxis: {
        title: {
          text: '',
        },
        showInLegend: false,
        opposite: true,
      },
      chart: {
        backgroundColor: 'rgba(243, 244, 245, 1)',
      },
      series: [
        {
          data: x.map(item => [new Date(item.t).getTime(), item.c]),
          // data: cArray,
          showInLegend: false,
          marker: {
            enabled: false, // Disable markers (dots)
          },
          color: color2,
        }
      ]
    };
  

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        /*constructorType={'stockChart'}*/
        options={options}
      />
    </div>
  );
}

export default Chart1;
