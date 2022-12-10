import { db } from "../../../../helpers/sql.js";
import { AS_PRINCIPAL_PERM } from "../../../../constants.js";

const getWishAndComplaints = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(401).json({
      status: 0,
      message: "eksik bilgi gönderildi",
    });
  }

  if (req.user.userId === userId) {
    try{
      const [getUser] = await db.execute("SELECT * FROM Auth WHERE userId =?", [userId])

      if(getUser.length > 0){
        if(getUser[0].permission >= AS_PRINCIPAL_PERM){
          const [getForms] = await db.execute("SELECT * from WishAndComplaint ORDER BY formId DESC")
          const response = []
          for(let form of getForms){
            let aForm = {
              formId: form.formId,
              content: form.content,
              date: form.date,
              type: form.type
            }
            response.push(aForm)
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
          mesage: "kullanıcı bulunamadı"
        })
      }

    } catch (e) {
      console.log(e)
      return res.status(401).json({
        status: 4,
        message: "bir hata oluştu"
      })
    }
  } else {
    return res.status(401).json({
      status: -1,
      message: "unauthorized"
    })
  }

};

export default getWishAndComplaints;
