const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']];

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('a','moves left', this.cursor.left.bind(this.cursor));
    Screen.addCommand('d','moves right',this.cursor.right.bind(this.cursor));
    Screen.addCommand('w','up',this.cursor.up.bind(this.cursor));
    Screen.addCommand('s','down',this.cursor.down.bind(this.cursor));
    Screen.addCommand('space','place move', ConnectFour.turn.bind(this));


    this.cursor.setBackgroundColor();
    Screen.render();
    Screen.printCommands();
  }

  static turn() {
    Screen.render();
    Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);

    if (this.playerTurn == "O") {
      this.playerTurn = "X";
    } else {
      this.playerTurn = "O";
    }

    const winner = ConnectFour.checkWin(Screen.grid);

    if (!winner) {
      Screen.render();
    } else {
      ConnectFour.endGame(winner);
    }
  }

  

 static rotateGrid(grid) {
  return grid[0].map((val, index) => grid.map(row => row[index]).reverse());
  }

  static checkWin(grid) {

    const copy = ConnectFour.rotateGrid(grid);
    let choices = ["X","O"];


  for (const player in choices) {
    

      for (let k = 0; k < grid.length; k++) {
        let row = grid[k];
     for (let i = 0; i < row.length; i++) {
      if (row[i] == choices[player] && row[i + 1] == choices[player] && row[i + 2] == choices[player] && row[i + 3] == choices[player]) {
        return choices[player];
      }
     }
      }

      for (let o = 0; o < copy.length; o++) {
        let col = copy[o];

        for (let j = 0; j < col.length; j++) {
          if (col[j] == choices[player] && col[j + 1] == choices[player] && col[j + 2] == choices[player] && col[j + 3] == choices[player]) {
            return choices[player];
          }
        }
      }
      
            
            
           
      
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
          let target = grid[i][j];
         
          if ((target == choices[player]) &&
              (grid[i][j] == grid[i + 1][j + 1]) &&
              (grid[i + 1][j + 1] == grid[i + 2][j + 2]) &&
              (grid[i + 2][j + 2] == grid[i + 3][j + 3])) {
              return choices[player];
              } else if ((copy[i][j] == choices[player]) &&
              (copy[i][j] == copy[i + 1][j + 1]) &&
              (copy[i + 1][j + 1] == copy[i + 2][j + 2]) &&
              (copy[i + 2][j + 2] == copy[i + 3][j + 3])) {
              return choices[player];
              }
            
        }   
    }
    
    
  }
  if (grid.every(row => row.every(el => el != ' '))) {
    return "T";

  } else {
    return false;
  }
}

  

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
