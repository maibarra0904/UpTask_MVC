<?php

namespace Controllers;

use Model\Proyecto;
use MVC\Router;

class TareaController {
    public static function index(Router $router) {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            
        }

    }

    public static function crear(Router $router) {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            
            session_start();
            $proyectoId = $_POST['proyectoId'];

            $proyecto = Proyecto::where('url', $proyectoId);

            if(!$proyecto || $proyecto->propietarioId !== $_SESSION['id']) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Hubo un error al agregar la tarea'
                ];
                echo json_encode($respuesta);
            } else {
                $respuesta = [
                    'tipo' => 'exito',
                    'mensaje' => 'Tarea agregada correctamente'
                ];
                echo json_encode($respuesta);
            }

        }
        
    }

    public static function actualizar(Router $router) {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            
        }
        
    }
    
    public static function eliminar(Router $router) {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            
        }
        
    }

}