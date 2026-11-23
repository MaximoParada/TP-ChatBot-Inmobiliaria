<?php

namespace App\Http\Controllers;

use App\Models\Propiedad;
use Illuminate\Http\Request;

class InmobiliariaController extends Controller
{
    // Vista principal (Inicio) con las tarjetas de propiedades
    public function inicio(Request $request)
    {
        $query = Propiedad::query();

        if ($request->filled('operacion')) {
            $query->where('operacion', $request->operacion);
        }

        if ($request->filled('buscar')) {
            $termino = $request->buscar;
            $query->where(function ($q) use ($termino) {
                $q->where('titulo', 'like', "%{$termino}%")
                  ->orWhere('direccion', 'like', "%{$termino}%")
                  ->orWhere('zona', 'like', "%{$termino}%");
            });
        }

        $propiedades = $query->get()->unique('id')->values();

        return view('pagina.inicio', compact('propiedades'));
    }

    // Vista Nosotros
    public function nosotros()
    {
        return view('pagina.nosotros');
    }

    // Vista Tasaciones
    public function tasaciones()
    {
        return view('pagina.tasaciones');
    }

    // Endpoint AJAX para el buscador de propiedades
    public function filtrar(Request $request)
    {
        $query = Propiedad::query();

        if ($request->filled('operacion')) {
            $query->where('operacion', $request->operacion);
        }

        if ($request->filled('zona')) {
            $query->where('zona', 'like', '%' . $request->zona . '%');
        }

        if ($request->filled('ambientes')) {
            if ((int) $request->ambientes >= 3) {
                $query->where('ambientes', '>=', 3);
            } else {
                $query->where('ambientes', (int) $request->ambientes);
            }
        }

        if ($request->filled('presupuesto')) {
            if ($request->presupuesto === 'low') {
                $query->where('precio', '<=', 450000);
            } elseif ($request->presupuesto === 'mid') {
                $query->whereBetween('precio', [450000, 800000]);
            } elseif ($request->presupuesto === 'high') {
                $query->where('precio', '>', 800000);
            }
        }

        $propiedades = $query->get()->unique('id')->values();

        return response()->json($propiedades);
    }
}