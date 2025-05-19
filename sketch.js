let mic;
let vol = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  noFill();

  // Mikrofon aktivieren
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(255);

  // Mikrofonlautstärke auslesen
  vol = mic.getLevel();
  let volMapped = map(vol, 0, 0.1, 0.8, 2); // Lautstärke auf Skalierungsfaktor mappen

  // Farbe von hellgrau (200,200,200) bis rot (255,0,0)
  let constrainedVol = constrain(vol, 0, 0.1);
  let r = map(constrainedVol, 0, 0.1, 200, 255);
  let g = map(constrainedVol, 0, 0.1, 200, 0);
  let b = map(constrainedVol, 0, 0.1, 200, 0);
  stroke(r, g, b);
  strokeWeight(2);

  let baseSize = 40 * volMapped;
  let cols = 4;
  let rows = 5;
  let spacingX = width / cols;
  let spacingY = height / rows;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let offsetX = (y % 2 === 0) ? 0 : spacingX / 2;
      let cx = x * spacingX + offsetX;
      let cy = y * spacingY;
      drawOrganicFlower(cx, cy, baseSize);
    }
  }
}

function drawOrganicFlower(x, y, r) {
  push();
  translate(x, y);

  for (let i = 0; i < 4; i++) {
    let angle = i * 90;
    let t = millis() / 1000;

    let dx = cos(angle) * r / 2 + map(noise(t + i * 10 + x * 0.01), 0, 1, -3, 3);
    let dy = sin(angle) * r / 2 + map(noise(t + i * 20 + y * 0.01), 0, 1, -3, 3);
    ellipse(dx, dy, r);
  }

  pop();
}
