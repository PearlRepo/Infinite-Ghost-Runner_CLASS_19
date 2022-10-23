var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {

  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup= new Group();
  climbersGroup = new Group();
  invisibleBlockGroup= new Group();

  ghost= createSprite (300, 300);
  ghost.addImage("ghost", ghostImg);
  ghost.scale= 0.4;

  spookySound.loop();
  
}

function draw() {
  background(200);

  if (gameState==="play") {
    
  if (keyDown("space")) {
    ghost.velocityY= -5;
  }

  ghost.velocityY= ghost.velocityY + 1;

  if (keyDown("left_arrow")) {
    ghost.x= ghost.x-10;
  }

  if (keyDown("right_arrow")) {
    ghost.x= ghost.x+10;
  }


  if (climbersGroup.isTouching(ghost)) {
    ghost.velocityY= 0;
  }

  if (invisibleBlockGroup.isTouching(ghost) || ghost.y>600) {

    ghost.destroy();
    gameState="end";

  }

  spawnDoors();

  drawSprites();
  }
  

  if (gameState=== "end") {

    background("yellow");
    textSize(35);
    fill("red");
    stroke("black");
    strokeWeight(7);
    text("GAME OVER", 200, 300);
  }

  if(tower.y > 400){
      tower.y = 300
    }




}

function spawnDoors() {
  
  if (frameCount%200 === 0) {

    door = createSprite(Math.round(random(200,400)), -50);
    door.velocityY= 3;
    door.addImage("door", doorImg);
    
    climber= createSprite(door.x, 10);
    climber.velocityY= 3;
    climber.addImage("climber", climberImg);

    invisibleBlock= createSprite(door.x, 15);
    invisibleBlock.width= climber.width;
    invisibleBlock.height= 2;
    invisibleBlock.velocityY= 3;
    invisibleBlock.visible= false;

    door.lifetime= 300;
    climber.lifetime= 300;
    invisibleBlock.lifetime= 300;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    ghost.depth= door.depth;
    ghost.depth= ghost.depth+1;

  }

}
