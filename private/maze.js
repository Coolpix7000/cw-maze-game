var canvas = $('#game_board');
var level_count = 0;

// Only set the board if we haven't ran anything yet
if(level_count == 0) {
   var board = grid_object[0];
}

// Always start at (0, 0)
var player = {
    x: 0,
    y: 0
};

// Draw the game board
function draw() {
    var width = canvas.width();
    var blockSize = width/board.length;
    var ctx = canvas[0].getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, width);
    ctx.fillStyle = "white";

    // Loop through the board array drawing the walls and the goal
    for(var y = 0; y < board.length; y++){
        for(var x = 0; x < board[y].length; x++){
            // Draw a wall
            if(board[y][x] === 1){
                ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
            }
            // Draw the goal
            else if(board[y][x] === -1){
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.strokeStyle = "red";
                ctx.moveTo(x * blockSize, y * blockSize);
                ctx.lineTo((x + 1) * blockSize, (y + 1) * blockSize);
                ctx.moveTo(x * blockSize, (y + 1) * blockSize);
                ctx.lineTo((x + 1) * blockSize, y * blockSize);
                ctx.stroke();
            }
        }
    }

    // Draw the player
    ctx.beginPath();
    var half = blockSize / 2;
    ctx.fillStyle = "blue";
    ctx.arc(player.x * blockSize + half, player.y * blockSize + half, half, 0, 2 * Math.PI);
    ctx.fill();
}

// Check to see if the new space is inside the board and not a wall
function canMove(x, y) {
    // Check if we are at the finish line, then move to next level
    if(board[y][x] == -1) {
		level_count++;
		console.log('level count: '+level_count);
        
        if(level_count == 3) {
            // Redirect to finish page if we have completed the game
            window.location.href = 'http://localhost/private/maze.php?view=completed';
        }

        player = {
            x: 0,
            y: 0
        };

		board = grid_object[level_count];
		draw();
    }
    return (y >= 0) && (y < board.length) && (x >= 0) && (x < board[y].length) && (board[y][x] != 1);
}

$(document).keyup(function(e){
    if((e.which == 38) && canMove(player.x, player.y - 1)) // Up arrow
        player.y--;
    else if((e.which == 40) && canMove(player.x, player.y + 1)) // Down arrow
        player.y++;
    else if((e.which == 37) && canMove(player.x - 1, player.y))
        player.x--;
    else if((e.which == 39) && canMove(player.x + 1, player.y))
        player.x++;
    draw();
    e.preventDefault();
});

draw();