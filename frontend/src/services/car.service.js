import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/car/' :
    '//localhost:3030/api/car/'

export const carService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
    getDefaultFilter,
}

async function query(filterBy = {}) {
    // const queryParams =
    //     `?txt=${filterBy.txt}&minSpeed=${filterBy.minSpeed}&pageIdx=${filterBy.pageIdx}`
    var { data: cars } = await axios.get(BASE_URL, { params: filterBy })
    return cars
}

async function get(carId) {
    const url = BASE_URL + carId

    var { data: car } = await axios.get(url)
    return car
}

async function remove(carId) {
    const url = BASE_URL + carId
    var { data: res } = await axios.delete(url)
    return res
}

async function save(car) {
    // const queryParams =
    // 	`?_id=${car._id || ''}&vendor=${car.vendor}&speed=${car.speed}`
    // const url = BASE_URL + 'save' + queryParams


    const method = car._id ? 'put' : 'post'
    const { data: savedCar } = await axios[method](BASE_URL, car)
    return savedCar
}

function getEmptyCar(vendor = '', speed = '') {
    return { vendor, speed }
}

function getDefaultFilter() {
    return { txt: '', minSpeed: '', pageIdx: undefined }
}