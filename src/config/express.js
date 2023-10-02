import express    from 'express'
import router     from '../api/routes/v1'
import bodyParser from 'body-parser'
import * as error from '../api/middlewares/error'
import swaggerjsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Employee API',
            description: 'Employee API Information',
            contact: {
                name: 'Sagi Weizmann'
            },
        },
        servers: [
            {
                url: "http://localhost:8080/v1"
            }
        ],
    },
    apis: ['./src/api/routes/v1/*.js']
}


// Create express app
const app = express()

// Swagger
const swaggerDocs = swaggerjsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// parse body params and attach them to req.body
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// mount api v1 routes
app.use("/v1", router)

// if error is not an instanceOf APIError, convert it.
app.use(error.converter)

// catch 404 and forward to error handler
app.use(error.notFound)

// error handler, send stacktrace only during development
app.use(error.handler)



export default app