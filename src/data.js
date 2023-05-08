export default {
  ballObj: {
    x: 20,
    y: 200,
    dx: 5,
    dy: 5,
    rad: 20,
    speed: 10,
  },
  brickObj: {
    x: 100,
    y: 120,
    width: 800 / 10 - 1,
    height: 30,
    density: 2,
    colors: ["red", "lightblue"],
  },
  player: {
    name: "Karishma",
    lives: 5,
    score: 0,
    level: 1,
  },
  paddleProps: {
    height: 20,
    width: 150,
    x: 100,
    color: "orange",
  },
};
