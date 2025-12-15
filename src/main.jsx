import React from 'react';

import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';

import './styles/index.css';



// Context Providers

import { UserProvider } from './context/UserContext.jsx';

import { BookingProvider } from './context/BookingContext.jsx';

import { ThemeProvider } from './context/ThemeContext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    <BrowserRouter>

      <ThemeProvider>

        <UserProvider>

          <BookingProvider>

            <App />

          </BookingProvider>

        </UserProvider>

      </ThemeProvider>

    </BrowserRouter>

  </React.StrictMode>

);
