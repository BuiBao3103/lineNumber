const wrapperContainer = document.querySelector("#wrapper .container");
const inputForm = document.querySelector("#input");
const human = document.querySelector("#wrapper .human");
const removeBtn = document.querySelector("#remove");
const newBtn = document.querySelector("#new");
let numbers = null;
let line = [];
let currentPos = null;
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
    let p2 = document.createElement("p");
    p2.style.transform = "translateY(" + -25 + "px)";
    span.appendChild(p2);

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
  currentPos = numbers[start * -1];
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
    alert("Trục số phải chứa giá trị 0!");
    return;
  }
  if (start >= end) {
    alert("Start phải bé hơn End!");
    document.querySelector("#start").value = "";
    document.querySelector("#end").value = "";
    return;
  }
  human.style.display = "block";
  removeBtn.style.display = "inline-block";
  newBtn.style.display = "inline-block";
  inputForm.style.display = "none";
  generatorLineNumber(start, end);
});
humanTranslate = () => {
  // console.log(numbers)
  for (let i = 0; i < numbers.length - 1; i++) {
    numbers[i].addEventListener("click", () => {
      let pos = (1000 / (numbers.length - 1)) * i - 25;
      human.style.transform = "translate(" + pos + "px," + -50 + "px)";
      humanMove(numbers[i]);
      currentPos = numbers[i];
    });
  }
};

let humanMove = (end) => {
  let s = currentPos.childNodes[0].innerHTML;
  let e = end.childNodes[0].innerHTML;
  let newLine = new LeaderLine(currentPos.childNodes[1], end.childNodes[1], {
    startPlug: "behind",
    endPlug: "arrow1",
    color: "rgb(0,0,255)",
    size: 2,
    startSocket: s < e ? "right" : "left",
    endSocket: s > e ? "right" : "left",
    hide: true,
  });
  newLine.show("draw");
  line.push(newLine);
};

removeBtn.addEventListener("click", () => {
  currentPos = numbers[numbers[0].childNodes[0].innerHTML * -1];
  let pos =
    (1000 / (numbers.length - 1)) * (numbers[0].childNodes[0].innerHTML * -1) -
    25;
  human.style.transform = "translate(" + pos + "px," + -50 + "px)";
  line.forEach((l) => l.remove());
  line = [];
});

newBtn.addEventListener("click", () => {
  location.reload();
});
