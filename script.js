fetch('ramos.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('malla-container');

    data.forEach((semestre, i) => {
      const card = document.createElement('div');
      card.className = 'semestre';

      const title = document.createElement('h2');
      title.textContent = `Semestre ${i + 1}`;
      card.appendChild(title);

      semestre.forEach(ramo => {
        const bubble = document.createElement('div');
        bubble.className = 'ramo';
        bubble.textContent = ramo;
        card.appendChild(bubble);
      });

      container.appendChild(card);
    });
  });
