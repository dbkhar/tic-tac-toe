let audioTurn = new Audio("ting.mp3");
let turn = "X";
let isgameover = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];

    for (let e of wins) {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            let winner = boxtext[e[0]].innerText;
            document.querySelector('.info').innerText = winner + " Won 🎉";
            isgameover = true;

            // Show winning image
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "180px";


            // Display line
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "18vw";

            return;
        }
    }

    // Check for draw
    let filledBoxes = Array.from(boxtext).filter(b => b.innerText !== "").length;
    if (filledBoxes === 9 && !isgameover) {
        document.querySelector('.info').innerText = "It's a Draw 🤝";
        isgameover = true;
        document.querySelector('.imgbox2').getElementsByTagName('img')[0].style.width = "180px";
    }
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                turn = changeTurn();
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Reset logic
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;

    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;

    // Reset all image widths
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
    document.querySelector('.imgbox2').getElementsByTagName('img')[0].style.width = "0px";
    document.querySelector('.imgboxCelebrate').getElementsByTagName('img')[0].style.width = "0px";
});
