import app    from './config/express'
import {port} from './config/vars'

app.listen(port, () => {
    console.log(`app is running at port: ${port} \n link: http://localhost:${port}`)
})

/**
 * Exports express
 * @public
 */
module.exports = app

