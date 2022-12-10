import { db } from "../../../../helpers/sql.js";

const getInformation = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(401).json({
      status: 0,
      message: "eksik bilgi gönderildi",
    });
  }
  if (req.user.userId === userId) {
    try {
      const [getUser] = await db.execute(`
        SELECT * FROM Auth INNER JOIN ClassList ON ClassList.classId = Auth.classId WHERE userId =?
      `, [userId]);

      if (getUser.length > 0) {
        const [getInformations] = await db.execute(`
         SELECT * FROM SchoolManager.ParentAndStudent WHERE 
        (type = 'student' AND receiverNumber =? ) OR
        (type = 'class' AND receiverDegree =?) OR
        (type = 'branch' AND receiverClassId =? );
`, [getUser[0].number, getUser[0].classDegree, getUser[0].classId]);

        const response = [];

        for (let a of getInformations) {

          const [getSender] = await db.execute("SELECT * FROM Auth WHERE userId =?", [a.senderId]);

          let obj = {
            informationId: a.informationId,
            sender: `${getSender[0].name} ${getSender[0].surname}`,
            information: a.information,
            date: a.date
          };
          response.push(obj);
        }
        res.status(202).json({
          status: 1,
          message: "işlem başarılı",
          data: response,
        });
      } else {
        return res.status(401).json({
          status: 2,
          message: "kullanıcı bulunamadı",
        });
      }

    } catch (e) {
      console.log(e);
      return res.status(401).json({
        status: 3,
        message: "bir hata oluştu",
      });
    }
  } else {
    return res.status(401).json({
      status: -1,
      message: "unauthorized",
    });
  }
};

export default getInformation;
