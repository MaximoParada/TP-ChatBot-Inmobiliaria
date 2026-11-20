



//-----------------------------------------INICIO-----------------------------------------------//




document.addEventListener('DOMContentLoaded', () => {
  const tarjetasAsesores = document.querySelectorAll('.team-card');

  tarjetasAsesores.forEach(tarjeta => {
    tarjeta.addEventListener('click', () => {
      const nombre = tarjeta.querySelector('.team-name').textContent;
      const cargo = tarjeta.querySelector('.team-role').textContent;
      console.log(`Asesor seleccionado: ${nombre} - ${cargo}`);
    });
  });
});





//-------------------------------------NOSOTROS--------------------------------------------------//




document.addEventListener('DOMContentLoaded', () => {
  const tarjetasAsesores = document.querySelectorAll('.team-card');

  tarjetasAsesores.forEach(tarjeta => {
    tarjeta.addEventListener('click', () => {
      const nombre = tarjeta.querySelector('.team-name').textContent;
      const cargo = tarjeta.querySelector('.team-role').textContent;
      console.log(`Asesor seleccionado: ${nombre} - ${cargo}`);
    });
  });
});


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
