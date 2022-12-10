import { db } from "../../../../helpers/sql.js";

const getAnnouncements = async (req, res, next) =>{
  const {userId, page = 1} = req.body
  if(!userId){
    return res.status(401).json({
      status: 0,
      message: "Eksik bilgi gönderildi"
    })
  } else{
    try{
      if(req.user.userId === userId){
        const [getUser] = await db.execute("SELECT * FROM Auth WHERE userId =?", [req.user.userId])
        if(getUser.length > 0){
          const [posts] = await db.execute(`SELECT * FROM Announcements ORDER BY date DESC`)
          let response = []
          for(let post of posts){
            const [author] = await db.execute("SELECT * FROM Auth WHERE userId =?", [post?.authorId])
            let aPost = {
              announcementId: post.announcementId,
              announcementAuthor: `${author[0]?.name} ${author[0]?.surname}`,
              announcementContent: post.announcementContent,
              announcementImages: post?.announcementImages.length > 0 ? post.announcementImages.split(" ") : [],
              announcementDate: post?.date
            }
            response.push(aPost)
          }
            return res.status(202).json({
              status: 1,
              message: "Duyurular başarıyla çekildi",
              data: response
            })
        } else{
          return res.status(401).json({
            status: 2,
            message: "Kullanıcı bulunamadı"
          })
        }
      } else{
        return res.status(401).json({
          status: 3,
          message: "unauthorized"
        })
      }
    } catch (e) {
      console.log(e)
      return res.status(401).json({
        status: 4,
        message: "Bir hata oluştu"
      })
    }
  }
}

export default getAnnouncements
