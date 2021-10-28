let today = new Date();
let dateDOM = document.querySelector("#date");
dateDOM.innerHTML = today.toLocaleDateString();

let epoch = new Date("01/01/2000");

let dateDiff = today - epoch;

let dayDIff = dateDiff / (1000 * 3600 * 24);
console.log(dayDIff);

class Planet {
  constructor(name, oP, mL, sMA, fromEpoch) {
    this.name = name;
    this.oP = oP;
    this.mL = mL;
    this.sMA = (sMA + 2) / 1;
    this.curAngle = 0;
    this.distMult = 20;
    // this.fromEpoch = 0;
    this.fromEpoch = fromEpoch;
  }
  getCurrentPosition() {
    let r = this.oP / this.fromEpoch;
    let s = Math.floor(r) * -1;
    let f = s - r;

    f = f * 360;

    let speed = 360 / this.oP;
    let time = speed * this.fromEpoch;

    return ((this.mL + time) * Math.PI) / 180;
  }
  getX() {
    return this.distMult * this.sMA * Math.sin(this.getCurrentPosition());
  }
  getY() {
    return this.distMult * this.sMA * Math.cos(this.getCurrentPosition());
  }
}

let system = {
  planets: [
    // Planet(360, 0, 200),
    new Planet("Mercury", 87.91, 252.25, 1, dayDIff),
    new Planet("Venus", 224.7, 181.98, 2, dayDIff),
    new Planet("Earth", 365.26, 100.46, 3, dayDIff),
    new Planet("Mars", 686.98, 355, 4, dayDIff),
    new Planet("Jupiter", 4332.59, 34.4, 5, dayDIff),
    new Planet("Saturn", 10759, 49.94, 6, dayDIff),
    new Planet("Uranus", 30685, 313.23, 7, dayDIff),
    new Planet("Neptune", 60189, 304.88, 8, dayDIff),
  ],
};
// let system = {
//   planets: [
//     // Planet(360, 0, 200),
//     new Planet("Mercury", 87.91, 252.25, 0.38, dayDIff),
//     new Planet("Venus", 224.7, 181.98, 0.72, dayDIff),
//     new Planet("Earth", 365.26, 100.46, 1, dayDIff),
//     new Planet("Mars", 686.98, 355, 1.5, dayDIff),
//     new Planet("Jupiter", 4332.59, 34.4, 5, dayDIff),
//     new Planet("Saturn", 10759, 49.94, 9.5, dayDIff),
//     new Planet("Uranus", 30685, 313.23, 19, dayDIff),
//     new Planet("Neptune", 60189, 304.88, 30, dayDIff),
//   ],
// };
function setup() {
  createCanvas(windowWidth, windowHeight);
}

let scaleVal = 1;
function draw() {
  scale(scaleVal);
  translate(width / 2, height / 2);
  fill(0, 0);

  background(0, 255);
  stroke("#FFFF00");
  strokeWeight(1);
  ellipse(0, 0, 20, 20);

  for (planet of system.planets) {
    fill(0, 0);

    stroke(200);

    // planet.fromEpoch += 5;
    ellipse(
      0,
      0,
      planet.sMA * planet.distMult * 2,
      planet.sMA * planet.distMult * 2
    );
    fill(255);
    ellipse(planet.getX(), planet.getY(), 10, 10);
  }
}
