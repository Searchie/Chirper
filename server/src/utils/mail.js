import mailgunLoader from 'mailgun-js';

let mailgun = mailgunLoader({ 
  apiKey: process.env.MAILGUN_SK, 
  domain: 'sandboxd309230de51249088a09919eb283d78a.mailgun.org'
});

function sendEmail(to, from, subject, content) {
  let data = {
    to,
    from,
    subject,
    html: content
  }

  return mailgun.messages().send(data);
};

export { sendEmail };