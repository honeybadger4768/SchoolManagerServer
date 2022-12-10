import express from "express";
import login from "./paths/login.js"
import controlJwt from "../../helpers/jwt.js";
import sendAnnouncement from "./paths/private/sendAnnouncement.js";
import getAnnouncements from "./paths/private/getAnnouncements.js";
import getCredentials from "./paths/private/getCredentials.js";
import createClass from "./paths/private/createClass.js";
import addExamResult from "./paths/private/addExamResult.js";
import getExamResults from "./paths/private/getExamResults.js";
import addWeeklySubject from "./paths/private/addWeeklySubject.js";
import getWeeklySubjects from "./paths/private/getWeeklySubjects.js";
import getClassProgram from "./paths/private/getClassProgram.js";
import createPdrService from "./paths/private/createPdrService.js";
import getPdrService from "./paths/private/getPdrService.js";
import addCanteenItem from "./paths/private/addCanteenItem.js";
import getCanteenItems from "./paths/private/getCanteenItems.js";
import sendInformation from "./paths/private/sendInformation.js";
import getInformation from "./paths/private/getInformation.js";
import createWishOrComplaint from "./paths/private/createWishOrComplaint.js";
import getWishAndComplaints from "./paths/private/getWishAndComplaints.js";
import createPdrAnnouncement from "./paths/private/createPdrAnnouncement.js";
import getPdrAnnouncements from "./paths/private/getPdrAnnouncements.js";
import createSurvey from "./paths/private/createSurvey.js";
import getSurveys from "./paths/private/getSurveys.js";
import getSchoolClasses from "./paths/private/getSchoolClasses.js";
import getClassDetails from "./paths/private/getClassDetails.js";
import applySurvey from "./paths/private/applySurvey.js";

const v1Route = express.Router()

v1Route.get("/", (req, res, next) =>{
    res.send("hw")
})
v1Route.post("/login", login)
v1Route.post("/sendAnnouncement", controlJwt, sendAnnouncement)
v1Route.post("/getAnnouncements", controlJwt, getAnnouncements)
v1Route.post("/getCredentials", controlJwt, getCredentials)
v1Route.post("/createClass", controlJwt, createClass)
v1Route.post("/addExamResult", controlJwt, addExamResult)
v1Route.post("/getExamResults", controlJwt, getExamResults)
v1Route.post("/addWeeklySubject", controlJwt, addWeeklySubject)
v1Route.post("/getWeeklySubjects", controlJwt, getWeeklySubjects)
v1Route.post("/getClassProgram", controlJwt, getClassProgram)
v1Route.post("/createPdrService", controlJwt, createPdrService)
v1Route.post("/getPdrService", controlJwt, getPdrService)
v1Route.post("/addCanteenItem", controlJwt, addCanteenItem)
v1Route.post("/getCanteenItems", controlJwt, getCanteenItems)
v1Route.post("/sendInformation", controlJwt, sendInformation)
v1Route.post("/getInformation", controlJwt, getInformation)
v1Route.post("/createWishOrComplaint", controlJwt, createWishOrComplaint)
v1Route.post("/getWishAndComplaints", controlJwt, getWishAndComplaints)
v1Route.post("/createPdrAnnouncement", controlJwt, createPdrAnnouncement)
v1Route.post("/getPdrAnnouncements", controlJwt, getPdrAnnouncements)
v1Route.post("/createSurvey", controlJwt, createSurvey)
v1Route.post("/getSurveys", controlJwt, getSurveys)
v1Route.post("/getSchoolClasses", controlJwt, getSchoolClasses)
v1Route.post("/getClassDetails", controlJwt, getClassDetails)
v1Route.post("/applySurvey", controlJwt, applySurvey)


export default v1Route
