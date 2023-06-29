import express from "express";
import DbClient from "./database/client-connectivity.js";
import adminRouter from "./routers/admin/admin.js";
import mentorRouter from "./routers/mentor/mentor.js";

const app = express();
await DbClient.connect();
app.use(express.json());
app.use('/admin',adminRouter)
app.use('/mentor',mentorRouter)

app.get('/', function (req, res) {
    res.send({msg:"App Running Successfully!"})
  })
  
  app.listen(3000)