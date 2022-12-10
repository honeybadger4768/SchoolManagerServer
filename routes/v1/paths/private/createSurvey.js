import { db } from "../../../../helpers/sql.js";
import { AS_PRINCIPAL_PERM } from "../../../../constants.js";

const createSurvey = async (req, res, next) => {
  const { userId, surveyTitle, surveyOptions = [] } = req.body;

  if (!userId || !surveyTitle || !surveyOptions) {
    return res.status(401).json({
      status: 0,
      message: "eksik bilgi gönderildi",
    });
  }

  if (req.user.userId === userId) {
    try {
      const [getUser] = await db.execute("SELECT * FROM Auth WHERE userId =?", [req.user.userId]);

      if (getUser.length > 0) {
        if (getUser[0].permission >= AS_PRINCIPAL_PERM) {
            for(let option of surveyOptions){
              if(!option.key){
                return res.status(401).json({
                  status: 1,
                  message: "yanlış seçenek bilgisi"
                })
              }
            }
            const [] = await db.execute("INSERT INTO Votings SET votingAuthorId =?, votingTitle =?, votingOptions =?", [
              userId, surveyTitle, JSON.stringify(surveyOptions)
            ])

          return res.status(202).json({
            status: 2,
            message: "işlem başarılı"
          })
        } else {
          return res.status(401).json({
            status: 3,
            message: "low authority"
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

};

export default createSurvey;
