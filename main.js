// Shared site JS (deferred)

// set footer year
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // toast
  const toast = document.getElementById("toast");
  let t = null;
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(t);
    t = setTimeout(() => toast.classList.remove("show"), 2300);
  };
  document.querySelectorAll("[data-toast]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      showToast(el.dataset.toast);
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toast) {
      toast.classList.remove("show"); clearTimeout(t);
    }
  });

  // active nav link (based on filename)
  const links = document.querySelectorAll(".links a");
  const path = location.pathname.split("/").pop() || "index.html";
  links.forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    // normalize: if current path equals link href (or both are index.html)
    const linkName = href.split("/").pop();
    if (linkName === path || (path === "" && linkName === "index.html")) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });

  // contact form behavior: only intercept on local file/localhost for demo
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    if (location.hostname === "localhost" || location.protocol === "file:") {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        showToast("Sent (demo). Deploy to Netlify or wire a server to actually deliver messages.");
        e.target.reset();
      });
    } else {
      contactForm.addEventListener("submit", () => {
        showToast("Sending…");
      });
    }
  }
});