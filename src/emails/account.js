const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRIDMAIL_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ajayprajapati9803@gmail.com',
        subject: 'pp',
        text: `Welcome to Task Manager App, ${name}`
    })
}

const sendDeletionEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ajayprajapati9803@gmail.com',
        subject: 'pp',
        text: `Fuck you, ${name}`
    })
}

module.exports = {sendWelcomeEmail, sendDeletionEmail}
