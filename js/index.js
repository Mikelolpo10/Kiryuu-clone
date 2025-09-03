function renderSlide (slideData) {
  slideData.forEach((data) => {
    let colored = ``;
    let roundedRating = 0;

    if (data.color === "color") {
      colored = `
        <span class="colored">
          <i class="fa-solid fa-palette"></i>
          COLOR
        </span>
      `
    }

    if (data.rating % 1 !== 0 && Number.isInteger(data.rating * 2)) {
      roundedRating = Math.round(data.rating) * 5;
    } else {
      roundedRating = Math.round(data.rating) * 5;
    };
    
    const html = `            
      <a class="popular-tdy-link" href="#" title="slide">
        <div class="popular-tdy-slide">
        <div class="tdy-slide-img">
          <img src="${data.img}" alt="smyh">
          <img class="tdy-slide-flag" src="${data.type}" alt="china-flag">
          ${colored}
          <span class="hot"></span>
        </div>
        <span href="${data.url}" class="tdy-slide-title">${data.title}</span>
        <p class="tdy-slide-total-chapter">${data.totalChapter}</p>
        <span class="tdy-slide-rating">
          <img src="/ratings/rating-${roundedRating}.png" alt="${data.rating}">
          ${data.rating}
        </span>
        </div>
      </a>`
    document.getElementById("popular-tdy-slider").innerHTML += html
  })
}

//nanti coba buat timenya pake dayjs
function renderProjectUpdate(projectData) {
  projectData.forEach((data) => {
    
    let html = `
<div class="project-up-slide">
  <div class="project-up-img">
    <a class="project-up-link" href="${data.url}" title="slide"></a>
    <img src="${data.img}" alt="smyh">
    <img class="project-up-flag" src="${data.type}" alt="china-flag">
    <span class="hot"></span>
  </div>
  <a class="project-up-title" href="${data.url}">${data.title}</a>
  <div class="project-up-ch">
    <a href="${data.latest.url}">${data.latest.chapter}</a> 
    <p class="project-up-time">${data.latest.time}</p>
  </div>
  <div class="project-up-ch">
    <a href="${data.previous.url}">${data.previous.chapter}</a> 
    <p class="project-up-time">${data.previous.time}</p>
  </div>
</div>`;
    document.getElementById("project-up-body").innerHTML += html
  })
}

async function getData() {
  try {
    let res = await fetch("/data/popular-tdy.json")
    let slideData = await res.json()
    renderSlide(slideData)

    document.querySelectorAll(".popular-tdy-link").forEach((item) => {
      item.addEventListener("mouseover", () => {
        item.querySelector(".tdy-slide-title").classList.add("tdy-slide-title-active")
      })
    })

    document.querySelectorAll(".popular-tdy-link").forEach((item) => {
      item.addEventListener("mouseout", () => {
        item.querySelector(".tdy-slide-title").classList.remove("tdy-slide-title-active")
      })
    })
  } catch {
    console.log(`ERROR SLIDER`)
  }
}

async function getUpdate() {
  try {
    const res = await fetch("/data/project-update.json")
    const projectData = await res.json()
    renderProjectUpdate(projectData);
  } catch {
    console.log(`project update error`)
  }
}

getUpdate()
getData()