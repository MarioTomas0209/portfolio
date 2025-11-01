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


    /**
     * Accesor para convertir la ruta del CV a URL
     */
    public function getCvAttribute($value)
    {
        if (!$value) {
            return null;
        }
        
        // Si ya es una URL completa (empieza con http:// o https://), retornarla tal cual
        if (filter_var($value, FILTER_VALIDATE_URL)) {
            return $value;
        }
        
        // Si empieza con /storage/, ya es una URL relativa, retornarla tal cual
        if (str_starts_with($value, '/storage/')) {
            return $value;
        }
        
        // Si no, es una ruta de storage (sin /storage/) y la convertimos a URL
        return Storage::url($value);
    }

}
