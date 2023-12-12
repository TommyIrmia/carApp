import { Link } from "react-router-dom";
import { CarPreview } from "./CarPreview.jsx";
import { userService } from "../services/user.service.js";



export function CarList({ cars, onRemoveCar }) {
    const loggedinUser = userService.getLoggedinUser()


    function isOwnedByUser(car) {
        return loggedinUser?.isAdmin || loggedinUser?._id === car?.owner._id
    }
    
    return (
        <ul className="car-list">
            {cars.map(car =>
                <li key={car._id}>
                    <CarPreview car={car} />
                    <section>
                        {isOwnedByUser(car) && <button onClick={() => onRemoveCar(car._id)}>Remove Car</button>}
                        <button><Link to={`/car/${car._id}`}>Details</Link></button>
                        {isOwnedByUser(car) && <button><Link to={`/car/edit/${car._id}`}>Edit</Link></button>}
                    </section>
                </li>
            )}
        </ul>
    )
}