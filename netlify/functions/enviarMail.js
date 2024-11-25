const nodemailer = require('nodemailer');

exports.handler = async function(event) {
  try {
    // Parsear el cuerpo de la solicitud
    const body = JSON.parse(event.body);

    // Crear transportador de nodemailer usando tu servicio de email preferido
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // o el servicio de correo que estés utilizando
      auth: {
        user: 'tekillama@gmail.com', // tu correo electrónico
        pass: 'sogy gkud bxwx ieov' // tu contraseña
      }
    });

    // Opciones del correo
    const mailOptions = {
      from: 'tekillama@gmail.com', // dirección del remitente
      to: body.to, // dirección del destinatario
      subject: body.subject, // asunto del correo
      text: body.text, // cuerpo del correo en texto plano
      attachments: [
        {
          filename: body.attachment.name,
          content: Buffer.from(body.attachment.content, 'base64'),
          contentType: 'application/pdf'
        }
      ]
    };

    // Enviar correo
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado: %s', info.messageId);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Correo enviado exitosamente' })
    };
  } catch (error) {
    console.error('Error enviando el correo:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error enviando el correo' })
    };
  }
};
