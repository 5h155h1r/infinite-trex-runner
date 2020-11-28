var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var gameState,gameOverImg,resetImg,gameOver,restart;
var wid;
var obstacleGroup, obstacle1,obstacle2, obstacle3, obstacle4, obstacle5,obstacle6;
function preload(){
  trex_running = loadImage("images/treax.png");
  trex_collided = loadImage("images/trex_collided.png");
  
  groundImage = loadImage("images/ground.png")
  cloudImage = loadImage("images/clouds.png")
  obstacle1 = loadImage("images/obstacle  1.png")
  obstacle2 = loadImage("images/obstacle  2.png")
  obstacle3 = loadImage("images/obstacle  3.png")
  obstacle4 = loadImage("images/obstacle  4.png")
  obstacle5 = loadImage("images/obstacle  5.png")
  obstacle6 = loadImage("images/obstacle  6.png")

  gameOverImg = loadImage("images/Game over.png");
  resetImg = loadImage("images/reset.png");
}

function setup() {
  createCanvas(600, 200);
  
  wid = 1000;
 gameState = "PLAY"
  
  trex = createSprite(50,180,20,50);
  trex.addImage("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,wid,20);
  ground.addImage("ground",groundImage);
  
  
  invisibleGround = createSprite(200,190,100000000,10);
  invisibleGround.visible = false;
  
  obstacleGroup = new Group();
  cloudsGroup = new Group();

  

  //place gameOver and restart icon on the screen
gameOver = createSprite(200,100);
restart = createSprite(200,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
restart.addImage(resetImg);
restart.scale = 0.1;

//only show reset when game ends

  
}

function draw() {
  background(180);

  if(gameState === "PLAY"){
    gameOver.visible = false;
    restart.visible = false;
    wid += trex.x;
    //ground.x = ground.width /2;
    

    if(keyWentDown("space")) {
        trex.velocityY = -13;
        return;
    
      }
   wid = trex.x + 1000;
  stroke(10);
  fill("red");
  ellipse(trex.x,trex.y,60,60);
  camera.position.y = 100;
  camera.position.x = trex.x;

      
      trex.velocityX = 2;

      
      
      trex.collide(invisibleGround);

      trex.velocityY = trex.velocityY + 0.8
      spawnClouds();
      spawnObstacles();

      trex.setCollider("circle",0,0,30);

    if(obstacleGroup.isTouching(trex) ){
       
        gameState = "END";
       
      }
  } else if(gameState === "END"){
    gameOver.x = trex.x;
    restart.x = trex.x
    gameOver.visible = true;
    restart.visible = true;

    trex.velocityX = 0;

    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

    if(mousePressedOver(restart)){reset();}}
  drawSprites();
    
} 
  
 

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 140 === 0) {
    var cloud = createSprite(trex.x+600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.1;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
   cloudsGroup.add(cloud);
  }
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(trex.x+600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1)
        break;
        case 2: obstacle.addImage(obstacle2)
        break;
        case 3: obstacle.addImage(obstacle3)
        break;
        case 4: obstacle.addImage(obstacle4)
        break;
        case 5: obstacle.addImage(obstacle5)
        break;
        case 6: obstacle.addImage(obstacle6)
        break;
        default: break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}

function reset(){
    gameState = "PLAY" ;
    obstacleGroup.destroyEach();
    cloudsGroup.destroyEach();
    count = 0;
  }




