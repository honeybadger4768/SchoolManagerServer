import { db } from "../../../../helpers/sql.js";

const getSurveys = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(401).json({
      status: 0,
      message: "eksik bilgi gönderildi",
    });
  }
  if (req.user.userId === userId) {
    try {
      const [getUser] = await db.execute("SELECT * FROM Auth WHERE userId =?", [req.user.userId]);

      if (getUser.length > 0) {
        const [getSurveys] = await db.execute(`
          SELECT Votings.votingTitle,
          Votings.votingId,
          Votings.votingOptions,
          Votings.date,
          Auth.name,
          Auth.surname
          FROM Votings 
          INNER JOIN Auth ON Auth.userId = Votings.votingAuthorId ORDER BY date DESC
        `);

        const response = []

        for(let survey of getSurveys){
          let aSurvey = {
            surveyId: survey.votingId,
            surveySender: `${survey.name} ${survey.surname}`,
            surveyTitle: survey.votingTitle,
            surveyOptions: JSON.parse(survey.votingOptions),
            date: survey.date
          }
          response.push(aSurvey)
        }
        return res.status(202).json({
          status: 1,
          message: "işlem başarılı",
          data: response
        })
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

export default getSurveys;
