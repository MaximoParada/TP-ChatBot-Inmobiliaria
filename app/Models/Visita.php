<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visita extends Model
{
    protected $table = 'visitas';

    protected $fillable = [
        'propiedad_id',
        'nombre_cliente',
        'telefono_cliente',
        'fecha_elegida',
    ];

    // Relación Inversa: Una visita pertenece a una propiedad
    public function propiedad()
    {
        return $this->belongsTo(Propiedad::class, 'propiedad_id');
    }
}
