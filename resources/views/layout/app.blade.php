<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Loncoprop - Servicios Inmobiliarias</title>   
    

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