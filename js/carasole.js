let carasoleData;

function renderCarasole() {
  let html = ``;
  let totalItem = 0;
  const parent = document.getElementById("carasole-container");

  carasoleData.forEach((item, index) => {
    let genreHtml = ``;
    const genreyArray = item.genre.split(" ");
    totalItem++;

    genreyArray.forEach((genre, index) => {
      if (index <= 6) {
        genreHtml += `<a class="carasole-genre" href="#">${genre}</a>`;
      }
    });

    html += `         
    <div class="carasole-slide">
      <img class="carasole-background" src="${item.background}" alt="">
      <div class="carasole-slide-info">
        <p class="carasole-total-chapter">${item.totalChapter}</p>
        <p class="carasole-title">${item.title}</p>
        <span class="carasole-desc">${item.description}</span>
        <div class="carasole-genre-container">
          ${genreHtml}
        </div>
        <div class="carasole-start-btn">
          Start Reading →
        </div>
      </div>
      <img class="carasole-img" src="${item.img}" alt="Chainsaw Man">
    </div>`;
  });
  parent.innerHTML += html;
  return 0;
}

async function getData() {
  try {
    let res = await fetch("/data/carasole-data.json");
    carasoleData = await res.json();
    console.table(carasoleData);
    renderCarasole();
    const carasoleBtn = document.querySelectorAll(".carasole-btn");
    carasoleBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        const btnValue = btn.dataset.index;

        carasoleBtn.forEach((btn) => {
          btn.classList.remove("carasole-btn-active");
        });

        btn.classList.add("carasole-btn-active");
        document.querySelectorAll(".carasole-slide").forEach((slide) => {
          // slide.classList.add("carasole-slide-right")
          slide.style.transform = `translateX(${btnValue * -100}%)`;
        });
      });
    });

    const parent = document.getElementById("carasole-container");
    let isDown = false;

    parent.addEventListener(".mouseDown", (e) => {
      isDown = true;
    });

    document.querySelectorAll(".carasole-start-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        console.log(`k`);
      });
    });
  } catch (err) {
    console.error(err);
  }
}

getData();


// document.addEventListener(
//   "click",
//   (e) => {
//     e.stopPropagation() `stop capture lebih lanjut`
//     console.log(e);
//   },
//   { capture: true }
// );
