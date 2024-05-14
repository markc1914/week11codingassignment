/**
 * Week 11 Coding Assignment - Tic Tac Toe
 * Written by Mark Cornelius
 */


$(document).ready(function () {

  let whosTurn = 0; // we will assume X even and 0 is odd, and thus X goes first
  const result = '#result';
  const turnSpan = '#turn-span';
  const winClass = 'win';
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
      let elementId = '#box' + i;
      boxes.push(elementId);
      $(elementId).textContent = '';
    }
  }

  /**
   * checks to see if the boxes have the same non-empty contents
   * if so, this set of three boxes represents a "winner"
   * @param {String} box1 the first box ID to check
   * @param {String} box2 the second box ID to check
   * @param {String} box3 the third box ID to check
   * @returns true if the contents are the same and not empty
   */
  function areContentsNotEmptyAndTheSame(box1, box2, box3) {
    return !!($(box1).text() != '' &&
      $(box1).text() === $(box2).text() && $(box1).text() === $(box3).text());
  }

  /**
   * determine if this round produces a winner based on the rules of Tic-tac-toe
   * @param {[String]} boxes - the array of box ID's
   * @returns true if a winner is found false if not
   */
  function determineIfWon(boxes) {
    let isWinner = false;
    //check all the ways you can win
    //row 1
    isWinner = areContentsNotEmptyAndTheSame(boxes[0], boxes[1], boxes[2]);
    if (isWinner) {
      handleWinner(boxes[0], boxes[1], boxes[2]);
      return true;
    }
    //row2
    isWinner = areContentsNotEmptyAndTheSame(boxes[3], boxes[4], boxes[5]);
    if (isWinner) {
      handleWinner(boxes[3], boxes[4], boxes[5]);
      return true;
    }
    //row3
    isWinner = areContentsNotEmptyAndTheSame(boxes[6], boxes[7], boxes[8]);
    if (isWinner) {
      handleWinner(boxes[6], boxes[7], boxes[8]);
      return true;
    }
    //col 1
    isWinner = areContentsNotEmptyAndTheSame(boxes[0], boxes[3], boxes[6]);
    if (isWinner) {
      handleWinner(boxes[0], boxes[3], boxes[6]);
      return true;
    }
    //col 2
    isWinner = areContentsNotEmptyAndTheSame(boxes[1], boxes[4], boxes[7]);
    if (isWinner) {
      handleWinner(boxes[1], boxes[4], boxes[7]);
      return true;
    }
    //col 3
    isWinner = areContentsNotEmptyAndTheSame(boxes[2], boxes[5], boxes[8]);
    if (isWinner) {
      handleWinner(boxes[2], boxes[5], boxes[8]);
      return true;
    }
    //diagonal 1
    isWinner = areContentsNotEmptyAndTheSame(boxes[0], boxes[4], boxes[8]);
    if (isWinner) {
      handleWinner(boxes[0], boxes[4], boxes[8]);
      return true;
    }
    //diagonal 2
    isWinner = areContentsNotEmptyAndTheSame(boxes[2], boxes[4], boxes[6]);
    if (isWinner) {
      handleWinner(boxes[2], boxes[4], boxes[6]);
      return true;
    }
    return false;
  }

  /**
   * check if all the boxes are full for a tie
   * @returns true if the boxes are all full, false if not
   */
  function checkifAllBoxesFull(boxes) {
    let allfull = true;
    let i = 0;
    while (i < boxes.length && allfull) {
      let boxText = $(boxes[i]).text();
      if (boxText !== 'X' && boxText !== 'O') {
        allfull = false;
      }
      i++;
    }
    return allfull;
  }

  /**
   * Paint the winning boxes and show the winner in an alert
   * @param {String} box1 the first box ID to paint
   * @param {String} box2 the second box ID to paint
   * @param {String} box3 the third box ID to paint
   */
  function handleWinner(box1, box2, box3) {
    if (isEven(whosTurn)) {
      $(result).text("X is the winnner");
    } else {
      $(result).text("O is the winnner");
    }
    $(box1).addClass(winClass);
    $(box2).addClass(winClass);
    $(box3).addClass(winClass);
    $(result).show();
    $(turnSpan).text('Game Over');
    whosTurn = 0;
  }


  /**
   * 
   * @param {[String]} boxes - the list of box ID's 
   */
  function clearContents(boxes, whosTurn) {
    for (let box of boxes) {
      $(box).text('');
      $(box).removeClass(winClass);
    }
    $(turnSpan).text(`Mark's Tic Tac Toe`);
    $(result).text('');
    $(result).hide();
  }

  /**
   * load the onClick event into each box so the game actually works
   * @param {[String]} boxes - the array of box ID's
   */
  function loadClickEventIntoBoxes(boxes) {
    for (let box of boxes) {
      $(box).on('click', (event) => {
        let callingBox = event.target;
        if (callingBox.innerHTML !== 'X' && callingBox.innerHTML !== 'O') {
          if (isEven(whosTurn)) {
            callingBox.innerHTML = 'X';
            $(turnSpan).text(`O's turn now`);
          } else {
            callingBox.innerHTML = 'O';
            $(turnSpan).text(`X's turn now`);
          }
          let winner = determineIfWon(boxes);
          if (!winner) {
            if (!checkifAllBoxesFull(boxes)) {
              whosTurn++;
            } else {
              $(result).text(`It's a Tie!!!`);
              $(result).show();
              $(turnSpan).text('Game Over');
              whosTurn = 0;
            }
          }
        }
      });
    }
  }

  let boxes = [];
  $(result).hide();
  $('#clearBtn').on('click', () => {
    clearContents(boxes);
    whosTurn = 0;
  });
  loadBoxesArray(boxes);
  loadClickEventIntoBoxes(boxes);
});