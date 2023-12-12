import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"

import { carService } from "../services/car.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { CarFilter } from "../cmps/CarFilter.jsx"
import { CarList } from "../cmps/CarList.jsx"

export function CarIndex() {

    const [cars, setCars] = useState(null)
    const [filterBy, setFilterBy] = useState(carService.getDefaultFilter())

    useEffect(() => {
        loadCars()
    }, [filterBy])

    async function loadCars() {
        try {
            const cars = await carService.query(filterBy)
            setCars(cars)
        } catch (err) {
            console.log('err:', err)
        }
    }

    async function onRemoveCar(carId) {
        try {
            await carService.remove(carId)
            setCars(prevCars => prevCars.filter(car => car._id !== carId))
            showSuccessMsg(`Car Removed! ${carId}`)
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Problem Removing ' + carId)
        }
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onChangePageIdx(pageIdx) {
        setFilterBy(prevFilter => ({ ...prevFilter, pageIdx }))
    }

    if (!cars) return <div>Loading...</div>
    const isPaging = filterBy.pageIdx !== undefined
    return (
        <section className="car-index">

            <div className="car-pagination">
                <label> Use paging
                    <input type="checkbox" checked={isPaging} onChange={() => onChangePageIdx(isPaging ? undefined : 0)} />
                </label>
                {isPaging && <>
                    <button onClick={() => onChangePageIdx(filterBy.pageIdx - 1)}>-</button>
                    <span>{filterBy.pageIdx + 1}</span>
                    <button onClick={() => onChangePageIdx(filterBy.pageIdx + 1)}>+</button>
                </>}
            </div>
            <CarFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <Link to="/car/edit" >Add Car</Link>

            <CarList cars={cars} onRemoveCar={onRemoveCar} />
        </section>
    )
}