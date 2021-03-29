var towerImg, tower;
var obstacleImg, obstacle, obstaclesGroup;
var player, playerImg;
var gameState = "play"
var edges
var speed = 3


function preload(){
  towerImg = loadImage("tower.png");
  playerImg = loadImage("player.png");
  obstacleImg = loadImage("sprite_0 2.png")
  //obstacleImg = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png");
 jumpsound = loadSound ("jump.mp3")
 diesound = loadSound ("die.mp3")
}

function setup(){
  createCanvas(1500,1500);
  //spookySound.loop();
  tower = createSprite(400,400);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3;
  tower.scale = 5

  obstaclesGroup = new Group();
  edges = createEdgeSprites();
  
  player = createSprite(700,200,50,50);
  player.scale = 0.3;
  player.addImage("player", playerImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      player.x = player.x - 3;
    }
    
    if(keyDown("right_arrow")){
      player.x = player.x + 3;
    }
    
    if(keyDown("space")){
      player.velocityY = -10;
      jumpsound.play();
    }
    
    player.velocityY = player.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnobstacles();

    
    //climbersGroup.collide(ghost);
    if(obstaclesGroup.isTouching(player)){
      player.velocityY = 0;
      gameState = "end" 
      diesound.play();
    }
    
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnobstacles() {
  //write code here to spawn the doors in the tower
  if (frameCount % 80 === 0) {
    var obstacle = createSprite(200, -20);
    obstacle.addImage(obstacleImg);
    obstacle.scale=0.4
    
    obstacle.x = Math.round(random(1100,1500));
    
    
    
    
    
    obstacle.velocityY = 3;
    
    //obstacle.velocityX = 3;
    //obstacle.bounce(leftEdge)
   // obstacle.bounce(rightEdge)
    player.depth = obstacle.depth;
    player.depth +=1;
   
    //assign lifetime to the variable
    obstacle.lifetime = 1800;
obstaclesGroup.add(obstacle);

   edges = createEdgeSprites(); 
   speed = 3
obstaclesGroup.setVelocityXEach(-3)
   
if(obstaclesGroup.x>400){
  speed = -3
}
 else {
  obstaclesGroup.x=obstaclesGroup.x + speed; 
 }

    
   
   
    //add each door to the group
    //obstaclesGroup.add(obstacle);
    
  }
}

