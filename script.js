
async function cargarMalla() {
  const respuesta = await fetch('ramos.json');
  const ramos = await respuesta.json();

  const container = document.getElementById('malla-container');
  const semestres = {};

  // Agrupar por semestre
  ramos.forEach(ramo => {
    if (!semestres[ramo.semestre]) {
      semestres[ramo.semestre] = [];
    }
    semestres[ramo.semestre].push(ramo);
  });

  // Renderizar columnas por semestre
  Object.keys(semestres).sort((a, b) => a - b).forEach(sem => {
    const columna = document.createElement('div');
    columna.className = 'semestre';
    columna.innerHTML = '<h2>Semestre ' + sem + '</h2>';

    semestres[sem].forEach(ramo => {
      const div = document.createElement('div');
      div.className = 'ramo';
      div.textContent = ramo.nombre;
      div.dataset.codigo = ramo.codigo;

      // Cargar estado desde localStorage
      if (localStorage.getItem(ramo.codigo) === 'aprobado') {
        div.classList.add('aprobado');
      }

      div.addEventListener('click', () => {
        div.classList.toggle('aprobado');
        localStorage.setItem(ramo.codigo,
          div.classList.contains('aprobado') ? 'aprobado' : ''
        );
      });

      columna.appendChild(div);
    });

    container.appendChild(columna);
  });
}

cargarMalla();
