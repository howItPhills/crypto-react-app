import React from 'react'
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom'

import { Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News } from '../index'


const Content = () => {
   return (
      <Layout>
         <div className='routes'>
            <Routes>
               <Route path='/' element={<Homepage />} />
               <Route path='/exchanges' element={<Exchanges />} />
               <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
               <Route path='/crypto/:coinId' element={<CryptoDetails />} />
               <Route path='/news' element={<News />} />
            </Routes>
         </div>
      </Layout>
   )
}

export default Content