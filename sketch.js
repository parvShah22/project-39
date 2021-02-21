var fruit
var monkey , monkey_running,monkey_collided
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;




function preload(){
  backimg = loadImage("junglecrbg.png")
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  //monkey_collided = loadAnimation("monkey_collided.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
    createCanvas(displayWidth,500);
monkey = createSprite(50,500-40,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;
  
  obstacleGroup = new Group ();
    bananaGroup = new Group ();
score=0
x=0
  
  ground = createSprite(displayWidth/2,500-30,displayWidth*8,20);
  //ground.x=ground.width/2;
  //console.log(ground.x)
  ground.visible=false;
}


function draw() {
 background("brown")

  if (gameState === PLAY) {
  x=x+4
  image(backimg,0,0,displayWidth*8,500)
  camera.position.x=displayWidth+x
  camera.position.y=500/2
  monkey.x=camera.position.x-500
if(frameCount>1050){
  gameState=END

}
fill("white")
text(" score : " + score,camera.position.x-50,50)
   if(keyDown("space")) {
       monkey.velocityY = -12;
    }
       monkey.velocityY = monkey.velocityY + 1.0
 spawnfruits();
     spawnobstacle();
    if(obstacleGroup.isTouching(monkey)){
      if(score>0){
        score=score-1
      }
}
    

    if (monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score=score+1;
   } 
    
  }
   else if (gameState === END) {
   fill("blue")
    textSize(30)
    text(" score : " + score,camera.position.x-300,500/2 )
  text("GAME OVER",camera.position.x-300,500/2+100)
  
  }
 
 monkey.collide(ground)
  drawSprites ();
 
}





function spawnobstacle() {
 //write code here to spawn the fruit
   if (frameCount % 120 === 0) {
     obstacle = createSprite(displayWidth,500-50,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
  obstacle.x=camera.position.x+700
      
     //assign lifetime to the variable
    obstacle.lifetime = 700;
    
    
    
    //adding cloud to the group
   obstacleGroup.add(obstacle);
    }
}


  

function spawnfruits() {
  //write code here to spawn the fruit
   if (frameCount % 200 === 0) {
     fruit = createSprite(displayWidth,500-150,40,10);
    fruit.y = Math.round(random(60,350));
    fruit.addImage(bananaImage);
    fruit.scale = 0.2;
    fruit.x=camera.position.x+700
      
     //assign lifetime to the variable
    fruit.lifetime = 700;
    
    //adjust the depth
    monkey.depth = fruit.depth;
    fruit.depth = fruit.depth + 1;
    
    //adding cloud to the group
   bananaGroup.add(fruit);
    }
}


