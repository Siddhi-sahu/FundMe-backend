import express from 'express';
import cors from 'cors';
import { router as MainRouter } from './routes/index.js'
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());
app.use("/api/v1", MainRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})