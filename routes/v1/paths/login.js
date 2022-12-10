import { db } from "../../../helpers/sql.js";
import jwt from "jsonwebtoken";

const login = async (req, res, next) =>{
    const {username, password} = req.body
    if(!username || !password){
        return res.status(401).json({
            status: 0,
            message: "Eksik bilgi gönderildi"
        })
    }
    try{
        const [result] = await db.execute("SELECT * FROM Auth WHERE username =? AND password =?", [username, password])

        if(result.length > 0){
            const d = new Date()
            const accessToken = jwt.sign({
                username,
                userId: result[0]["userId"],
                time: d.toLocaleString("tr-TR"),
                website: "https://kepezsehitcelalozcanal.meb.k12.tr/"
            }, process.env.SECRET_KEY, {expiresIn: "7d"})
            return res.status(202).json({
                status: 1,
                message: "İşlem başarılı",
                userId: result[0]["userId"],
                name: `${result[0]["name"]} ${result[0]["surname"]}`,
                studentNumber: result[0]["number"],
                accessToken
            })
        } else{
            return res.status(401).json({
                status: -1,
                message: "Kullanıcı bulunamadı"
            })
        }
    } catch (e) {
        console.log(e)
        return res.status(401).json({
            status: 2,
            message: "Bir hata oluştu"
        })
    }
}

export default login
