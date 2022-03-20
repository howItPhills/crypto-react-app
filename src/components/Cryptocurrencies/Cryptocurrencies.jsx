import React, { useEffect, useState } from 'react'
import { Card, Col, Input, Row } from 'antd'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../../services/cryptoApi'

const Cryptocurrencies = ({ simplified }) => {

  const count = simplified ? 10 : 100

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count)

  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filteredCryptos = cryptosList?.data?.coins.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCryptos(filteredCryptos)
  }, [cryptosList, searchTerm])


  return (
    <div>
      {!simplified ?
        <div className='search-crypto'>
          <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
        </div> :
        null
      }
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map(currency => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
            <Link to={`/cryptocurrencies/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img src={currency.iconUrl} className='crypto-image' alt='crypto' />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div >
  )
}

export default Cryptocurrencies