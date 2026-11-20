<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReferenciaTasacion extends Model
{
    protected $table = 'referencia_tasaciones';

    protected $fillable = [
        'zona',
        'tipo_propiedad',
        'operacion',
        'valor_m2',
    ];
}
