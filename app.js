const express=require("express")
const morgan=require("morgan")

const tourRouter=require('./routes/tourRoutes.js')
const userRouter=require('./routes/userRoutes.js')

const app=express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

app.use((req, res, next)=>{
    console.log("Middleware")
    next()
})

app.use((req, res, next)=>{
    req.requestTime=new Date().toISOString()
    next()
})

app.use((req, res, next)=>{
    console.log(req.requestTime)
    next()
})

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

// Routes
// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id', getTour)
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

module.exports=app;