import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Content from './components/Content/Content';


import './App.css';

const App = () => {
   return (
      <div className='app'>
         <Navbar />
         <div className='main'>
            <Content />
            <div className='footer'>

            </div>
         </div>
      </div>
   )
}

export default App