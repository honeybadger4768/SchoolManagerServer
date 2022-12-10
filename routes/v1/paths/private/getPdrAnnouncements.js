import { db } from "../../../../helpers/sql.js";

const getPdrAnnouncements = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(401).json({
      status: 0,
      message: "eksik bilgi gönderildi",
    });
  }
  if (req.user.userId === userId) {
    try {
      const [getUser] = await db.execute("SELECT * FROM Auth WHERE userId =?", [userId]);

      if(getUser.length > 0){
        const [getPdrAnnouncements] = await db.execute(
          `SELECT Auth.name, Auth.surname, 
                PdrAnnouncements.announcementContent,
                PdrAnnouncements.announcementImages,
                PdrAnnouncements.date
                FROM PdrAnnouncements
            INNER JOIN Auth ON Auth.userId = PdrAnnouncements.authorId ORDER BY date DESC
            `)
        const response = []
        for(let announcement of getPdrAnnouncements){
          let aAnnouncement = {
            announcementAuthor: `${announcement.name} ${announcement.surname}`,
            announcementContent: `${announcement.announcementContent}`,
            announcementImages: announcement.announcementImages.length > 0 ? announcement?.announcementImages?.split(" ") : [],
            announcementDate: announcement.date
          }
          response.push(aAnnouncement)
        }
        return res.status(202).json({
          status: 1,
          message: "işlem başarılı",
          data: response
        })
      } else{
        return res.status(401).json({
          status: "",
          message: "kullanıcı bulunamadı"
        })
      }

    } catch (e) {
      console.log(e);
      return res.status(401).json({
        status: "",
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

export default getPdrAnnouncements;
