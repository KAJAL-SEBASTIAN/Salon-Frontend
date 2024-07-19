
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Pages/Home';
import About from './Pages/About'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Dashboard';
import PageNotFound from './Pages/PageNotFound';
import Service from './Pages/Service';
import Booking from './Pages/Booking';
import Wishlist from './Pages/Wishlist';
import AllBooking from './Pages/AllBooking';

function App() {

  return (
    <div className="App">


<section>
  <Routes>
<Route path='/' element={<Home/>} />
<Route path='/about' element={<About/>} />
<Route path='/login' element={<Auth/>} />
<Route path='/register' element={<Auth register/>} />
<Route path='/admin-dashboard' element={<Dashboard/>} />
<Route path='/user-dashboard' element={<Service/>} />
<Route path='/booking' element={<Booking/>} />
<Route path='/wishlist' element={<Wishlist/>} />
<Route path='/allbooking' element={<AllBooking/>} />
<Route path='*' element={<PageNotFound/>} />
  </Routes>
</section>

<Footer/>
    </div>
  );
}

export default App;
