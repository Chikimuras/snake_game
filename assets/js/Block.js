class Block {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.oldX = x;
        this.oldY = y;
        this.size = size;
    }
    // Teleport if out of bounds in ez mode
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
    // Update the position of the block
    setPosition(x, y) {
        this.oldX = this.x;
        this.oldY = this.y;
        this.x = x;
        this.y = y;
    }
    // Draw the block
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
