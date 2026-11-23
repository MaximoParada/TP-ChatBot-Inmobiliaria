//-----------------------------------------INICIO-----------------------------------------------//

document.addEventListener('DOMContentLoaded', () => {
  const formBuscador = document.getElementById('form-buscador');
  const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
  const accionReset = document.getElementById('accion-reset-filtros');
  const btnVerTodas = document.getElementById('btn-ver-todas');
  const seccionAncla = document.getElementById('propiedades');

  inicializarCarruseles(document);
  vincularClickTarjetas(document);

  if (!formBuscador || !contenedorTarjetas) return;

  const hayFiltrosActivos = () => {
    const formData = new FormData(formBuscador);
    for (const [, valor] of formData.entries()) {
      if (valor.trim() !== '') return true;
    }
    return false;
  };

  const actualizarBotonVerTodas = (cantidadResultados) => {
    if (!accionReset) return;
    if (hayFiltrosActivos() && cantidadResultados > 0) {
      accionReset.classList.remove('d-none');
    } else {
      accionReset.classList.add('d-none');
    }
  };

  const limpiarFiltrosYRecargar = () => {
    formBuscador.reset();
    if (accionReset) accionReset.classList.add('d-none');
    ejecutarBusqueda('');
  };

  if (btnVerTodas) {
    btnVerTodas.addEventListener('click', limpiarFiltrosYRecargar);
  }

  const ejecutarBusqueda = async (paramsString = '') => {
    const url = `${formBuscador.action}${paramsString ? '?' + paramsString : ''}`;
    const btnBuscar = formBuscador.querySelector('.btn-search');
    const textoOriginal = btnBuscar ? btnBuscar.textContent : 'Buscar ahora';

    if (btnBuscar) {
      btnBuscar.disabled = true;
      btnBuscar.textContent = 'Buscando...';
    }

    try {
      const response = await fetch(url, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Error al filtrar propiedades');

      const data = await response.json();

      if (Array.isArray(data)) {
        contenedorTarjetas.innerHTML = renderizarTarjetasDesdeJson(data);
        actualizarBotonVerTodas(data.length);
      } else if (typeof data.html === 'string') {
        contenedorTarjetas.innerHTML = data.html;
        const cantCards = contenedorTarjetas.querySelectorAll('.property-card').length;
        actualizarBotonVerTodas(cantCards);
      }

      inicializarCarruseles(contenedorTarjetas);
      vincularClickTarjetas(contenedorTarjetas);

      const btnLimpiarVacio = document.getElementById('btn-limpiar-filtros');
      if (btnLimpiarVacio) {
        btnLimpiarVacio.addEventListener('click', limpiarFiltrosYRecargar);
      }

      if (seccionAncla) {
        seccionAncla.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error) {
      console.error('Error al filtrar propiedades:', error);
    } finally {
      if (btnBuscar) {
        btnBuscar.disabled = false;
        btnBuscar.textContent = textoOriginal;
      }
    }
  };

  formBuscador.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(formBuscador);
    const params = new URLSearchParams();

    for (const [clave, valor] of formData.entries()) {
      if (valor.trim() !== '') {
        params.append(clave, valor);
      }
    }

    ejecutarBusqueda(params.toString());
  });
});

function vincularClickTarjetas(scope) {
  const tarjetas = scope.querySelectorAll('.property-card');

  tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener('click', () => {
      const titulo = tarjeta.querySelector('.card-title')?.textContent.trim();
      const ubicacion = tarjeta.querySelector('.card-location')?.textContent.trim();
      console.log(`Propiedad seleccionada: ${titulo} - ${ubicacion}`);
    });
  });
}

function inicializarCarruseles(scope) {
  const carousels = scope.querySelectorAll('.card-carousel');

  carousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');

    if (slides.length <= 1) return;

    let currentIndex = 0;

    const showSlide = (index) => {
      currentIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('active', i === currentIndex));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
      carousel.dataset.index = String(currentIndex);
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(currentIndex + 1);
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(i);
      });
    });
  });
}

function renderizarTarjetasDesdeJson(propiedades) {
  if (!Array.isArray(propiedades) || !propiedades.length) {
    return `
      <div class="empty-properties">
        <p>No encontramos propiedades que coincidan con los filtros seleccionados.</p>
        <button type="button" id="btn-limpiar-filtros" class="btn-search mt-3">
          Ver todas las propiedades
        </button>
      </div>
    `;
  }

  return propiedades.map((prop) => {
    let imagenes = prop.imagenes_lista || prop.imagenes || ['img/sin-imagen.jpg'];
    if (typeof imagenes === 'string') {
      try { imagenes = JSON.parse(imagenes); } catch { imagenes = ['img/sin-imagen.jpg']; }
    }
    if (!Array.isArray(imagenes) || !imagenes.length) {
      imagenes = ['img/sin-imagen.jpg'];
    }

    const slidesHtml = imagenes.map((ruta, idx) => {
      const src = /^https?:\/\//i.test(ruta) ? ruta : `/${ruta.replace(/^\/+/, '')}`;
      return `<img src="${src}" alt="${prop.titulo} - Imagen ${idx + 1}" class="carousel-slide ${idx === 0 ? 'active' : ''}">`;
    }).join('');

    const controlesHtml = imagenes.length > 1 ? `
      <button type="button" class="carousel-btn prev" aria-label="Imagen anterior">❮</button>
      <button type="button" class="carousel-btn next" aria-label="Imagen siguiente">❯</button>
      <div class="carousel-dots">
        ${imagenes.map((_, idx) => `<button type="button" class="carousel-dot ${idx === 0 ? 'active' : ''}" data-slide="${idx}" aria-label="Ir a imagen ${idx + 1}"></button>`).join('')}
      </div>
    ` : '';

    const precioFormateado = Number(prop.precio || 0).toLocaleString('es-AR');
    const expensasHtml = prop.expensas && Number(prop.expensas) > 0
      ? `<span class="card-expensas">+ $${Number(prop.expensas).toLocaleString('es-AR')} expensas</span>`
      : `<span class="card-expensas">Sin expensas</span>`;

    const opTexto = prop.operacion ? prop.operacion.charAt(0).toUpperCase() + prop.operacion.slice(1) : '';
    const ambTexto = `${prop.ambientes} ${Number(prop.ambientes) === 1 ? 'ambiente' : 'ambientes'}`;
    const dormTexto = Number(prop.dormitorios || 0) === 0
      ? 'Monoambiente'
      : `${prop.dormitorios} ${Number(prop.dormitorios) === 1 ? 'dormitorio' : 'dormitorios'}`;

    return `
      <article class="property-card" data-id="${prop.id}">
        <div class="card-img-wrapper card-carousel" data-index="0">
          <span class="badge-operacion">${opTexto}</span>
          <span class="badge-id">ID #${prop.id}</span>
          <div class="carousel-track">${slidesHtml}</div>
          ${controlesHtml}
        </div>
        <div class="card-body">
          <div class="card-price-row">
            <span class="card-price">$${precioFormateado}</span>
            ${expensasHtml}
          </div>
          <h3 class="card-title">${prop.titulo}</h3>
          <p class="card-location">${prop.direccion} — ${prop.zona}</p>
          <div class="card-specs">
            <span>${ambTexto}</span>
            <span>•</span>
            <span>${dormTexto}</span>
            <span>•</span>
            <span>${prop.metros_cuadrados} m²</span>
          </div>
        </div>
      </article>
    `;
  }).join('');
}


//-------------------------------------NOSOTROS--------------------------------------------------//


// --- LÓGICA DEL FORMULARIO DE TASACIONES ---

document.addEventListener('DOMContentLoaded', function () {
    const formTasacion = document.getElementById('tasacionForm');
    const successMsg = document.getElementById('successMsg');

    if (formTasacion) {
        formTasacion.addEventListener('submit', function (e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const operacion = document.getElementById('operacion').value;
            const tipo = document.getElementById('tipo').value;
            const zona = document.getElementById('zona').value;
            const metros = document.getElementById('metros').value;

            successMsg.classList.remove('d-none');
            formTasacion.reset();
        });
    }
});

//CHATBOT CON BOTUI
// 1. Inicializamos BotUI conectándolo con el <div id="lonco-botui"> de app.blade.php
const botui = new BotUI('lonco-botui');
let yaSaludo = false;
let idBusquedaActual = 0; // Evita que respuestas viejas se acumulen al escribir rápido

// 2. Abre y cierra la ventana del chat al tocar los botones de la página
function toggleChatbot() {
    const ventana = document.getElementById('ventanaChatbot');
    ventana.classList.toggle('d-none');

    if (!ventana.classList.contains('d-none') && !yaSaludo) {
        yaSaludo = true;
        iniciarConversacion();
    }
}

// 3. Función auxiliar para enviar datos a Laravel por POST con el token de seguridad CSRF
async function enviarPost(url, datos) {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': token
        },
        body: JSON.stringify(datos)
    });

    return await respuesta.json();
}

// 4. Saludo inicial del asistente
async function iniciarConversacion() {
    await botui.message.add({
        delay: 400,
        loading: true,
        content: '¡Hola! Soy LoncoBoti, el asistente virtual de LoncoProp.'
    });

    mostrarMenu('¿En qué te puedo ayudar?');
}

// 5. Menú principal con tus palabras clave, "Otra pregunta" y "Salir del chat"
async function mostrarMenu(pregunta) {
    limpiarExtrasInput();

    await botui.message.add({
        delay: 400,
        loading: true,
        content: pregunta
    });

    const opcion = await botui.action.button({
        action: [
            { text: 'Quiero alquilar', value: 'alquiler_pasos' },
            { text: 'Requisitos alquiler', value: 'alquiler_requisitos' },
            { text: 'Quiero comprar', value: 'compra_pasos' },
            { text: 'Requisitos comprar', value: 'compra_requisitos' },
            { text: 'Horarios y teléfono', value: 'contacto_info' },
            { text: 'Agendar visita', value: 'agendar_visita' },
            { text: 'Otra pregunta', value: 'otra_pregunta' },
            { text: 'Salir del chat', value: 'salir' }
        ]
    });

    if (opcion.value === 'salir') {
        salirDelChat();
    } else if (opcion.value === 'otra_pregunta') {
        flujoOtraPregunta();
    } else if (opcion.value === 'agendar_visita') {
        flujoVisita();
    } else {
        verRespuesta(opcion.value);
    }
}

// 6. Cierra la ventana del chat y limpia todo para la próxima vez
function salirDelChat() {
    idBusquedaActual++;
    limpiarExtrasInput();
    document.getElementById('ventanaChatbot').classList.add('d-none');
    botui.message.removeAll();
    yaSaludo = false;
}

// Borra sugerencias y botones auxiliares viejos para que nunca queden sueltos
function limpiarExtrasInput() {
    const viejos = document.querySelectorAll('.sugerencias-chat, .contenedor-volver-chat');
    for (let i = 0; i < viejos.length; i++) {
        viejos[i].remove();
    }
}

// 7. Busca una respuesta en la tabla 'respuestas_bot' usando la clave del botón
async function verRespuesta(clave) {
    const respuesta = await fetch('/chatbot/respuesta/' + clave);
    const datos = await respuesta.json();

    if (datos.ok) {
        const textoOrdenado = datos.contenido.replace(/\n/g, '<br>');
        await botui.message.add({ type: 'html', delay: 400, loading: true, content: textoOrdenado });
    } else {
        await botui.message.add({ delay: 300, content: datos.mensaje });
    }

    mostrarMenu('¿Te puedo ayudar en algo más?');
}

// 8. Flujo cuando el usuario toca "Otra pregunta": permite escribir, elegir sugerencias o volver atrás
async function flujoOtraPregunta() {
    let yaRespondio = false;
    limpiarExtrasInput();

    await botui.message.add({
        delay: 300,
        content: 'Escribí tu consulta (o tocá una sugerencia mientras escribís):'
    });

    const promesaEscritura = botui.action.text({
        action: { placeholder: 'Ej: alquiler, comprar, horarios...' }
    });

    // Esperamos a que BotUI dibuje el cuadro de texto
    const intervalo = setInterval(function () {
        const inputBot = document.querySelector('.botui-actions-text-input');
        const contenedorAcciones = document.querySelector('.botui-actions-container');
        if (!inputBot || !contenedorAcciones) return;

        clearInterval(intervalo);
        limpiarExtrasInput();
        inputBot.focus();

        // Caja limpia donde se dibujan solo las sugerencias actuales
        const cajaSugerencias = document.createElement('div');
        cajaSugerencias.className = 'sugerencias-chat';
        contenedorAcciones.prepend(cajaSugerencias);

        // Botón para cancelar la pregunta y volver al menú principal
        const cajaVolver = document.createElement('div');
        cajaVolver.className = 'contenedor-volver-chat';
        const btnVolver = document.createElement('button');
        btnVolver.type = 'button';
        btnVolver.className = 'btn-volver-chat';
        btnVolver.textContent = '← Volver al menú';

        btnVolver.onclick = async function () {
            yaRespondio = true;
            idBusquedaActual++;
            limpiarExtrasInput();
            botui.action.hide();
            await botui.message.add({ human: true, content: 'Volver al menú' });
            mostrarMenu('¿En qué te puedo ayudar?');
        };

        cajaVolver.appendChild(btnVolver);
        contenedorAcciones.appendChild(cajaVolver);

        // Escucha cada letra que escribe el usuario sin duplicar resultados
        inputBot.addEventListener('input', async function () {
            const texto = inputBot.value.trim();
            const estaBusqueda = ++idBusquedaActual;

            if (texto.length < 2) {
                cajaSugerencias.innerHTML = '';
                return;
            }

            const datos = await enviarPost('/chatbot/buscar-palabra', { texto: texto });

            // Si el usuario siguió escribiendo mientras llegaba esta respuesta, la descartamos
            if (estaBusqueda !== idBusquedaActual || yaRespondio) return;

            // Limpiamos la caja justo antes de dibujar las opciones nuevas
            cajaSugerencias.innerHTML = '';
            if (!datos.ok) return;

            if (datos.tipo === 'sugerencias') {
                const mostradas = [];
                for (let i = 0; i < datos.sugerencias.length; i++) {
                    const item = datos.sugerencias[i];
                    const textoBoton = item.palabra || item.titulo;

                    // Evitamos dibujar dos botones con exactamente el mismo texto
                    if (mostradas.includes(textoBoton)) continue;
                    mostradas.push(textoBoton);

                    const boton = document.createElement('button');
                    boton.type = 'button';
                    boton.className = 'btn-sugerencia-chat';
                    boton.textContent = textoBoton;

                    boton.onclick = async function () {
                        yaRespondio = true;
                        idBusquedaActual++;
                        limpiarExtrasInput();
                        botui.action.hide();
                        await botui.message.add({ human: true, content: textoBoton });
                        verRespuesta(item.clave);
                    };

                    cajaSugerencias.appendChild(boton);
                }
            }

            if (datos.tipo === 'respuesta_unica') {
                const textoBoton = datos.palabra || datos.titulo;
                const boton = document.createElement('button');
                boton.type = 'button';
                boton.className = 'btn-sugerencia-chat';
                boton.textContent = textoBoton;

                boton.onclick = async function () {
                    yaRespondio = true;
                    idBusquedaActual++;
                    limpiarExtrasInput();
                    botui.action.hide();
                    await botui.message.add({ human: true, content: textoBoton });
                    const textoOrdenado = datos.contenido.replace(/\n/g, '<br>');
                    await botui.message.add({ type: 'html', delay: 400, loading: true, content: textoOrdenado });
                    mostrarMenu('¿Te puedo ayudar en algo más?');
                };

                cajaSugerencias.appendChild(boton);
            }
        });
    }, 50);

    // Si el usuario apretó Enter o tocó el ícono ➤ en lugar de elegir una sugerencia
    const escritura = await promesaEscritura;
    if (yaRespondio) return;

    yaRespondio = true;
    idBusquedaActual++;
    limpiarExtrasInput();
    procesarTextoEscrito(escritura.value);
}

// 9. Procesa el texto enviado con Enter o con el botón ➤
async function procesarTextoEscrito(texto) {
    const datos = await enviarPost('/chatbot/buscar-palabra', { texto: texto });

    if (!datos.ok) {
        await botui.message.add({
            type: 'html',
            delay: 400,
            loading: true,
            content: 'No entendí tu consulta o no tengo una respuesta para eso. ' +
                     'Podés comunicarte con nosotros al <strong>+54 299 555-0148</strong> ' +
                     'o por mail a <strong>hola@nexoprop.com.ar</strong>.'
        });
        mostrarMenu('¿Te puedo ayudar en algo más?');
        return;
    }

    if (datos.tipo === 'respuesta_unica') {
        const textoOrdenado = datos.contenido.replace(/\n/g, '<br>');
        await botui.message.add({ type: 'html', delay: 400, loading: true, content: textoOrdenado });
        mostrarMenu('¿Te puedo ayudar en algo más?');
        return;
    }

    const botones = [];
    for (let i = 0; i < datos.sugerencias.length; i++) {
        botones.push({
            text: datos.sugerencias[i].palabra || datos.sugerencias[i].titulo,
            value: datos.sugerencias[i].clave
        });
    }

    await botui.message.add({ delay: 300, content: 'Encontré estas opciones relacionadas:' });
    const elegida = await botui.action.button({ action: botones });
    verRespuesta(elegida.value);
}

// 10. Flujo paso a paso para agendar una visita a una propiedad
async function flujoVisita() {
    await botui.message.add({ delay: 300, content: 'Ingresá el código de la propiedad (ej: 101, 102, 103):' });
    const codigo = await botui.action.text({ action: { placeholder: 'Código...' } });

    const respuesta = await fetch('/chatbot/propiedad/' + codigo.value.trim());
    const prop = await respuesta.json();

    if (!prop.ok) {
        await botui.message.add({ delay: 300, content: prop.mensaje });
        mostrarMenu('¿Te puedo ayudar en algo más?');
        return;
    }

    await botui.message.add({
        type: 'html',
        delay: 400,
        content: '<strong>' + prop.titulo + '</strong><br>Dirección: ' + prop.direccion
    });

    let horarioElegido = '';
    if (prop.horarios_visita && prop.horarios_visita.length > 0) {
        const botonesHorarios = [];
        for (let i = 0; i < prop.horarios_visita.length; i++) {
            botonesHorarios.push({ text: prop.horarios_visita[i], value: prop.horarios_visita[i] });
        }
        await botui.message.add({ delay: 300, content: 'Elegí un horario disponible:' });
        const btn = await botui.action.button({ action: botonesHorarios });
        horarioElegido = btn.value;
    } else {
        await botui.message.add({ delay: 300, content: '¿Qué día y horario preferís?' });
        const txt = await botui.action.text({ action: { placeholder: 'Ej: Martes 10:00 hs' } });
        horarioElegido = txt.value;
    }

    await botui.message.add({ delay: 300, content: '¿Cuál es tu nombre completo?' });
    const nombre = await botui.action.text({ action: { placeholder: 'Tu nombre...' } });

    await botui.message.add({ delay: 300, content: 'Dejanos un teléfono de contacto:' });
    const telefono = await botui.action.text({ action: { placeholder: 'Ej: 299 555-1234' } });

    const resultado = await enviarPost('/chatbot/visita', {
        propiedad_id: prop.id,
        nombre_cliente: nombre.value,
        telefono_cliente: telefono.value,
        fecha_elegida: horarioElegido
    });

    await botui.message.add({ delay: 400, loading: true, content: resultado.mensaje });
    mostrarMenu('¿Te puedo ayudar en algo más?');
}

// 11. Conexión automática cuando se envía el formulario de Tasaciones
document.addEventListener('DOMContentLoaded', function () {
    const formularioTasacion = document.getElementById('tasacionForm');
    if (!formularioTasacion) return;

    formularioTasacion.addEventListener('submit', async function (evento) {
        evento.preventDefault();
        const formData = new FormData(formularioTasacion);

        const datos = {
            zona: formData.get('zona'),
            tipo_propiedad: formData.get('tipo_propiedad'),
            operacion: formData.get('operacion'),
            metros_cuadrados: formData.get('metros_cuadrados')
        };

        const ventana = document.getElementById('ventanaChatbot');
        if (ventana.classList.contains('d-none')) {
            ventana.classList.remove('d-none');
            yaSaludo = true;
        }

        const resultado = await enviarPost('/chatbot/tasacion', datos);

        if (resultado.ok) {
            await botui.message.add({
                type: 'html',
                delay: 500,
                loading: true,
                content: '<strong>Tasación estimada (' + resultado.zona + ')</strong><br>' +
                         'Operación: ' + resultado.operacion + ' (' + resultado.metros_cuadrados + ' m²)<br>' +
                         'Valor aproximado: <strong>' + resultado.tasacion_formateada + '</strong>'
            });
            mostrarMenu('¿Te puedo ayudar en algo más?');
        }
    });
});