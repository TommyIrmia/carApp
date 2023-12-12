import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

import { carService } from "../services/car.service.js"

export function CarEdit() {

    const [carToEdit, setCarToEdit] = useState(carService.getEmptyCar())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.carId) loadCar()
    }, [])

    async function loadCar() {
        try {
            const carToEdit = await carService.get(params.carId)
            setCarToEdit(carToEdit)
        } catch (err) {
            console.log('err:', err)
        }
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }
        setCarToEdit(prevCarToEdit => ({ ...prevCarToEdit, [field]: value }))
    }

    async function onSaveCar(ev) {
        ev.preventDefault()
        try {
            carService.save(carToEdit)
            navigate('/car')
        } catch (err) {
            console.log('err:', err)
        }
    }
    const { vendor, speed } = carToEdit

    return (
        <section className="car-edit">
            <form onSubmit={onSaveCar} >
                <label htmlFor="vendor">Vendor:</label>
                <input onChange={handleChange} value={vendor} type="text" name="vendor" id="vendor" />

                <label htmlFor="speed">Max Speed:</label>
                <input onChange={handleChange} value={speed} type="number" name="speed" id="speed" />

                <button>Save</button>
            </form>
        </section>
    )
}