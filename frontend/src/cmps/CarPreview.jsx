export function CarPreview({ car }) {

    function getImgUrl(vendor) {
        return new URL(`../assets/img/${vendor}.png`, import.meta.url).href
    }

    return (
        <article className="car-preview">
            <h2>Car Vendor: {car.vendor}</h2>
            <h4>Car Speed: {car.speed}</h4>
            <img src={getImgUrl(car.vendor)} alt="" />
        </article>
    )
}
