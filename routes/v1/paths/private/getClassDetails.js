import { db } from "../../../../helpers/sql.js";

const getClassDetails = async (req, res, next) =>{
  const {userId, classId} = req.body

  if(!userId || !classId){
   return res.status(401).json({
     status: 0,
     message: "eksik bilgi gönderildi"
   })
  }

  if(req.user.userId === userId){
    try{
      const [getUser] = await db.execute("SELECT * FROM Auth WHERE userId =?", [req.user.userId])

      if(getUser.length > 0){
        const [getStudents] = await db.execute(`
          SELECT * FROM Auth INNER JOIN ClassList ON ClassList.classId = Auth.classId WHERE Auth.classId =?
        `, [classId])
        const response = []
        for(let student of getStudents){
          let aStudent = {
            studentId: student.userId,
            studentName: `${student.name} ${student.surname}`,
            studentNumber: student.number,
            studentUsername: student.username
          }
          response.push(aStudent)
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
    return res.status(401).json({
      status: -1,
      message: "unauthorized"
    })
  }

}

export default getClassDetails
