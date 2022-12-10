import { db } from "../../../../helpers/sql.js";
import { AS_PRINCIPAL_PERM } from "../../../../constants.js";

const addCanteenItem = async (req, res, next) => {
  const { userId, itemName, itemPrice } = req.body;

  if (!userId || !itemName || !itemPrice) {
    return res.status(401).json({
      status: 0,
      message: "eksik bilgi gönderildi",
    });
  }
  if (req.user.userId === userId) {
    try {
      const [getUser] = await db.execute("SELECT * FROM Auth WHERE userId =?", [req.user.userId]);

      if(getUser.length > 0){
        if(getUser[0].permission >= AS_PRINCIPAL_PERM){
          const [] = await db.execute("INSERT INTO CanteenList SET canteenItemName =?, canteenItemPrice =? ", [itemName, itemPrice])

          return res.status(202).json({
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
  } else {
    return res.status(401).json({
      status: -1,
      message: "unauthorized",
    });
  }
};

export default addCanteenItem;
