import { db } from "../../../../helpers/sql.js";
import { API_URL } from "../../../../constants.js";

const getExamResults = async (req, res, next) => {
  const { userId, studentNumber } = req.body;
  if (!userId || !studentNumber) {
    return res.status(401).json({
      status: 0,
      message: "eksik bilgi gönderildi",
    });
  }
  if (req.user.userId === userId) {
    try{
      const [getUser] = await db.execute("SELECT * FROM Auth WHERE userId =? AND type =? OR type =?", [userId, "staff", "student"])
      if(getUser.length > 0){
        const [getStudent] = await db.execute("SELECT * FROM Auth WHERE number =? AND type =?", [studentNumber, "student"])
        if(getStudent.length > 0){
          const [getExams] = await db.execute(`SELECT ExamResults.studentPoint, Exams.examName, Classes.className, Classes.imagePath FROM ExamResults 
                        INNER JOIN Exams ON ExamResults.examId = Exams.examId 
                        INNER JOIN Classes ON ExamResults.classId = Classes.classId
                        WHERE ExamResults.studentNumber =? ORDER BY ExamResults.studentPoint DESC`, [getStudent[0].number])
          const response = []
          for(let exam of getExams){
            let aExam = {
              studentName: `${getStudent[0].name} ${getStudent[0].surname}`,
              className: exam.className,
              examName: exam.examName,
              studentPoint: exam.studentPoint,
              classImage: `${API_URL}${exam.imagePath}`
            }
            response.push(aExam)
          }
          return res.status(202).json({
            status: 1,
            message: "işlem başarılı",
            data: response
          })
        } else{
          return res.status(401).json({
            status: 2,
            message: "öğrenci bulunamadı"
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

export default getExamResults;
