const fs=require("fs")
const express=require("express")

// express Router
const router=express.Router()

const tours=JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)

// Route handlers
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

router
    .route("/")
    .get(getAllTours)
    .post(createTour)

router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

module.exports=router;