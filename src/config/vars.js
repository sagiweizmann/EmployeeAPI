import path from 'path'
import env  from 'dotenv-safe'

if (process.env.NODE_ENV === 'development') {
    env.load({
        path:   path.join(__dirname, '../../.env'),
        sample: path.join(__dirname, '../../.env.example'),
    })
}

module.exports = {
    env:  process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8080,
}
