import { db } from "../../../../helpers/sql.js";
import { PDR_TEACHER_PERM } from "../../../../constants.js";

const createPdrAnnouncement = async (req, res, next) =>{
  const {userId, content, images = []} = req.body

  if(!userId || !content){
    return res.status(401).json({
      status: 0,
      message: "eksik bilgi gönderildi"
    })
  }
  if(req.user.userId === userId){
    try{
      const [getUser] = await db.execute("SELECT * FROM Auth WHERE userId =?", [req.user.userId])

      if(getUser.length > 0){
        if(getUser[0].permission === PDR_TEACHER_PERM){
          const [] = await db.execute("INSERT INTO PdrAnnouncements SET authorId =?, announcementContent =?, announcementImages =?",[
            userId, content, images.join(" ")
          ])
          res.status(202).json({
            status: 1,
            message: "işlem başarılı"
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

export default createPdrAnnouncement
