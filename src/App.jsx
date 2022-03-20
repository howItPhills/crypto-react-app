import Navbar from './components/Navbar/Navbar';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';


import './App.css';

const App = () => {
   return (
      <div className='app'>
         <Navbar />
         <div className='main'>
            <Content />
            <Footer />
         </div>
      </div>
   )
}

export default App