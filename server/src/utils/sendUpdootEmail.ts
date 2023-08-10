import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendUpdootEmail(to: string, html: string) {
  // let testAccount = await nodemailer.createTestAccount();
  // console.log("testAccount", testAccount.user);
  // console.log("testAccount", testAccount.pass);

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "qhce7rcjd7qmnjzk@ethereal.email", // generated ethereal user
      pass: "vshBAXdJuCkHFNnxQR", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Mlon Eusk 👻" <elon@musk.com>', // sender address
    to: to, //receivers
    subject: "People are Liking your post", // Subject line
    html, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
