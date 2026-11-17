(function () {
  "use strict";

  var DATA = window.PORTFOLIO || { projects: [], smallBuilds: [], skills: [], profile: {} };
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function icon(id) {
    return '<svg class="icon" aria-hidden="true"><use href="#i-' + id + '"/></svg>';
  }

  /* ---------- Theme ---------- */
  var root = document.documentElement;
  var themeBtn = $("[data-theme-toggle]");
  function setTheme(t, save) {
    root.setAttribute("data-theme", t);
    if (themeBtn) themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
    if (save) { try { localStorage.setItem("theme", t); } catch (e) {} }
  }
  setTheme(root.getAttribute("data-theme") || "dark", false);
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
    });
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = $("[data-menu-toggle]");
  var navLinks = $("[data-nav-links]");
  var header = $("[data-header]");
  function closeMenu() {
    if (!menuBtn) return;
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
    header.classList.remove("menu-open");
  }
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      var open = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!open));
      menuBtn.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      header.classList.toggle("menu-open", !open);
    });
    $$("a", navLinks).forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
    window.matchMedia("(min-width: 861px)").addEventListener("change", closeMenu);
  }

  /* ---------- Header state + active section ---------- */
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window) {
    var linkFor = {};
    $$(".nav-links a").forEach(function (a) { linkFor[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var link = linkFor[en.target.id];
        if (!link) return;
        if (en.isIntersecting) {
          $$(".nav-links a").forEach(function (a) { a.removeAttribute("aria-current"); });
          link.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(linkFor).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ---------- Skills + stack strip ---------- */
  // Technology logos come from Simple Icons (CC0); generic skills use UI icons.
  var ICONS = {
    "HTML5": "si-html5", "CSS3": "si-css", "JavaScript": "si-javascript", "React.js": "si-react", "React": "si-react",
    "Next.js": "si-nextdotjs", "Redux Toolkit": "si-redux", "Redux": "si-redux", "Tailwind CSS": "si-tailwindcss", "Bootstrap": "si-bootstrap",
    "Node.js": "si-nodedotjs", "Express.js": "si-express", "Express": "si-express", "MongoDB": "si-mongodb",
    "PostgreSQL": "si-postgresql", "Git": "si-git", "GitHub": "si-github", "GitLab": "si-gitlab",
    "Postman": "si-postman", "npm": "si-npm", "Stripe": "si-stripe", "React Router": "si-reactrouter", "Vite": "si-vite", "Mongoose": "si-mongoose", "JWT": "si-jsonwebtokens",
    "SQL": "i-db", "VS Code": "i-code", "REST APIs": "i-api", "API integration": "i-api",
    "Authentication": "i-lock", "Responsive design": "i-devices",
  };
  function skillIcon(name) {
    var id = ICONS[name];
    return id ? '<svg class="icon skill-icon" aria-hidden="true"><use href="#' + id + '"/></svg>' : "";
  }


  /* ---------- Schematic covers ----------
     Diagrams of each project's own structure. They are not screenshots;
     set `image` in data.js to show a real screenshot instead. */
  var covers = {
    board: function () {
      var col = function (name, items) {
        return '<div class="sc-col"><span class="sc-col-h">' + name + '</span>' +
          items.map(function (p) { return '<span class="sc-task"><i class="pri pri-' + p + '"></i><b></b></span>'; }).join("") +
          "</div>";
      };
      return '<div class="sc sc-board">' + col("To do", ["h", "m", "l"]) + col("In progress", ["h", "m"]) + col("Done", ["l", "m", "l"]) + "</div>";
    },
    flow: function (p) {
      var steps = p.flow || [];
      return '<div class="sc sc-flow">' + steps.map(function (s, i) {
        return '<span class="sc-node' + (i === 1 ? " sc-node-accent" : "") + '">' + s + "</span>";
      }).join('<span class="sc-arrow"></span>') + "</div>";
    },
    care: function () {
      var steps = ["Consult", "Verify Rx", "Order", "Deliver"];
      return '<div class="sc sc-steps">' + steps.map(function (s, i) {
        return '<span class="sc-step"><i>' + (i + 1) + "</i>" + s + "</span>";
      }).join("") + "</div>";
    },
    modules: function () {
      var m = ["Dashboard", "Donations", "Beneficiaries", "Events", "Volunteers", "Search"];
      return '<div class="sc sc-modules">' + m.map(function (x) { return '<span class="sc-mod">' + x + "</span>"; }).join("") + "</div>";
    },
    landing: function () {
      return '<div class="sc sc-landing">' +
        '<span class="wl-hero"><b></b><b></b><i></i></span>' +
        '<span class="wl-row"><span class="wl-card"><i></i><b></b></span><span class="wl-card"><i></i><b></b></span><span class="wl-card"><i></i><b></b></span></span>' +
        '<span class="wl-row wl-price"><span></span><span class="on"></span><span></span></span>' +
        "</div>";
    },
    flights: function () {
      return '<div class="sc sc-entities">' +
        '<span class="sc-ent">users</span><span class="sc-link"></span>' +
        '<span class="sc-ent sc-node-accent">bookings</span><span class="sc-link"></span>' +
        '<span class="sc-ent">flights</span>' +
        '<span class="sc-break"></span>' +
        '<span class="sc-ent sc-ent-sub">messages</span><span class="sc-ent sc-ent-sub">activity</span>' +
        "</div>";
    },
    schema: function () {
      var t = ["users", "roles", "companies", "leads", "deals", "clients", "projects", "tasks", "requirements", "invoices", "tickets", "audit_logs"];
      return '<div class="sc sc-schema">' + t.map(function (x) { return '<span class="sc-table">' + x + "</span>"; }).join("") + "</div>";
    },
  };

  function coverHTML(p) {
    if (p.image) {
      return '<div class="card-cover has-image"><img src="' + esc(p.image) + '" alt="Screenshot of ' + esc(p.title) + '" loading="lazy" decoding="async"></div>';
    }
    var fn = covers[p.cover];
    return '<div class="card-cover" aria-hidden="true">' + (fn ? fn(p) : "") + "</div>";
  }

  function badges(list) {
    if (!list || !list.length) return "";
    return '<ul class="badges">' + list.map(function (t) { return "<li>" + skillIcon(t) + esc(t) + "</li>"; }).join("") + "</ul>";
  }

  function linkButtons(p, cls) {
    var out = "";
    if (p.demo) out += '<a class="btn ' + cls + '" href="' + esc(p.demo) + '" target="_blank" rel="noopener noreferrer">' + icon("external") + "Live demo</a>";
    if (p.repo) out += '<a class="btn btn-secondary ' + (cls === "btn-primary" ? "" : cls) + '" href="' + esc(p.repo) + '" target="_blank" rel="noopener noreferrer">' + icon("github") + "Source code</a>";
    return out;
  }

  /* ---------- Projects ---------- */
  var grid = $("[data-projects]");
  if (grid && DATA.projects.length) {
    grid.innerHTML = DATA.projects.map(function (p) {
      var feats = p.features.slice(0, 3).map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("");
      return (
        '<article class="project-card' + (p.featured ? " is-featured" : "") + '" id="project-' + esc(p.id) + '">' +
          coverHTML(p) +
          '<div class="card-body">' +
            '<p class="kind">' + esc(p.kind) + "</p>" +
            '<h3 class="card-title">' + esc(p.title) + "</h3>" +
            '<p class="card-sub">' + esc(p.subtitle) + "</p>" +
            '<p class="card-summary">' + esc(p.summary) + "</p>" +
            '<ul class="card-features">' + feats + "</ul>" +
            badges(p.tech) +
            '<div class="card-actions">' +
              '<button class="btn btn-primary btn-sm card-open" type="button" data-open-project="' + esc(p.id) + '" aria-haspopup="dialog">View details</button>' +
              (p.video ? '<button class="btn btn-secondary btn-sm" type="button" data-open-project="' + esc(p.id) + '" data-play-video aria-haspopup="dialog">' + icon("play") + "Watch demo</button>" : "") +
              linkButtons(p, "btn-sm") +
            "</div>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  var small = $("[data-small-builds]");
  if (small && DATA.smallBuilds) {
    small.innerHTML = DATA.smallBuilds.map(function (b) {
      var links = "";
      if (b.demo) links += '<a class="text-link" href="' + esc(b.demo) + '" target="_blank" rel="noopener noreferrer">Live demo</a>';
      if (b.repo) links += '<a class="text-link" href="' + esc(b.repo) + '" target="_blank" rel="noopener noreferrer">Source</a>';
      return '<li class="small-item"><div><h4>' + esc(b.title) + "</h4><p>" + esc(b.summary) + "</p></div>" +
        badges(b.tech) + (links ? '<div class="small-links">' + links + "</div>" : "") + "</li>";
    }).join("");
  }

  var skills = $("[data-skills]");
  if (skills && DATA.skills) {
    skills.innerHTML = DATA.skills.map(function (g) {
      return '<div class="skill-group"><h3>' + esc(g.group) + '</h3><ul class="chips">' +
        g.items.map(function (i) { return "<li>" + skillIcon(i) + "<span>" + esc(i) + "</span></li>"; }).join("") + "</ul></div>";
    }).join("");
  }

  var stack = $("[data-stack]");
  if (stack && DATA.coreStack) {
    stack.innerHTML = DATA.coreStack.map(function (s) {
      return "<li>" + skillIcon(s) + "<span>" + esc(s) + "</span></li>";
    }).join("");
  }

  /* ---------- Card spotlight (follows the pointer) ---------- */
  var finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (finePointer) {
    document.addEventListener("pointermove", function (e) {
      var card = e.target.closest && e.target.closest(".project-card, .capability, .skill-group");
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });
  }

  /* ---------- Project details dialog ---------- */
  var dialog = $("[data-dialog]");
  var dialogContent = $("[data-dialog-content]");
  var lastTrigger = null;

  function list(items) {
    return "<ul class=\"ticks\">" + items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>";
  }

  function videoHTML(p) {
    return '<figure class="dlg-video"><video controls playsinline preload="metadata"' +
      (p.video.poster ? ' poster="' + esc(p.video.poster) + '"' : "") +
      ' data-project-video><source src="' + esc(p.video.src) + '" type="video/mp4">' +
      'Your browser can\'t play this video. <a href="' + esc(p.video.src) + '">Download it</a>.</video>' +
      "<figcaption>" + esc(p.video.caption || ("Walkthrough of " + p.title)) + "</figcaption></figure>";
  }

  function detailsHTML(p) {
    var shots = (p.screenshots || []).map(function (s) {
      return '<figure class="shot"><img src="' + esc(s.src) + '" alt="' + esc(s.alt || p.title) + '" loading="lazy"></figure>';
    }).join("");
    var links = linkButtons(p, "btn-primary");
    return (
      '<header class="dlg-head">' +
        (p.video ? videoHTML(p) : coverHTML(p)) +
        '<p class="kind">' + esc(p.kind) + "</p>" +
        '<h2 id="dlg-title" class="dlg-title">' + esc(p.title) + "</h2>" +
        '<p class="card-sub">' + esc(p.subtitle) + "</p>" +
      "</header>" +
      '<p class="dlg-lead">' + esc(p.summary) + "</p>" +
      '<div class="dlg-cols">' +
        '<section><h3>The problem</h3><p>' + esc(p.problem) + "</p></section>" +
        '<section><h3>The solution</h3><p>' + esc(p.solution) + "</p></section>" +
      "</div>" +
      '<section class="dlg-sec"><h3>Key features</h3>' + list(p.features) + "</section>" +
      (p.tech && p.tech.length ? '<section class="dlg-sec"><h3>Technologies</h3>' + badges(p.tech) + "</section>" : "") +
      '<section class="dlg-sec"><h3>My contribution</h3><p>' + esc(p.contribution) + "</p></section>" +
      (p.implementation && p.implementation.length ? '<section class="dlg-sec"><h3>Implementation focus</h3>' + list(p.implementation) + "</section>" : "") +
      (shots ? '<section class="dlg-sec"><h3>Screenshots</h3><div class="shots">' + shots + "</div></section>" : "") +
      (links ? '<div class="dlg-actions">' + links + "</div>" : "")
    );
  }

  function openProject(id, trigger) {
    var p = DATA.projects.filter(function (x) { return x.id === id; })[0];
    if (!p || !dialog) return;
    lastTrigger = trigger || null;
    dialogContent.innerHTML = detailsHTML(p);
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
      document.body.classList.add("no-scroll");
      dialog.scrollTop = 0;
      var closeBtn = $("[data-dialog-close]", dialog);
      if (closeBtn) closeBtn.focus();
    } else {
      // Very old browsers: fall back to scrolling to the card.
      var card = document.getElementById("project-" + id);
      if (card) card.scrollIntoView({ behavior: "smooth" });
    }
  }

  function closeDialog() { if (dialog && dialog.open) dialog.close(); }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-open-project]");
    if (t) {
      e.preventDefault();
      openProject(t.getAttribute("data-open-project"), t);
      if (t.hasAttribute("data-play-video")) {
        var v = dialog && dialog.querySelector("[data-project-video]");
        if (v) { v.scrollIntoView({ block: "center" }); var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
      }
      return;
    }
    // Whole card is clickable; links inside it (demo, source) keep their own behaviour.
    var card = e.target.closest(".project-card");
    if (card && !e.target.closest("a, button") && !(window.getSelection && String(window.getSelection()))) {
      var btn = card.querySelector("[data-open-project]");
      if (btn) openProject(btn.getAttribute("data-open-project"), btn);
    }
  });
  if (dialog) {
    $("[data-dialog-close]", dialog).addEventListener("click", closeDialog);
    dialog.addEventListener("click", function (e) { if (e.target === dialog) closeDialog(); });
    dialog.addEventListener("close", function () {
      $$("video", dialog).forEach(function (v) { v.pause(); });
      document.body.classList.remove("no-scroll");
      if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
    });
  }

  /* ---------- Contact form ----------
     Sends through FormSubmit (https://formsubmit.co), a free form-to-email
     service that works on static hosts. The first message triggers a one-time
     activation email to the inbox address; confirm it once and all later
     messages are delivered. */
  var form = $("[data-contact-form]");
  if (form) {
    var status = $("[data-form-status]", form);
    var submit = $("[data-submit]", form);
    var fields = {
      name: { el: $("#cf-name"), msg: "Enter your name (at least 2 characters)." },
      email: { el: $("#cf-email"), msg: "Enter a valid email address, like name@company.com." },
      message: { el: $("#cf-message"), msg: "Write a message of at least 10 characters." },
    };
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function check(key) {
      var f = fields[key], v = f.el.value.trim(), ok;
      if (key === "email") ok = emailRe.test(v);
      else ok = v.length >= (key === "name" ? 2 : 10);
      var err = $("#" + f.el.id + "-err");
      f.el.setAttribute("aria-invalid", ok ? "false" : "true");
      err.textContent = ok ? "" : f.msg;
      return ok;
    }
    Object.keys(fields).forEach(function (k) {
      fields[k].el.addEventListener("blur", function () { if (fields[k].el.value) check(k); });
      fields[k].el.addEventListener("input", function () { if (fields[k].el.getAttribute("aria-invalid") === "true") check(k); });
    });

    function setStatus(text, kind, html) {
      status.className = "form-status" + (kind ? " is-" + kind : "");
      if (html) status.innerHTML = html; else status.textContent = text;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = ["name", "email", "message"].map(check).every(Boolean);
      if (!valid) {
        var firstBad = Object.keys(fields).map(function (k) { return fields[k].el; })
          .filter(function (el) { return el.getAttribute("aria-invalid") === "true"; })[0];
        if (firstBad) firstBad.focus();
        setStatus("Fix the highlighted fields, then send again.", "error");
        return;
      }
      if (form._honey && form._honey.value) return; // bot

      var payload = {
        name: fields.name.el.value.trim(),
        email: fields.email.el.value.trim(),
        message: fields.message.el.value.trim(),
        _subject: "Portfolio message from " + fields.name.el.value.trim(),
        _replyto: fields.email.el.value.trim(),
        _template: "table",
        _captcha: "false",
      };
      submit.disabled = true;
      submit.textContent = "Sending…";
      setStatus("", "");

      var endpoint = form.getAttribute("action").replace("formsubmit.co/", "formsubmit.co/ajax/");
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, body: j }; }); })
        .then(function (res) {
          var success = res.ok && (res.body.success === true || res.body.success === "true");
          if (!success) throw new Error(res.body.message || "Request failed");
          form.reset();
          Object.keys(fields).forEach(function (k) { fields[k].el.removeAttribute("aria-invalid"); });
          setStatus("Message sent. Thanks — I'll reply by email.", "success");
        })
        .catch(function () {
          var mail = "mailto:" + DATA.profile.email +
            "?subject=" + encodeURIComponent("Portfolio enquiry from " + payload.name) +
            "&body=" + encodeURIComponent(payload.message + "\n\n— " + payload.name + " (" + payload.email + ")");
          setStatus("", "error",
            "Your message couldn't be sent from the form. <a class=\"text-link\" href=\"" + esc(mail) +
            "\">Send it by email instead</a> — your text is already filled in.");
        })
        .then(function () {
          submit.disabled = false;
          submit.textContent = "Send message";
        });
    });
  }

  /* ---------- CV link + year ---------- */
  if (DATA.profile.cv) $$("[data-cv-link]").forEach(function (a) { a.setAttribute("href", DATA.profile.cv); });
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
