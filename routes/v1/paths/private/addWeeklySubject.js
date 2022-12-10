import { db } from "../../../../helpers/sql.js";
import { TEACHER_PERM } from "../../../../constants.js";

const addWeeklySubject = async (req, res, next) => {
  const { userId, classId, subject } = req.body;
  if (!userId || !classId || !subject) {
    return res.status(401).json({
      status: 0,
      message: "eksik bilgi gönderildi",
    });
  }
  if (req.user.userId === userId) {
    try {
      const [getUser] = await db.execute("SELECT * FROM Auth WHERE userId =? AND type =?", [req.user.userId, "staff"]);
      if (getUser.length > 0) {
        if (getUser[0].permission >= TEACHER_PERM) {
          const [] = await db.execute("INSERT INTO WeeklySubjects SET classId =?, subject =?, senderId =?", [classId, subject, req.user.userId]);
          return res.status(202).json({
            status: 1,
            message: "işlem başarılı",
          });
        } else {
          return res.status(401).json({
            status: 2,
            message: "low authority",
          });
        }
      } else {
        return res.status(401).json({
          status: 3,
          message: "kullanıcı bulunamadı",
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        status: 4,
        message: "bir hata oluştu",
      });
    }
  } else {
    res.status(401).json({
      status: -1,
      message: "unauthorized",
    });
  }

};

export default addWeeklySubject;
