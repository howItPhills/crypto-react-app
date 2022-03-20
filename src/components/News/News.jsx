import React, { useState } from 'react'
import { Avatar, Card, Col, Row, Select } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import moment from 'moment'


const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {

  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')

  const { data } = useGetCryptosQuery(100)
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 })

  if (isFetching) return 'Loading...'


  return (
    <Row gutter={[24, 24]}>
      {
        !simplified && (
          <Col span={24}>
            <Select
              showSearch
              className='select-news'
              placeholder='Select a Crypto'
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Select.Option value='Cryptocurrency'>Cryptocurrency</Select.Option>
              {data?.data?.coins.map(coin => <Select.Option value={coin.name} key={coin.uuid}>{coin.name}</Select.Option>)}
            </Select>
          </Col>
        )
      }
      {cryptoNews?.value?.map((article, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={article.url} target='_blank' rel='noreferrer' className='news-card-link'>
              <div className='news-image-container'>
                <Title level={5} className='news-title'>{article.name}</Title>
                <img src={article?.image?.thumbnail?.contentUrl || demoImage} alt='news' style={{ width: "100px", height: '100px' }} />
              </div>
              <Text>
                {
                  article.description.length > 100 ?
                    `${article.description.substring(0, 100)}...` :
                    article.description
                }
              </Text>
              <div className='provider-container'>
                <Avatar src={article.provider[0].image?.thumbnail?.contentUrl || demoImage} alt='provider' />
                <Text style={{ textAlign: 'left' }}>{article.provider[0].name}</Text>
                <Text style={{ marginLeft: 'auto' }}>{moment(article.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News