// Loads shared nav/footer partials into any page that has
// <div id="site-nav"></div> and <div id="site-footer"></div>,
// then wires up the mobile menu toggle and marks the current nav link.

(function () {
  function markCurrentNav() {
    var current = document.body.getAttribute('data-page');
    if (!current) return;
    var link = document.querySelector('.nav-links a[data-nav="' + current + '"]');
    if (link) link.setAttribute('aria-current', 'page');
  }

  function wireMobileToggle() {
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (!toggle || !links) return;
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  function loadPartial(targetId, url, afterInsert) {
    var target = document.getElementById(targetId);
    if (!target) return;
    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load ' + url);
        return res.text();
      })
      .then(function (html) {
        target.innerHTML = html;
        if (afterInsert) afterInsert();
      })
      .catch(function (err) {
        console.error(err);
        target.innerHTML = '<p style="color:red">[Nav/footer failed to load: ' + url + ']</p>';
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadPartial('site-nav', '/partials/nav.html', function () {
      wireMobileToggle();
      markCurrentNav();
    });
    loadPartial('site-footer', '/partials/footer.html');
  });
})();
