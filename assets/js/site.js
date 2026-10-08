/* Nightfire on Xash3D — site behaviour */
(function () {
  'use strict';

  /* ---------- campaign list (progress.html) ----------
     [mission, region, level names, zero-based indices with recorded client checks]
     Source: playthrough tracker, reviewed 2026-10-09; focused tests are separate. */
  var CAMPAIGN = [
    ['1', 'Austria', ['Estate I', 'Estate II', 'Estate III', 'Estate IV'], [0]],
    ['2', 'Airfield', ['Airfield'], []],
    ['3', 'Japan', ['Estate I', 'Estate II', 'Estate III', 'Estate IV'], []],
    ['4', 'Phoenix', ['Infiltrate I', 'Infiltrate II', 'Infiltrate III', 'Infiltrate IV',
                      'Infiltrate V', 'Infiltrate VI', 'Infiltrate VII'], []],
    ['5', 'Power Station', ['Upper Levels', 'Lower Levels'], [0]],
    ['6', 'Phoenix Escape', ['Escape I', 'Escape III', 'Escape IV', 'Escape V', 'Escape VI',
                             'Escape VII'], [0, 5]],
    ['7', 'Island', ['Island I', 'Island II', 'Island III', 'Island IV', 'Island V', 'Island VI'], [2]],
    ['8', 'Missile Silo', ['Silo I', 'Silo II', 'Silo III', 'Silo IV'], [1]],
    ['9', 'Space Station', ['Reentry'], []]
  ];

  var host = document.getElementById('missionList');
  if (host) {
    var frag = document.createDocumentFragment();
    CAMPAIGN.forEach(function (m) {
      var levels = m[2].length;
      var checked = m[3];
      var running = checked.length;

      var row = document.createElement('div');
      row.className = 'mission';

      var label = document.createElement('b');
      label.textContent = m[0];
      row.appendChild(label);

      var body = document.createElement('div');
      body.className = 'miss-body';

      var title = document.createElement('span');
      title.className = 'miss-title';
      title.textContent = m[1];
      body.appendChild(title);

      var chips = document.createElement('div');
      chips.className = 'chips';
      m[2].forEach(function (name, i) {
        var chip = document.createElement('span');
        var seen = checked.indexOf(i) !== -1;
        chip.className = 'chip ' + (seen ? 'seen' : 'loads');
        chip.textContent = name;
        chip.setAttribute('aria-label', name + (seen
          ? ': client check recorded; no verified playthrough'
          : ': loads; no client check recorded; no verified playthrough'));
        chips.appendChild(chip);
      });
      body.appendChild(chips);

      var count = document.createElement('small');
      count.textContent = running
        ? running + ' of ' + levels + ' maps with a recorded client check · no verified playthrough'
        : levels + (levels === 1 ? ' map loads' : ' maps load') + ' · no client check recorded';
      body.appendChild(count);

      row.appendChild(body);
      frag.appendChild(row);
    });
    host.appendChild(frag);
  }

  /* ---------- progress bars (progress.html) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('.track[data-pct]'), function (t) {
    var bar = t.firstElementChild;
    if (bar) bar.style.width = t.getAttribute('data-pct') + '%';
    t.setAttribute('role', 'progressbar');
    t.setAttribute('aria-label', t.parentNode.querySelector('b').textContent);
    t.setAttribute('aria-valuemin', '0');
    t.setAttribute('aria-valuemax', '100');
    t.setAttribute('aria-valuenow', t.getAttribute('data-pct'));
    t.setAttribute('aria-valuetext', t.parentNode.querySelector('small').textContent);
  });

  function copyVideoLinkFallback(url) {
    var input = document.createElement('textarea');
    var focused = document.activeElement;
    input.value = url;
    input.readOnly = true;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    try {
      if (!document.execCommand('copy')) throw new Error('Copy failed');
    } finally {
      document.body.removeChild(input);
      if (focused) focused.focus();
    }
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-copy-video]'), function (button) {
    var link = document.getElementById(button.getAttribute('data-copy-video'));
    var status = document.getElementById(button.getAttribute('aria-describedby'));
    if (!link || !status) return;
    button.hidden = false;
    button.addEventListener('click', async function () {
      var focused = document.activeElement;
      button.disabled = true;
      status.textContent = '';
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          try {
            await navigator.clipboard.writeText(link.href);
          } catch (error) {
            copyVideoLinkFallback(link.href);
          }
        } else {
          copyVideoLinkFallback(link.href);
        }
        status.textContent = 'Video link copied. Paste it into Discord.';
      } catch (error) {
        status.textContent = 'Could not copy automatically. Copy the Direct MP4 link manually.';
      } finally {
        button.disabled = false;
        if (focused === button && document.activeElement === document.body) button.focus();
      }
    });
  });

  /* ---------- reveal on scroll ---------- */
  var nodes = document.querySelectorAll('.card, .stat, .mission, .bar');
  if (!('IntersectionObserver' in window)) return;

  Array.prototype.forEach.call(nodes, function (n) { n.classList.add('rv'); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  Array.prototype.forEach.call(nodes, function (n) { io.observe(n); });
})();
