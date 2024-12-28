let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("reset-btn");
let newBtn = document.getElementById("new-btn");
let msg = document.getElementById("msg");
let main = document.getElementById("main");
let msgContainer = document.querySelector(".msg-container");

let turn0 = true;

let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  main.style.display = "none";
  disableBoxes();
};

const resetGame = () => {
  turn0 = true;
  enableBoxes();
  main.style.display = "block";
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerHTML === "") {
      if (turn0) {
        // Player 0
        box.innerHTML = "0";
        box.style.color = "#3A31CD";
        turn0 = false;
      } else if (turn0 == false) {
        // Player X
        box.innerHTML = "X";
        box.style.color = "#EA6262";
        turn0 = true;
      }
      box.disabled = true;
      count++;
      checkWinner();
      if (count === 9 && !checkWinner()) {
        // If all moves made and no winner, it's a draw
        showDraw();
      }
    }
  });
});
const showDraw = () => {
  msg.innerText = "It's a draw, Try Again ";
  msgContainer.classList.remove("hide");
  main.style.display = "none";
  // disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerHTML;
    let pos2val = boxes[pattern[1]].innerHTML;
    let pos3val = boxes[pattern[2]].innerHTML;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
      }
    }
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerHTML = "";
  }
};

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
