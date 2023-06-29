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

const adminRouter = express.Router();


adminRouter.post('/createStudent',async (req, res) => {
    const {body} = req;
    const studObj = {...body, history:[]}
    await createEntity('students',studObj).then((msg) => msg.acknowledged ? res.send({msg: 'Student created successfully'}):res.status(400).send({msg: 'Unable to register'}))
})

adminRouter.post('/createMentor',async (req, res) => {
    const {body} = req;
    const mentorObj = {...body, history:[]}
    await createEntity('mentors',mentorObj).then((msg) => msg.acknowledged ? res.send({msg: 'Mentor created successfully'}):res.status(400).send({msg: 'Unable to register'}))
})

adminRouter.post('/createBatch',async (req, res) => {
    const {body} = req;
    const batchObj = {...body, history:[]}
    await createEntity('batches',batchObj).then((msg) => msg.acknowledged ? res.send({msg: 'Batch created successfully'}):res.status(400).send({msg: 'Unable to register'}))
})

adminRouter.put('/assignStudents',async (req, res) => {
    const {body: updateObj} = req;
    //console.log(updateObj)
    await updateOcurrentObjneEntity('mentors',updateObj.mentorId,updateObj.students)
    .then(await updateManyEntity('students',updateObj.students,updateObj.mentorId))
    .then((msg) => msg.acknowledged ? res.send({msg: "Data updated successfully"}):res.status(400).send({msg: "Data update failed!"}))
})

adminRouter.put('/assignMentor',async (req, res) => {
    const {body: updateObj} = req;
    //console.log(updateObj)
    const {mentor, history} = await readOneEntity('students',updateObj.studentId);
    const updatedHistory = history.length<=0?[{mentor:mentor}]:[...history,{mentor:mentor}]
    await updateOneEntity('students',updateObj.studentId,updateObj.mentor, updatedHistory)
    .then((msg) => msg.acknowledged ? res.send({msg: "Data updated successfully"}):res.status(400).send({msg: "Data update failed!"}))
})

export default adminRouter;