import express       from 'express'
import employeeRouter from './employee.route'
const router = express.Router()

router.get("/", (req,res) =>{
    res.send("Welcome Page!")
})

router.use("/employee", employeeRouter)

export default router
