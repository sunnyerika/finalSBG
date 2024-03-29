//Play state
var map;
//var snowball;
//var maxFish = 3;
/*var skier1;
var skier2;
var skier3;
var skier4;
var skier5;
var skier6;
var skier7;
var skier8;
var skier9;
var skier10;*/
var skierGroup;
var maxSkier = 3;
var score = 0;
var scoreText;
var weapons;
var count =5;
var finishLine;
//var deadFish;
var floor;

var timer,timeEvent,textTime;
var beaten;
var attack;
var getSkier;
var win;
var key;
var spaceBar;
var points100;
var points100group;
var max100 =2;
var spriteName;
var ifSpeed = 0;
var iceTimer;
var iceEvent;
var snowLayer;
var treeLayer;
var lakes;
var rocks;
var trees;
var skiers
var rollingSnowBall;
var rollingSnowBallLong;
var snowballRolling0;
var snowBall0;
var damagedSkier;
//var snowBall1;
//var snowBall2;
//var snowBall3;
//var collision = false;
var timeCheck;



//var numberOfCollisions = 0;
var numberOfCollisionsWithSkiers = 0;
//var snowBallNew;
var snowBallState;
var snowBallAtlas;

var booleanHitRock = false;

var updateCollision = false;
var soundTreeRock;
var soundFlyingSkier;
var soundMainTheme;
var soundDeath;
var soundSkierGetsRolledUp;
var treesArray;
var rocksArray;
var skierArray;

var debugText;


const SPRITETYPE = {
  tree: true,
  rock: true,
  skier: true
};


//var collision = false;
var arrayIDtree;
var treesArray;
var rocksArray;
var skierArray;

var debugText;


var booleanHitRock = false;

var updateCollision = false;
var soundTreeRock;
var soundFlyingSkier;
var soundMainTheme;
var soundDeath;
var soundSkierGetsRolledUp;
var soundRockHit;
var soundWin;
var soundFly2;
var pickedupSkier = false;
var startState = true;
var collidedTR = false;

var numberofSkiersText;
var snowBallDeath = false;


var Play = function(game){

};
Play.prototype = {
  create:function(){
    key = game.input.keyboard;
    this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //ensure that when sprites are rendered,they are done so using integer positions
    this.game.renderer.renderSession.roundPixels = true;


    game.physics.startSystem(Phaser.Physics.Arcade);//arcade gives us velocity
    game.world.setBounds(0,0,2560,76800);
    //game.stage.backgroundColor = "#4488AA";
    //create new Tilemap object
    map = game.add.tilemap('mapSheet');
    map.addTilesetImage('TileSet3','mapSprite',32,32); //x2 //64x64 for the lake
    //level = mapElements/mapSprite
    // map = mapsheet

    //soundMainTheme = game.audio.add ('mainTheme', 0.5, true);
    // soundMainTheme = new Phaser.Sound(game, 'mainTheme', 1, true);



    //set seabedLayer to collide with other objects
    snowLayer = map.createLayer('snow');//"Snow" declared as a layer in the tilemap
    treeLayer = map.createLayer('treeLine');
    game.add.existing(treeLayer);
    treeLayer.resizeWorld();//we start with pixels of the world in the config like 500x500 for example, then we resize the game world while keeping the small window
    //game.add.existing(lakeLayer);
    //lakeLayer = map.createLayer('lake');
    //map.createFromObjects('lake',10,'lake',0,true,true,lakeLayer);
    lakes = game.add.group();
    lakes.enableBody = true;
    rocks = game.add.group();
    rocks.enableBody = true;
    trees = game.add.group();
    trees.enableBody = true;
    skiers = game.add.group();
    skiers.enableBody = true;
    trees.setAll('body.immovable',true);
    map.createFromObjects('lake',15,'lake',0,true,true,lakes);
    map.createFromObjects('rock',12,'rock',0,true,true,rocks);
    map.createFromObjects('tree',2331,'tree',0,true,true,trees);
    map.createFromObjects('skier',20,'skier',0,true,true,skiers);
    map.setCollisionByExclusion([],true,'treeLine');
    map.setCollisionBetween[2048,2049];
    map.setCollisionBetween[2104,2105];
    map.setCollisionBetween[2160,2161];
    map.setCollisionBetween[2216,2217];
    map.setCollisionBetween[2272,2273];
    map.setCollisionBetween[2328,2329];
    map.setCollisionBetween[1794,1795];
    map.setCollisionBetween[1850,1851];
    map.setCollisionBetween[2058,2065];
    map.setCollisionBetween[2114,2121];
    map.setCollisionBetween[2170,2177];
    map.setCollisionBetween[2226,2233];
    map.setCollisionBetween[2282,2289];
    map.setCollisionBetween[2338,2345];
    map.setCollisionBetween[2394,2401];
    map.setCollisionBetween[2450,2457];
    map.setCollisionBetween[2180,2183];
    map.setCollisionBetween[2236,2239];
    map.setCollisionBetween[2292,2295];
    map.setCollisionBetween[2348,2351];

    //map.setCollisionByExclusion([],true,'lake');

    //add snowball
    //snowball = game.add.sprite(640,3500,'snowball');//position coordinates
    //we could use tiles: 7 tiles in, 13 tiles down:
    //(7*32, 1f3*64)
    //snowball.scale.setTo(2, 2);
    //snowball.anchor.setTo(1,1);

    //snowBall0 = game.add.sprite(600, 3500, 'snowBallAnimation0');//x, y, key, displaying the first frame by default
    snowBall0 = game.add.sprite(1280, 38000, 'newSnowballAtlas','Snowball 0-1');
    game.physics.enable(snowBall0);
    snowBall0.body.collideWorldBounds = true;
    snowBall0.anchor.setTo(0.5,0.5);
    snowBall0.animations.add('snowBallRolling',[0,1,2],10,true);
    snowBall0.animations.add('collide1',[3,4,5],10,true);
    snowBall0.animations.add('collide2',[6,7,8],10,true);
    snowBall0.animations.add('collide3',[9,10,11],10,true);
    snowBall0.animations.add('collide4',[12,13,14],10,true);
    snowBall0.animations.add('collide5',[15,16,17],10,true);
    snowBall0.animations.add('snowBallDeath',[18,19,20],10,true);

    damagedSkier = game.add.group();
    game.physics.enable(damagedSkier);

    soundFly2 = game.add.audio('fly2');
    soundWin = game.add.audio('win');
    soundRockHit = game.add.audio('rockHit');
    soundTreeRock = game.add.audio('hitTreeRock');
    soundFlyingSkier = game.add.audio('flyingSkier');
    soundDeath = game.add.audio('deathSound');
    soundSkierGetsRolledUp = game.add.audio('skierGetsRolledUp');
    soundMainTheme = game.add.audio('mainTheme', 0.2, true);
    soundMainTheme.play();

    game.camera.roundPixels = true;

    //create finish line
    finishLine = game.add.sprite(640,20,'finishLine');
    //game.physics.enable(finishLine);
    finishLine.anchor.setTo(0.5,0.5);
    finishLine.scale.setTo(8,4);


    //create a rectangle in the coin fountain to collide with player
    //once player collides with the rectangle, the game ends
    //the rectangle is invisible
    floor = game.add.sprite(640,20,'rectangle');
    floor.scale.setTo(8,2);
    floor.anchor.setTo(0.5,0.5);
    game.physics.enable(floor);
    floor.alpha = 0;


    //create a group to hold the fish
    //skierGroup = game.add.group();
    //game.physics.enable(skierGroup);
    //create a group of lakes



    //make sure when players press UP or DOWN to control the character, the browser screen would not scroll
    game.input.keyboard.addKeyCapture(Phaser.Keyboard.UP);
    game.input.keyboard.addKeyCapture(Phaser.Keyboard.DOWN);
    //make camera follow the marine boy
    //game.camera.follow(snowball);

    //add text to show the player's score
    scoreText=game.add.text(1150,100,'Score:0',{font:'Helvetica',fontSize:'24px',fill:'#000'});
    scoreText.anchor.set(0.5);
    scoreText.fixedToCamera = true;
    scoreText.cameraOffset.setTo(800,50);

    //numberofSkiersText=game.add.text(1250,300,'skiers:0',{font:'Helvetica',fontSize:'24px',fill:'#000'});
   // numberofSkiersText.anchor.set(0.5);
    //numberofSkiersText.fixedToCamera = true;
    //numberofSkiersText.cameraOffset.setTo(400,50);
    //create a count down timer
    // timer = game.time.create();
    //timeEvent = timer.add(Phaser.Timer.MINUTE*1+Phaser.Timer.SECOND*15,this.endTimer,this);
    //timeText = game.add.text(130,100,this.formatTime(Math.round((timeEvent.delay-timer.ms)/1000)),{font:'Helvetica',fontSize:'24px',fill:'#000'});
    //timeText.anchor.set(0.5);
    // timeText.fixedToCamera = true;/timeText.cameraOffset.setTo(100,50);
    //start the timer
    //timer.start();

  },

  endTimer:function(){
    timer.stop();
    //if time runs out, switch the state
    game.state.start('GameOver');
  },

  myFunction:function(){
    timeCheck = game.time.now;
  },


  update:function(){
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();
    game.camera.focusOnXY(snowBall0.x,snowBall0.y-200);

    updateCollision = false;


    //game.physics.arcade.collide(snowBall0,skiers,snowCollideSkiers,null,this);
    skiers.forEachAlive(function(n){
      //make player could collect skiers
      var distance = this.game.math.distance(n.x,n.y,snowBall0.x,snowBall0.y);
      if(distance <=850){
        n.body.velocity.y = -400;
      }
      if(game.physics.arcade.collide(snowBall0,n)){
        n.kill();
        soundSkierGetsRolledUp.play();
        //numberOfCollisionsWithSkiers++;
        numberOfCollisionsWithSkiers = numberOfCollisionsWithSkiers + 1;
        score+=200;
        scoreText.text='Score:'+score;
        //numberofSkiersText = 'Skier: '+ numberOfCollisionsWithSkiers;
       // console.log("number of skiers: " + numberOfCollisionsWithSkiers);
      }
    });

    rocks.forEach(function(n){
      n.body.immovable = true;
      n.body.moves = false;
      //make player could collect skiers
      if(game.physics.arcade.collide(snowBall0,n)){
        soundRockHit.play();
        numberOfCollisionsWithSkiers--;
        snowBall0.animations.play('snowBallDeath');
        snowBallDeath = true;
        snowBall0.moves = false;
        score+=200;
        scoreText.text='Score:'+score;
        numberofSkiersText = 'Skier: '+ numberOfCollisionsWithSkiers;
        console.log("number of skiers: " + numberOfCollisionsWithSkiers);
        if(numberOfCollisionsWithSkiers>0) {
          var throwSkier = damagedSkier.create(snowBall0.x + 10, snowBall0.y, 'damagedSkierAtlas', 'Damage_01');
          throwSkier.animations.add('flyingSkier', [0, 1, 2, 3, 4, 5, 6, 7], 10, false);
          throwSkier.animations.play('flyingSkier', 10, false);
          soundFlyingSkier.play();
          soundFly2.play();
          snowBall0.y -= 100;
          snowBall0.x += 40;
        }
        else if(numberOfCollisionsWithSkiers>=3&&numberOfCollisionsWithSkiers<=5){
          n.kill();
          soundRockHit.play();
        }
      }

    });

    trees.forEach(function(n){
      n.body.immovable = true;
      n.body.moves = false;
      //make player could collect skiers
      if(game.physics.arcade.collide(snowBall0,n)){
        soundTreeRock.play();
        numberOfCollisionsWithSkiers--;
        snowBall0.animations.play('snowBallDeath');
        snowBallDeath = true;
        //snowBall0.moves = false;
        score-=100;
        scoreText.text='Score:'+score;
       //numberofSkiersText = 'Skier: '+ numberOfCollisionsWithSkiers;
       // console.log("number of skiers: " + numberOfCollisionsWithSkiers);
        if(numberOfCollisionsWithSkiers>0) {
          soundRockHit.play();
          var throwSkier = damagedSkier.create(snowBall0.x + 10, snowBall0.y, 'damagedSkierAtlas', 'Damage_01');
          throwSkier.animations.add('flyingSkier', [0, 1, 2, 3, 4, 5, 6, 7], 10, false);
          throwSkier.animations.play('flyingSkier', 10, false);
          soundFlyingSkier.play();
          //soundFly2.play();
          snowBall0.y -= 100;
          snowBall0.x += 40;
        }
      }

    });



    //game.physics.arcade.collide(points100group,treeLayer);
    //game.physics.arcade.collide(snowBall0,treeLayer,snowCollideTree,null,this);
    //game.physics.arcade.collide(snowBall0,trees,snowCollideTrees,null,this);
    game.physics.arcade.overlap(snowBall0,lakes,iceSpeed,null,this);
    game.physics.arcade.overlap(snowBall0,floor,winner,null,this);


    if(numberOfCollisionsWithSkiers == 0 && ifSpeed == 0 && !booleanHitRock) {
      snowBall0.animations.play('snowBallRolling');
      snowBall0.body.setSize(50,50,5,10);
      snowBall0.body.velocity.y = -350;
      score +=1;
      scoreText.text='Score:'+score;

    }
    if(numberOfCollisionsWithSkiers == 0 && ifSpeed == 0 && booleanHitRock) {
      snowBall0.animations.play('snowBallRolling');
      snowBall0.body.setSize(64,64,0,0);
      snowBall0.body.velocity.y = -350;
      //score +=1;
      scoreText.text='Score:'+score;

    }

    else if(numberOfCollisionsWithSkiers == 1 &&ifSpeed ==0){
      snowBall0.animations.play('collide1');//skier collision animation
      snowBall0.body.setSize(80,80,0,10);
      snowBall0.body.velocity.y = -430;
      score +=1;
      scoreText.text='Score:'+score;

    }
    else if(numberOfCollisionsWithSkiers ==2 && ifSpeed ==0){
      snowBall0.animations.play('collide2');
      snowBall0.body.setSize(110,110,0,15);
      snowBall0.body.velocity.y = -580;
      score +=1;
      scoreText.text='Score:'+score;
    }
    else if(numberOfCollisionsWithSkiers ==3 &&ifSpeed ==0){
      snowBall0.animations.play('collide3');
      snowBall0.body.setSize(180,180,30,50);
      snowBall0.body.velocity.y = -610;
      score +=1;
      scoreText.text='Score:'+score;
    }
    else if(numberOfCollisionsWithSkiers ==4 &&ifSpeed ==0){
      snowBall0.animations.play('collide4', 10, true);
      snowBall0.body.setSize(256,256,50,70);
      snowBall0.body.velocity.y = -740;
      score +=1;
      scoreText.text='Score:'+score;
    }

    else if(numberOfCollisionsWithSkiers ==5 &&ifSpeed ==0){
      snowBall0.animations.play('collide5', 10, true);
      snowBall0.body.setSize(384,384,40,50);
      snowBall0.body.velocity.y = -870;
      score +=1;
      scoreText.text='Score:'+score;
    }else if(numberOfCollisionsWithSkiers >5){
      numberOfCollisionsWithSkiers = 5;
    }



    snowBall0.body.velocity.x = 0;

    //make animations work
    if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
      if(snowBallDeath){
        snowBall0.body.velocity.x = 0;
      }else {
        snowBall0.body.velocity.x = -200;
      }



    }else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
      if(snowBallDeath){
        snowBall0.body.velocity.x = 0;
      }else {
        snowBall0.body.velocity.x = +200;
      }

    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !booleanHitRock){
      snowBall0.body.velocity.y = -900;
      score +=4;
      scoreText.text='Score:'+score;
    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && booleanHitRock){
      snowBall0.body.velocity.y = -900;
      scoreText.text='Score:'+score;
    }


    //update timer
    if(timer.running){
      timeText.text = 'Time: ' + this.formatTime(Math.round((timeEvent.delay-timer.ms)/1000));
    }



    console.log(snowBall0.x);
    console.log(snowBall0.y);
    console.log(numberOfCollisionsWithSkiers);
    console.log(ifSpeed);

    //console.log(snowball.x);
    //console.log(snowball.y);



  },


  formatTime:function(s){
    //refer to https://codepen.io/peacq/pen/WxLqpW
    var minutes = '0' + Math.floor(s/60);
    var seconds = '0' + (s - minutes*60);
    return minutes.substr(-2)+':'+seconds.substr(-2);
  },

  /*hit:function(){
    numberOfCollisions  ++;
  }*/
};




var StaticSprite = function(game,x,y){
  Phaser.Sprite.call(this,game,x,y,'100');
  this.anchor.setTo(0.5,0.5);
  //this.game.physics.enable(this,Phaser.Physics.ARCADE);
  //this.scale.setTo(0.5,0.5);

  //define constants
  //this.body.velocity.y = -200;

};


//Diamond are a type of sprites
/*Skier.prototype.constructor = Skier;

StaticSprite.prototype = Object.create(Phaser.Sprite.prototype);
StaticSprite.prototype.constructor = StaticSprite;*/




//when player reaches the coin fountain, the game ends
function winner(snowBall0,floor){
  //win.play();
  //boy.animations.play('win');
  soundWin.play();
  soundMainTheme.stop();
  game.state.start('GameOver');

};
function callFailScreen(snowBall0,groupr){
  //win.play();
  //boy.animations.play('win');
  game.state.start('GameFail');

};




function iceSpeed(snowball,lake){
  ifSpeed = 1;
  snowball.body.velocity.y = -1500;
  //ice speed up timer
  iceTimer = game.time.create();
  iceEvent= iceTimer.add(Phaser.Timer.SECOND*1,speedRetrieve,this);
  iceTimer.start();
  score +=10;
  scoreText.text='Score:'+score;

};

var restart = function(){
  soundMainTheme.stop();
  game.state.start('GameFail');
}

function snowCollideTree(snowBall0,treeLayer){
  //score -= 100;
  booleanHitRock = true;

  if(numberOfCollisionsWithSkiers>0){
    numberOfCollisionsWithSkiers --;
    score -= 200;
    scoreText.text='Score:'+score;
    var throwSkier = damagedSkier.create(snowBall0.x+10,snowBall0.y,'damagedSkierAtlas','Damage_01');
    throwSkier.animations.add('flyingSkier',[0,1,2,3,4,5,6,7],10,true);
    throwSkier.animations.play('flyingSkier',10,false);
    snowBall0.y -= 200;

  }
  if(numberOfCollisionsWithSkiers<0){
    numberOfCollisionsWithSkiers = 0;
  }

}
function snowCollideTrees(snowBall0,trees){
  //score -= 100;
  trees.body.immovable = true;
  trees.body.moves = false;
  booleanHitRock = true;


  if(numberOfCollisionsWithSkiers>0){
    numberOfCollisionsWithSkiers --;
    //damagedSkier.animations.play('flyingSkier');
    score -= 200;
    scoreText.text='Score:'+score;
    var throwSkier = damagedSkier.create(snowBall0.x+10,snowBall0.y,'damagedSkierAtlas','Damage_01');
    throwSkier.animations.add('flyingSkier',[0,1,2,3,4,5,6,7],10,true);
    throwSkier.animations.play('flyingSkier',10,false, false);
    soundFlyingSkier.play();
    snowBall0.y -= 100;
    snowBall0.x +=40;

    //damagedSkier.kill();
  }
  if(numberOfCollisionsWithSkiers<0){
    numberOfCollisionsWithSkiers = 0;
  }

  booleanHitRock = false;
}
function snowCollideRocks(snowBall0,rocks){
  //score -= 100;
  rocks.body.immovable = true;
  rocks.body.moves = false;

  if(numberOfCollisionsWithSkiers>0 && numberOfCollisionsWithSkiers <=2){
    //numberOfCollisionsWithSkiers --;
    score -= 200;
    scoreText.text='Score:'+score;
    var throwSkier = damagedSkier.create(snowBall0.x+10,snowBall0.y,'damagedSkierAtlas','Damage_01');
    throwSkier.animations.add('flyingSkier',[0,1,2,3,4,5,6,7],10,false);
    throwSkier.animations.play('flyingSkier',10,false);
    soundFlyingSkier.play();
    snowBall0.y -= 100;
    snowBall0.x +=40;


  }
  if(numberOfCollisionsWithSkiers<0){
    numberOfCollisionsWithSkiers = 0;
  }

  booleanHitRock = false;
}
/*function snowCollideSkiers(snowBall0,skiers){
  //score -= 100;
  skiers.forEachAlive(function(n){
      //make player could collect skiers
      var distance = this.game.math.distance(n.x,n.y,snowBall0.x,snowBall0.y);
      if(distance<=32&&numberOfCollisionsWithSkiers == 0){
        soundSkierGetsRolledUp.play();
        n.kill();
        numberOfCollisionsWithSkiers ++;
        score += 200;
        scoreText.text='Score:'+score;
        //getDiamond.play();
      }
      else if(distance<=48&&numberOfCollisionsWithSkiers == 1){
        soundSkierGetsRolledUp.play();
        n.kill();
        numberOfCollisionsWithSkiers ++;
        score += 200;
        scoreText.text='Score:'+score;
        //getDiamond.play();
      }
      else if(distance<=55&&numberOfCollisionsWithSkiers ==2){
        soundSkierGetsRolledUp.play();
        n.kill();
        numberOfCollisionsWithSkiers ++;
        score += 200;
        scoreText.text='Score:'+score;
        //getDiamond.play();
      }else if(distance<=70&&numberOfCollisionsWithSkiers ==3){
        soundSkierGetsRolledUp.play();
        n.kill();
        numberOfCollisionsWithSkiers ++;
        score += 200;
        scoreText.text='Score:'+score;
        //getDiamond.play();
      }else if(distance<=128&&numberOfCollisionsWithSkiers ==4){
        soundSkierGetsRolledUp.play();
        n.kill();
        numberOfCollisionsWithSkiers ++;
        score += 200;
        scoreText.text='Score:'+score;
        //getDiamond.play();
      }else if(distance<=256&&numberOfCollisionsWithSkiers ==5){
        soundSkierGetsRolledUp.play();
        n.kill();
        numberOfCollisionsWithSkiers ++;
        score += 200;
        scoreText.text='Score:'+score;
        //getDiamond.play();
      }
      else if(distance>=900){
        n.kill();
      }
    });


}*/


function speedRetrieve(){
  iceTimer.stop();
  ifSpeed = 0;
}

function animateFlyingSkier(){
  //game.add.sprite(snowBall0.x, snowBall0.y, 'damagedSkierAtlas', 'Damage_01');
  game.physics.enable(damagedSkier);
  damagedSkier.animations.add('flyingSkier',[0,1,2,3,4,5,6,7],2,false);

  //damagedSkier.kill();
}

function getSpriteID (snowball, spriteGroup){
  spriteGroup.forEachAlive(function(n){
    //collided
    debugText = n.data.toString();

  }, this);
}

/*function render() {

  game.debug.text(debugText, 10, 20);

}*/
