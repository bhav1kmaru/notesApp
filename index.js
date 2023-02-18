const express=require('express')
const { connection } = require('./db')

const { noteRouter } = require('./routes/Note.routes')
const { userRouter } = require('./routes/User.routes')
const cors=require('cors')
require("dotenv").config();
const swaggerUI=require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const app = express()
app.use(cors());
app.use(express.json())



app.get('/',(req,res)=>{
    res.send("Home Page")
})

//openapi specifications
const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Notes App",
            version:"1.0.0"
        },
        server:[{
            url:"http://localhost:8080"
        }]
    },
    apis:["./routes/*.js"]
}

//swagger specs
const swaggerSpec=swaggerJsDoc(options)

//create a route for docs UI
app.use("/docs",swaggerUI.serve,swaggerUI.setup(swaggerSpec))
app.use('/users',userRouter)
// app.use(authenticate)
app.use('/notes',noteRouter)

const port=process.env.port
app.listen(port,async()=>{
    console.log(`server running on port ${port}`)
    try {
        await connection
        console.log('connected to database')
    } catch (error) {
        console.log(error.message)
    }
})