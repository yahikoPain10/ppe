/**
 * functions.js — Fonctions réutilisables pour toutes les pages EJS
 * Disponible sur toutes les pages via <script src="/assets/js/functions.js">
 */

// ═══════════════════════════════════════════════════════════════════════════
// Mode sombre
// ═══════════════════════════════════════════════════════════════════════════

function initDarkMode() {
  const saved = localStorage.getItem('theme') || 'light';
  applyTheme(saved);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.getElementById('darkModeIcon');
  if (icon) {
    icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  }
}

function toggleDarkMode() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
}

// ═══════════════════════════════════════════════════════════════════════════
// Notifications toast
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Affiche une notification toast.
 * @param {string} message  - Le message à afficher
 * @param {'success'|'error'|'warning'|'info'} type
 */
function showToast(message, type = 'info') {
  // Créer le conteneur s'il n'existe pas
  if (!document.getElementById('toastContainer')) {
    $('body').append('<div id="toastContainer" class="toast-container position-fixed bottom-0 end-0 p-3"></div>');
  }

  const icons = {
    success: 'bi-check-circle-fill',
    error:   'bi-x-circle-fill',
    warning: 'bi-exclamation-triangle-fill',
    info:    'bi-info-circle-fill',
  };

  const colors = {
    success: 'text-bg-success',
    error:   'text-bg-danger',
    warning: 'text-bg-warning',
    info:    'text-bg-secondary',
  };

  const id = 'toast-' + Date.now();
  const html = `
    <div id="${id}" class="toast align-items-center ${colors[type]} border-0" role="alert" aria-live="assertive">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2">
          <i class="bi ${icons[type]}"></i> ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>`;

  $('#toastContainer').append(html);
  const el = document.getElementById(id);
  const toast = new bootstrap.Toast(el, { delay: 4000 });
  toast.show();
  el.addEventListener('hidden.bs.toast', () => el.remove());
}

// ═══════════════════════════════════════════════════════════════════════════
// Appels API (jQuery AJAX wrappé en Promise)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Effectue un appel API.
 * @param {string} url
 * @param {Object} options  - Paramètres jQuery AJAX (method, data, headers…)
 * @returns {Promise}
 */
function apiCall(url, options = {}) {
  const defaults = {
    url,
    contentType: 'application/json',
    dataType: 'json',
  };

  if (options.data && typeof options.data === 'object') {
    options.data = JSON.stringify(options.data);
  }

  return new Promise((resolve, reject) => {
    $.ajax({
      ...defaults,
      ...options,
      success: (data) => resolve(data),
      error: (xhr) => reject({
        status: xhr.status,
        data: xhr.responseJSON || { message: 'Erreur réseau.' },
      }),
    });
  });
}

/**
 * Appel API authentifié (ajoute le header Authorization: Bearer <token>).
 * @param {string} url
 * @param {string} token
 * @param {Object} options
 */
function apiCallAuth(url, token, options = {}) {
  return apiCall(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// Helpers UI
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Affiche un spinner dans un bouton et le désactive.
 * @param {string|jQuery} selector  - Sélecteur ou objet jQuery du bouton
 * @param {boolean} loading
 * @param {string} [label]          - Texte original du bouton (pour restaurer)
 */
function setBtnLoading(selector, loading, label = '') {
  const $btn = $(selector);
  if (loading) {
    $btn.prop('disabled', true).data('original-text', $btn.html());
    $btn.html('<span class="spinner-app me-2"></span>Chargement…');
  } else {
    $btn.prop('disabled', false);
    const original = $btn.data('original-text');
    if (original) $btn.html(original);
    else if (label) $btn.text(label);
  }
}

/**
 * Affiche ou masque un message d'erreur inline sous un champ.
 * @param {string} selector  - Sélecteur du conteneur d'erreur
 * @param {string|null} message  - null pour masquer
 */
function setFieldError(selector, message) {
  const $el = $(selector);
  if (message) {
    $el.text(message).removeClass('d-none');
  } else {
    $el.addClass('d-none').text('');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Initialisation globale
// ═══════════════════════════════════════════════════════════════════════════

$(document).ready(function () {
  initDarkMode();

  $('#darkModeToggle').on('click', function () {
    toggleDarkMode();
  });
});