<?php

use Illuminate\Support\Facades\Route;

// Ruta para la página principal (Home)
Route::get('/', function () {
    return view('inicio');
});

// Ruta para la sección "Nosotros"
Route::get('/nosotros', function () {
    return view('nosotros');
});

// Ruta para la sección "Tasaciones"
Route::get('/tasaciones', function () {
    return view('tasaciones');
});
