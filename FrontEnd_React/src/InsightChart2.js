import React from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const InsightChart2 = ({earningsData}) => {
    const actual_a = earningsData.map(item => item.actual);
    const estimate_a = earningsData.map(item => item.estimate);
    const period_a = earningsData.map(item => item.period);
    const surprise_a = earningsData.map(item => item.surprise);
    const combinedData = earningsData.map(item => ({ period: item.period, surprise: item.surprise }));



const options = {
    title: {
      text: 'Historical EPS Surprises'
    },
    xAxis: [{
        title: { text: '' },

        categories: combinedData.map(item => `<span>${item.period}</span><br><span>Surprise: ${item.surprise}</span>`),
        alignTicks: false
    }, {
      
        title: { text: '' },

        
        alignTicks: false,
        opposite: false
    }],
    
   /* xAxis: {
      categories: period_a,
      showInLegend: false ,

      alignTicks: false,
      scrollbar: {
        enabled: false
      },
    },*/
  
    yAxis: {
      title: {
        text: 'Quanterly EPS',
      },
      showInLegend: false ,
      opposite: false ,
     
      
    },
    chart: {
      backgroundColor: 'rgba(243, 244, 245, 1)',
      
    },
    
    credits: {
      enabled: false // Disable Highcharts.com link
    },
    
    series: [
      {
          name: 'Actual',
        data: actual_a,
        showInLegend: false ,
        marker: {
          enabled: true
        },
        type: 'spline',
        showInLegend: true
      },
      {
        name: 'estimate',
        data: estimate_a,
        marker: {
          enabled: true
        },
        showInLegend: true,
        type: 'spline',
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
 
export default InsightChart2;