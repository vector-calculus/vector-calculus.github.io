class Particle {
  constructor(x, y, speed = 0, direction = 0, mass = 1, radius = 5) {
    this.x = x;
    this.y = y;
    this.vx = speed * Math.cos(direction);
    this.vy = speed * Math.sin(direction);
    this.mass = mass;
    this.radius = radius;
    this.inert = false;
    this.age = 0;
    this.color = GLOBAL.palette[Math.floor(Math.random() * GLOBAL.palette.length)];
    this.mouseInside = false;
  }

  checkMouseInside() {
    const dx = GLOBAL.x - (this.x + this.vx);
    const dy = GLOBAL.y - (this.y + this.vy);
    return Math.hypot(dx, dy) < this.radius + 10;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.mouseInside = this.checkMouseInside();
    this.age++;
  }

  collide(p1) {
    const dvx = (p1.x + p1.vx) - (this.x + this.vx);
    const dvy = (p1.y + p1.vy) - (this.y + this.vy);
    const dist = Math.hypot(dvx, dvy);

    if (dist - this.radius - p1.radius >= 0) return false;

    const incidence = Math.atan2(dvy, dvx);
    const p0speed = Math.hypot(this.vx, this.vy);
    const p1speed = Math.hypot(p1.vx, p1.vy);
    const p0inertia = p0speed * this.mass;
    const p1inertia = p1speed * p1.mass;

    const p0vx = p0speed * Math.cos(Math.atan2(this.vy, this.vx) - incidence);
    const p0vy = p0speed * Math.sin(Math.atan2(this.vy, this.vx) - incidence);
    const p1vx = p1speed * Math.cos(Math.atan2(p1.vy, p1.vx) - incidence);
    const p1vy = p1speed * Math.sin(Math.atan2(p1.vy, p1.vx) - incidence);

    const p0newvx = (((this.mass * p0vx + p1.mass * p1vx + (p1.mass * GLOBAL.restitution * (p1vx - p0vx))) / (this.mass + p1.mass)) * GLOBAL.friction);
    const p1newvx = (((this.mass * p0vx + p1.mass * p1vx + (this.mass * GLOBAL.restitution * (p0vx - p1vx))) / (this.mass + p1.mass)) * GLOBAL.friction);

    this.vx = Math.cos(incidence) * p0newvx + Math.cos(incidence + Math.PI / 2) * p0vy;
    this.vy = Math.sin(incidence) * p0newvx + Math.sin(incidence + Math.PI / 2) * p0vy;
    p1.vx = Math.cos(incidence) * p1newvx + Math.cos(incidence + Math.PI / 2) * p1vy;
    p1.vy = Math.sin(incidence) * p1newvx + Math.sin(incidence + Math.PI / 2) * p1vy;

    if (p0inertia > p1inertia) p1.color = this.color;
    else this.color = p1.color;

    return true;
  }

  solveOverlap(p1) {
    const dvx = (p1.x + p1.vx) - (this.x + this.vx);
    const dvy = (p1.y + p1.vy) - (this.y + this.vy);
    const dist = Math.hypot(dvx, dvy);

    if (dist - this.radius - p1.radius >= 0) return;
    if (dist - this.radius - p1.radius === 0) {
      this.vx *= -1;
      this.vy *= -1;
      return;
    }

    const scaledDist = dist - this.radius - p1.radius;
    const distScalar = scaledDist / dist;
    const sdvx = dvx * distScalar;
    const sdvy = dvy * distScalar;
    
    const p0inertia = this.mass * Math.hypot(this.vx, this.vy);
    const p1inertia = p1.mass * Math.hypot(p1.vx, p1.vy);
    const totalInertia = p0inertia + p1inertia;
    const p1ratio = p0inertia / totalInertia;
    const p0ratio = p1inertia / totalInertia;

    this.vx -= sdvx * p0ratio;
    this.vy -= sdvy * p0ratio;
    p1.vx += sdvx * p1ratio;
    p1.vy += sdvy * p1ratio;
  }

  wall(x, y) {
    if (this.x + this.vx < this.radius || this.x + this.vx > x - this.radius) {
      this.vx *= -GLOBAL.restitution;
      return true;
    }
    if (this.y + this.vy < this.radius || this.y + this.vy > y - this.radius) {
      this.vy *= -GLOBAL.restitution;
      return true;
    }
    return false;
  }

  damp() {
    this.vx *= GLOBAL.damping;
    this.vy *= GLOBAL.damping;
  }

  pull(p1) {
    if (this.inert) return;

    const dvx = p1.x - this.x;
    const dvy = p1.y - this.y;
    const dvLength = Math.hypot(dvx, dvy);
    if (dvLength < p1.radius + this.radius) return;

    const gravity = (p1.mass * GLOBAL.g) / dvLength;
    this.vx += gravity * (dvx / dvLength);
    this.vy += gravity * (dvy / dvLength);
  }
}
