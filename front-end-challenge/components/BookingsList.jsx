// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import {BookingsContext} from "../Context/BookingContext.jsx";
const BookingsList = () => {
    const { bookings, deleteBooking } = useContext(BookingsContext);
    const [expandedBooking, setExpandedBooking] = useState(null);

    const toggleBookingDetails = booking => {
        setExpandedBooking(expandedBooking === booking ? null : booking);
    };

    const handleDeleteBooking = (index) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            deleteBooking(index);
        }
    };

    return (
        <div className="flex justify-center items-start w-full h-screen pt-8 pb-8">
            <div className="w-full max-w-lg mx-8">
                <h2 className="text-2xl font-bold text-center text-white mb-4 sticky top-0 bg-[#6C584C] rounded-full px-4 py-2 mx-auto">Bookings</h2>
                <div className="overflow-y-auto h-[calc(90vh-4rem)] my-8">
                    {bookings.map((booking, index) => (
                        <div key={index} className="bg-[#ADC178] shadow-lg rounded-lg p-6 mb-4">
                            <p className="text-[#A98467] text-base mb-4 rounded-r-2xl px-4 py-2 mx-auto bg-white">
                                Origin: <span className="text-[#6C584C] font-semibold ml-10">{booking.origin}</span>
                            </p>
                            <p className="text-[#A98467] text-base mb-4 rounded-r-2xl px-4 py-2 mx-auto bg-white">
                                Destination: <span className="text-[#6C584C] font-semibold ml-1">{booking.destination}</span>
                            </p>

                            {expandedBooking === booking && (
                                <dl className="mt-4 bg-white shadow-lg rounded-lg p-4 pt-0">
                                    <div className="flex border-b border-gray-200 py-2">
                                        <dt className="w-1/3 text-[#A98467] font-semibold">Passengers</dt>
                                        <dd className="w-2/3 text-[#6C584C]">{booking.numPassengers}</dd>
                                    </div>
                                    <div className="flex border-b border-gray-200 py-2">
                                        <dt className="w-1/3 text-[#A98467] font-semibold">Date</dt>
                                        <dd className="w-2/3 text-[#6C584C]">{new Date(booking.date).toLocaleDateString()}</dd>
                                    </div>
                                    <div className="flex py-2 pb-0">
                                        <dt className="w-1/3 text-[#A98467] font-semibold">Time</dt>
                                        <dd className="w-2/3 text-[#6C584C]">{new Date(booking.time).toLocaleTimeString()}</dd>
                                    </div>
                                </dl>
                            )}

                            <div className="flex justify-center gap-4 mt-4">
                                <button onClick={() => toggleBookingDetails(booking)}
                                        className="bg-[#F0EAD2] hover:bg-[#DDE5B6] text-[#6C584C] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    {expandedBooking === booking ? 'Hide Details' : 'Show Details'}
                                </button>
                                <button onClick={() => handleDeleteBooking(index)}
                                        className="bg-[#FF758F] text-[#590D22] hover:text-[#800F2F] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookingsList;

