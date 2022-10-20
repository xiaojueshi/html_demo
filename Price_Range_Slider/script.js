const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  progress = document.querySelector(".slider .progress"),
  intervalText = document.querySelector("header p span")

let priceGap = 10, // 步长
  maxValue = 100, // 最大值
  minValue = 0    // 最小值

intervalText.innerText = `(${minValue}~${maxValue})`

rangeInput[0].step = priceGap
rangeInput[0].max = maxValue
rangeInput[0].min = minValue
rangeInput[0].value = minValue

rangeInput[1].step = priceGap
rangeInput[1].max = maxValue
rangeInput[1].min = minValue
rangeInput[1].value = maxValue

priceInput[0].value = minValue
priceInput[1].value = maxValue

progress.style.left = 0
progress.style.right = 0



priceInput.forEach(input => {
  input.addEventListener("input", e => {
    let minVal = parseInt(priceInput[0].value),
      maxVal = parseInt(priceInput[1].value)

    if ((maxVal - minVal >= priceGap) && maxVal <= maxValue) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minVal
        progress.style.left = (minVal / rangeInput[0].max) * 100 + "%"
      } else {
        rangeInput[1].value = maxVal
        progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%"

      }
    }
  })
})

rangeInput.forEach(input => {
  input.addEventListener("input", e => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value)

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap
      } else {
        rangeInput[1].value = minVal + priceGap
      }
    } else {
      priceInput[0].value = minVal
      priceInput[1].value = maxVal
      progress.style.left = (minVal / rangeInput[0].max) * 100 + "%"
      progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%"
    }
  })
})