var game;
var boy = null;

//wait for browser to load before creating Phaser game
window.onload = function(){
  //define game

  game = new Phaser.Game(1100,900, Phaser.CANVAS, 'gameDiv');

  //define states
  game.state.add('Load',Load);
  game.state.add('Menu',Menu);
  game.state.add('Ready',Ready);
  game.state.add('Play',Play);
  game.state.add('GameOver',GameOver);
  game.state.start('Load');
};

