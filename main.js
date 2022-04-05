const cars = document.querySelector('.cars')
const colors = document.querySelector('.colors')
const brands = document.querySelector('.brands')
const carsInfoTemplate = document.querySelector('.carInformation').innerHTML
const compiledInfo = Handlebars.compile(carsInfoTemplate)
const carListTemplate = document.querySelector('.carList').innerHTML
const compiledCarList = Handlebars.compile(carListTemplate)
const filterButton = document.querySelector('.filter')

axios
.get('https://api-tutor.herokuapp.com/v1/colors')
.then(result => {
    colors.innerHTML = compiledInfo({
        info: result.data
    })
})

axios
.get('https://api-tutor.herokuapp.com/v1/makes')
.then(result => {
    brands.innerHTML = compiledInfo({
        info: result.data
    })
})

axios
.get('https://api-tutor.herokuapp.com/v1/cars')
.then(result => {
    cars.innerHTML = compiledCarList({
        car: result.data
    })
})

filterButton.addEventListener('click', () => {
    let color = document.querySelector('#color').value
    let brand = document.querySelector('#brand').value

    if(color && brand){
        axios
        .get(`https://api-tutor.herokuapp.com/v1/cars/make/${brand}/color/${color}`)
        .then(result => {
            cars.innerHTML = compiledCarList({
                car: result.data
            })
        })
    }
    else if(color){
        axios
        .get(`https://api-tutor.herokuapp.com/v1/cars/color/${color}`)
        .then(result => {
            cars.innerHTML = compiledCarList({
                car: result.data
            })
        })
    }else if(brand){
        axios
        .get(`https://api-tutor.herokuapp.com/v1/cars/make/${brand}`)
        .then(result => {
            cars.innerHTML = compiledCarList({
                car: result.data
            })  
        })
    }else{
        axios
        .get('https://api-tutor.herokuapp.com/v1/cars')
        .then(result => {
            cars.innerHTML = compiledCarList({
                car: result.data
            })
        })
    }
})