



//-----------------------------------------INICIO-----------------------------------------------//


document.addEventListener('DOMContentLoaded', () => {
  const formBusqueda = document.querySelector('.search-bar');
  const tarjetasPropiedades = document.querySelectorAll('.property-card');

  if (formBusqueda) {
    formBusqueda.addEventListener('submit', (evento) => {
      evento.preventDefault();

      const selects = formBusqueda.querySelectorAll('select');
      const filtros = {
        operacion: selects[0]?.value || '',
        zona: selects[1]?.value || '',
        ambientes: selects[2]?.value || '',
        presupuesto: selects[3]?.value || ''
      };

      console.log('Filtros seleccionados:', filtros);
    });
  }

  tarjetasPropiedades.forEach((tarjeta) => {
    tarjeta.addEventListener('click', () => {
      const titulo = tarjeta.querySelector('.card-title')?.textContent.trim();
      const ubicacion = tarjeta.querySelector('.card-location')?.textContent.trim();

      console.log(`Propiedad seleccionada: ${titulo} - ${ubicacion}`);
    });
  });
});

/* --- Carrusel en tarjetas de propiedades (Inicio) --- */
  const carruseles = document.querySelectorAll('.card-carousel');

  carruseles.forEach((carrusel) => {
    const slides = carrusel.querySelectorAll('.carousel-slide');
    const dots = carrusel.querySelectorAll('.carousel-dot');
    const btnPrev = carrusel.querySelector('.carousel-btn.prev');
    const btnNext = carrusel.querySelector('.carousel-btn.next');

    if (slides.length <= 1) return;

    const mostrarSlide = (nuevoIndice) => {
      const total = slides.length;
      const indice = (nuevoIndice + total) % total;

      slides.forEach((slide, i) => slide.classList.toggle('active', i === indice));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === indice));
      carrusel.dataset.index = String(indice);
    };

    btnPrev?.addEventListener('click', (e) => {
      e.stopPropagation();
      const actual = Number(carrusel.dataset.index || 0);
      mostrarSlide(actual - 1);
    });

    btnNext?.addEventListener('click', (e) => {
      e.stopPropagation();
      const actual = Number(carrusel.dataset.index || 0);
      mostrarSlide(actual + 1);
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        mostrarSlide(Number(dot.dataset.slide || 0));
      });
    });
  });


//-------------------------------------NOSOTROS--------------------------------------------------//


