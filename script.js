// Helpers
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

/* Year */
$("#year").textContent = new Date().getFullYear();

/* Mobile drawer */
const drawer = $("#drawer");
const menuBtn = $("#menuBtn");
const closeBtn = $("#closeBtn");
const drawerLinks = $("#drawerLinks");

function openDrawer() {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  menuBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}
function closeDrawer() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

menuBtn?.addEventListener("click", openDrawer);
closeBtn?.addEventListener("click", closeDrawer);
drawer?.addEventListener("click", (e) => { if (e.target === drawer) closeDrawer(); });
drawerLinks?.addEventListener("click", (e) => {
  if (e.target.tagName === "A") closeDrawer();
});

/* Scroll progress */
const progress = $("#progress");
window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop;
  const height = doc.scrollHeight - doc.clientHeight;
  const pct = height ? (scrollTop / height) * 100 : 0;
  progress.style.width = `${pct}%`;
});

/* Reveal on scroll */
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.12 });

$$(".reveal").forEach((el) => io.observe(el));

/* Portfolio filtering */
const chips = $$(".chip");
const shots = $$(".shot");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");

    const filter = chip.dataset.filter;
    shots.forEach((shot) => {
      const cat = (shot.dataset.category || "").toLowerCase();
      const show = filter === "all" || cat.includes(filter);
      shot.style.display = show ? "" : "none";
    });
  });
});

/* Testimonials slider */
const quoteEls = $$(".quote");
const dotsWrap = $("#dots");
let idx = 0;

function renderDots() {
  dotsWrap.innerHTML = "";
  quoteEls.forEach((_, i) => {
    const d = document.createElement("button");
    d.className = "dot" + (i === idx ? " active" : "");
    d.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
    d.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(d);
  });
}

function goTo(i) {
  idx = (i + quoteEls.length) % quoteEls.length;
  quoteEls.forEach((q, k) => q.classList.toggle("active", k === idx));
  renderDots();
}

$("#prev")?.addEventListener("click", () => goTo(idx - 1));
$("#next")?.addEventListener("click", () => goTo(idx + 1));

goTo(0);

// Optional auto-advance:
let sliderTimer = setInterval(() => goTo(idx + 1), 7000);
["prev","next"].forEach(id => {
  $("#" + id)?.addEventListener("click", () => {
    clearInterval(sliderTimer);
    sliderTimer = setInterval(() => goTo(idx + 1), 7000);
  });
});

/* FAQ accordion */
$$(".acc-item").forEach((btn) => {
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    // close others
    $$(".acc-item").forEach((b) => b.setAttribute("aria-expanded", "false"));
    btn.setAttribute("aria-expanded", expanded ? "false" : "true");
    btn.querySelector(".acc-icon").textContent = expanded ? "+" : "–";
    // reset icons for others
    $$(".acc-item").forEach((b) => {
      if (b !== btn) b.querySelector(".acc-icon").textContent = "+";
    });
  });
});

/* WhatsApp link (replace number) */
const WA_NUMBER = "15550000000"; // <-- change to your WhatsApp number, digits only
const waLink = $("#waLink");
const waMessage = encodeURIComponent(
  "Hi EverAfter Decor! I'd like a quote for my event. Date: __ / City/Venue: __ / Services: __"
);
waLink.href = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

/* Contact form (demo) */
const form = $("#quoteForm");
const statusEl = $("#formStatus");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

statusEl.textContent = "Sending your request…";

try {
  const response = await fetch(form.action, {
    method: form.method || "POST",
    body: new FormData(form),
    headers: {
      Accept: "application/json"
    }
  });

  const result = await response.json().catch(() => ({}));

  if (response.ok) {
    statusEl.textContent =
        "Thanks! Your request has been sent successfully. We'll reach out shortly.";
    form.reset();
  } else {
    statusEl.textContent =
        result?.errors?.map(e => e.message).join(" ") ||
    "Oops! Something went wrong. Please try again.";
  }
} catch (error) {
  statusEl.textContent =
      "Network error. Please check your connection and try again.";
}
});


/* ============================= */
/* LIGHT / DARK MODE */
/* ============================= */

const root = document.documentElement;
const toggleBtn = document.getElementById("themeToggle");
const icon = document.getElementById("themeIcon");

// Detect saved theme or system preference
const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
root.setAttribute("data-theme", initialTheme);
icon.textContent = initialTheme === "dark" ? "🌙" : "☀️";

// Toggle theme
toggleBtn.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
const next = current === "dark" ? "light" : "dark";

root.setAttribute("data-theme", next);
localStorage.setItem("theme", next);
icon.textContent = next === "dark" ? "🌙" : "☀️";
});

document.getElementById("backToTop")?.addEventListener("click", (e) => {
  e.preventDefault();
window.scrollTo({ top: 0, behavior: "smooth" });
});

