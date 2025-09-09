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

function renderLatestUpdate (projectData) {
  projectData.forEach((data) => {
    
    let html = `
<div class="project-up-slide">
  <div class="project-up-img">
    <a class="project-up-link" href="${data.url}" title="slide"></a>
    <img src="${data.img}" alt="smyh">
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
    document.getElementById("latest-update-body").innerHTML += html
  })
}

function renderPopularSeries(projectData) {
  let rank = 1;
  projectData.forEach((data) => {
    const { genres } = data;
    let genreHtml = ``

    genres.forEach((genre) => {
      genreHtml += `<a href="#">${genre}, </a>`
    })

    let html = `
      <li>
        <div class="popular-series-rank">
          ${rank++}
        </div>
        <img class="sidebar-series-img" src="${data.img}" alt="">
        <div class="sidebar-series-content">
          <a class="sidebar-series-title" href="${data.url}">${data.title}</a>
          <span class="sidebar-series-genre">Genres: 
            ${genreHtml}                    
          </span>
          <div class="sidebar-series-rating">
            <img src="/ratings/rating-40.png" alt="">
            8.3
          </div>
        </div>
      </li>`
    
    document.getElementById("popular-series-list").innerHTML += html
  })
}

function renderNewSeries(projectData) {
  projectData.forEach((data) => {
    const { genres } = data;
    let genreHtml = ``

    genres.forEach((genre) => {
      genreHtml += `<a href="#">${genre}, </a>`
    })

    let html = `
      <li>
        <img class="sidebar-series-img" src="${data.img}" alt="">
        <div class="sidebar-series-content">
          <a class="sidebar-series-title" href="${data.url}">${data.title}</a>
          <span class="sidebar-series-genre">Genres: 
            ${genreHtml}                    
          </span>
          <div class="new-series-year">
            ${data.year}
          </div>
        </div>
      </li>`
    document.getElementById("new-series-list").innerHTML += html
  })
}

async function getPopTdy() {
  try {
    let res = await fetch("/data/popular-today.json")
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
    const res = await fetch("/data/body/project-update.json");
    const projectData = await res.json();
    renderProjectUpdate(projectData);
  } catch {
    console.log(`project update error`)
  }
}

async function getLatestUpdate() {
  try {
    const res = await fetch("/data/body/latest-update.json");
    const projectData = await res.json();
    renderLatestUpdate(projectData)
  } catch {
    console.log(`latest update error`)
  }
}

//sidebar
async function getPopSeries() {
  try {
    const res = await fetch("/data/sidebar/popular-weekly.json");
    const projectData = await res.json();
    renderPopularSeries(projectData)
  } catch {
    console.log(`popular series error`)
  }
}

async function newSeries() {
  try {
    const res = await fetch("/data/sidebar/serial-baru.json");
    const projectData = await res.json();
    renderNewSeries(projectData);
  } catch {
    console.log(`render new series error smtg`)
  }
}

document.querySelectorAll(".time-selection").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".time-selection").forEach((btn) => {
      btn.classList.remove("time-selection-active")
    })
    btn.classList.add("time-selection-active")
  })
})

getPopTdy()
getUpdate()
getPopSeries()
newSeries()
// getLatestUpdate()