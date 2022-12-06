/** @type {HTMLCanvasElement} */

// Key Handler & Util
import { KeyHandler } from "../still/key-handler.js";
import { Util } from "../still/util";

// Constants / Parameters
import { PLAYER_PARAMS, PLAYER_COLORS } from "../game-parameters/player-params.js";
import { PROJECTILE } from "../game-parameters/projectile-params.js";
import { DIM_X, DIM_Y } from "../game-parameters/map-params.js";

// Classes
import CourseMap from "../still/course-map.js";
import Heart from "./heart.js";




export default class Player {
  constructor(idx, pos, angle, color, projectileController) {
    // Starter Values
    this.idx = idx;
    this.x = pos[0];
    this.y = pos[1];
    this.angle = angle;
    this.speed = 0;
    this.max_speed =PLAYER_PARAMS.MAX_SPEED;
    this.acceleration = PLAYER_PARAMS.ACCELERATION;
    this.radius = PLAYER_PARAMS.RADIUS;
    this.color = color;
    this.projectiles = PLAYER_PARAMS.PROJECTILES;
    this.projectileController = projectileController;
    this.alive = true;
    this.heart = new Heart(PLAYER_PARAMS.MAX_HEALTH, PLAYER_PARAMS.MAX_HEALTH,
                           this.color, this.idx);
    this.nitrous = PLAYER_PARAMS.MAX_NOS;

    // window.addEventListener('keydown', (e) => console.log(e.key));
    // Event listener for keyboard actionso
    this.keyHandler = new KeyHandler();
    document.addEventListener('keydown', (e) => this.keyHandler.keyPressed(e));
    document.addEventListener('keyup', (e) => this.keyHandler.keyReleased(e));

  }

  damage(points) {
    console.log('in damage player');
    this.heart.damage(points);
    if (this.heart.health <= 0) {
      this.alive = false;
      this.x = DIM_X + 100;
      this.y = DIM_Y + 100;
    }
  }

  drawPlayer(ctx) {
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 30;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius,
      0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
  }

  drawLine(ctx) {
    let vector = Util.scale(Util.directionFrom(this.angle), PLAYER_PARAMS.RADIUS);
    ctx.strokeStyle = '#FFFFFF';
    ctx.fillStyle = this.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    // ctx.lineTo(400, 400);
    ctx.lineTo(this.x + vector[0], this.y + vector[1]);
    ctx.stroke();
  }

  drawHeart(ctx) {
    this.heart.draw(ctx);
  }

  draw(ctx) {
    if (this.alive) {
      this.drawPlayer(ctx);
      this.drawLine(ctx);
    }
    this.drawHeart(ctx);
  }



  fireBlasters() { // PROOF equiv to shoot
    // console.log('shoot');
    // console.log(this.projectiles);
    if (this.alive && this.projectiles > 0) {
      this.projectiles--;
      // let x = this.x + PLAYER_PARAMS.RADIUS; // PROOF - FIX THIS - BASE ON PLAYER DIRECTION
      // let y = this.y + PLAYER_PARAMS.RADIUS;// + PLAYER_PARAMS.RADIUS;
      this.projectileController.shoot(this.x, this.y, this.angle, PROJECTILE.SPEED, PROJECTILE.DAMAGE, PROJECTILE.DELAY);
    }
    // console.log('projX', x, 'projY', y);

    // let dir = Util.dir(this.vel);
    // let proj = new Projectile(this.pos, dir);
  }

  update () {
    this.runKeys();
    let [velX, velY] = Util.scale(Util.directionFrom(this.angle), this.speed);
    if (this.alive) {
      [this.x, this.y] = CourseMap.inbound(this.x + velX, this.y + velY, this.radius, this.radius);
    }
  }

  runKeys() {
    let pressedKeys = (this.alive ? this.keyHandler.activeActions()[this.idx] : {});

    if (pressedKeys.left) this.angle = (this.angle + 1 / PLAYER_PARAMS.TURN_RADIUS) % 360;
    if (pressedKeys.right) this.angle = (this.angle - 1 / PLAYER_PARAMS.TURN_RADIUS) % 360;
    if (pressedKeys.blast) this.fireBlasters();

    if (pressedKeys.throttle) {
      // console.log('updating throttle');
      this.speed = Math.min(this.max_speed, this.speed + PLAYER_PARAMS.ACCELERATION);
    } else if (this.speed > 0) {
      this.speed = Math.floor(this.speed * 49 / 50 * 10) / 10;
    }

    if (pressedKeys.brake) {
      // if brake is pressed, speed becomes greater of -
      this.speed = Math.max(-this.max_speed, this.speed - PLAYER_PARAMS.ACCELERATION * 1);
    } else if (this.speed < 0) {
      // if break is
      this.speed = Math.ceil(this.speed * 49 / 50 * 10) / 10;
    }
  }
}