<?php 

use Dotenv\Dotenv as Dot;
require 'funciones.php';
require 'database.php';
require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dot::createImmutable(__DIR__);
$dotenv->safeLoad();

$db = conectarDB();

// Conectarnos a la base de datos
use Model\ActiveRecord;
ActiveRecord::setDB($db);