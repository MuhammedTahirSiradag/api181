'use strict';
import express from 'express';
import nodemailer from "nodemailer";
import cors from 'cors';
const app = express();

app.use(cors()); 
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Servis sağlayıcınızın SMTP adresi
    port: 465,                // Güvenli olmayan/STARTTLS portu (Genelde 587 veya 465)
    secure: true,            // Port 465 için true, diğerleri için false
    auth: {
        user: "metesebilisim@gmail.com", // E-posta adresiniz
        pass: "hwmn qyef xrvb jkfi",          // E-posta şifreniz veya Uygulama Şifresi
    },
});

// 2. E-posta içeriğini ve alıcıları tanımlayın
const mailOptions = {
    from: '"Gönderen Adı" <eposta@example.com>', // Gönderen bilgisi
    to: "msiradag@gmail.com",                    // Alıcı adresi (virgülle birden fazla eklenebilir)
    subject: "Nodemailer Test E-postası",        // E-posta konusu
    text: "Merhaba, bu bir düz metin test e-postasıdır.", // Düz metin içeriği
    html: "<b>Merhaba!</b> Bu bir HTML test e-postasıdır.", // HTML içeriği
};
app.get('/mail', cors(), async (req, res) => {
   

    // 3. E-postayı gönderin
    try {
        const info = await transporter.sendMail(mailOptions);
        res.send("E-posta başarıyla gönderildi: %s"+info.messageId);
    } catch (error) {
        res.send("E-posta gönderilirken hata oluştu:"+ error);
    }


    res.json({ mesaj: "Bu rotada CORS aktif!" });
});

import mysql from "mysql2"

let connection = mysql.createConnection({
    host: 'elmasadasi.net.tr',
    user: 'elmasada_user',
    password: 'kozxij-wyZzig-7tasga',
    database: 'elmasada_db'
});
  

app.post('/mysql', cors(), async (req, res) => {

    connection.connect(function (err) {
        if (err) throw err;

        console.log('MySQL bağlantısı başarıyla gerçekleştirildi.');

    });


    connection.query("INSERT INTO `tbl_user`(`name`) VALUES ('new api denemem')", function (err, results, fields) {
        if (err) throw err;

        console.log(results);

    })



    res.json({ mesaj: "Bu rotada CORS aktif!" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port'+PORT.toString()));