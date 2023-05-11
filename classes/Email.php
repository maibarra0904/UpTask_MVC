<?php

namespace Classes;
use PHPMailer\PHPMailer\PHPMailer;

class Email {
    protected $email;
    protected $nombre;
    protected $token;

    public function __construct($email, $nombre, $token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    public function enviarConfirmacion() {
        //Crear el objeto de email
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = 'd5f8c9cb561b01';
        $mail->Password = 'afd0e4571e71bd';

        $mail->setFrom('admin@miempresa.com');
        $mail->addAddress('mario.ibarra.86@gmail.com', 'MarioIbarra.com');
        $mail->Subject = 'Confirma tu cuenta';

        //Set HTML
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';

        $contenido = "<html>";
        $contenido .= "<p>Hola <strong> " . $this->nombre . "</strong>. Has creado tu cuenta en UpTask.</p>";
        $contenido .= "<p>Para confirmarla presiona en el siguiente <a href='http://localhost:3000/confirmar?token=" . $this->token ."'>
        enlace</a></p>";
        $contenido .= "<p>Si tu no solicitaste esta cuenta, ignora éste mensaje.</p>";
        $contenido .= "</html>";

        $mail->Body = $contenido;

        //Enviar Email
        $mail->send();
    }
}