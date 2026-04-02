let boxes = document.querySelectorAll(".box");
let resetgame = document.querySelector("#resetgame");
let newgamebtn = document.querySelector("#newgame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // O starts
let count = 0;

const winpattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enablebox();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true;
    count++;

    let isWinner = checkwinner();

    if (count === 9 && !isWinner) {
      showDraw();
    }
  });
});

const disablebox = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enablebox = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showwinner = (winner) => {
  msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disablebox();
};

const showDraw = () => {
  msg.innerText = "😅 It's a Draw!";
  msgContainer.classList.remove("hide");
};

const checkwinner = () => {
  for (let pattern of winpattern) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showwinner(pos1);
        return true;
      }
    }
  }
  return false;
};

// Button Events
newgamebtn.addEventListener("click", resetGame);
resetgame.addEventListener("click", resetGame);