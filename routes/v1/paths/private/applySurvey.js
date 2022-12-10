import { db } from "../../../../helpers/sql.js";

const applySurvey = async (req, res, next) =>{
  const {userId, userAnswers, surveyId} = req.body
  if(!userId || !userAnswers || !surveyId){
    return res.status(401).json({
      status: 0,
      message: "eksik bilgi gönderildi"
    })
  }
  if(req.user.userId === userId){
    try{
      const [getUser] = await db.execute("SELECT * FROM Auth WHERE userId =?", [req.user.userId])

      if(getUser.length > 0){
        const [getSurvey] = await db.execute("SELECT * FROM Votings WHERE votingId =?", [surveyId])
        if(getSurvey.length > 0){

          const [controlSurvey] = await db.execute(`
            SELECT * FROM StudentVotes WHERE studentId =? AND votingId =?
          `, [userId, surveyId])
          if(controlSurvey.length > 0){
            return res.status(401).json({
              status: 1,
              message: "bu ankete zaten cevap vermişsin??"
            })
          }
          const questionsLength = JSON.parse(getSurvey[0].votingOptions).length
          if(questionsLength === userAnswers.length){
            const answerIndex = userAnswers.findIndex(i => i === true)

            const [] = await db.execute(`
              INSERT INTO StudentVotes SET studentId =?, votingId =?, studentAnswerIndex =?
            `, [userId, surveyId, answerIndex])
            return res.status(202).json({
              status: 2,
              message: "işlem başarılı",
              surveyId: surveyId
            })
          } else{
            return res.status(401).json({
              status: 3,
              message: "hahahah hatalı anket cevabı"
            })
          }
        } else{
          return res.status(401).json({
            status: 4,
            message: "anket bulunamadı"
          })
        }
      } else{
        return res.status(401).json({
          status: 5,
          message: "kullanıcı bulunamadı"
        })
      }
    } catch (e) {
      console.log(e)
      return res.status(401).json({
        status: 6,
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

export default applySurvey
