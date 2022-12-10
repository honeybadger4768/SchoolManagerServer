import { db } from "../../../../helpers/sql.js";
import { getKeyByValue, PDR_TIMES } from "../../../../constants.js";

const getPdrService = async (req, res, next) =>{
  const {userId} = req.body
  if(!userId){
    return res.status(401).json({
      status: 0,
      message: "eksik veri gönderildi"
    })
  }
  if(req.user.userId === userId){
    try{
      const [getUser] = await db.execute("SELECT * FROM Auth WHERE userId =? AND type =?", [userId, "student"])

      if(getUser.length > 0){
        const [getPdr] = await db.execute(
          `SELECT Auth.name, Auth.surname, PdrService.timeId, PdrService.date, PdrService.about FROM PdrService
             INNER JOIN Auth ON Auth.userId = PdrService.studentId 
            WHERE studentId =?`,
          [req.user.userId])

        const response = []

        for(let pdr of getPdr){
          let aPdr = {
            name: `${pdr.name} ${pdr.surname}`,
            about: pdr.about,
            time: `${getKeyByValue(PDR_TIMES, pdr.timeId)} ${pdr.date}`
          }
          response.push(aPdr)
        }
        res.status(202).json({
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

export default getPdrService
