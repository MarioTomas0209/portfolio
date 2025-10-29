<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DeveloperController;

Route::post('/developer', [DeveloperController::class, 'store'])->name('api.developer.store');
Route::put('/developer/{id}', [DeveloperController::class, 'update'])->name('api.developer.update');
Route::delete('/developer/{id}', [DeveloperController::class, 'destroy'])->name('api.developer.destroy');
