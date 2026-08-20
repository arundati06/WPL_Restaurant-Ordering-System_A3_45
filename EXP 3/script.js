document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------------
     Task 5 helper: fire a dismissible Bootstrap alert whenever
     an "Add to Cart" button is clicked, on any page.
  ----------------------------------------------------------- */
  var holder = document.getElementById('cartAlertHolder');
  document.querySelectorAll('.add-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var itemName = btn.closest('.card').querySelector('h3').textContent;
      if (holder) {
        holder.innerHTML =
          '<div class="alert alert-success alert-dismissible fade show ember-alert" role="alert">' +
          '<strong>' + itemName + '</strong> added to cart.' +
          '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
          '</div>';
      }
    });
  });

  /* -----------------------------------------------------------
     Task 5: client-side pagination for the menu grid.
     Splits #menuGrid's column children into pages of 6 and
     builds the .pagination / .page-item / .page-link markup.
  ----------------------------------------------------------- */
  var pageSize = 6;
  var menuGrid = document.getElementById('menuGrid');
  var paginationEl = document.getElementById('menuPagination');
  var totalPages = 1;
  var currentPage = 1;
  var cols = [];

  if (menuGrid && paginationEl) {
    cols = Array.prototype.slice.call(menuGrid.children);
    totalPages = Math.max(1, Math.ceil(cols.length / pageSize));

    var html = '<li class="page-item"><a class="page-link" href="#" data-page="prev">Previous</a></li>';
    for (var p = 1; p <= totalPages; p++) {
      html += '<li class="page-item"><a class="page-link" href="#" data-page="' + p + '">' + p + '</a></li>';
    }
    html += '<li class="page-item"><a class="page-link" href="#" data-page="next">Next</a></li>';
    paginationEl.innerHTML = html;

    showPage(1);

    paginationEl.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      e.preventDefault();
      var val = e.target.getAttribute('data-page');
      if (val === 'next') currentPage = Math.min(totalPages, currentPage + 1);
      else if (val === 'prev') currentPage = Math.max(1, currentPage - 1);
      else currentPage = parseInt(val, 10);
      showPage(currentPage);
    });
  }

  function showPage(page) {
    currentPage = page;
    cols.forEach(function (col, i) {
      var onThisPage = i >= (page - 1) * pageSize && i < page * pageSize;
      col.style.display = onThisPage ? '' : 'none';
    });
    var items = paginationEl.querySelectorAll('.page-item');
    items.forEach(function (li) { li.classList.remove('active'); });
    var activeLink = paginationEl.querySelector('[data-page="' + page + '"]');
    if (activeLink) activeLink.closest('.page-item').classList.add('active');
  }

  /* -----------------------------------------------------------
     Bonus: wires up the navbar search box (Task 3) to filter
     the menu grid live, and hides pagination while filtering.
  ----------------------------------------------------------- */
  var searchInput = document.getElementById('siteSearch');
  if (searchInput && menuGrid) {
    searchInput.addEventListener('input', function () {
      var term = searchInput.value.trim().toLowerCase();
      if (term === '') {
        showPage(1);
        paginationEl.style.display = '';
        return;
      }
      paginationEl.style.display = 'none';
      cols.forEach(function (col) {
        var name = col.querySelector('h3').textContent.toLowerCase();
        col.style.display = name.indexOf(term) !== -1 ? '' : 'none';
      });
    });
  }
});
