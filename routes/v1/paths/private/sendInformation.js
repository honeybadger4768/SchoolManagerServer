import { db } from "../../../../helpers/sql.js";

const sendInformation = async (req, res, next) =>{
  const {userId, information, targetDegree, targetNumber = null} = req.body
  if(!userId || !information || !targetDegree){
    return res.status(401).json({
      status: 0,
      message: "eksik bilgi gönderildi"
    })
  }

  if(req.user.userId === userId){
    try{
      const [getUser] = await db.execute(`
        SELECT * FROM Auth WHERE userId =?
      `, [req.user.userId])

      if(getUser.length > 0){
        const [] = await db.execute("INSERT INTO ParentAndStudent SET senderId =?, information =?, receiverDegree =?, receiverBranch =?, receiverNumber =?", [
          userId, information, targetDegree, targetBranch, targetNumber
        ])
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

export default sendInformation
