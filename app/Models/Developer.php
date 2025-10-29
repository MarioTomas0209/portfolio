<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Developer extends Model
{
    protected $fillable = [
        'name',
        'is_active',
        'image',
        'job',
        'location',
        'github',
        'linkedin',
        'whatsapp',
        'email',
        'facebook',
        'instagram',
        'portfolio',
        'cv',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

}
