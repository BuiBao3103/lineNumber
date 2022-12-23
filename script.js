const wrapperContainer = document.querySelector("#wrapper .container");
const inputForm = document.querySelector("#input");
const human = document.querySelector("#wrapper .human");
let numbers = null;
let generatorLineNumber = (start, end) => {
  for (let i = start; i <= end; i++) {
    let span = document.createElement("span");
    let p = document.createElement("p");
    p.innerHTML = i;
    if (i > -1 && i < 10)
      p.style.transform = "translate(" + -4 + "px," + 25 + "px)";
    else if (i < -9)
      p.style.transform = "translate(" + -10 + "px," + 25 + "px)";
    else p.style.transform = "translate(" + -7 + "px," + 25 + "px)";
    span.appendChild(p);
    wrapperContainer.appendChild(span);
  }
  wrapperContainer.appendChild(document.createElement("span"));
  let spanContainer = document.querySelectorAll("#wrapper span");
  if (spanContainer.length > 1) {
    new LeaderLine(spanContainer[0], spanContainer[spanContainer.length - 1], {
      startPlug: "behind",
      endPlug: "arrow1",
      color: "rgb(0,0,0)",
      size: 2,
    });
  }
  numbers = document.querySelectorAll("#wrapper span");
  let pos = (1000 / (numbers.length - 1)) * (start * -1) - 25;
  human.style.transform = "translate(" + pos + "px," + -50 + "px)";
  humanTranslate();
};
document.querySelector("#input button").addEventListener("click", () => {
  let start = parseInt(document.querySelector("#start").value);
  let end = parseInt(document.querySelector("#end").value);
  if (isNaN(start) || isNaN(end)) {
    alert("Điền đầy đủ Start và End!");
    return;
  }
  if (end < 0 || start > 0) {
    alert("Trục số phải có giá trị 0!");
    return;
  }
  if (start >= end) {
    alert("Start phải bé hơn End!");
    document.querySelector("#start").value = "";
    document.querySelector("#end").value = "";
    return;
  }
  human.style.display = "block";
  inputForm.style.display = "none";
  generatorLineNumber(start, end);
});
humanTranslate = () => {
  // console.log(numbers)
  for (let i = 0; i < numbers.length - 1; i++) {
    numbers[i].addEventListener("click", () => {
      console.log(numbers.length - 1);
      let pos = (1000 / (numbers.length - 1)) * i - 25;
      human.style.transform = "translate(" + pos + "px," + -50 + "px)";
    });
  }
};

// generatorLineNumber();
