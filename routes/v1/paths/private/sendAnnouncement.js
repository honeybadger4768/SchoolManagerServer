import { db } from "../../../../helpers/sql.js";
import { AS_PRINCIPAL_PERM } from "../../../../constants.js";

const sendAnnouncement = async (req, res, next) =>{
  const {userId, announcementContent, images = []} = req.body
  if(!userId || !announcementContent ){
    return res.status(401).json({
      status: 0,
      message: "Eksik bilgi gönderildi"
    })
  }
  try{
    if(req.user){
      if(req.user.userId === userId){
        const [getUser] = await db.execute("SELECT * FROM Auth WHERE userId =? ", [req.user.userId])
        if(getUser.length > 0){
          if(getUser[0].permission >= AS_PRINCIPAL_PERM){
            const [] = await db.execute("INSERT INTO Announcements SET authorId =?, announcementContent =?, announcementImages =?", [req.user.userId, announcementContent, images.length ? images.toString() : "[]"])
            return res.status(202).json({
              status: 1,
              message: "İşlem başarılı"
            })
          } else{
            return res.status(401).json({
              status: 4,
              message: "low authority"
            })
          }
        } else{
          return res.status(401).json({
            status: 2,
            message: "Kullanıcı bulunamadı"
          })
        }
      } else{
        return res.status(401).json({
          status: -1,
          message: "unauthorized"
        })
      }
    }
  } catch (e) {
    console.log(e)
    return res.status(401).json({
      status: 3,
      message: "Bir hata oluştu"
    })
  }
}

export default sendAnnouncement
