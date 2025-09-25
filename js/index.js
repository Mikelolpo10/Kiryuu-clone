function renderPopularTdy (data) {
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
    
    return `            
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
}

function renderProjectUpdate(data) {
  return `
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
}

function renderLatestUpdate(data) {
  let html = ``

  data.forEach(d => {  
    const {title, img, url, latest} = d;
    html += `
    <div class="latest-up-slide">
    <div class="latest-up-img">
        <a class="latest-up-link" href="${url}"></a>
        <img src="${img}" alt="${title}">
        </div>
        <div class="latest-up-detail">
        <a class="latest-up-title" href="#">${title}</a>
        <ul>
        <li class="latest-up-ch">
        <a href="${latest[0].url}">${latest[0].ch}</a> 
        <p class="latest-up-time">${latest[0].time}</p>
        </li>
        <li class="latest-up-ch">
        <a href="${latest[1].url}">${latest[1].ch}</a> 
        <p class="latest-up-time">${latest[1].time}</p>
        </li>
        <li class="latest-up-ch">
        <a href="${latest[2].url}">${latest[2].ch}</a> 
        <p class="latest-up-time">${latest[2].time}</p>
        </li>
        </ul>
        </div>
        </div>`
        });
    document.getElementById("latest-up-next").insertAdjacentHTML("beforebegin", html)
}

function renderBlog(data, i) {
  const {title, img, url, desc, author, publishDate} = data;
  
  if (i >= 3) {
    return
  }
  
  return `
    <article class="blog-box">
      <div class="blog-img">
        <a href="${url}" title="${title}"></a>
        <img src="${img}" alt="${title}">
      </div>
      <a class="blog-title" href="#">${title}</a>
      <p class="sidebar-series-genre">${desc}</p>
      <span class="blog-meta sidebar-series-genre">
        <i class="fa-regular fa-user"></i>
        <i>${author}</i>
        &centerdot;
        <i class="fa-regular fa-clock"></i> 
        ${publishDate}
      </span>
    </article>`
}

//sidebar
function renderPopularSeries(data, i) { //nanti bikin href buat setiap genrenya
  const { img, url, title, genres, rating } = data
  const genreHtml = genres.map((g) => `<a href= "#">${g}</a>`).join(", ")
  let roundedRating = 0;

  if (rating % 1 !== 0 && Number.isInteger(rating * 2)) {
    roundedRating = Math.round(rating) * 5;
  } else {
    roundedRating = Math.round(rating * 5)
  }
  
  return `
    <li>
      <div class="popular-series-rank">
        ${i + 1}
      </div>
      <img class="sidebar-series-img" src="${img}" alt="${title}">
      <div class="sidebar-series-content">
        <a class="sidebar-series-title" href="${url}">${title}</a>
        <span class="sidebar-series-genre">Genres: 
          ${genreHtml}                    
        </span>
        <div class="sidebar-series-rating">
          <img src="/ratings/rating-${roundedRating}.png" alt="">
          ${rating}
        </div>
      </div>
    </li>`
}

function renderNewSeries(data) {
  const {img, url, title, genres, year} = data
  const genreHtml = genres.map((g) => `<a href="#">${g}</a>`).join(", ");
    return `<li>
      <img class="sidebar-series-img" src="${img}" alt="${title}">
      <div class="sidebar-series-content">
        <a class="sidebar-series-title" href="${url}">${title}</a>
        <span class="sidebar-series-genre">Genres: ${genreHtml}</span>
        <div class="new-series-year">${year}</div>
      </div>
    </li>`;
}


//factory function
function renderList (data, template, targetId) {
  const html = data.map((item, i) => template(item, i)).join("")
  document.getElementById(targetId).innerHTML = html
}

async function fetchAndRender (url, template, targetId) {
  try {
    const res = await fetch(url)
    const data = await res.json()
    renderList(data, template, targetId)
  } catch {
    console.log(`error ${targetId}`)
  }
}

async function latestUpdate () {
  try {
    const res = await fetch("/data/body/latest-update.json")
    const data = await res.json()
    renderLatestUpdate(data)
  } catch {
    console.log(`error latest`)
  }
}
latestUpdate()

fetchAndRender("./data/head/popular-today.json", renderPopularTdy, "popular-tdy-slider")
fetchAndRender("./data/body/project-update.json", renderProjectUpdate, "project-up-body")
fetchAndRender("./data/others/blog.json", renderBlog, "blog-body")

//sidebar
fetchAndRender("./data/sidebar/popular-weekly.json", renderPopularSeries, "popular-series-list")
fetchAndRender("./data/sidebar/serial-baru.json", renderNewSeries, "new-series-list")
