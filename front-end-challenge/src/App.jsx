import React from 'react'
import BookingsList from "../components/BookingsList.jsx";
import BookingForm from "../components/BookingForm.jsx";
import { BookingsProvider } from "../Context/BookingContext.jsx";
const App = () => {
    return (
        <BookingsProvider>
            <div className="flex flex-col md:flex-row justify-evenly items-start space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/2">
                    <BookingForm />
                </div>
                <div className="w-full md:w-1/2">
                    <BookingsList />
                </div>
            </div>
        </BookingsProvider>
    )
}

export default App