const nodemailer =  require('nodemailer');
const emailFromDefault = process.env.NODE_MAIL_FROM
const transporter  =  nodemailer.createTransport({
  host:  process.env.NODE_MAIL_HOST,
  port: process.env.NODE_MAIL_PORT,
    auth: {
      user:process.env.NODE_MAIL_USER ,
      pass: process.env.NODE_MAIL_PASS
    }
});

const selectTemplate = (typeTemplate) => {
  html = '';
  switch (typeTemplate) {
      case 0:
          html = "<strong>É sistema do seu moreno que está enviando esse email, ele pediu pra dizer que te ama demais.</strong>";
          break;
      case 1:
          html = `<p>Testandooo</p>`;
          break;    
      default:
          html = "<strong>HTML default</strong>";
          break;
  }
  return html
}

exports.sendMail = ({to,from,subject,text,html},options={typeTemplate:0})=>{

  if(to){
      const htmlFinal = !html?selectTemplate(options.typeTemplate):html
      const mailOptions  = {
          to: to,
          from: !from?emailFromDefault:from,
          subject: !subject?'Subject default':subject,
          text: !text?'Text default':text,
          html: htmlFinal,
      }
       
      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
    }else{
      return false;
    }

}