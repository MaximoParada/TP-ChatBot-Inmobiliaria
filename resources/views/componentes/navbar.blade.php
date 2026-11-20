
<header class="lp-navbar">
    <nav class="lp-navbar-container">
        <a href="{{ url('/') }}" class="lp-navbar-logo">LoncoProp</a>

        <ul class="lp-navbar-links">
            <li>
                <a href="{{ url('/') }}" class="{{ request()->is('/') ? 'active' : '' }}">Inicio</a>
            </li>
            <li>
                <a href="{{ url('/nosotros') }}" class="{{ request()->is('nosotros') ? 'active' : '' }}">Nosotros</a>
            </li>
            <li>
                <a href="{{ url('/tasaciones') }}" class="{{ request()->is('tasaciones') ? 'active' : '' }}">Tasaciones</a>
            </li>
        </ul>

        <button type="button" id="btn-asistente-navbar" onclick="abrirAsistente()" class="lp-btn-asistente">
            <img src="{{ asset('img/lonco-boti.svg') }}" alt="Asistente virtual" class="lp-btn-asistente-icon">
            <span class="lp-btn-asistente-text">Asistente virtual</span>
        </button>
    </nav>
</header>