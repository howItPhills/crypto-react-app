import React from 'react'

import { Typography, Statistic, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import millify from 'millify'

import { useGetCryptosQuery } from '../../services/cryptoApi'
import Cryptocurrencies from '../Cryptocurrencies/Cryptocurrencies'
import News from '../News/News'


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
         <div className='home-heading-container'>
            <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
            <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
         </div>
         <Cryptocurrencies simplifed />
         <div className='home-heading-container'>
            <Title level={2} className='home-title'>Latest Crypto News</Title>
            <Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title>
         </div>
         <News simplifed />
      </div>
   )
}

export default Homepage