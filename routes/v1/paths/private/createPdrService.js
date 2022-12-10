import { db } from "../../../../helpers/sql.js";

const createPdrService = async (req, res, next) =>{
  const {userId, studentNumber, about, timeId, date} = req.body
  const dateRegex = new RegExp(/^([1-9]|0[1-9]|[12][0-9]|3[0-1])\.([1-9]|0[1-9]|1[0-2])\.\d{4}$/)
  //var display = moment('2019-11-21T04:02:42.000Z').format('YYYY-MM-DD H:ma').
  if(!userId || !studentNumber || !about || !timeId || dateRegex.test(date) === false){
    return res.status(401).json({
      status: 0,
      message: "eksik/yanlış veri gönderildi"
    })
  }
  if(req.user.userId === userId){
    try{
      const [getUser] = await db.execute("SELECT * FROM Auth WHERE userId =? AND number =? AND type =?", [req.user.userId, studentNumber, "student"])

      if (getUser.length > 0){

        const [control] = await db.execute("SELECT * FROM PdrService WHERE timeId =? AND date =? ", [timeId, date])

        if(control.length > 0){
          return res.status(401).json({
            status: 1,
            message: "bu randevu alınmış!"
          })
        } else{
          const [] = await db.execute("INSERT INTO PdrService SET studentId =?, about =?, timeId =?, date=?", [userId, about, timeId, date])

          return res.status(202).json({
            status: 2,
            message: "randevu başarıyla alındı"
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

export default createPdrService
