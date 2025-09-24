const parent = document.getElementById("recom-selection-container")

parent.addEventListener("click", (e) => {
  parent.querySelectorAll(".recom-select").forEach((btn) => {
    btn.classList.remove("recom-select-active")
  })
  
  const target = e.target.closest(".recom-select")  
  target.classList.add("recom-select-active")
})