var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, mario, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;// aluno


function preload(){
  mario =   loadAnimation("mario1.png","mario2.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  gameOverImg = loadImage("gameOver.png"); // aluno
  restartImg = loadImage("restart.png"); // aluno
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  
  trex.addAnimation("running", mario);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.1;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100); // criando a sprit pra clocar a imagem do gameOver
  gameOver.addImage(gameOverImg); // imagem+ do gameOver
  
  restart = createSprite(300,140); // criando sprit reset
  restart.addImage(restartImg);  // colocando a imagem 
  
  gameOver.scale = 0.5; // colocar tamanho na imagem
  restart.scale = 0.5; // colcoar tamanho na imagem

  gameOver.visible = false; // aluno
  restart.visible = false; // ground.velocityX = -(6 + 3*score/100);
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Pontuação: "+ score, 500,50);
  
  if (gameState===PLAY){

    score = score + Math.round(getFrameRate()/60); // voltar a zerar
    ground.velocityX = -(6 + 3*score/100);
    //altere a animação de trex
    trex.changeAnimation("running", mario);
    
    if(keyDown("space") && trex.y >= 159) {
      mario.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //defina a velocidade de cada objeto do jogo para 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //mude a animação de trex 
    trex.changeAnimation("collided",trex_collided); //escrever verificar se estar no lugar certo
    
    //defina o tempo de vida dos objetos do jogo para que eles não sejam destruídos
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {// colocar para resetar
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //atribua tempo de vida à variável
    cloud.lifetime = 200;
    
    //ajuste a profundidade (depth)
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adicione cada nuvem ao grupo
    cloudsGroup.add(cloud);
  }
  
}

function reset(){ // escrever  - reseta o jogo e volta pro inicio
  gameState = PLAY; // escrever
  gameOver.visible = false;// escrever
  restart.visible = false;// escrever
  
  obstaclesGroup.destroyEach();// escrever 
  cloudsGroup.destroyEach();// escrever
  score = 0;// escrever
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //gere obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //atribua dimensão e tempo de vida ao obstáculo           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //adicione cada obstáculo ao grupo
    obstaclesGroup.add(obstacle);
  }
}

