

const canvas = document.getElementById('solarS');
const c = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 450;

const planets = [];
let count = 0;
const speed = 37.5;

class Planet {
  constructor(x, y, radius, color, velocity, orbitRadius) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.radian = 0;
    this.orbitRadius = orbitRadius;
  }

  draw() {
    // Planet Path
    c.beginPath();
    c.lineWidth = 2;
    c.arc(this.startX, this.startY, this.orbitRadius, 0, Math.PI * 2, false);
    c.strokeStyle = '#5D5D60';
    c.shadowBlur = 0;
    c.stroke();

    // Planet
    c.shadowBlur = 10;
    c.shadowColor = this.color;
    c.beginPath();
    c.arc(this.y, this.x, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    // console.log(this.y);
  }

  update() {
    this.draw();
    if (this.velocity > 0) {
      this.radian += this.velocity;
      this.x = this.startX + Math.cos(this.radian) * this.orbitRadius;
      this.y = this.startY + Math.sin(this.radian) * this.orbitRadius;
      console.log(this.y);
    }
  }
}

const getPlanetForOptions = (radius, velocity, orbitRadius, color) =>
  new Planet(
    canvas.width / 2.45,
    canvas.height / 2.2,
    radius,
    color,
    velocity / 800,
    orbitRadius
  );

// let planets;

const init = () => {

  //radius(size),velocity(speed),orbitRadius, color
  const sun = getPlanetForOptions(25, 0, 0, "#FEE12B");
  const mercury = getPlanetForOptions(8, 25, 55, "#DBCECA");
  const venus = getPlanetForOptions(15, 9.76, 90, "#A0898F");
  const earth = getPlanetForOptions(15.3, 6.009, 130, "#0077be");
  const mars = getPlanetForOptions(10, 3.20, 185, "#c92118");

  planets.push(sun, mercury, venus, earth, mars);
}

// Animation Loop
const animate = () => {

  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = '#000';
  c.fillRect(0, 0, canvas.width, canvas.height);

  planets.forEach(function (planet) {
    planet.update(); //saves changes
  });
}

const dayCount = () => {
  count++;
  document.getElementById("counter").innerHTML = 'Days up to 687: ' + '<span class="count">' + count + '</span>';

  if (count == 687) {
    count = 0;
  }
  setTimeout(dayCount, speed);
}

init();
animate();
dayCount();


