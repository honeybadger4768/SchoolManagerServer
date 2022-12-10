import { db } from "../../../../helpers/sql.js";
import { TEACHER_PERM } from "../../../../constants.js";

const addExamResult = async (req, res, next) => {
  const { userId, classId, examId, studentNumber, studentPoint } = req.body;
  if (!userId || !classId || !examId || !studentNumber ) {
    return res.status(401).json({
      status: 0,
      message: "eksik bilgi gönderildi",
    });
  }
  if(0<= studentPoint && studentPoint <= 100){
    if (req.user.userId === userId) {
      try {
        const [getUser] = await db.execute("SELECT * FROM Auth WHERE userId =?", [req.user.userId]);

        if (getUser.length > 0) {
          if (getUser[0].permission >= TEACHER_PERM) {

            const [getExam] = await db.execute("SELECT * FROM Exams WHERE examId =?", [examId]);
            if (getExam.length > 0) {
              const [] = await db.execute("INSERT INTO ExamResults SET examId =?, studentNumber =?, studentPoint =?, classId =?", [examId, studentNumber, studentPoint, classId]);
              return res.status(202).json({
                status: 1,
                message: "işlem başarılı"
              })
            } else {
              return res.status(401).json({
                status: 2,
                message: "sınav bulunamadı",
              });
            }
          } else {
            return res.status(401).json({
              status: 3,
              message: "low authority",
            });
          }
        } else {
          return res.status(401).json({
            status: 4,
            message: "kullanıcı bulunamadı",
          });
        }

      } catch (e) {
        console.log(e);
        return res.status(401).json({
          status: 5,
          message: "bir hata oluştu",
        });
      }
    } else {
      return res.status(401).json({
        status: -1,
        message: "unauthorized",
      });
    }
  } else{
    return res.status(401).json({
      status: 6,
      message: "hatalı puan aralığı"
    })
  }
};

export default addExamResult;
