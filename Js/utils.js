function Goal(ball, player, enemy) {
  ball.reset();
  ball.velocity.x = 0;
  // reset paddle speed
  player.reset();
  enemy.reset();

  player.GoalAnim.display = true;
  player.GoalSound.play();

  setTimeout(() => {
    player.GoalAnim.display = false;
  }, 2000);

  setTimeout(() => {
    if (gameState === "On") {
      player.GoalSound.pause();
      player.GoalSound.currentTime = 0;
      player.position.x < enemy.position.x
        ? (ball.velocity.x = 5)
        : (ball.velocity.x = -5);
    }
  }, 3000);
}
