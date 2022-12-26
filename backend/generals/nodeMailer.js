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
    Hello ${name} !<br>
    <br>
    Wellcome to Log off system。<br>
    <br>
    Please change your password to log in and use app。<br>
    Your email and default password will be:<br>
    <br>
    <b>email</b>: ${to} <br>
    <b>password</b>: ${password} <br>
    <br>
    <a href = '${process.env.LINK_CHANGE_PASSWORD}/reset-password'>-->CLICK ME<--</a>
    Thanks you so much !

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
