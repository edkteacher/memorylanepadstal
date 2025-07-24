document.addEventListener("DOMContentLoaded", function () {
  // Google Drive public folder ID
  const folderId = "1SFexTzFa8uQIVrpSJGvqDp28Q-KuS9Oj";
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbwvPUXBa5M_6ngxM11v2ul6sHM4e4sLGb29pmtbBw1PYoFGUaRYOsYD9lUaLfonaWCo/exec?folderId=" +
    folderId;

  fetch(scriptUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched data:", data);

      const list = document.getElementById("gallery-list");
      list.innerHTML = "";

      data.files.forEach((file) => {
        const li = document.createElement("li");
        li.className = "splide__slide";

        const imageId = file.url.match(/id=([^&]+)/)?.[1];
        const imageUrl = `https://lh3.googleusercontent.com/d/${imageId}=w1000`;

        li.innerHTML = `

        <div class="image-wrapper">
          <img 
            src="${imageUrl}" 
            class="img-fluid rounded shadow vintage-border" 
            alt="Gallery Image"
            loading="lazy"
          >
        </div>
        `;
        list.appendChild(li);
      });

      // Init Splide after images are added
      new Splide("#image-carousel", {
        type: "loop",
        perPage: 3,
        gap: "1rem",
        autoplay: true,
        breakpoints: {
          768: {
            perPage: 1,
          },
          992: {
            perPage: 2,
          },
        },
      }).mount();
    })
    .catch((error) => {
      console.error("Error loading gallery:", error);
    });
});

console.log("Memory Lane Padstal website loaded.");
