<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PropiedadesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('propiedades')->insert([
            [
                'id' => 101,
                'titulo' => 'Departamento en venta',
                'operacion' => 'venta',
                'direccion' => 'Leloir 905 - Neuquén',
                'zona' => 'Zona Este',
                'ambientes' => 2,
                'dormitorios' => 1,
                'metros_cuadrados' => 45,
                'precio' => 15000000.00,
                'expensas' => 315000.00,
                'imagenes' => json_encode([
                    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
                ]),
                'horarios_visita' => json_encode([
                    'Martes 10:00 hs',
                    'Jueves 15:30 hs',
                    'Viernes 11:00 hs'
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 102,
                'titulo' => 'Departamento en alquiler',
                'operacion' => 'alquiler',
                'direccion' => 'Av. Argentina 420 - Neuquén',
                'zona' => 'Centro',
                'ambientes' => 2,
                'dormitorios' => 1,
                'metros_cuadrados' => 50,
                'precio' => 650000.00,
                'expensas' => 95000.00,
                'imagenes' => json_encode([
                    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
                ]),
                'horarios_visita' => json_encode([
                    'Miércoles 09:30 hs',
                    'Viernes 16:00 hs'
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 103,
                'titulo' => 'Casa en ventaaaaa xd lol',
                'operacion' => 'venta',
                'direccion' => 'Bardas Soleadas 180 - Neuquén',
                'zona' => 'Alta Barda',
                'ambientes' => 4,
                'dormitorios' => 3,
                'metros_cuadrados' => 120,
                'precio' => 185000000.00,
                'expensas' => 0.00,
                'imagenes' => json_encode([
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80'
                ]),
                'horarios_visita' => json_encode([
                    'Lunes 14:00 hs',
                    'Jueves 11:00 hs'
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

    }
}
