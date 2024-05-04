const fs=require("fs")
const express=require("express")

const app=express()

app.use(express.json())

const tours=JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

app.get('/api/v1/tours', (req, res)=>{
    res.status(200).json({
        status:"success",
        results:tours.length,
        data:{
            tours
        }
    })
})

app.get('/api/v1/tours/:id', (req, res)=>{
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
})

app.post('/api/v1/tours', (req, res)=>{
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
})

app.patch('/api/v1/tours/:id', (req, res)=>{
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
})

app.delete('/api/v1/tours/:id', (req, res)=>{
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
})

app.listen(8000, ()=>{
    console.log("Server is listening at port 8000")
})