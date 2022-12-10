import { db } from "../../../../helpers/sql.js";
import { API_URL } from "../../../../constants.js";

const getCanteenItems = async (req, res, next) =>{
  const {userId} = req.body
  if(!userId){
    return res.status(401).json({
      status: 0,
      message: "eksik bilgi gönderildi"
    })
  }
  if(req.user.userId === userId){
    try{
      const [getCanteenList] = await db.execute("SELECT * FROM CanteenList")
      const response = []
      for(let item of getCanteenList){
        let name = item.canteenItemName,
          price = `${item.canteenItemPrice}TL`,
          itemImage = `${API_URL}${item.itemImagePath}`
        let result = [name, price, itemImage]
        response.push(result)
      }
      return res.status(202).json({
        status: 1,
        message: "işlem başarılı",
        data: response
      })
    } catch (e) {
      console.log(e)
      return res.status(401).json({
        status: -1,
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

export default getCanteenItems
