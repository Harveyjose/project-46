var bg,bgImg;
var player, shooterImg, shooter_shooting, zombie, zombieimg, bullet, bulletImg, bulletGroup, zombieGroup
,bulletSound, life1 , life1Img, life2, life2img, life3, life3img;

var life = 3;
var score = 0;
var gameState="fight"

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieimg = loadImage("assets/zombie.png")
  bulletImg = loadImage("assets/bulletImage.png")
  bgImg = loadImage("assets/bg.jpeg")
  bulletSound = loadSound("assets/explosion.mp3")
  life1img = loadImage("assets/heart_1.png")
  life2img = loadImage("assets/heart_2.png")
  life3img = loadImage("assets/heart_3.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
bulletGroup = createGroup();
zombieGroup = createGroup();
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)

   


life1 = createSprite(displayWidth-250, displayHeight-700, 50, 50);
 life1.addImage(life1img)
   life1.scale = 0.3
  // player.debug = true
  // player.setCollider("rectangle",0,0,300,300)
  life1.visible = false

  life2 = createSprite(displayWidth-283, displayHeight-700, 50, 50);
 life2.addImage(life2img)
   life2.scale = 0.3
   life2.visible = false

   life3 = createSprite(displayWidth-250, displayHeight-700, 50, 50);
 life3.addImage(life3img)
   life3.scale = 0.3
   life3.visible = true

}   


function draw() {
  background(0); 
 


 // if(zombieGroup.collide(bulletGroup)){
   // handlezombieCollision(zombieGroup);
  //}

  
  if (gameState==="fight"){

    if(zombieGroup.isTouching(bulletGroup)){
      for(var i = 0; i < zombieGroup.length; i++){
       if(zombieGroup[i].isTouching(bulletGroup)){
         zombieGroup[i].destroy();
         bulletSound.play();
         bulletGroup.destroyEach();
         score = score+1;
      }
     }}
  
    if(zombieGroup.isTouching(player)){
     for(var i = 0; i < zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy();
        life = life - 1
        console.log(life)
     }
    }}

    if (life===3){
      life3.visible=true
      life2.visible=false
      life1.visible=false
    }
    if (life===2){
      life3.visible=false
      life2.visible=true
      life1.visible=false
    }
    if (life===1){
      life3.visible=false
      life2.visible=false
      life1.visible=true
    }
    Spawnzombies();
    if (life===0){
      gameState="lost"
      life3.visible=false
      life2.visible=false
      life1.visible=false
      
    }
    
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30

 
}
//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  
  
  player.addImage(shooter_shooting)
  shootBullet();
  
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){

  player.addImage(shooterImg)

  if(score===10){
    gameState = "win";
  }
}}



drawSprites();

fill("cyan")
textSize(30)
text("Score: "+score,windowWidth-150,25);


if(gameState==="lost"){
  textSize(30)
  fill("white");
  text("You have lost the match", windowWidth/2 , windowHeight/2)
  player.destroy()
  zombieGroup.destroyEach();
 
}
if(gameState === "win"){
  textSize(30)
fill("white");
text("You have Won the match", windowWidth/2 , windowHeight/2)
player.destroy()
zombieGroup.destroyEach();
}
}
function Spawnzombies(){
  if(frameCount%100 == 0){
    zombie = createSprite(1500,random(0,500))
    console.log(random);
    zombie.velocityX = -6
    zombie.addImage(zombieimg)
     zombie.scale = 0.1 + 0.05
     zombie.debug = false
     zombie.setCollider("rectangle",0,0,700,700)
     zombieGroup.add(zombie);
  }
}
function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= player.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.05
  bullet.velocityX= 7
  bulletGroup.add(bullet);
  bullet.debug = false;
}
//function handlezombieCollision(zombieGroup){
  //bulletGroup.destroyEach()
  //zombieGroup.destroyEach()
  //bulletSound.play();
