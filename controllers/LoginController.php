<?php

namespace Controllers;

use Classes\Email;
use Model\Usuario;
use MVC\Router;

class LoginController {

    public static function login(Router $router) {
        //echo "Desde Login";

        if($_SERVER['REQUEST_METHOD'] === 'POST') {

        }

        //Render a la vista
        $router->render('auth/login', [
            'titulo' => 'Iniciar Sesión'
        ]);
    }

    public static function logout() {
        echo "Desde Login";

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            
        }
    }

    public static function crear(Router $router) {
        $alertas = [];
        $usuario = new Usuario;

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuario->sincronizar($_POST);

            $alertas = $usuario->validarNuevaCuenta();

            $existeUsuario = Usuario::where('email', $usuario->email);

            if($existeUsuario) {
                Usuario::setAlerta('error', 'El Usuario ya está registrado');
                $alertas = Usuario::getAlertas();
            } else {
                //Hashear el password
                $usuario->hashPassword();

                //Eliminar el password2 de comprobacion
                unset($usuario->password2);

                //Crear el token
                $usuario->crearToken();

                //Crear el nuevo usuario
                $resultado = $usuario->guardar();

                //Enviar email
                $email = new Email($usuario->email, $usuario->nombre, $usuario->token);
                $email->enviarConfirmacion();

                if($resultado) {
                    header('Location: /mensaje');
                }
            }
        }

        $router->render('auth/crear', [
            'titulo' => 'Crear',
            'usuario' => $usuario,
            'alertas' => $alertas
        ]);
    }

    public static function olvide(Router $router) {

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            
        }

        $router->render('auth/olvide', [
            'titulo' => 'Olvide'
        ]);
    }

    public static function restablecer(Router $router) {

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            
        }
        $router->render('auth/restablecer', [
            'titulo' => 'Restablecer'
        ]);

    }

    public static function mensaje(Router $router) {

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            
        }

        $router->render('auth/mensaje', [
            'titulo' => 'mensaje'
        ]);
    }

    public static function confirmar(Router $router) {

        $token = s($_GET['token']);
        if(!$token) {
            header('Location: /');
        }

        //Encontrar al usuario con este token
        $usuario = Usuario::where('token', $token);

        if(empty($usuario)) {
            Usuario::setAlerta('error', 'Token No Válido');
        } else {
            //Confirmar la cuenta
            $usuario->confirmado = 1;
            $usuario->token = null;
            unset($usuario->password2);
            $usuario->guardar();
            Usuario::setAlerta('exito', 'Cuenta comprobada correctamente');
        }


        $alertas = Usuario::getAlertas();


        $router->render('auth/confirmar', [
            'titulo' => 'confirmar',
            'alertas' => $alertas
        ]);
    }
}