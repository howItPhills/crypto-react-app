import { CheckOutlined, DollarCircleOutlined, ExclamationCircleOutlined, FundOutlined, MoneyCollectOutlined, NumberOutlined, StopOutlined, ThunderboltOutlined, TrophyOutlined } from '@ant-design/icons';
import millify from 'millify';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetCoinQuery, useGetCoinHistoryQuery } from '../../services/cryptoApi';
import { Col, Row, Select, Typography } from 'antd'
import HTMLReactParser from 'html-react-parser';
import LineChart from '../LineChart';


const { Title, Text } = Typography;

const CryptoDetails = () => {

  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('1y')


  const { data, isFetching } = useGetCoinQuery(coinId)
  const { data: coinHistory } = useGetCoinHistoryQuery({ coinId, timePeriod })

  const cryptoDetails = data?.data?.coin


  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  if (isFetching) return 'Loading...'

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price at US dollars. View value statistics, market cap and supply
        </p>
      </Col>
      <Select
        defaultValue={timePeriod}
        className='select-timeperiod'
        placeholder='Select Time Period'
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map(date => <Select.Option key={date}>{date}</Select.Option>)}
      </Select>
      <LineChart coinHistory={coinHistory} currentCoinPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title className='coin-details-heading' level={3}>
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>
              An overview showing the stats of {cryptoDetails.name}
            </p>
            {stats.map(({ title, value, icon }) => (
              <Col className='coin-stats' key={value}>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>{value ? value : "No info"}</Text>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title className='coin-details-heading' level={3}>
              Other statistics
            </Title>
            <p>
              An overview showing the stats of all cryptocurrencies
            </p>
            {genericStats.map(({ title, value, icon }) => (
              <Col className='coin-stats' key={value}>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title className='coin-details-heading' level={3}>
            What is {cryptoDetails.name}?
          </Title>
          <div>
            {HTMLReactParser(cryptoDetails.description)}
          </div>
        </Row>
        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>{cryptoDetails.name} Links</Title>
          {cryptoDetails.links.map(link => (
            <Row className='coin-link' key={link.url}>
              <Title level={5} className='link-name'>
                {link.type}
              </Title>
              <a href={link.url} target='_blank' rel='noreferrer'>{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails