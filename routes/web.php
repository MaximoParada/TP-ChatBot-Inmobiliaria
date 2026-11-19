<?php

use Illuminate\Support\Facades\Route;

// Ruta para la página principal (Home)
Route::get('/', function () {
    $propiedades = collect([
        (object) [
            'id' => 1,
            'titulo' => 'Departamento en Edificio Horizonte',
            'operacion' => 'alquiler',
            'direccion' => 'Av. Argentina 450',
            'zona' => 'Centro',
            'ambientes' => 2,
            'dormitorios' => 1,
            'metros_cuadrados' => 54,
            'precio' => 480000,
            'expensas' => 65000,
            'imagenes_lista' => [
                'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
            ],
        ],
        // Duplicado con id = 1 para verificar que no se repita
        (object) [
            'id' => 1,
            'titulo' => 'Departamento en Edificio Horizonte (DUPLICADO)',
            'operacion' => 'alquiler',
            'direccion' => 'Av. Argentina 450',
            'zona' => 'Centro',
            'ambientes' => 2,
            'dormitorios' => 1,
            'metros_cuadrados' => 54,
            'precio' => 480000,
            'expensas' => 65000,
            'imagenes_lista' => [
                'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
            ],
        ],
        (object) [
            'id' => 2,
            'titulo' => 'Monoambiente Luminoso',
            'operacion' => 'alquiler',
            'direccion' => 'Diag. 9 de Julio 120',
            'zona' => 'Zona Este',
            'ambientes' => 1,
            'dormitorios' => 0,
            'metros_cuadrados' => 36,
            'precio' => 350000,
            'expensas' => 0,
            'imagenes_lista' => [
                'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
            ],
        ],
        (object) [
            'id' => 3,
            'titulo' => 'Casa con Patio en Complejo Jardines',
            'operacion' => 'venta',
            'direccion' => 'Los Robles 890',
            'zona' => 'Alta Barda',
            'ambientes' => 3,
            'dormitorios' => 2,
            'metros_cuadrados' => 125,
            'precio' => 145000000,
            'expensas' => null,
            'imagenes_lista' => [
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
            ],
        ],
    ]);

    return view('pagina.inicio', compact('propiedades'));
});

// Ruta para la sección "Nosotros"
Route::get('/nosotros', function () {
    return view('pagina.nosotros');
});

// Ruta para la sección "Tasaciones"
Route::get('/tasaciones', function () {
    return view('pagina.tasaciones');
});