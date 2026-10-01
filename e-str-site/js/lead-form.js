// Landing-page lead form → Supabase (insert-only table, protected by RLS).
(function () {
  var cfg = window.ESTR_CONFIG;
  var form = document.getElementById('lead-form-el');
  var sent = document.getElementById('lead-sent');
  var resetBtn = document.getElementById('lead-reset');
  var errorEl = document.getElementById('f-error');
  if (!form || !cfg) return;
  var submitBtn = form.querySelector('button[type="submit"]');

  function val(id) {
    var v = document.getElementById(id).value.trim();
    return v === '' ? null : v;
  }

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errorEl.hidden = true;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var lead = {
      full_name: val('f-name'),
      phone: val('f-phone'),
      email: val('f-email'),
      business_size: val('f-size'),
      has_bi_tool: val('f-bi'),
      message: val('f-msg'),
      source_page: location.pathname
    };

    submitBtn.disabled = true;
    fetch(cfg.supabaseUrl + '/rest/v1/' + cfg.leadsTable, {
      method: 'POST',
      headers: {
        'apikey': cfg.supabasePublishableKey,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(lead)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.hidden = true;
        sent.hidden = false;
      })
      .catch(function (err) {
        console.error('Lead submit failed:', err);
        showError('משהו השתבש בשליחה. נסו שוב בעוד רגע.');
      })
      .then(function () {
        submitBtn.disabled = false;
      });
  });

  resetBtn.addEventListener('click', function () {
    form.reset();
    sent.hidden = true;
    form.hidden = false;
  });
})();
