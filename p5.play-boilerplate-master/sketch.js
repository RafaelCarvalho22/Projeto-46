var monstUp1, monstUp2, monstRight1, monstRight2, monstLeft1, monstLeft2, monstDown1, monstDown2;
var monstUp1G, monstUp2G, monstRight1G, monstRight2G, monstLeft1G, monstLeft2G, monstDown1G, monstDown2G;
var mDL1 = 15,mDL2 = 15,mLL1 = 15,mLL2 = 15,mRL1 = 15,mRL2 = 15,mUL1 = 15,mUL2 = 15;
var player, ground;
var wall1, wall2, wall3, wall4;
var wallImg, wallImg2, wallImg3, wallImg4;
var gameState = 0;
var edges;
var ball;
var lives = 3;

function preload() {

  ground = loadImage("Ground.png");
  wallImg = loadImage("pixilart-drawing.png");
  wallImg2 = loadImage("pixilart-drawing2.png");
  wallImg3 = loadImage("pixilart-drawing3.png");
  wallImg4 = loadImage("pixilart-drawing4.png");

}
function setup() {
  createCanvas(800,800);
  player = createSprite(400,400,40,40);
  player.shapeColor = "black";
  
  wall1 = createSprite(20,60,300,300);
  wall1.addImage("w1", wallImg3);
 
  wall2 = createSprite(760,60,300,300);
  wall2.addImage("w2", wallImg4);

  wall3 = createSprite(12,720,300,300);
  wall3.addImage("w3", wallImg);

  wall4 = createSprite(760,720,300,300);
  wall4.addImage("w4", wallImg2);
  
  ground = loadImage("Ground.png");
  edges = createEdgeSprites();

  monstUp1G = new Group();
  monstUp2G = new Group();
  monstRight1G = new Group();
  monstRight2G = new Group();
  monstLeft1G = new Group();
  monstLeft1G = new Group();
  monstLeft2G = new Group();
  monstDown1G = new Group();
  monstDown2G = new Group();

}

function draw() {
  background(ground);
  
  createMonstUp();
  createMonstDown();
  createMonstLeft();
  createMonstRight();
  playerMoving();
  sprtLives()

  player.bounceOff(edges);
  player.bounceOff(wall1);
  player.bounceOff(wall2);
  player.bounceOff(wall3);
  player.bounceOff(wall4);
  
  drawSprites();
}

function createMonstUp() {
  if (frameCount % 280 == 0) {
  monstUp1 = createSprite(random(250,550),20,40,40);
  monstUp1.velocityY = 5;
  monstUp1.shapeColor = "red";
  monstUp1G.add(monstUp1);
  
}
  if (frameCount %  350 == 0) {
    fill('blue');
    monstUp2 = createSprite(random(250,550),40,40,40);
    monstUp2.shapeColor = "blue";
    monstUp2G.add(monstUp2);
  }
}

function createMonstDown() {
  if (frameCount % 230 == 0) {
    monstDown1 = createSprite(random(250,550),780,40,40);
    monstDown1.velocityY = -5;
    monstDown1.shapeColor = "red";
    monstDown1G.add(monstDown1);
}
  if (frameCount % 400 == 0) {
    monstDown2 = createSprite(random(250,550),760,40,40);
    monstDown2.shapeColor = "blue";
    monstDown2G.add(monstDown2);
}
}

function createMonstLeft() {
  if (frameCount % 150 == 0) {
    monstLeft1 = createSprite(20,random(250,550),40,40);
    monstLeft1.velocityX = 5;
    monstLeft1.shapeColor = "red";
    monstLeft1G.add(monstLeft1);
  }
  if (frameCount %  300 == 0) {
    monstLeft2 = createSprite(40,random(250,550),40,40);
    monstLeft2.shapeColor = "blue";
    monstLeft2G.add(monstLeft2);
  }
}

function createMonstRight() {
  if (frameCount % 340 == 0) {
    monstRight1 = createSprite(780,random(250,550),40,40);
    monstRight1.velocityX = -5;
    monstRight1.shapeColor = "red";
    monstRight1G.add(monstRight1);
  }
  if (frameCount %  250 == 0) {
    monstRight2 = createSprite(760,random(250,550),40,40);
    monstRight2.shapeColor = "blue";
    monstRight2G.add(monstRight2);
  }
}

function playerMoving() {
  if (keyDown(UP_ARROW)) {
    player.y -= 5;
    if (frameCount % 10 == 0) {
      ball = createSprite(player.x,player.y,10,10,10);
      ball.shapeColor = "yellow";
      ball.velocityY = +10;
      ball.depth = player.depth + 1;
    }
    monstLeft1G.setVelocityYEach(-4);
    monstRight1G.setVelocityYEach(+4);
  }
  if (keyDown(DOWN_ARROW)) {
    player.y += 5;
    if (frameCount % 10 == 0) {
      ball = createSprite(player.x,player.y,10,10,10);
      ball.shapeColor = "yellow";
      ball.velocityY = -10;
      ball.depth = player.depth + 1;
      monstLeft1G.setVelocityYEach(+4);
      monstRight1G.setVelocityYEach(-4);
    }
    
  }
  if (keyDown(LEFT_ARROW)) {
    player.x -= 5;
    if (frameCount % 10 == 0) {
      ball = createSprite(player.x,player.y,10,10,10);
      ball.shapeColor = "yellow";
      ball.velocityX = +10;
      ball.depth = player.depth + 1;
    }
    monstDown1G.setVelocityXEach(-4);
    monstUp1G.setVelocityXEach(+4);
  }
  if (keyDown(RIGHT_ARROW)) {
    player.x += 5;
    if (frameCount % 10 == 0) {
      ball = createSprite(player.x,player.y,10,10,10);
      ball.shapeColor = "yellow";
      ball.velocityX = -10;
      ball.depth = player.depth + 1;
    }
    monstDown1G.setVelocityXEach(+4);
    monstUp1G.setVelocityXEach(-4);
  }
}

function sprtLives() {
  console.log(lives);
  console.log(mDL1);
  if (monstUp1G.isTouching(player)) {
    monstUp1.destroy();
    lives -= 1;
  }
  if (monstUp1G.bounceOff(ball)) {
    mUL1 -= 1;
  }
  if (monstUp2G.isTouching(player)) {
    monstUp2.destroy();
    lives -= 1;
  }
  if (monstUp2G.bounceOff(ball)) {
    mUL2 -= 1;
  }
  if (monstDown1G.isTouching(player)) {
    monstDown1.destroy();
    lives -= 1;
  }
  if (monstDown1G.bounceOff(ball)) {
    mDL1 -= 1;
  }
  if (monstDown2G.isTouching(player)) {
    monstDown2.destroy();
    lives -= 1;
  }
  if (monstDown1G.bounceOff(ball)) {
    mDL2 -= 1;
  }
  if (monstLeft1G.isTouching(player)) {
    monstLeft1.destroy();
    lives -= 1;
  }
  if (monstLeft1G.bounceOff(ball)) {
    mLL1 -= 1;
  }
  if (monstLeft2G.isTouching(player)) {
    monstLeft2.destroy();
    lives -= 1;
  }
  if (monstLeft2G.bounceOff(ball)) {
    mLL2 -= 1;
  }
  if (monstRight1G.isTouching(player)) {
    monstRight1.destroy();
    lives -= 1;
  }
  if (monstRight1G.bounceOff(ball)) {
    mDL1 -= 1;
  }
  if (monstRight2G.isTouching(player)) {
    monstRight2.destroy();
    lives -= 1;
  }
  if (monstRight2G.bounceOff(ball)) {
    mDL2 -= 1;
  }

  if (lives == 0) {
    player.nflijwrgiaegi();
  }
  if (mUL1 == 0) {
   monstUp1.destroy
  }
  if (mUL2 == 0) {
    monstUp2.destroy
  }
  if (mDL1 == 0) {
    monstDown1.destroy
  }
  if (mDL2 == 0) {
    monstDown2.destroy
  }
  if (mLL1 == 0) {
    monstLeft1.destroy
  }
  if (mLL2 == 0) {
    monstLeft2.destroy
  }
  if (mRL1 == 0) {
    monstRight1.destroy
  }
  if (mRL2 == 0) {
    monstRight2.destroy
  }
}
/*ajuste de tela
colocar ponto e destruir quando o tiro acerta
colocar mensagem de fim de jogo (alerta suave) */