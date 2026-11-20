@extends('layouts.app')

@section('title', 'Nosotros — LoncoProp Inmobiliaria')

@section('contenido')
<div class="container py-5" style="max-width: 1100px;">

    {{-- 1. TÍTULO Y ENFOQUE --}}
    <section class="mb-5">
        <span class="text-uppercase fw-semibold text-muted small d-block mb-3" style="letter-spacing: 0.08em;">
            Sobre LoncoProp
        </span>

        <h1 class="titulo-nosotros fw-bolder mb-4">
            Redefinimos la forma de encontrar tu próximo lugar.
        </h1>

        <p class="nosotros-lead text-muted mb-0">
            Combinamos el conocimiento local del mercado inmobiliario con herramientas digitales ágiles para que alquilar, comprar o tasar sea un proceso transparente y sin demoras.
        </p>
    </section>

    {{-- 2. IMAGEN PANORÁMICA --}}
    <div class="nosotros-banner mb-5">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80" 
             alt="Oficina moderna minimalista">
    </div>

    {{-- 3. DATOS CLAVE (3 COLUMNAS) --}}
    <section class="row g-4 py-4 border-top border-bottom my-5">
        <div class="col-12 col-md-4">
            <div class="stat-number fw-bolder">+450</div>
            <p class="text-muted small mb-0">Propiedades gestionadas en toda la región.</p>
        </div>

        <div class="col-12 col-md-4">
            <div class="stat-number fw-bolder">24/7</div>
            <p class="text-muted small mb-0">Atención inmediata mediante nuestro asistente virtual.</p>
        </div>

        <div class="col-12 col-md-4">
            <div class="stat-number fw-bolder">98%</div>
            <p class="text-muted small mb-0">De clientes que concretan su búsqueda en menos de 15 días.</p>
        </div>
    </section>

    {{-- 4. CÓMO TRABAJAMOS (PILARES) --}}
    <section class="row g-5 align-items-start my-5">
        <div class="col-12 col-lg-4">
            <h2 class="h4 fw-bold mb-3" style="letter-spacing: -0.02em;">Cómo trabajamos</h2>
            <p class="text-muted small mb-0" style="line-height: 1.6;">
                Eliminamos la burocracia innecesaria para conectar personas con espacios reales.
            </p>
        </div>

        <div class="col-12 col-lg-8">
            <div class="row g-4">
                <div class="col-12 col-md-6">
                    <article class="pillar-card h-100">
                        <h3 class="h6 fw-bold mb-2">Búsqueda Inteligente</h3>
                        <p class="text-muted small mb-0">
                            Nuestro chatbot filtra opciones según tu presupuesto, zona y cantidad de ambientes en segundos.
                        </p>
                    </article>
                </div>

                <div class="col-12 col-md-6">
                    <article class="pillar-card h-100">
                        <h3 class="h6 fw-bold mb-2">Tasaciones Reales</h3>
                        <p class="text-muted small mb-0">
                            Evaluamos cada propiedad con datos actualizados del mercado para asegurar valores justos y competitivos.
                        </p>
                    </article>
                </div>

                <div class="col-12 col-md-6">
                    <article class="pillar-card h-100">
                        <h3 class="h6 fw-bold mb-2">Visitas Coordinadas</h3>
                        <p class="text-muted small mb-0">
                            Agendá recorridos presenciales o virtuales directamente desde el chat sin esperas telefónicas.
                        </p>
                    </article>
                </div>

                <div class="col-12 col-md-6">
                    <article class="pillar-card h-100">
                        <h3 class="h6 fw-bold mb-2">Acompañamiento Legal</h3>
                        <p class="text-muted small mb-0">
                            Te asesoramos en contratos, garantías y documentación hasta la entrega de llaves.
                        </p>
                    </article>
                </div>
            </div>
        </div>
    </section>

    {{-- 5. LLAMADO A LA ACCIÓN DIRECTO AL BOT --}}
    <section class="nosotros-cta text-center text-white mt-5">
        <h2 class="fw-bold mb-3">¿Tenés dudas sobre cómo empezar?</h2>
        <p class="mx-auto mb-4">
            Probá nuestro asistente virtual en la esquina inferior derecha o iniciá una consulta guiada ahora mismo.
        </p>
        <button type="button" onclick="toggleChatbot()" class="btn btn-light rounded-pill px-4 py-3 fw-semibold btn-nosotros-cta">
            Iniciar consulta en el chat
        </button>
    </section>

</div>
@endsection