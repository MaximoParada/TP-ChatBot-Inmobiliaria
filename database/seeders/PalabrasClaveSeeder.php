<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PalabrasClaveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $respuestas = DB::table('respuestas_bot')->pluck('id', 'clave');

        $palabras = [
            ['palabra' => 'quiero alquilar', 'clave' => 'alquiler_pasos'],
            ['palabra' => 'requisitos alquiler', 'clave' => 'alquiler_requisitos'],
            ['palabra' => 'quiero comprar', 'clave' => 'compra_pasos'],
            ['palabra' => 'requisitos comprar', 'clave' => 'compra_requisitos'],
            ['palabra' => 'horarios y telefono', 'clave' => 'contacto_info'],
        ];

        $filas = [];
        foreach ($palabras as $item) {
            if (isset($respuestas[$item['clave']])) {
                $filas[] = [
                    'palabra' => $item['palabra'],
                    'respuesta_bot_id' => $respuestas[$item['clave']],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        DB::table('palabras_clave')->insert($filas);
    }
}
