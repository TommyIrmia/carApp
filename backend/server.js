import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()
const port = 3030

const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: true
}

// App configuration
app.use(cors(corsOptions))
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())


// Routes
import { carRoutes } from './api/car/car.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { authRoutes } from './api/auth/auth.routes.js'

app.use('/api/car', carRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)


app.post('/api/auth/login', (req, res) => {
    const credentials = req.body
    userService.checkLogin(credentials)
        .then(user => {
            if (user) {
                const loginToken = userService.getLoginToken(user)
                res.cookie('loginToken', loginToken)
                res.send(user)
            } else {
                res.status(401).send('Invalid Credentials')
            }
        })
})

app.post('/api/auth/signup', (req, res) => {
    const credentials = req.body
    userService.save(credentials)
        .then(user => {
            if (user) {
                const loginToken = userService.getLoginToken(user)
                res.cookie('loginToken', loginToken)
                res.send(user)
            } else {
                res.status(400).send('Cannot signup')
            }
        })
})

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('loginToken')
    res.send('logged-out!')
})

// Some example routes

app.get('/', (req, res) => {
    res.send(`<h1>Hi Express</h1>`)
})

app.get('/puki', (req, res) => {
    let visitCount = +req.cookies.visitCount
    console.log(visitCount);
    res.cookie('visitCount', visitCount + 1 || 1)
    res.send(`<h1>Hi Puki</h1>`)
})

app.get('/nono', (req, res) => {
    res.redirect('/puki')
})

import { loggerService } from './services/logger.service.js'
app.listen(port, () => {
    loggerService.info('Up and running on port 3030')
})