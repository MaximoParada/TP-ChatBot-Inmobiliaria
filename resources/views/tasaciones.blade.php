<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tasaciones — LoncoProp</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{{ asset('css/estilos.css') }}">
</head>
<body>

  <nav class="navbar">
    <a href="{{ url('/') }}" class="brand">LoncoProp</a>
    <ul class="nav-links">
      <li><a href="{{ url('/') }}#propiedades">Propiedades</a></li>
      <li><a href="{{ url('/nosotros') }}">Nosotros</a></li>
      <li><a href="{{ url('/tasaciones') }}">Tasaciones</a></li>
    </ul>
  </nav>

  <main class="container">
    <section class="about-header">
      <span class="tag">Tasaciones Online</span>
      <h1 class="page-title">Conocé el valor real de tu propiedad en pocos minutos.</h1>
      <p class="page-lead">
        Nuestros tasadores expertos combinan datos actualizados del mercado inmobiliario local con inteligencia artificial para ofrecerte una cotización precisa.
      </p>
    </section>

    <section class="form-container">
      <h2 class="form-title">Solicitar tasación profesional</h2>
      
      <form action="{{ route('tasaciones.enviar') }}" method="POST" class="form-group">
        @csrf
        <div class="form-field">
          <label class="form-label">Dirección de la propiedad</label>
          <input type="text" name="direccion" placeholder="Ej: Av. Argentina 1200" required class="form-input">
        </div>

        <div class="form-field">
          <label class="form-label">Tipo de inmueble</label>
          <select name="tipo" class="form-select">
            <option value="casa">Casa</option>
            <option value="departamento">Departamento</option>
            <option value="terreno">Terreno</option>
            <option value="comercial">Local Comercial</option>
          </select>
        </div>

        <div class="form-field">
          <label class="form-label">Superficie aproximada (m2)</label>
          <input type="number" name="superficie" placeholder="Ej: 80" required class="form-input">
        </div>

        <div class="form-field">
          <label class="form-label">Correo electrónico de contacto</label>
          <input type="email" name="email" placeholder="tu@email.com" required class="form-input">
        </div>

        <button type="submit" class="form-button">Enviar solicitud de tasacion</button>
      </form>
    </section>
  </main>
<!--cambiar cod viejo -->
  <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>