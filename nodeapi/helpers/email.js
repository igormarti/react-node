const email = require('@sendgrid/mail') 
const emailFromDefault = 'igor.mr96@hotmail.com'
email.setApiKey(process.env.SENDGRID_API_KEY);

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
        const msg = {
            to: to,
            from: !from?emailFromDefault:from,
            subject: !subject?'Subject default':subject,
            text: !text?'Text default':text,
            html: htmlFinal,
        }

        console.log(msg)

        email.send(msg).then((data)=>{
            console.log(data)
            return true
        },error=>{
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
            return false
        })
    }else{
        console.error("Por favor, informe o email destino")
        return false
    }

}