<?php

namespace App\Http\Controllers;

use App\Models\Propiedad;
use Database\Seeders\PropiedadesSeeder;
use Illuminate\Http\Request;


class InmobiliariaController extends Controller
{
    // Vista principal (Inicio) con las tarjetas de propiedades
    public function inicio(Request $request)
    {
        $query = Propiedad::query();

        // Filtro opcional por operación (venta / alquiler)
        if ($request->filled('operacion')) {
            $query->where('operacion', $request->operacion);
        }

        // Filtro opcional por búsqueda de texto (dirección, zona o título)
        if ($request->filled('buscar')) {
            $termino = $request->buscar;
            $query->where(function ($q) use ($termino) {
                $q->where('titulo', 'like', "%{$termino}%")
                  ->orWhere('direccion', 'like', "%{$termino}%")
                  ->orWhere('zona', 'like', "%{$termino}%");
            });
        }

        $propiedades = $query->get();

        // Nota: después ajustamos el nombre de la vista si hace falta
        return view('inicio', compact('propiedades'));
    }

    // Vista Nosotros
    public function nosotros()
    {
        return view('nosotros');
    }

    // Vista Tasaciones
    public function tasaciones()
    {
        return view('tasaciones');
    }
}
