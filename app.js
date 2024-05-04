const fs=require("fs")
const express=require("express")

const app=express()

app.use(express.json())

const tours=JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

const getAllTours=(req, res)=>{
    res.status(200).json({
        status:"success",
        results:tours.length,
        data:{
            tours
        }
    })
}

const getTour=(req, res)=>{
    const id=req.params.id*1
    // if(id >= tours.length){
    //     return res.status(404).send({
    //         status:"fail",
    //         message:"Invalid ID"
    //     })
    // }
    
    const tour=tours.find(el=>el.id===id)
    if(!tour){
        return res.status(404).send({
            status:"fail",
            message:"Invalid ID"
        })
    }

    res.status(200).json({
        status:"success",
        data:{
            tour
        }
    })
}

const createTour=(req, res)=>{
    const newTourId=tours[tours.length-1].id+1
    const newTourData=Object.assign({id:newTourId}, req.body)
    tours.push(newTourData)

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
        res.status(201).json({
            status:"success",
            data:{
                tour:newTourData
            }
        })
    })
}

const updateTour=(req, res)=>{
    const id=req.params.id*1
    
    const tour=tours.find(el=>el.id===id)
    if(!tour){
        return res.status(404).send({
            status:"fail",
            message:"Invalid ID"
        })
    }

    res.status(200).json({
        status:"success",
        data:{
            tour:"<Updated tour here...>"
        }
    })
}

const deleteTour=(req, res)=>{
    const id=req.params.id*1
    
    const tour=tours.find(el=>el.id===id)
    if(!tour){
        return res.status(404).send({
            status:"fail",
            message:"Invalid ID"
        })
    }

    res.status(200).json({
        status:"success",
        data:null
    })
}

app.get('/api/v1/tours', getAllTours)

app.get('/api/v1/tours/:id', getTour)

app.post('/api/v1/tours', createTour)

app.patch('/api/v1/tours/:id', updateTour)

app.delete('/api/v1/tours/:id', deleteTour)

app.listen(8000, ()=>{
    console.log("Server is listening at port 8000")
})