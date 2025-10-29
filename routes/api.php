<?php

use App\Http\Controllers\DeveloperController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//? Apis para el modulo de Developers
require __DIR__ . '/developer.php';

//? Apis para el modulo de servicios
require __DIR__ . '/service.php';