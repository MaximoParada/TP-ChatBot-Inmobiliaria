<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nosotros — LoncoProp</title>
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
      <span class="tag">Sobre LoncoProp</span>
      <h1 class="page-title">Transformamos la forma de encontrar tu lugar en la ciudad.</h1>
      <p class="page-lead">
        Combinamos el trato cercano de nuestros corredores inmobiliarios con tecnología ágil para que comprar, vender o alquilar sea un proceso transparente y sin demoras.
      </p>
    </section>

    <section class="stats-grid">
      <div class="stat-item">
        <h3>+{{ $totalPropiedades ?? '120' }}</h3>
        <p>Propiedades gestionadas en cartera</p>
      </div>
      <div class="stat-item">
        <h3>24/7</h3>
        <p>Atención inmediata con asistente virtual</p>
      </div>
      <div class="stat-item">
        <h3>100%</h3>
        <p>Operaciones respaldadas y verificadas</p>
      </div>
    </section>

    <section>
      <h2 class="team-title">Nuestro equipo de asesores</h2>
      <div class="team-grid">
        @foreach($asesores as $asesor)
        <article class="team-card">
          <img src="{{ $asesor->foto }}" alt="{{ $asesor->nombre }}" class="team-img">
          <h3 class="team-name">{{ $asesor->nombre }}</h3>
          <p class="team-role">{{ $asesor->cargo }}</p>
        </article>
        @endforeach
      </div>
    </section>
  </main>

  <script src="{{ asset('js/nosotros.js') }}"></script>
</body>
</html> 