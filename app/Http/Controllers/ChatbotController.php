<?php

namespace App\Http\Controllers;

use App\Models\PalabraClave;
use App\Models\Propiedad;
use App\Models\ReferenciaTasacion;
use App\Models\RespuestaBot;
use App\Models\Visita;
use Illuminate\Http\Request;

class ChatbotController extends Controller
{
    // 1. Obtener una respuesta fija por su clave (ej: alquiler_pasos, compra_requisitos, contacto_info)
    public function obtenerRespuesta($clave)
    {
        $respuesta = RespuestaBot::where('clave', $clave)->first();

        if (!$respuesta) {
            return response()->json([
                'ok' => false,
                'mensaje' => 'No encontré información para esa opción.'
            ], 404);
        }

        return response()->json([
            'ok' => true,
            'titulo' => $respuesta->titulo,
            'contenido' => $respuesta->contenido
        ]);
    }

    // 2. Buscar coincidencias cuando el usuario escribe en el teclado de BotUI
    public function buscarPorPalabra(Request $request)
    {
        $texto = strtolower(trim($request->input('texto', '')));

        if ($texto === '') {
            return response()->json(['ok' => false, 'sugerencias' => []]);
        }

        // Busca palabras clave que coincidan con lo que escribió el usuario
        $coincidencias = PalabraClave::with('respuesta')
            ->where('palabra', 'like', "%{$texto}%")
            ->get();

        if ($coincidencias->isEmpty()) {
            return response()->json([
                'ok' => false,
                'mensaje' => 'No entendí bien tu consulta. Probá eligiendo una de las opciones del menú.'
            ]);
        }

        // Si hay una coincidencia exacta o única, devuelve directo la respuesta
        if ($coincidencias->count() === 1) {
            $resp = $coincidencias->first()->respuesta;
            return response()->json([
                'ok' => true,
                'tipo' => 'respuesta_unica',
                'titulo' => $resp->titulo,
                'contenido' => $resp->contenido
            ]);
        }

        // Si hay varias opciones posibles, devuelve la lista para mostrar botones en BotUI
        $sugerencias = $coincidencias->map(function ($item) {
            return [
                'palabra' => $item->palabra,
                'clave' => $item->respuesta->clave,
                'titulo' => $item->respuesta->titulo,
            ];
        });

        return response()->json([
            'ok' => true,
            'tipo' => 'sugerencias',
            'sugerencias' => $sugerencias
        ]);
    }

    // 3. Validar código de propiedad (101, 102, 103) y devolver dirección + horarios disponibles
    public function consultarPropiedad($id)
    {
        $propiedad = Propiedad::find($id);

        if (!$propiedad) {
            $codigosDisponibles = Propiedad::pluck('id')->implode(', ');
            return response()->json([
                'ok' => false,
                'mensaje' => "No encontré ninguna propiedad con el código #{$id}. Los códigos disponibles son: {$codigosDisponibles}."
            ], 404);
        }

        return response()->json([
            'ok' => true,
            'id' => $propiedad->id,
            'titulo' => $propiedad->titulo,
            'direccion' => $propiedad->direccion,
            'horarios_visita' => $propiedad->horarios_visita ?? []
        ]);
    }

    // 4. Guardar la visita coordinada en la tabla 'visitas'
    public function agendarVisita(Request $request)
    {
        $datos = $request->validate([
            'propiedad_id' => 'required|exists:propiedades,id',
            'nombre_cliente' => 'required|string|max:100',
            'telefono_cliente' => 'required|string|max:50',
            'fecha_elegida' => 'required|string|max:100',
        ]);

        $visita = Visita::create($datos);

        return response()->json([
            'ok' => true,
            'mensaje' => "¡Listo {$visita->nombre_cliente}! Tu visita para la propiedad #{$visita->propiedad_id} quedó agendada para el {$visita->fecha_elegida}. Un asesor se va a comunicar al {$visita->telefono_cliente}."
        ]);
    }

    // 5. Calcular tasación aproximada cuando se completa el formulario de Tasaciones
    public function calcularTasacion(Request $request)
    {
        $datos = $request->validate([
            'zona' => 'required|string',
            'tipo_propiedad' => 'required|string',
            'operacion' => 'required|in:venta,alquiler',
            'metros_cuadrados' => 'required|numeric|min:1',
        ]);

        $referencia = ReferenciaTasacion::where('zona', $datos['zona'])
            ->where('tipo_propiedad', strtolower($datos['tipo_propiedad']))
            ->where('operacion', $datos['operacion'])
            ->first();

        // Valor por defecto si la combinación exacta no está cargada en referencias_tasacion
        $valorM2 = $referencia ? $referencia->valor_m2 : ($datos['operacion'] === 'venta' ? 1500000 : 12000);
        $totalEstimado = $valorM2 * $datos['metros_cuadrados'];

        return response()->json([
            'ok' => true,
            'zona' => $datos['zona'],
            'tipo_propiedad' => $datos['tipo_propiedad'],
            'operacion' => $datos['operacion'],
            'metros_cuadrados' => $datos['metros_cuadrados'],
            'valor_m2' => $valorM2,
            'tasacion_aproximada' => $totalEstimado,
            'tasacion_formateada' => '$ ' . number_format($totalEstimado, 0, ',', '.')
        ]);
    }
}
