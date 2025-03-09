class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(p) {
        return new Point(this.x + p.x, this.y + p.y);
    }

    subtract(p) {
        return new Point(this.x - p.x, this.y - p.y);
    }

    multiply(p) {
        return new Point(this.x * p.x, this.y * p.y);
    }

    scale(k) {
        return new Point(this.x * k, this.y * k);
    }

    divide(p) {
        return new Point(this.x / p.x, this.y / p.y);
    }

    dist(p) {
        return Math.hypot(this.x - p.x, this.y - p.y);
    }

    angleTo(p) {
        let diff = this.subtract(p);
        return Math.atan2(diff.y, diff.x);
    }

    absoluteDist(p) {
        return Math.hypot(Math.abs(this.x - p.x), Math.abs(this.y - p.y));
    }

    setX(x) { this.x = x; }
    setY(y) { this.y = y; }
    setPoint(p) {
        this.x = p.x;
        this.y = p.y;
    }
}

class Vector {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get angle() {
        return Math.atan2(this._y, this._x);
    }

    get magnitude() {
        return Math.hypot(this._x, this._y);
    }

    set angle(angle) {
        let magnitude = this.magnitude;
        this._x = magnitude * Math.cos(angle);
        this._y = magnitude * Math.sin(angle);
    }

    set magnitude(magnitude) {
        let angle = this.angle;
        this._x = Math.cos(angle) * magnitude;
        this._y = Math.sin(angle) * magnitude;
    }

    add(vector) {
        return new Vector(this._x + vector._x, this._y + vector._y);
    }
}
