import express from "express"
const router = express.Router()
router.get('/', (req,res) =>{ 
    res.send("gyökér oldal")
})

export default router