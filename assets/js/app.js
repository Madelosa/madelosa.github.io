document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Animações de entrada com IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

  // Filtro de projetos
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      projects.forEach((project) => {
        const categories = project.dataset.category.split(" ");
        const visible = filter === "all" || categories.includes(filter);
        project.classList.toggle("is-hidden", !visible);
      });
    });
  });

  // Modal dinâmico
  const modal = document.getElementById("projectModal");
  modal.addEventListener("show.bs.modal", (event) => {
    const trigger = event.relatedTarget;
    modal.querySelector(".modal-title").textContent = trigger.dataset.title;
    modal.querySelector("#projectModalDescription").textContent = trigger.dataset.description;
  });

  // Fecha o menu mobile após navegação
  document.querySelectorAll("#navContent .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const nav = document.getElementById("navContent");
      if (nav.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });
});
