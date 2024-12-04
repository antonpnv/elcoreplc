document.addEventListener('DOMContentLoaded', () => {
  const dropdownBtn = document.querySelector('.dropdown-btn');
  const dropdownContent = document.querySelector('.dropdown-content');
  const burgerBtn = document.querySelector('.menu-burger');
  const menu = document.querySelector('.menu-overlay');
  const mainContent = document.querySelector('.main-content');
  const sortButtons = document.querySelectorAll('.btn-sort__input');
  const cards = mainContent.querySelectorAll('.card');
  let itemsCardPage = 9;
  let currentPage = 0;

  const totalPages = 11;
  const activePages = 4;

  // Обработчик для бургер кнопки
  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('open');
    menu.classList.toggle('open');
  });

  // Обработчик для показа dropdown
  dropdownBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const isExpanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
    dropdownBtn.setAttribute('aria-expanded', (!isExpanded).toString());
    dropdownContent?.classList.toggle('active');
  });

  // Обработчик для закрытия dropdown
  document.addEventListener('click', (e) => {
    if (!dropdownBtn?.contains(e.target) && !dropdownContent?.contains(e.target)) {
      dropdownContent?.classList.remove('active');
      dropdownBtn?.setAttribute('aria-expanded', 'false');
    }
  });

    // Функция для обновления количества карточек на странице для адаптива
    function updateItemsPerPage() {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 1024) {
        itemsCardPage = 6;
      } else {
        itemsCardPage = 9;
      }

      showPage(0);
    }

      window.addEventListener('resize', updateItemsPerPage);

  // Функция для фильтрации карточек по id
  function filterCards(category) {
    cards.forEach((card) => {
      if (category === 'all' || card.id === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
    showPage(0);
  }

  // Обработчик для кнопок фильтрации
  sortButtons.forEach((button) => {
    button.addEventListener('change', () => {
      const checkedCategory = button.id;
      filterCards(checkedCategory);
    });
  });

  // Функция для отображения определенной страницы
  function showPage(page) {
    const visibleCards = Array.from(cards).filter((card) => card.style.display !== 'none');
    const startIndex = page * itemsCardPage;
    const endIndex = startIndex + itemsCardPage;

    visibleCards.forEach((card, index) => {
      card.classList.toggle('hidden', index < startIndex || index >= endIndex);
    });

    currentPage = page;
    updatePagination();
  }

  // Функция для обновление пагинации
  function updatePagination() {
    const paginationContainer = document.querySelector('.pagination') || document.createElement('div');
    paginationContainer.classList.add('pagination');

    if (!document.body.contains(paginationContainer)) {
      mainContent.appendChild(paginationContainer);
    }

    paginationContainer.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.textContent = '\u1438'; // <
    prevButton.classList.add('pagination-arrow', 'pagination-prev');
    prevButton.disabled = currentPage === 0;
    prevButton.addEventListener('click', () => {
      if (currentPage > 0) showPage(currentPage - 1);
    });
    paginationContainer.appendChild(prevButton);

    for (let i = 0; i < totalPages; i++) {
      if (i < activePages || i === totalPages - 1 || i === currentPage) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i + 1;
        pageButton.addEventListener('click', () => {
          showPage(i);
        });

        if (i === currentPage) {
          pageButton.classList.add('active');
        }
        paginationContainer.appendChild(pageButton);

      } else if (i === activePages) {
        const dots = document.createElement('span');
        dots.textContent = '...';
        dots.classList.add('dots');
        paginationContainer.appendChild(dots);
      }
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = '\u1433'; // >
    nextButton.classList.add('pagination-arrow', 'pagination-next');
    nextButton.disabled = currentPage === totalPages - 1;
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages - 1) showPage(currentPage + 1);
    });
    paginationContainer.appendChild(nextButton);
  }

  filterCards('all');
  showPage(0);
});
