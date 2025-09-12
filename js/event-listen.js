const parent = document.getElementById("recom-selection-container")

parent.addEventListener("click", (e) => {
  parent.querySelectorAll(".time-selection").forEach((btn) => {
    btn.classList.remove("time-selection-active")
  })
  
  const target = e.target.closest(".time-selection")  
  target.classList.add("time-selection-active")
})