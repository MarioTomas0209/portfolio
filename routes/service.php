<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceController;

Route::post('/service', [ServiceController::class, 'store'])->name('api.service.store');
