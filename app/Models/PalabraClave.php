<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PalabraClave extends Model
{
    protected $table = 'palabras_clave';

    protected $fillable = [
        'palabra',
        'respuesta_bot_id',
    ];

    // Relación Inversa: Una palabra clave pertenece a una respuesta del bot
    public function respuesta()
    {
        return $this->belongsTo(RespuestaBot::class, 'respuesta_bot_id');
    }
}
