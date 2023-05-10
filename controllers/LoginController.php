<?php

namespace Controllers;

use MVC\Router;

class LoginController {

    public static function login(Router $router) {
        //echo "Desde Login";

        if($_SERVER['REQUEST_METHOS'] === 'POST') {

        }

        //Render a la vista
        $router->render('auth/login', [
            'titulo' => 'Iniciar Sesión'
        ]);
    }

    public static function logout() {
        echo "Desde Login";

        if($_SERVER['REQUEST_METHOS'] === 'POST') {
            
        }
    }

    public static function crear(Router $router) {

        if($_SERVER['REQUEST_METHOS'] === 'POST') {
            
        }

        $router->render('auth/crear', [
            'titulo' => 'Crear'
        ]);
    }

    public static function olvide() {
        echo "Desde Login";

        if($_SERVER['REQUEST_METHOS'] === 'POST') {
            
        }
    }

    public static function restablecer() {
        echo "Desde Login";

        if($_SERVER['REQUEST_METHOS'] === 'POST') {
            
        }
    }

    public static function mensaje() {
        echo "Desde Login";

        if($_SERVER['REQUEST_METHOS'] === 'POST') {
            
        }
    }

    public static function confirmar() {
        echo "Desde Login";

        if($_SERVER['REQUEST_METHOS'] === 'POST') {
            
        }
    }
}