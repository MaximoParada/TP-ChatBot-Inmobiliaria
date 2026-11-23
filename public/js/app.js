



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


// --- LÓGICA DEL FORMULARIO DE TASACIONES ---

document.addEventListener('DOMContentLoaded', function () {
    const formTasacion = document.getElementById('tasacionForm');
    const successMsg = document.getElementById('successMsg');

    if (formTasacion) {
        formTasacion.addEventListener('submit', function (e) {
            e.preventDefault();

            // Datos capturados del formulario (para usar con el chatbot después)
            const nombre = document.getElementById('nombre').value;
            const operacion = document.getElementById('operacion').value;
            const tipo = document.getElementById('tipo').value;
            const zona = document.getElementById('zona').value;
            const metros = document.getElementById('metros').value;

            // Muestra la alerta verde de confirmación y limpia los campos
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