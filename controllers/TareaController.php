<?php

namespace Controllers;

use Model\Proyecto;
use Model\Tarea;
use MVC\Router;

class TareaController {
    public static function index() {


        $proyectoId = $_GET['id'];

        if(!$proyectoId) header('Location: /dashboard');

        $proyecto = Proyecto::where('url', $proyectoId);

        session_start();

        if(!$proyecto || $proyecto->propietarioId !== $_SESSION['id']) header('Location: /404');

        $tareas = Tarea::belongsTo('proyectoId', $proyecto->id);

        echo json_encode(['tareas' => $tareas]);
    }

    public static function crear() {
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
                return;
            }

            //Todo bien, instanciar y crear la tarea

            $tarea = new Tarea($_POST);
            
            //Debido a que se pasa la url es necesario redefinir el codigo del proyecto (Idproyecto)
            $tarea->proyectoId = $proyecto->id;
           
            $resultado = $tarea->guardar();
            
            $respuesta = [
                'tipo' => 'exito',
                'mensaje' => 'Tarea agregada correctamente',
                'id' => $resultado['id'],
                'proyectoId' => $proyecto->id
            ];

            //NO pueden haber dos json_encode en la misma linea de codigo
            echo json_encode($respuesta);
            
            
            
        }
        
    }

    public static function actualizar() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            
            $proyecto = Proyecto::where('url', $_POST['proyectoId']);

            session_start();

            if(!$proyecto || $proyecto->propietarioId !== $_SESSION['id']) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Hubo un error al actualizar la tarea'
                ];
                echo json_encode($respuesta);
                return;
            }
            
            $tarea = new Tarea($_POST);
            $tarea->proyectoId = $proyecto->id;

            $resultado = $tarea->guardar();

            $respuesta = [
                'tipo' => 'exito',
                'mensaje' => "Estado de Tarea '" . $tarea->nombre . " ' actualizado",
                'id' => $tarea->id,
                'proyectoId' => $proyecto->id
            ];

            echo json_encode(['respuesta' => $respuesta]);

        }
        
    }
    
    public static function eliminar(Router $router) {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {

            $proyecto = Proyecto::where('url', $_POST['proyectoId']);

            session_start();

            if(!$proyecto || $proyecto->propietarioId !== $_SESSION['id']) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Hubo un error al actualizar la tarea'
                ];
                echo json_encode($respuesta);
                return;
            }
            
            $tarea = new Tarea($_POST);
            $tarea->proyectoId = $proyecto->id;

            $resultado = $tarea->eliminar();

            $respuesta = [
                'tipo' => 'exito',
                'mensaje' => "Tarea eliminada satisfactoriamente",
                'id' => $tarea->id,
                'proyectoId' => $proyecto->id
            ];

            echo json_encode(['respuesta' => $respuesta]);
        }
        
    }

}