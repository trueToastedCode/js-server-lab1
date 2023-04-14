import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import routers from './routers'

dotenv.config()

const app = express()

// parse application/json, basically parse incoming Request Object as a JSON Object
app.use(bodyParser.json())
// combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/', routers.userRouter)

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})

export default app