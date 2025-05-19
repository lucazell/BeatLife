class Particle {
        constructor() {
          this.reset();
        }

        /** Stellt Partikel am Rand zufällig neu auf **/
        reset() {
          // Position (leicht außerhalb, sodass sie ins Bild fliegen können)
          const side = floor(random(4));
          switch (side) {
            case 0: // links
              this.pos = createVector(-10, random(height));
              break;
            case 1: // oben
              this.pos = createVector(random(width), -10);
              break;
            case 2: // rechts
              this.pos = createVector(width + 10, random(height));
              break;
            default: // unten
              this.pos = createVector(random(width), height + 10);
          }
          // Geschwindigkeit zeigt grob zur Mitte
          const toCenter = p5.Vector.sub(createVector(width / 2, height / 2), this.pos);
          this.vel = toCenter.setMag(random(0.5, 2));
          // Leichte zufällige Abweichung
          this.vel.rotate(random(-PI / 6, PI / 6));
          this.size = random(2, 6);
          this.alpha = random(80, 200);
        }

        update() {
          // Mausanziehung/Abstoßung
          const mouse = createVector(mouseX, mouseY);
          if (mouseX >= 0 && mouseY >= 0) {
            const d = p5.Vector.dist(this.pos, mouse);
            if (d < 120) {
              const force = p5.Vector.sub(this.pos, mouse) // weg von Maus
                .setMag(map(d, 0, 120, 0.6, 0));
              this.vel.add(force);
            }
          }

          this.pos.add(this.vel);

          // Wenn Partikel aus dem Bild fliegt → neu starten
          if (
            this.pos.x < -20 ||
            this.pos.x > width + 20 ||
            this.pos.y < -20 ||
            this.pos.y > height + 20
          ) {
            this.reset();
          }
        }

        show() {
          noStroke();
          fill(200, this.alpha);
          circle(this.pos.x, this.pos.y, this.size);
        }
      }

      // Globale Variablen
      const NUM = 250;
      let particles = [];

      function setup() {
        createCanvas(windowWidth, windowHeight);
        for (let i = 0; i < NUM; i++) particles.push(new Particle());
      }

      function draw() {
        // Transparenter Hintergrund erzeugt einen Schweif-Effekt
        background(13, 13, 13, 25);

        // Partikel & Linien
        stroke(255, 40);
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          p1.update();
          p1.show();

          // Verbinde nahgelegene Partikel optisch
          for (let j = i + 1; j < particles.length && j < i + 15; j++) {
            // Begrenzung i+15 → Performance
            const p2 = particles[j];
            const d = dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);
            if (d < 90) {
              strokeWeight(1 - d / 90);
              line(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);
            }
          }
        }
      }

      function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
      }