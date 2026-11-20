@extends('layouts.app')

@section('title', 'Tasaciones — LoncoProp Inmobiliaria')

@section('contenido')
<div class="container py-5" style="max-width: 1100px;">
    <div class="row g-5 align-items-start">

        {{-- COLUMNA IZQUIERDA: Información y pasos --}}
        <div class="col-12 col-lg-6">
            <span class="text-uppercase fw-semibold text-muted small d-block mb-2" style="letter-spacing: 0.08em;">
                Valuación Profesional
            </span>

            <h1 class="titulo-tasaciones fw-bolder mb-3">
                Conocé el valor real de tu propiedad.
            </h1>

            <p class="text-muted fs-6 mb-5">
                Analizamos la ubicación, metros cuadrados y demanda actual de la zona para entregarte una tasación precisa en menos de 24 horas.
            </p>

            {{-- Lista de 3 pasos --}}
            <div class="d-flex align-items-start gap-3 mb-4">
                <span class="step-circle">1</span>
                <div>
                    <h3 class="h6 fw-bold mb-1">Compartí los datos básicos</h3>
                    <p class="text-muted small mb-0">Indicá tipo de inmueble, barrio y superficie aproximada.</p>
                </div>
            </div>

            <div class="d-flex align-items-start gap-3 mb-4">
                <span class="step-circle">2</span>
                <div>
                    <h3 class="h6 fw-bold mb-1">Análisis comparativo</h3>
                    <p class="text-muted small mb-0">Comparamos valores reales de cierre en tu misma zona.</p>
                </div>
            </div>

            <div class="d-flex align-items-start gap-3 mb-5">
                <span class="step-circle">3</span>
                <div>
                    <h3 class="h6 fw-bold mb-1">Informe sin compromiso</h3>
                    <p class="text-muted small mb-0">Recibís el rango estimado para vender o alquilar rápido.</p>
                </div>
            </div>

            {{-- Aviso al chatbot --}}
            <div class="bg-light rounded-4 p-4 small" role="button" onclick="toggleChatbot()">
                <strong class="d-block mb-1">¿Preferís hacerlo más rápido?</strong>
                Abrí nuestro asistente virtual abajo a la derecha y seleccioná <em>"Quiero tasar mi propiedad"</em> para guiarte paso a paso.
            </div>
        </div>

        {{-- COLUMNA DERECHA: Formulario --}}
        <div class="col-12 col-lg-6">
            <div class="form-card bg-white border rounded-4 p-4 p-md-5">
                <h2 class="h4 fw-bold mb-1">Solicitar tasación</h2>
                <p class="text-muted small mb-4">Completá los datos y un asesor se comunicará con vos.</p>

                <form id="tasacionForm">
                    @csrf

                    <div class="row g-3 mb-3">
                        <div class="col-12 col-sm-6">
                            <label for="operacion" class="form-label fw-semibold small">Objetivo</label>
                            <select id="operacion" name="operacion" class="form-select" required>
                                <option value="venta">Quiero Vender</option>
                                <option value="alquiler">Quiero Alquilar</option>
                            </select>
                        </div>

                        <div class="col-12 col-sm-6">
                            <label for="tipo" class="form-label fw-semibold small">Tipo de propiedad</label>
                            <select id="tipo" name="tipo" class="form-select" required>
                                <option value="departamento">Departamento</option>
                                <option value="casa">Casa</option>
                                <option value="terreno">Terreno / Lote</option>
                                <option value="local">Local Comercial</option>
                            </select>
                        </div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-12 col-sm-6">
                            <label for="zona" class="form-label fw-semibold small">Zona o Barrio</label>
                            <input type="text" id="zona" name="zona" class="form-control" placeholder="Ej: Centro, Alta Barda..." required>
                        </div>

                        <div class="col-12 col-sm-6">
                            <label for="metros" class="form-label fw-semibold small">Superficie aprox. (m²)</label>
                            <input type="number" id="metros" name="metros" class="form-control" placeholder="Ej: 85" required>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="nombre" class="form-label fw-semibold small">Tu nombre</label>
                        <input type="text" id="nombre" name="nombre" class="form-control" placeholder="Nombre y apellido" required>
                    </div>

                    <div class="mb-4">
                        <label for="contacto" class="form-label fw-semibold small">Teléfono o WhatsApp</label>
                        <input type="tel" id="contacto" name="contacto" class="form-control" placeholder="+54 299 ..." required>
                    </div>

                    <button type="submit" class="btn btn-dark w-100 rounded-pill py-3 fw-semibold">
                        Solicitar valuación gratuita
                    </button>

                    <div class="alert alert-success mt-3 mb-0 text-center small d-none" id="successMsg" role="alert">
                        ¡Solicitud recibida! Un asesor analizará los datos de tu propiedad y te contactará a la brevedad.
                    </div>
                </form>
            </div>
        </div>

    </div>
</div>
@endsection