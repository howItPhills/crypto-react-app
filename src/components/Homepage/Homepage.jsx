import React from 'react'

import { Typography, Statistic, Row, Col } from 'antd'
import { useGetCryptosQuery } from '../../services/cryptoApi'
import millify from 'millify'


const { Title } = Typography

const Homepage = () => {

   const { data, isFetching } = useGetCryptosQuery()
   const stats = data?.data?.stats

   if (isFetching) return <div>Loading...</div>

   return (
      <div>
         <Title level={2} className='heading'>
            Global Crypto Stats
         </Title>
         <Row>
            <Col span={12}><Statistic title='Total Cryptocurrencies' value={stats.total} /></Col>
            <Col span={12}><Statistic title='Total Exchanges' value={stats.totalExchanges} /></Col>
            <Col span={12}><Statistic title='Total Market Cap' value={millify(stats.totalMarketCap)} /></Col>
            <Col span={12}><Statistic title='Total 24hr Volume' value={millify(stats.total24hVolume)} /></Col>
            <Col span={12}><Statistic title='Total Markets' value={millify(stats.totalMarkets)} /></Col>
         </Row>
      </div>
   )
}

export default Homepage