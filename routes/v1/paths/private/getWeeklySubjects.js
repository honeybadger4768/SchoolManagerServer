import { db } from "../../../../helpers/sql.js";
import { API_URL } from "../../../../constants.js";

const getWeeklySubjects = async (req, res, next) =>{
  const {userId} = req.body
  if(!userId){
    return res.status(401).json({
      status: 0,
      message: "eksik bilgi gönderildi"
    })
  }
  if(req.user.userId === userId){
    try{
      const [getUser] = await db.execute("SELECT * FROM Auth WHERE userId =?", [userId])

      if(getUser.length > 0){
        const [getSubjects] = await db.execute(
          `SELECT WeeklySubjects.subject, Auth.name, Auth.surname, Classes.className, Classes.imagePath FROM WeeklySubjects 
            INNER JOIN Auth ON Auth.userId = WeeklySubjects.senderId 
            INNER JOIN Classes ON Classes.classId = WeeklySubjects.classId`
        )
        const response = []
        for(let subject of getSubjects){
          let aSubject = {
            sender: `${subject.name} ${subject.surname}`,
            className: subject.className,
            subject: subject.subject,
            classImage: `${API_URL}${subject.imagePath}`
          }
          response.push(aSubject)
        }
        return res.status(202).json({
          status: 1,
          message: "işlem başarılı",
          data: response
        })
      } else{
        return res.status(401).json({
          status: 2,
          message: "kullanıcı bulunamadı"
        })
      }

    } catch (e) {
      console.log(e)
      return res.status(401).json({
        status: 3,
        message: "bir hata oluştu"
      })
    }
  } else{
    res.status(401).json({
      status: -1,
      message: "unauthorized"
    })
  }
}

export default getWeeklySubjects
