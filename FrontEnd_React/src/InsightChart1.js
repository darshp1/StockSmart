import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const InsightChart1 = ({recommendationData}) => {
    const sell_a = recommendationData.map(item => item.sell);
    const buy_a = recommendationData.map(item => item.buy);
    const s_sell = recommendationData.map(item => item.strongSell);
    const s_buy = recommendationData.map(item => item.strongBuy);
    const hold_a = recommendationData.map(item => item.hold);
    const period_a = recommendationData.map(item => item.period);
    
  useEffect(() => {
    // change colors here 
    Highcharts.setOptions({
        colors: ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE']
      });
    const options = {
      chart: {
        type: 'column',
        backgroundColor: 'rgba(243, 244, 245, 1)',
      },
      credits: {
        enabled: false // Disable Highcharts.com link
      },
      title: {
        text: 'Recommendation Trends',
        align: 'center'
      },
      xAxis: {
        categories: period_a,
      },
      yAxis: {
        min: 0,
        title: {
          text: '#Analysis'
        },
        stackLabels: {
          enabled: false  // this one false removes total labels from top
        }
      },
      legend: {
        align: 'center', // Align the legend to the center
        verticalAlign: 'bottom', // Move the legend to the bottom
        shadow: false
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}'
        //pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            // important check
            formatter: function () {
                return this.y !== 0 ? this.y : null; // Display label if value is not 0
              }
          }
        }
      },
      series: [
        {
          name: 'Strong Buy',
          data: s_buy,
          color: '#1b7b42',
        },
        {
          name: 'Buy',
          data: buy_a,
          color: '#21c15e'
        },
        {
          name: 'Hold',
          data: hold_a,
          color: '#c1952e'
        },
        {
            name: 'Sell',
            data: sell_a,
            color: '#f4696a'
        },
        {
            name: 'Strong Sell',
            data: s_sell,
            color: '#8c2828'
        },
      ]
    };

    // below is to make all labels in the bootom
    Highcharts.chart('container', options);
  }, []);

  return (
    <div>
      <div id="container" style={{ height: '400px' }}></div>
    </div>
  );
};

export default InsightChart1;
