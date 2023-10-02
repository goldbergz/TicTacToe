
const imgCat = new Image()
imgCat.src = 'images/cat.png'
imgCat.alt ='Cat'

const imgDog = new Image()
imgDog.src = 'images/dog.png'
imgDog.alt = 'Dog'

const statusOfGame = document.querySelector('.container__victory')

let gameActive = true
let symbolPlayer = imgCat
let gameState = ['', '', '', '', '', '', '', '', '']

const victoryMessage = () => `Player ${symbolPlayer.alt} win!`
const symbolPlayerTurn = () => `Player ${symbolPlayer.alt}'s turn`
const drawMessage = () => `Game ended in a draw!`

statusOfGame.innerHTML = symbolPlayerTurn()

const  winPoints = [
    [0, 1, 2], [3, 4, 5],
    [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

 function clickCell(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = symbolPlayer.alt
    clickedCell.appendChild(symbolPlayer.cloneNode())
 }

 function handlePlayerChange() {
    symbolPlayer = symbolPlayer === imgCat ? imgDog : imgCat
    statusOfGame.innerHTML = symbolPlayerTurn()
}

function isVictory() {
    let winnerPlayer = false
    let winningCells = []
    for(let i = 0; i <= 7; i++) {
        const winPoint = winPoints[i]

        const a = gameState[winPoint[0]]
        const b = gameState[winPoint[1]]
        const c = gameState[winPoint[2]]
        if(a === '' || b === '' || c === '')
            continue
        if(a === b && b === c) {
            winnerPlayer = true
            winningCells = winPoint
            break
        }
    }
        if(winnerPlayer) {
            statusOfGame.innerHTML = victoryMessage()
            winningCells.forEach(clickedCellIndex => {
                let cell = document.querySelector(`[data-cell-index="${clickedCellIndex}"]`)
                cell.style.backgroundColor = 'rgba(172, 114, 167, 0.8)'
            })

            gameActive = false
            return
        }

        const roundDraw = !gameState.includes("")
        if(roundDraw) {
            statusOfGame.innerHTML = drawMessage()
            gameActive = false;
             return;
        }

    handlePlayerChange();
}

function click(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'))

    if(gameState[clickedCellIndex] !== '' || !gameActive)
        return

        clickCell(clickedCell, clickedCellIndex)
        isVictory()
}

function restartGame() {
    gameActive = true
    symbolPlayer = imgCat
    gameState = ['', '', '', '', '', '', '', '', '']
    statusOfGame.innerHTML = symbolPlayerTurn()
    document.querySelectorAll('.box').forEach(box => {
        box.innerHTML = ''
        box.style.backgroundColor = ''
    })
}

document.querySelectorAll('.box').forEach(box => box.addEventListener('click', click))
document.querySelector('.restart__button').addEventListener('click', restartGame);
