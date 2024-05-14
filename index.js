let whosTurn = 0;
let boxes = []
// we will assume X even and 0 is odd, and thus X goes first


/**
 * 
 * @param {BigInt} number 
 * @returns true if even, false if odd
 */
function isEven(number) {
  return number % 2 === 0;
}


/**
 * 
 * @param {[String]} boxes the array of box ID's in the game board
 */
function loadBoxesArray(boxes) {
  for (let i = 1; i < 10; i++) {
    let element = '#box' + i;
    boxes.push(element);
    $(element).textContent = '';
  }
  //let's be sure this worked
  console.log(boxes);
}


/**
 * 
 * @param {String} box1 
 * @param {String} box2 
 * @param {String} box3 
 * @returns 
 */
function areContentsTheSame(box1, box2, box3) {
  console.log($(box1).text());
  return !!($(box1).text() != '' &&
    $(box1).text() === $(box2).text() && $(box1).text() === $(box3).text());
}

/**
 * 
 * @param {[String]} boxes 
 * @returns true if a winner is found false if not
 */
function determineIfWon(boxes) {
  let isWinner = false;
  //check all the ways you can win
  //row 1
  isWinner = areContentsTheSame(boxes[0], boxes[1], boxes[2]);
  if (isWinner) {
    handleWinner(boxes[0], boxes[1], boxes[2]);
    return true;
  }
  //row2
  isWinner = areContentsTheSame(boxes[3], boxes[4], boxes[5]);
  if (isWinner) {
    handleWinner(boxes[3], boxes[4], boxes[5]);
    return true;
  }
  //row3
  isWinner = areContentsTheSame(boxes[6], boxes[7], boxes[8]);
  if (isWinner) {
    handleWinner(boxes[6], boxes[7], boxes[8]);
    return true;
  }
  //col 1
  isWinner = areContentsTheSame(boxes[0], boxes[3], boxes[6]);
  if (isWinner) {
    handleWinner(boxes[0], boxes[3], boxes[6]);
    return true;
  }
  //col 2
  isWinner = areContentsTheSame(boxes[1], boxes[4], boxes[7]);
  if (isWinner) {
    handleWinner(boxes[1], boxes[4], boxes[7]);
    return true;
  }
  //col 3
  isWinner = areContentsTheSame(boxes[2], boxes[5], boxes[8]);
  if (isWinner) {
    handleWinner(boxes[2], boxes[5], boxes[8]);
    return true;
  }
  //diagonal 1
  isWinner = areContentsTheSame(boxes[0], boxes[4], boxes[8]);
  if (isWinner) {
    handleWinner(boxes[0], boxes[4], boxes[8]);
    return true;
  }
  //diagonal 2
  isWinner = areContentsTheSame(boxes[2], boxes[4], boxes[6]);
  if (isWinner) {
    handleWinner(boxes[2], boxes[4], boxes[6]);
    return true;
  }
  return false;
}

 function checkifAllBoxesFull() {
  let allfull=true;
  let i = 0;
  while (i < boxes.length && allfull) {
    let boxText = $(boxes[i]).text();
    if(boxText !== 'X' && boxText!== 'O' ) {
      allfull = false;
    }
    i++;
  }
  return allfull;
 }

function handleWinner(box1, box2, box3) {
  if (isEven(whosTurn)) {
    $(`#result`).text("X is the winnner");
  } else {
    $(`#result`).text("O is the winnner");
  }
  $(box1).addClass('win');
  $(box2).addClass('win');
  $(box3).addClass('win');
  $(`#result`).show();
  whosTurn = 0;
}

function clearContents() {
  for (let box of boxes) {
    $(box).text('');
    $(box).removeClass('win');
  }
  $('#turn-span').text('Tic Tac Toe');
  $('#result').text('');
  $('#result').hide();

}


function loadClickEventIntoBoxes(boxes) {
  for (let box of boxes) {
    let  boxName = box.slice(1,5);
    let currentBox = document.getElementById(boxName);
    console.log (currentBox);
    currentBox.onclick = (event) => {
      let callingBox = event.target;
      console.log(callingBox);
      if (callingBox.innerHTML !== 'X' && callingBox.innerHTML !== 'O') {
        if (isEven(whosTurn)) {
          callingBox.innerHTML = 'X';
          $('#turn-span').text('O turn now');
        } else {
          callingBox.innerHTML = 'O';
          $('#turn-span').text('X turn now');
        }
        let winner = determineIfWon(boxes);
        if (!winner) {
          if(!checkifAllBoxesFull()) {
            whosTurn++;
          } else {
            $('#result').text(`It's a Tie!!!`);
          }
        } 
      }
    }
  }
}

$('#result').hide();
document.getElementById('clearBtn').addEventListener('click',clearContents);
loadBoxesArray(boxes);
loadClickEventIntoBoxes(boxes);

