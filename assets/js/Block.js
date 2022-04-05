class Block {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.oldX = x;
        this.oldY = y;
        this.size = size;
    }

    teleportIfOutOfBounds() {
        const maxSize = APP_SIZE / this.size;
        if (this.x < 0) {
            this.x = maxSize - 1;
        } else if (this.x > maxSize) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = maxSize - 1;
        } else if (this.y > maxSize) {
            this.y = 0;
        }
    }

    setPosition(x, y) {
        this.oldX = this.x;
        this.oldY = this.y;
        this.x = x;
        this.y = y;
    }

    draw() {
        ctx.fillStyle = "green";
        ctx.fillRect(
            this.x * this.size,
            this.y * this.size,
            this.size,
            this.size
        );
    }
}
