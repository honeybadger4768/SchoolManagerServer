import { db } from "../../../../helpers/sql.js";

const getCredentials = async (req, res, next) =>{
  if(!req.user){
    return res.status(401).json({
      status: 0,
      message: "ne diyeyim ki"
    })
  } else{
    try{
      const [getUser] = await db.execute("SELECT * FROM Auth WHERE userId =?", [req.user.userId])
      if(getUser.length > 0){
        let obj = {
          userId: getUser[0].userId,
          type: getUser[0].type,
          name: `${getUser[0].name} ${getUser[0].surname}`,
          studentNumber: getUser[0].type === "student" ? getUser[0].number : undefined
        }
        res.status(202).json({
          status: 1,
          message: "başarılı",
          data: obj
        })
      } else{
        return res.status(401).json({
          status: 2,
          message: "Acil çıkış yap"
        })
      }
    } catch (e) {
      console.log(e)
      return res.status(401).json({
        status: 3,
        message: "hata var"
      })
    }
  }
}

export default getCredentials
