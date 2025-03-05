function initParticles() {
  particles = [];
  let numberOfParticles = w * h / 1000;
  for(let i = 0; i < numberOfParticles; i++) {
    let particle = new Particle(random() * w, random() * h);
    particles.push(particle);
  }
}


function initField() {
  field = new Array(columns);
  for(let x = 0; x < columns; x++) {
    field[x] = new Array(columns);
    for(let y = 0; y < rows; y++) {
      let v = new Vector(0, 0);
      field[x][y] = v;
    }
  }
}


function calculateField() {
  for(let x = 0; x < columns; x++) {
    for(let y = 0; y < rows; y++) {
      let angle = myNoise.simplex3(x/50, y/50, noiseZ) * TWO_PI;
      let length = myNoise.simplex3(x/20 + 4000, y/40 + 40000, noiseZ) * 0.3;
      //console.log(length)
      field[x][y].setLength(length);
      field[x][y].setAngle(angle);
    }
  }
}

function drawParticles() {
  
  fill(0, 50, 100, 70);
  particles.forEach(p => {
    p.show();
    let pos = p.pos.div(sizeField);
    let v;
    if(pos.x >= 0 && pos.x < columns && pos.y >= 0 && pos.y < rows) {
      v = field[Math.floor(pos.x)][Math.floor(pos.y)];
    }
    p.move(v);
    p.wrap();
  });
}

function drawFlowField() {
  let mg = 6;
  for(let x = 0; x < columns; x++) {
    for(let y = 0; y < rows; y++) {
      push();
      translate(x * sizeField, y * sizeField);
      
      //let x1 = x*sizeField;
      //let y1 = y*sizeField;
      let v = field[x][y];
      
      strokeWeight(3);
      col = 65;//map(v.getLength(), 0, 0.3, 0, 100);
      sh = map(v.getLength(), 0, 0.3, 30, 100);
      stroke(col, sh, sh * 0.9, sh);
      
      
      line(0, 0, v.x * sizeField * mg, v.y * sizeField * mg);
      pop();
    }
  }
}


