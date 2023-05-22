<?php

namespace Model;

class Usuario extends ActiveRecord {
    protected static $tabla = 'usuarios';

    protected static $columnasDB = ['id', 'nombre', 'email', 'password', 'token', 'confirmado'];

    public function __construct($args = [])
    {
            $this->id = $args['id'] ?? null;
            $this->nombre = $args['nombre'] ?? '';
            $this->email = $args['email'] ?? '';
            $this->password = $args['password'] ?? '';
            $this->password2 = $args['password2'] ?? '';
            $this->password_actual = $args['password_actual'] ?? '';
            $this->password_nuevo = $args['password_nuevo'] ?? '';
            $this->token = $args['token'] ?? '';
            $this->confirmado = $args['confirmado'] ?? 0;
    }

    //Validar Login
    public function validarLogin() {
        if(!$this->email) {
            self::$alertas['error'][] = 'El Email del Usuario es Obligatorio';
        } elseif(!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            self::$alertas['error'][] = 'Email no válido';
        }

        if(!$this->password) {
            self::$alertas['error'][] = 'El Password no puede estar vacío';
        }

        return self::$alertas;
    }

    public function validarNuevaCuenta() {
        if(!$this->nombre) {
            self::$alertas['error'][] = 'El Nombre del Usuario es Obligatorio';
        }
        if(!$this->email) {
            self::$alertas['error'][] = 'El Email del Usuario es Obligatorio';
        }

        if(!$this->password) {
            self::$alertas['error'][] = 'El Password no puede estar vacío';
        }

        if(strlen($this->password) <6 ) {
            self::$alertas['error'][] = 'El Password debe contener al menos 6 caracteres';
        }

        if($this->password !== $this->password2) {
            self::$alertas['error'][] = 'Los passwords ingresados no coinciden';
        }

        
        return self::$alertas;
    }

    //Validar Email
    public function validarEmail() {
        if(!$this->email) {
            self::$alertas['error'][] = 'El email es obligatorio';
        } elseif(!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            self::$alertas['error'][] = 'Email no válido';
        }

        return self::$alertas;
    }

    //Validar Password
    public function validarPassword() {
        
        if(!$this->password) {
            self::$alertas['error'][] = 'El Password no puede estar vacío';
        }

        if(strlen($this->password) <6 ) {
            self::$alertas['error'][] = 'El Password debe contener al menos 6 caracteres';
        }
       
        return self::$alertas;
    }

    //Hashea password
    public function hashPassword() {
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    //Generar Token
    public function crearToken() {
        $this->token = uniqid();
    }


    public function validar_perfil() {
        if(!$this->nombre) {
            self::$alertas['error'][] = 'El nombre es obligatorio';
        };
        if(!$this->email) {
            self::$alertas['error'][] = 'El email es obligatorio';
        };

        return self::$alertas;
    }

    public function nuevo_password() {
        if(!$this->password_actual) {
            self::$alertas['error'][] = 'El password actual no puede ir vacio';
        };
        if(!$this->password_nuevo) {
            self::$alertas['error'][] = 'Debe colocar un nuevo password';
        };
        if(strlen($this->password_nuevo) < 6) {
            self::$alertas['error'][] = 'El password debe contener al menos 6 caracteres';
        }
        return self::$alertas;
    }

    public function comprobar_password() {
        return password_verify($this->password_actual, $this->password);
    }
}