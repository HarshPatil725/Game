// Fetch game data from your JSON file
fetch('data/data.json')
  .then(res => res.json())
  .then(games => {
    let currentPage = 1;
    const perPage = 6;
    let filteredGames = [...games]; // Make a copy to filter dynamically

    const grid = document.getElementById('gameGrid');
    const pageNum = document.getElementById('pageNumber');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const gameCategories = document.getElementById('gameCategories'); // Assuming you have a <select> with this id

    function getTotalPages() {
      return Math.ceil(filteredGames.length / perPage);
    }

    function renderPage(page) {
      // clamp page
      if (page < 1) page = 1;
      if (page > getTotalPages()) page = getTotalPages();
      currentPage = page;

      // slice data
      const start = (page - 1) * perPage;
      const pageItems = filteredGames.slice(start, start + perPage);

      // clear & render
      grid.innerHTML = '';
      pageItems.forEach(g => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `<img src="${g.image}" alt="${g.name}"><h3>${g.name}</h3>`;
        grid.appendChild(card);
      });

      // update controls
      pageNum.textContent = `Page ${currentPage} of ${getTotalPages()}`;
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === getTotalPages();
    }

    function applyFilter() {
      const selectedValue = gameCategories.value;
      if (selectedValue === 'all') {
        filteredGames = [...games];
      } else {
        filteredGames = games.filter(g => g.genre.includes(selectedValue));
      }
      currentPage = 1; // reset to page 1 on filter change
      renderPage(currentPage);
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => renderPage(currentPage - 1));
    nextBtn.addEventListener('click', () => renderPage(currentPage + 1));
    gameCategories.addEventListener('change', applyFilter);

    // Initial Render
    renderPage(1);
  })
  .catch(err => console.error('Could not load data.json:', err));
