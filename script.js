(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
      menuToggle.textContent = isOpen ? '×' : '☰';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Buka menu');
        menuToggle.textContent = '☰';
      });
    });
  }

  const cards = [...document.querySelectorAll('.product-card')];
  const filters = [...document.querySelectorAll('.filter-chip')];
  const search = document.querySelector('#product-search');
  const noResults = document.querySelector('#no-results');
  let activeFilter = 'all';

  function updateProducts() {
    const query = (search?.value || '').trim().toLocaleLowerCase('id');
    let visible = 0;
    cards.forEach(card => {
      const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
      const matchesQuery = (card.dataset.name + ' ' + card.textContent).toLocaleLowerCase('id').includes(query);
      const show = matchesFilter && matchesQuery;
      card.hidden = !show;
      if (show) visible++;
    });
    if (noResults) noResults.hidden = visible > 0;
  }

  filters.forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      filters.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      updateProducts();
    });
  });

  search?.addEventListener('input', updateProducts);
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
