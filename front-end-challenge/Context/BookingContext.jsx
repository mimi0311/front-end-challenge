import { createContext, useState, useEffect } from 'react';

export const BookingsContext = createContext();

export const BookingsProvider = ({ children }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
        setBookings(storedBookings);
    }, []);

    const addBooking = (newBooking) => {
        const updatedBookings = [...bookings, newBooking];
        setBookings(updatedBookings);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    };

    const deleteBooking = (indexToDelete) => {
        const updatedBookings = bookings.filter((_, index) => index !== indexToDelete);
        setBookings(updatedBookings);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    };

    return (
        <BookingsContext.Provider value={{ bookings, addBooking, deleteBooking }}>
            {children}
        </BookingsContext.Provider>
    );
};
