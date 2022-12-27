import nodemailer from 'nodemailer'

const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_PASSWORD
const mailHost = process.env.MAIL_HOST
const mailPort = process.env.MAIL_PORT

const sendVerifyMail = async (to, name, password) => {
  const transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: true,
    auth: {
      user: adminEmail,
      pass: adminPassword,
    },
  })

  const options = {
    from: adminEmail,
    to: to,
    subject: 'Verify Account',
    html: `
    <html>
    <head></head>
    <body>
    <b>Wellcome to Log off system。 </b>
    <br>
    <br>
    Your account created by ADMIN, you can login system <a href = '${process.env.LINK_CHANGE_PASSWORD}'>HERE</a>    
    <br>
    <br>
    Your email and default password will be:<br>
    <b>Email</b>: ${to} <br>
    <b>Password</b>: ${password} 
    Please change your password to log in and use app。
    <br> <a href = '${process.env.LINK_CHANGE_PASSWORD}/reset-password'>Change Password</a>
    <br>
    <b>  Thanks you so much ! </b>

    <br>
    -----------------------------------------------------------------------------------------------------------<br>
    </body>
    </html>
    `,
  }

  return await transporter.sendMail(options)
}

export const mailerService = {
  sendVerifyMail,
}
