import React, { createContext, useContext, useState, useReducer } from 'react';
import { BOOKING_STATUS } from '../data/constants';

const BookingContext = createContext();

// Booking reducer for complex state management
const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DESTINATION':
      return {
        ...state,
        destination: action.payload,
        totalPrice: calculateTotalPrice({
          ...state,
          destination: action.payload
        })
      };

    case 'SET_DATES':
      return {
        ...state,
        dates: action.payload,
        totalPrice: calculateTotalPrice({
          ...state,
          dates: action.payload
        })
      };

    case 'SET_GUESTS':
      return {
        ...state,
        guests: action.payload,
        totalPrice: calculateTotalPrice({
          ...state,
          guests: action.payload
        })
      };

    case 'SET_STATUS':
      return {
        ...state,
        status: action.payload
      };

    case 'RESET_BOOKING':
      return initialBookingState;

    default:
      return state;
  }
};

// Calculate total price based on destination, dates, and guests
const calculateTotalPrice = (bookingData) => {
  if (!bookingData.destination || !bookingData.dates.checkIn || !bookingData.dates.checkOut) {
    return 0;
  }

  const { destination, dates, guests } = bookingData;
  const nights = Math.ceil((new Date(dates.checkOut) - new Date(dates.checkIn)) / (1000 * 60 * 60 * 24));
  const basePrice = destination.price || 0;

  return basePrice * nights * guests;
};

const initialBookingState = {
  destination: null,
  dates: { checkIn: null, checkOut: null },
  guests: 1,
  totalPrice: 0,
  status: BOOKING_STATUS.PENDING
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [bookingData, dispatch] = useReducer(bookingReducer, initialBookingState);

  const setDestination = (destination) => {
    dispatch({ type: 'SET_DESTINATION', payload: destination });
  };

  const setDates = (dates) => {
    dispatch({ type: 'SET_DATES', payload: dates });
  };

  const setGuests = (guests) => {
    dispatch({ type: 'SET_GUESTS', payload: guests });
  };

  const setStatus = (status) => {
    dispatch({ type: 'SET_STATUS', payload: status });
  };

  const resetBooking = () => {
    dispatch({ type: 'RESET_BOOKING' });
  };

  // Convenience methods
  const updateBooking = (updates) => {
    if (updates.destination) setDestination(updates.destination);
    if (updates.dates) setDates(updates.dates);
    if (updates.guests) setGuests(updates.guests);
    if (updates.status) setStatus(updates.status);
  };

  const isBookingComplete = () => {
    return bookingData.destination &&
           bookingData.dates.checkIn &&
           bookingData.dates.checkOut &&
           bookingData.guests > 0;
  };

  const value = {
    bookingData,
    setDestination,
    setDates,
    setGuests,
    setStatus,
    resetBooking,
    updateBooking,
    isBookingComplete
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
