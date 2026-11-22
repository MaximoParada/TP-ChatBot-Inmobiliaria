
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

        <button type="button" class="btn-bot-navbar" onclick="toggleChatbot()">
         <span class="btn-bot-navbar-circulo">
        <img src="{{ asset('img/lonco-boti.svg') }}" alt="LoncoBoti">
    </span>
    <span class="btn-bot-navbar-texto">Asistente virtual</span>
</button>
    </nav>
</header>