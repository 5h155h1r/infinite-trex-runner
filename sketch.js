//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//create a trex sprite
var trex = createSprite(200,380,20,50);
trex.setAnimation("trex");

//set collision radius for the trex
trex.setCollider("circle",0,0,30);

//scale and position the trex
trex.scale = 0.5;
trex.x = 50;

//create a ground sprite
var ground = createSprite(200,380,400,20);
ground.setAnimation("ground2");
ground.x = ground.width /2;

//invisible Ground to support Trex
var invisibleGround = createSprite(200,385,400,5);
invisibleGround.visible = false;

//create Obstacle and Cloud Groups
var ObstaclesGroup = [];
var CloudsGroup = [];

//place gameOver and restart icon on the screen
var gameOver = createSprite(200,300);
var restart = createSprite(200,340);
gameOver.setAnimation("gameOver");
gameOver.scale = 0.5;
restart.setAnimation("restart");
restart.scale = 0.5;

//only show reset when game ends
gameOver.visible = false;
restart.visible = false;

//set text
textSize(18);
textFont("Georgia");
textStyle(BOLD);

//score
var count = 0;

function draw() {
  //set background to white
  background("white");
  //display score
  text("Score: "+ count, 250, 100);
  console.log(gameState);
  
 
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count = Math.round(count + 0.5);
    
    
    if (count>0 && count%100 === 0){
      playSound("checkPoint.mp3");
    }
    //only show reset when game ends
    restart.visible = false;
    gameOver.visible = false;
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    //make trex run after resetting
     trex.setAnimation("trex");
     
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 359){
      trex.velocityY = -12 ;
      playSound("jump.mp3");
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 1;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
      playSound("jump.mp3");
      gameState = END;
      playSound("die.mp3");
    }
  }
  
  else if(gameState === END) {
    //show reset when game ends
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.setAnimation("trex_collided");
    
    restart.visible = true;
    gameOver.visible = true;
    
    //set lifetime of the game objects so that they are never destroyed
   
    
    // reset game when reset is clicked
    if(mousePressedOver(restart)) {
    reset();
     }
  }
  
  
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
}
//resetting the game
function reset(){
  gameState = PLAY;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  count = 0;
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
    var rand = randomNumber(1,6);
    obstacle.setAnimation("obstacle" + rand);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.push(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.y = randomNumber(280,320);
    cloud.setAnimation("cloud");
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}

