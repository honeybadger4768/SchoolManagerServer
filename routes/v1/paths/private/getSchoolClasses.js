import { db } from "../../../../helpers/sql.js";
import { TEACHER_PERM } from "../../../../constants.js";

const getSchoolClasses = async (req, res, next) =>{
  const {userId} = req.body
  if(!userId){
    return res.status(401).json({
      status: 0,
      message: "eksik bilgi gönderildi"
    })
  }
  if(req.user.userId === userId){
    try{
      const [getUser] = await db.execute("SELECT * FROM Auth WHERE userId =?", [req.user.userId])

      if(getUser.length > 0){
        if(getUser[0].permission >= TEACHER_PERM ){
          const [getClasses] = await db.execute(`
            SELECT
             ClassList.classId,
             ClassList.className,
             Auth.name,
             Auth.surname
             FROM ClassList INNER JOIN Auth ON Auth.userId = ClassList.classTeacherId
          `)

          // const [students] = await db.execute(`
          //               SELECT * FROM Auth WHERE classId =?
          //             `, [cls.classId])


          const response = []
          for(let cls of getClasses){
            let aCls = {
              classId: cls.classId,
              className: cls.className,
              classTeacher: `${cls.name} ${cls.surname}`
            }
            response.push(aCls)
          }

          return res.status(202).json({
            status: 1,
            message: "işlem başarılı",
            data: response
          })
        } else{
          return res.status(401).json({
            status: 2,
            message: "low authority"
          })
        }
      } else{
        return res.status(401).json({
          status: 3,
          message: "kullanıcı bulunamadı"
        })
      }

    } catch (e) {
      console.log(e)
      return res.status(401).json({
        status: 4,
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

export default getSchoolClasses
