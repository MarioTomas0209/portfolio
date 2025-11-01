<?php

namespace App\Http\Controllers;

use App\Models\Developer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        $developers = Developer::where('is_active', true)->get();
        
        return Inertia::render('Welcome', [
            'developers' => $developers,
        ]);
    }
}
