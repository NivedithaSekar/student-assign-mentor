import express from "express";
import {
    readAll,
    readOneEntity,
    createEntity,
    updateOneEntity,
    updateManyEntity,
    deleteEntity,
    findAllWithQuery
  } from '../../database/db-utils.js'

const mentorRouter = express.Router();

mentorRouter.get('/getStudents',async (req, res) => {
    const {id} = req.query;
    console.log(id)    
    await findAllWithQuery('mentors',id, "GetStudentsWithMentorID").then((msg) => res.send(msg))
})


export default mentorRouter;