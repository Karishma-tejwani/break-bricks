import { useEffect, useRef } from "react";
import data from "../../data";
import BallMovement from "./BallMovement";
import Brick from "./Brick";
import Paddle from "./Paddle";
import BrickCollision from "./util/BrickCollision";
import WallCollision from "./util/WallCollision";
import PaddleHit from "./util/PaddleHit";
import PlayerStats from "./PlayerStats";
import AllBroken from "./util/AllBroken";
import ResetBall from "./util/ResetBall";

let bricks = [];
let { ballObj, paddleProps, brickObj, player } = data;
let br = 20;

function Board() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      paddleProps.y = canvas.height - 30;

      //assign bricks
      let newBrickSet = Brick(2, bricks, canvas, brickObj);
      if (newBrickSet && newBrickSet.length > 0) {
        bricks = newBrickSet;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      PlayerStats(ctx, player, canvas);

      //Game over
      if (player.lives === 0) {
        alert("Game Over!");
        player.lives = 2;
        player.level = 1;
        player.score = 0;
        ResetBall(ballObj, canvas, paddleProps);
        bricks.length = 0;
      }

      //winner
      if (br === 0) {
        alert("Congratulations! you won the game");
      }

      //display bricks
      bricks.map((brick) => {
        return brick.draw(ctx);
      });

      //handle ball movement
      BallMovement(ctx, ballObj);

      //check allbroken bricks
      AllBroken(bricks, player, canvas, ballObj);

      //ball and wall collision
      WallCollision(ballObj, canvas, player, paddleProps);

      //brick collision
      let brickCollision;
      for (let i = 0; i < bricks.length; i++) {
        brickCollision = BrickCollision(ballObj, bricks[i]);
        if (brickCollision.hit && !bricks[i].broke) {
          if (brickCollision.axis === "X") {
            ballObj.dx *= -1;
            bricks[i].broke = true;
          } else if (brickCollision.axis === "Y") {
            ballObj.dy *= -1;
            bricks[i].broke = true;
          }
          player.score += 10;
          br--;
        }
      }

      Paddle(ctx, canvas, paddleProps);

      //paddle and ball collision
      PaddleHit(ballObj, paddleProps);

      requestAnimationFrame(render);
    };
    render();
  }, []);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      onMouseMove={(e) =>
        (paddleProps.x = e.clientX - paddleProps.width / 2 - 10)
      }
      height={700}
      width={window.innerWidth - 20}
    />
  );
}

export default Board;
