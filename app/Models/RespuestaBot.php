<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RespuestaBot extends Model
{
    protected $table = 'respuestas_bot';

    protected $fillable = [
        'clave',
        'titulo',
        'contenido',
    ];

    // Relación 1 a Muchos: Una respuesta puede tener varias palabras clave asociadas
    public function palabrasClave()
    {
        return $this->hasMany(PalabraClave::class, 'respuesta_bot_id');
    }
}
