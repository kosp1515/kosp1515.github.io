/* Contact form: field validation and sending through EmailJS.
   Note: in the EmailJS dashboard, restrict the public key to your site's domain
   (Account → Security → Allowed origins) so nobody else can use your quota. */
(function () {
  "use strict";

  const EMAILJS_PUBLIC_KEY = "CBHlhT0H4YekAq378";
  const SERVICE_ID = "service_emailJS";
  const TEMPLATE_ID = "template_tk9wg4z";

  const MSG = {
    required: "This field is required.",
    email: "Please enter a valid email address.",
    short: "Your message should be at least 10 characters.",
    sending: "Sending…",
    ok: "Thank you! Your message was sent and I'll reply soon.",
    fail: "Sending failed. Please try again or email kospanosnikos@gmail.com.",
    send: "Send message",
  };
  const m = (k) => MSG[k];

  const form = document.getElementById("contactForm");
  if (!form) return;
  const status = document.getElementById("status");
  const sendBtn = document.getElementById("send");
  const message = document.getElementById("message");
  const count = document.getElementById("count");

  if (window.emailjs) window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  message.addEventListener("input", () => { count.textContent = message.value.length; });

  function setError(input, text) {
    const field = input.closest(".field");
    field.classList.toggle("invalid", Boolean(text));
    field.querySelector(".error").textContent = text || "";
    input.setAttribute("aria-invalid", text ? "true" : "false");
  }

  function check(input) {
    const v = input.value.trim();
    if (input.required && !v) return setError(input, m("required")), false;
    if (input.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return setError(input, m("email")), false;
    if (input === message && v.length < 10) return setError(input, m("short")), false;
    setError(input, "");
    return true;
  }

  form.querySelectorAll("input[required], textarea[required]").forEach((el) => {
    el.addEventListener("blur", () => check(el));
    el.addEventListener("input", () => { if (el.closest(".field").classList.contains("invalid")) check(el); });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.className = "status";
    status.textContent = "";

    const fields = [...form.querySelectorAll("input[required], textarea[required]")];
    const ok = fields.map(check).every(Boolean);
    if (!ok) { fields.find((f) => f.getAttribute("aria-invalid") === "true").focus(); return; }

    if (form.website.value) return;           // honeypot: likely a bot

    if (!window.emailjs) {
      status.className = "status error";
      status.textContent = m("fail");
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = m("sending");

    window.emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
      .then(() => {
        status.className = "status success";
        status.textContent = m("ok");
        form.reset();
        count.textContent = "0";
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        status.className = "status error";
        status.textContent = m("fail");
      })
      .finally(() => {
        sendBtn.disabled = false;
        sendBtn.textContent = m("send");
      });
  });
})();
