let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".btn")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")

let turnO = true;
let count = 0;  // To track the click

let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

// Handle each box click event
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#603808"
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#6c584c"
            turnO = true;
        }
        box.disabled = true;

        count++;
        checkWinner();

    });
});

// Reset game function
const resetGame = () => {
    turnO = true;
    enableBoxes();
    count = 0;
    msgContainer.classList.add("hide")
    resetBtn.innerText="Reset Game"
    for (let pattern of winPatterns) {
    boxes[pattern[0]].style.backgroundColor="#c89f9c"
    boxes[pattern[1]].style.backgroundColor="#c89f9c"
    boxes[pattern[2]].style.backgroundColor="#c89f9c"
    }
}

// Enable boxes function for resetting
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = ""
    });
}

// // Disable boxes function after game ends
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });

}

const showWinner = (winner) => {
    msg.innerText = `Congratulations!!! \n The winner is ${winner}`
    msgContainer.classList.remove("hide")
    resetBtn.innerText="New Game"
    disableBoxes();
}

// Check if the game is a draw
const drawGame = () => {
    if (count === 9)  
        {
        msg.innerText = "It's a draw"
        msgContainer.classList.remove("hide")
    }
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        // Check if all position is non-empty and have same  value
        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                boxes[pattern[0]].style.backgroundColor="#FEFAE0"
                boxes[pattern[1]].style.backgroundColor="#FEFAE0"
                boxes[pattern[2]].style.backgroundColor="#FEFAE0"
                showWinner(pos1val);
                return;
            }
        }

    }
    // Call if winner is not found and 9 moves are made
    drawGame()
}

// Event Listener for reset game button
resetBtn.addEventListener("click", resetGame)

