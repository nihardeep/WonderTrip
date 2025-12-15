import { Routes, Route } from 'react-router-dom';

import Header from './components/common/Header';

import Footer from './components/common/Footer';



// Pages

import Home from './pages/Home';

import Destinations from './pages/Destinations';

import DestinationDetail from './pages/DestinationDetail';

import Booking from './pages/Booking';

import BookingConfirmation from './pages/BookingConfirmation';

import Profile from './pages/Profile';

import Login from './pages/Login';

import Signup from './pages/Signup';

import About from './pages/About';

import Contact from './pages/Contact';

import NotFound from './pages/NotFound';



// Routes

import PrivateRoute from './routes/PrivateRoute';



function App() {

  return (

    <div className="min-h-screen flex flex-col bg-gray-50">

      <Header />

      <main className="flex-grow">

        <Routes>

          {/* Public Routes */}

          <Route path="/" element={<Home />} />

          <Route path="/destinations" element={<Destinations />} />

          <Route path="/destinations/:id" element={<DestinationDetail />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          

          {/* Private Routes */}

          <Route

            path="/booking/:id"

            element={

              <PrivateRoute>

                <Booking />

              </PrivateRoute>

            }

          />

          <Route

            path="/booking-confirmation"

            element={

              <PrivateRoute>

                <BookingConfirmation />

              </PrivateRoute>

            }

          />

          <Route

            path="/profile"

            element={

              <PrivateRoute>

                <Profile />

              </PrivateRoute>

            }

          />

          

          {/* 404 Route */}

          <Route path="*" element={<NotFound />} />

        </Routes>

      </main>

      <Footer />

    </div>

  );

}



export default App;
