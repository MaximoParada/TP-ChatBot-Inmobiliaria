<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Loncoprop - Servicios Inmobiliarias</title>   
    
        <!-- Bootstrap 5 -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">

        <link rel="stylesheet" href="{{ asset('css/estilos.css') }}">

        <meta name="csrf-token" content="{{ csrf_token() }}">
    </head>
    <body>

        @include('componentes.navbar')

        <main>
            @yield('contenido')
        </main>

        @include('componentes.footer')


        <script src="{{ asset('js/app.js') }}"></script>

    </body>
</html>