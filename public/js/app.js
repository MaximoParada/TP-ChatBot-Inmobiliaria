



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


