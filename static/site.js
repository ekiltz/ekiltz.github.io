document.addEventListener('DOMContentLoaded', () => {
  const search = document.querySelector('#paper-search');
  const year = document.querySelector('#year-filter');
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('#empty-state');
  const clear = document.querySelector('#clear-filters');
  const papers = [...document.querySelectorAll('.publication')];

  const filterPapers = () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    papers.forEach((paper) => {
      const matchesYear = year.value === 'all' || paper.dataset.year === year.value;
      const matchesQuery = !query || paper.dataset.search.toLowerCase().includes(query);
      paper.hidden = !(matchesYear && matchesQuery);
      if (!paper.hidden) visible += 1;
    });
    count.textContent = `${visible} ${visible === 1 ? 'paper' : 'papers'}`;
    empty.hidden = visible !== 0;
  };

  search.addEventListener('input', filterPapers);
  year.addEventListener('change', filterPapers);
  clear.addEventListener('click', () => { search.value = ''; year.value = 'all'; filterPapers(); search.focus(); });
});
