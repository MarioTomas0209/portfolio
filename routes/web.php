<?php

use App\Http\Controllers\DeveloperController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class, 'index'])->name('home');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware(['auth', 'verified'])->group(function () {
    //? Ruta para desarrolladores
    Route::get('/developer', [DeveloperController::class, 'index'])->name('developer.index');

    // ?Ruta para servicios
    Route::get('/service', [ServiceController::class, 'index'])->name('service.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
