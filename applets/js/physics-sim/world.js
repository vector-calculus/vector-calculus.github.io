class World {
	constructor(canvas) {
		this.objects = [];
		this.stage = canvas;
		this.context = canvas.getContext('2d');
		this.w = canvas.getBoundingClientRect().width;
		this.h = canvas.getBoundingClientRect().height;

		this.particleAttraction = false;
		this.particleCollision = true;
		this.showVectors = true;
		this.walls = false;
		this.particleLifespan = Infinity;
		this.particleColor = 'rgba(255,255,255,1)';
		this.centralGravity = false;
		this.emitting = false;
		this.gravity = 0;

		this.center = new Particle(this.w / 2, this.h * 0.3333, 0, 0, 100, 0);

		this.emitter = {
			spread: 1,
			rangeMin: 20,
			rangeMax: 70,
			radius: 0.2,
			x: this.w / 2,
			y: this.h,
			max: 300,
			randomSpawn: false
		};

		this.dragging = false;
		this.dragParticleRadius = 13;

		this.tick = this.tick.bind(this);
		requestAnimationFrame(this.tick);
	}

	generateParticles(n, r) {
		for (let i = 0; i < n; i++) {
			const x = Math.random() * this.w;
			const y = Math.random() * this.h;
			this.objects.push(new Particle(x, y, 0, 0, Math.PI * (r * r), r));
		}
	}

	_drawCircle(x, y, r, color) {
		this.context.beginPath();
		this.context.arc(x, y, r, 0, 2 * Math.PI);
		this.context.fillStyle = color;
		this.context.fill();
	}

	_drawDragGuide() {
		const arrowSize = 20; // Length of arrowhead lines
		const arrowAngle = Math.PI / 6; // 30-degree arrowhead

		// Draw start point (where drag began)
		this.context.beginPath();
		this.context.arc(this.d1x, this.d1y, 3, 0, 2 * Math.PI);
		this.context.strokeStyle = this.particleColor;
		this.context.lineWidth = 2;
		this.context.stroke();

		// Draw guide line
		this.context.beginPath();
		this.context.moveTo(this.d1x, this.d1y);
		this.context.lineTo(GLOBAL.x, GLOBAL.y);
		this.context.stroke();

		// Draw target point (where the particle is dragged)
		this.context.beginPath();
		this.context.arc(GLOBAL.x, GLOBAL.y, this.dragParticleRadius, 0, 2 * Math.PI);
		this.context.stroke();

		// Compute arrowhead points at (this.d1x, this.d1y)
		const dx = GLOBAL.x - this.d1x;
		const dy = GLOBAL.y - this.d1y;
		const angle = Math.atan2(dy, dx);

		const leftX = this.d1x - arrowSize * Math.cos(angle + Math.PI - arrowAngle);
		const leftY = this.d1y - arrowSize * Math.sin(angle + Math.PI - arrowAngle);
		const rightX = this.d1x - arrowSize * Math.cos(angle + Math.PI + arrowAngle);
		const rightY = this.d1y - arrowSize * Math.sin(angle + Math.PI + arrowAngle);

		// Draw arrowhead at (this.d1x, this.d1y)
		this.context.beginPath();
		this.context.moveTo(this.d1x, this.d1y);
		this.context.lineTo(leftX, leftY);
		this.context.moveTo(this.d1x, this.d1y);
		this.context.lineTo(rightX, rightY);
		this.context.stroke();
	}



	_drawVectors() {
		const stdGap = 40;
		let x = -stdGap, y = -stdGap;
		const arrowSize = 5; // Length of arrowhead lines
		const arrowAngle = Math.PI / 6; // Angle of arrowhead

		while (y < this.h + stdGap) {
			let vx = 0, vy = 0;

			this.objects.forEach(o => {
				const dx = o.x - x;
				const dy = o.y - y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				const gravity = (o.mass * GLOBAL.g) / dist;

				vx += gravity * (dx / dist);
				vy += gravity * (dy / dist);
			});

			if (this.centralGravity) {
				const c = this.center;
				const dx = c.x - x;
				const dy = c.y - y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				const gravity = (c.mass * GLOBAL.g) / dist;

				vx += gravity * (dx / dist);
				vy += gravity * (dy / dist);
			}

			vx *= 800;
			vy *= 800;

			const length = Math.sqrt(vx * vx + vy * vy);
			if (length > 20) {
				vx = (vx / length) * 20;
				vy = (vy / length) * 20;
			}

			const endX = x + vx;
			const endY = y + vy;

			// Draw main vector line
			this.context.beginPath();
			this.context.moveTo(x, y);
			this.context.lineTo(endX, endY);
			this.context.lineWidth = 1;
			this.context.strokeStyle = 'rgba(255,255,255,0.5)';
			this.context.stroke();

			// Compute arrowhead points
			const angle = Math.atan2(vy, vx);
			const leftX = endX - arrowSize * Math.cos(angle - arrowAngle);
			const leftY = endY - arrowSize * Math.sin(angle - arrowAngle);
			const rightX = endX - arrowSize * Math.cos(angle + arrowAngle);
			const rightY = endY - arrowSize * Math.sin(angle + arrowAngle);

			// Draw arrowhead
			this.context.beginPath();
			this.context.moveTo(endX, endY);
			this.context.lineTo(leftX, leftY);
			this.context.moveTo(endX, endY);
			this.context.lineTo(rightX, rightY);
			this.context.stroke();


			x += stdGap;
			if (x > this.w + stdGap) {
				x = 0;
				y += stdGap;
			}
		}
	}


	_drawRangeConnections() {
		this.objects.forEach((p0, i) => {
			this.objects.forEach((p1, j) => {
				if (i !== j) {
					const dx = p1.x - p0.x;
					const dy = p1.y - p0.y;
					const dist = Math.sqrt(dx * dx + dy * dy);

					if (dist < 100) {
						this.context.beginPath();
						this.context.moveTo(p0.x, p0.y);
						this.context.lineTo(p1.x, p1.y);
						this.context.strokeStyle = 'rgba(255,255,255,0.1)';
						this.context.stroke();
					}
				}
			});
		});
	}

	draw() {
		this.context.clearRect(0, 0, this.w, this.h);

		if (this.dragging) this._drawDragGuide();
		if (this.showVectors) this._drawVectors();
		if (this.showRanges) this._drawRangeConnections();

		this.objects.forEach(o => this._drawCircle(o.x, o.y, o.radius, o.color));
	}

	update() {
		if (this.emitting) this.emit();

		this.objects = this.objects.filter(p0 => {
			p0.damp();
			p0.vy += this.gravity;

			if (this.centralGravity) p0.pull(this.center);

			this.objects.forEach(p1 => {
				if (p0 !== p1) {
					p0.solveOverlap(p1);
					if (this.particleAttraction) p0.pull(p1);
					if (this.walls) p0.wall(this.w, this.h);
					if (this.particleCollision) p0.collide(p1);
				}
			});

			p0.update();
			return p0.age <= this.particleLifespan;
		});
	}

	emit() {
		if (!this.emitting) return;

		this.objects = this.objects.filter(o =>
			o.x >= -this.w && o.x <= this.w * 2 &&
			o.y >= -this.h && o.y <= this.h * 2
		);

		if (this.objects.length < this.emitter.max) {
			let { x, y } = this.emitter.randomSpawn
				? { x: Math.random() * this.w, y: Math.random() * this.h }
				: { x: this.emitter.x, y: this.emitter.y };

			const vx = (Math.random() * this.emitter.spread) - (this.emitter.spread / 2);
			const vy = -((Math.random() * (this.emitter.rangeMax - this.emitter.rangeMin)) + this.emitter.rangeMin);
			this.objects.push(new Particle(x, y, vx, vy, 1, this.emitter.radius));
		}
	}

	startDragHandler(x, y) {
		this.dragging = true;
		this.d1x = x;
		this.d1y = y;
	}

	endDragHandler(x, y) {
		this.dragging = false;
		this.d2x = x;
		this.d2y = y;

		const dx = this.d2x - this.d1x;
		const dy = this.d2y - this.d1y;
		const angle = Math.PI + Math.atan2(dy, dx);
		const speed = 0.1 * Math.sqrt(dx * dx + dy * dy);
		const mass = Math.PI * (this.dragParticleRadius ** 2);

		this.objects.push(new Particle(this.d2x, this.d2y, speed, angle, mass, this.dragParticleRadius));
	}

	tick() {
		this.update();
		this.draw();
		requestAnimationFrame(this.tick);
	}
}

/* Get things started */
let worldStage = document.getElementById('world');

worldStage.style.width = window.innerWidth + 'px';
worldStage.style.height = window.innerHeight + 'px';

worldStage.width = worldStage.clientWidth;
worldStage.height = worldStage.clientHeight;

let w = new World(worldStage);
w.particleAttraction = false;
//w.centralGravity = true;
//w.showRanges = true;
w.emitter.radius = 5;
w.emitter.rangeMin = -5;
w.emitter.y = w.h * .5;
w.emitter.rangeMax = 5;
w.emitter.max = 40;
w.emitter.randomSpawn = true;
w.emitting = true;