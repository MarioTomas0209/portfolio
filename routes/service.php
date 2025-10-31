<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceController;

Route::post('/service', [ServiceController::class, 'store'])->name('api.service.store');
Route::put('/service/{id}', [ServiceController::class, 'update'])->name('api.service.update');
Route::delete('/service/{id}', [ServiceController::class, 'destroy'])->name('api.service.destroy');
