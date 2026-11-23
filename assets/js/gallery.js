/* Lightbox for the photography page */
(function () {
  "use strict";
  const dialog = document.getElementById("lightbox");
  if (!dialog || typeof dialog.showModal !== "function") return;

  
  const caption = dialog.querySelector("p");
  const big = document.createElement("img");
  dialog.insertBefore(big, caption);

  document.querySelectorAll(".gallery .photo").forEach((btn) => {
    btn.addEventListener("click", () => {
      const img = btn.querySelector("img");
      if (!img) return;                       // photo not added yet
      big.src = img.src;
      big.alt = img.alt;
      caption.textContent = img.alt;
      dialog.showModal();
    });
  });

  dialog.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
})();
