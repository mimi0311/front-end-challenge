// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import { setHours, setMinutes, isToday, getHours, getMinutes  } from 'date-fns';
import {BookingsContext} from "../Context/BookingContext.jsx";
import 'react-datepicker/dist/react-datepicker.css';

const BookingForm = () => {
    const { addBooking } = useContext(BookingsContext); // Contexto para manejar los datos de las reservas
    const [formData, setFormData] = useState({ origin: '', destination: '', numPassengers: '' });
    const [date, setDate] = useState(new Date());
    const [dateTime, setDateTime] = useState(new Date());

    const originOptions = ['Purrville', 'Feline City', 'Meowpolis', 'Furhaven', 'Snuggle City'];
    const destinationOptions = ['Purrville', 'Feline City', 'Meowpolis', 'Furhaven', 'Snuggle City'];
    const numOfPassengers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']; // El usuario solo podrá reservar hasta 9 boletos

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));

        // Para que el usuario seleccione si o si un origen, destino y numero de pasajeros
        if (value === "") {
            switch (name) {
                case "numPassengers":
                    e.target.setCustomValidity("At least one passenger required");
                    break;
                case "origin":
                    e.target.setCustomValidity("Please select an origin");
                    break;
                case "destination":
                    e.target.setCustomValidity("Please select a destination");
                    break;
                default:
                    e.target.setCustomValidity("");
            }
        } else {
            e.target.setCustomValidity("");
        }
    };

    //Para que no se pueda seleccionar una hora pasada si se elige el mismo día
    const filterTime = time => {
        if (isToday(date)) {
            const now = new Date();
            return time.getTime() >= setHours(setMinutes(now, getMinutes(now)), getHours(now)).getTime();
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBooking = {
            ...formData,
            date: date.toISOString(),
            time: dateTime.toISOString(),
        };

        addBooking(newBooking);

        // Acá, después de que se envía el formulario, los datos regresan a su estado inicial
        setFormData({ origin: '', destination: '', numPassengers: '' });
        setDate(new Date());
        setDateTime(new Date());
    };

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="bg-[#DDE5B6] shadow-md rounded-lg px-20 pt-10 pb-10 mb-4">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Book Your Ticket</h2>
                <form onSubmit={handleSubmit} className="w-full max-w-lg">
                <div >
                        <label htmlFor="origin" className="block text-gray-700 text-sm font-bold mb-2">
                            Origin:
                        </label>
                        <select
                            id="origin"
                            name="origin"
                            value={formData.origin}
                            onChange={handleInputChange}
                            onInvalid={handleInputChange}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                            required
                        >
                            <option value="" disabled>Select Origin</option>
                            // Si se elige un origen, que ese origen ya no apareza en el dropdown de destino
                            {originOptions.filter(option => option !== formData.destination).map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="destination" className="block text-gray-700 text-sm font-bold mb-2">
                            Destination:
                        </label>
                        <select
                            id="destination"
                            name="destination"
                            value={formData.destination}
                            onChange={handleInputChange}
                            onInvalid={handleInputChange}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                            required>
                            <option value="" disabled>Select Destination</option>
                            // Si se elige un destino, que ese destino ya no apareza en el dropdown de origen
                            {destinationOptions.filter(option => option !== formData.origin).map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="numPassengers" className="block text-gray-700 text-sm font-bold mb-2">
                            Number of passengers:
                        </label>
                        <select
                            id="numPassengers"
                            name="numPassengers"
                            value={formData.numPassengers}
                            onChange={handleInputChange}
                            onInvalid={handleInputChange}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                            required>
                            <option value="" disabled>0</option>
                            {numOfPassengers.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                            Date
                        </label>
                        <DatePicker
                            selected={date}
                            onChange={date => setDate(date)}
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}
                            id="date"
                            name="date"
                            wrapperClassName="datePicker"
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="dateTime" className="block text-gray-700 text-sm font-bold mb-2">
                            Time:
                        </label>
                        <DatePicker
                            selected={dateTime}
                            onChange={time => setDateTime(time)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            filterTime={filterTime}
                            id="dateTime"
                            name="dateTime"
                            className="dateTimePicker shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                        />
                    </div>

                    <div className="flex justify-center items-center">
                        <button type="submit"
                                className="bg-[#6C584C] hover:bg-[#A98467] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">
                                Confirm Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;
