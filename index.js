const numFields = 9;
const fieldSeperator = 3;
const cellSize = 600 / numFields;
const numbers = [];
let numbersCopy = [];
let iteration = 0;
let iterationP;
let solved = false;

function setup() {
  createCanvas(600, 600);
  fillNumbersEasy();
  frameRate(1);
  const easyBtn = createButton("Easy");
  easyBtn.mousePressed(fillNumbersEasy);
  const hardBtn = createButton("Hard");
  hardBtn.mousePressed(fillNumbersHard);
  iterationP = createP("Iteration: " + iteration);
}

function draw() {
  background(51);
  if (!solved) {
    iteration++;
  }
  iterationP.html("Iteration: " + iteration);

  for (let i = 0; i < height; i += cellSize) {
    stroke(255);
    if (Math.round(i) % Math.round((width / numFields) * fieldSeperator) == 0) {
      strokeWeight(4);
    } else {
      strokeWeight(1);
    }
    line(0, i, width, i);
  }
  for (let i = 0; i < width; i += cellSize) {
    if (Math.round(i) % Math.round((width / numFields) * fieldSeperator) == 0) {
      strokeWeight(4);
    } else {
      strokeWeight(1);
    }
    line(i, 0, i, height);
  }

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers[i].length; j++) {
      if (numbers[i][j] == numbersCopy[i][j]) {
        fill(75);
      } else {
        fill(255);
      }
      if (numbers[i][j]) {
        textSize(25);
        textAlign(CENTER, CENTER);
        text(
          numbers[i][j],
          i * cellSize + cellSize / 2,
          j * cellSize + cellSize / 2
        );
      }
    }
  }
  solveNumber();
  // noLoop();
}

function solveNumber() {
  let filled = 0;
  for (let i = 0; i < numFields; i++) {
    for (let j = 0; j < numFields; j++) {
      if (numbers[i][j]) {
        continue;
      }
      let candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      // col
      for (let k = 0; k < numbers[i].length; k++) {
        let index = candidates.indexOf(numbers[i][k]);
        if (index > -1) {
          candidates.splice(index, 1);
        }
      }

      // row
      for (let k = 0; k < numbers.length; k++) {
        let index = candidates.indexOf(numbers[k][j]);
        if (index > -1) {
          candidates.splice(index, 1);
        }
      }

      // loop over current 3x3 region in numbers
      let startX = Math.floor(i / fieldSeperator) * fieldSeperator;
      let startY = Math.floor(j / fieldSeperator) * fieldSeperator;
      for (let k = startX; k < startX + fieldSeperator; k++) {
        for (let l = startY; l < startY + fieldSeperator; l++) {
          let index = candidates.indexOf(numbers[k][l]);
          if (index > -1) {
            candidates.splice(index, 1);
          }
        }
      }

      console.log("candidates for i:" + i + ", j:" + j + ": " + candidates);
      console.log(candidates);

      if (candidates.length == 1) {
        numbers[i][j] = candidates[0];
        filled++;
      }
    }
  }
  if (filled == 0 && !solved) {
    console.log("SOLVED");
    solved = true;
    createP("Solved!");
  }
}

function createEmptyArray() {
  for (let i = 0; i < numFields; i++) {
    numbers[i] = [];
  }
}

// fill array with start sudoku numbers
function fillNumbersEasy() {
  iteration = 0;
  createEmptyArray();
  numbers[0][0] = 9;
  numbers[0][2] = 4;
  numbers[0][3] = 6;
  numbers[0][5] = 2;
  numbers[0][8] = 1;

  numbers[1][1] = 5;
  numbers[1][3] = 8;
  numbers[1][4] = 3;
  numbers[1][5] = 1;
  numbers[1][7] = 4;
  numbers[1][8] = 9;

  numbers[2][1] = 1;
  numbers[2][2] = 3;
  numbers[2][4] = 4;
  numbers[2][7] = 2;
  numbers[2][8] = 7;

  numbers[3][4] = 5;
  numbers[3][6] = 4;

  numbers[4][1] = 9;
  numbers[4][3] = 2;
  numbers[4][7] = 5;

  numbers[5][0] = 7;
  numbers[5][1] = 4;
  numbers[5][3] = 3;
  numbers[5][5] = 6;
  numbers[5][6] = 2;

  numbers[6][1] = 7;
  numbers[6][2] = 8;
  numbers[6][3] = 4;
  numbers[6][4] = 1;
  numbers[6][5] = 5;
  numbers[6][7] = 6;
  numbers[6][8] = 2;

  numbers[7][1] = 2;
  numbers[7][3] = 7;
  numbers[7][4] = 6;
  numbers[7][6] = 1;
  numbers[7][8] = 5;
  numbersCopy = JSON.parse(JSON.stringify(numbers));
}

function fillNumbersHard() {
  iteration = 0;
  createEmptyArray();
  numbers[1][0] = 2;
  numbers[1][1] = 6;
  numbers[1][2] = 9;
  numbers[1][3] = 8;

  numbers[2][4] = 4;
  numbers[2][7] = 8;
  numbers[2][8] = 3;

  numbers[3][1] = 4;
  numbers[3][2] = 5;
  numbers[3][4] = 1;
  numbers[3][8] = 7;

  numbers[4][0] = 1;
  numbers[4][7] = 5;

  numbers[5][3] = 2;

  numbers[6][6] = 9;
  numbers[6][7] = 7;

  numbers[7][0] = 9;
  numbers[7][1] = 8;
  numbers[7][3] = 7;
  numbers[7][4] = 6;
  numbers[7][8] = 1;

  numbers[8][0] = 6;
  numbers[8][6] = 5;
  numbersCopy = JSON.parse(JSON.stringify(numbers));
}
