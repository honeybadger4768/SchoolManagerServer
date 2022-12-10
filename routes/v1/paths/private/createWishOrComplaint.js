import { db } from "../../../../helpers/sql.js";

const types = ["wish", "complaint"]

const createWishOrComplaint = async (req, res ,next) =>{
  const {userId, type, content } = req.body

  if(!userId || !types.includes(type) || !content){
   return res.status(401).json({
     status: 0,
     message: "eksik bilgi gönderildi"
   })
  }

  if(req.user.userId === userId){
    try{
      const [getUser] = await db.execute("SELECT * FROM Auth WHERE userId =? ", [userId])

      if(getUser.length > 0){
        const [] = await db.execute("INSERT INTO WishAndComplaint SET senderId =?, content =?, type =?", [userId, content, type])

        return res.status(202).json({
          status: 1,
          message: "işlem başarılı"
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

export default createWishOrComplaint
