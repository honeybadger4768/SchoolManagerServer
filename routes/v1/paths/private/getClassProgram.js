import { db } from "../../../../helpers/sql.js";
import { API_URL } from "../../../../constants.js";

const getClassProgram = async (req, res, next) =>{
  const {userId, studentNumber} = req.body
  if(!userId || !studentNumber){
    return res.status(401).json({
      status: 0,
      message: "eksik bilgi gönderildi"
    })
  }
  if(req.user.userId === userId){
    try{
      const [getUser] = await db.execute("SELECT * FROM Auth INNER JOIN ClassList ON ClassList.classId = Auth.ClassId WHERE userId =? AND number =?", [req.user.userId, studentNumber])

      if(getUser.length > 0){
        let myClass = getUser[0].className
        let image = myClass.replace("/", "-")
        let program = {
          class: myClass,
          program: `${API_URL}/images/programs/${image}.png`
        }
        res.status(202).json({
          status: 1,
          message: "işlem başarılı",
          data: program
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

export default getClassProgram
