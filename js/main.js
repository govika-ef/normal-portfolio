(function () {
  "use strict";

  var nav = document.querySelector(".site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var yearEl = document.getElementById("year");
  var grid = document.getElementById("projects-grid");
  var emptyEl = document.getElementById("projects-empty");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      var open = nav.classList.contains("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function renderProjects() {
    if (!grid || !emptyEl) return;

    var list = typeof PROJECTS !== "undefined" && Array.isArray(PROJECTS) ? PROJECTS : [];

    grid.innerHTML = "";

    if (list.length === 0) {
      emptyEl.hidden = false;
      grid.hidden = true;
      return;
    }

    emptyEl.hidden = true;
    grid.hidden = false;

    list.forEach(function (project) {
      var title = project.title || "Untitled project";
      var desc = project.description || "";
      var tags = Array.isArray(project.tags) ? project.tags : [];
      var image = (project.image || "").trim();
      var link = (project.link || "").trim();

      var card = document.createElement("article");
      card.className = "project-card";

      var visual = document.createElement("div");
      visual.className = "project-visual";
      if (image) {
        var img = document.createElement("img");
        img.src = image;
        img.alt = title;
        img.loading = "lazy";
        img.onerror = function () {
          this.style.display = "none";
          visual.classList.add("project-visual--fallback");
        };
        visual.appendChild(img);
      } else {
        visual.classList.add("project-visual--fallback");
      }

      var body = document.createElement("div");
      body.className = "project-body";
      body.innerHTML =
        "<h3>" +
        escapeHtml(title) +
        "</h3>" +
        "<p>" +
        escapeHtml(desc) +
        "</p>";

      if (tags.length) {
        var tagRow = document.createElement("div");
        tagRow.className = "project-tags";
        tags.forEach(function (tag) {
          var span = document.createElement("span");
          span.textContent = tag;
          tagRow.appendChild(span);
        });
        body.appendChild(tagRow);
      }

      if (link) {
        var wrap = document.createElement("a");
        wrap.href = link;
        wrap.target = "_blank";
        wrap.rel = "noopener noreferrer";
        wrap.className = "project-card-link";
        wrap.setAttribute("aria-label", "Open " + title + " in a new tab");
        wrap.appendChild(visual);
        wrap.appendChild(body);
        var hint = document.createElement("span");
        hint.className = "project-open-hint";
        hint.textContent = "Open project ↗";
        body.appendChild(hint);
        card.appendChild(wrap);
      } else {
        card.appendChild(visual);
        card.appendChild(body);
        var soon = document.createElement("span");
        soon.className = "project-soon";
        soon.textContent = "Link coming soon";
        body.appendChild(soon);
      }

      grid.appendChild(card);
    });
  }

  renderProjects();
})();
