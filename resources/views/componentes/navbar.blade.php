<header class="custom-header">
    <div class="custom-navbar-container">

        <!-- Links con Reactividad -->
        <ul class="nav-menu-links">
            <li>
                <a href="{{ url('/') }}" class="{{ request()->is('/') ? 'active' : '' }}">
                    Inicio
                </a>
            </li>
            <li>
                <a href="{{ url('/nosotros') }}" class="{{ request()->is('nosotros') ? 'active' : '' }}">
                    Nosotros
                </a>
            </li>
            <li>
                <a href="{{ url('/tasaciones') }}" class="{{ request()->is('tasaciones') ? 'active' : '' }}">
                    Tasaciones
                </a>
            </li>
        </ul>

    </div>
</header>