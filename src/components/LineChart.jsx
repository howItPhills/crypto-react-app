import React from 'react'
import { Row, Col, Typography } from 'antd'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

const { Title } = Typography;

const LineChart = ({ coinHistory, currentCoinPrice, coinName }) => {
   const coinPrice = []
   const coinStamp = [];

   for (let i = 0; i < coinHistory?.data?.history.length; i++) {
      coinPrice.push(coinHistory.data.history[i].price)
      coinStamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString())
   }

   console.log(coinStamp);

   const data = {
      labels: coinStamp,
      datasets: [
         {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
         },
      ],
   };

   const options = {
      scales: {
         yAxes: {
            ticks: {
               beginAtZero: true,
            },
         },
      },
   };

   return (
      <>
         <Row className='chart-header'>
            <Title className='chart-title' level={2}>{coinName} Price Chart</Title>
            <Col className='price-container'>
               <Title level={5} className='price-change'>{coinHistory?.data?.change} %</Title>
               <Title level={5} className='current-price'>{coinName} Price: $ {currentCoinPrice}</Title>
            </Col>
         </Row>
         <Line data={data} options={options} />
      </>
   )
}

export default LineChart