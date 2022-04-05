class Food {
    constructor() {
        this.size = BLOCK_SIZE;
        this.setRandmPosition();
    }
    // Set a random position for the food
    setRandmPosition() {
        const maxSize = APP_SIZE / this.size - 1;
        this.x = Math.round((Math.random() * APP_SIZE) % maxSize);
        this.y = Math.round((Math.random() * APP_SIZE) % maxSize);
    }
    // Draw the food
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(
            this.x * this.size,
            this.y * this.size,
            this.size,
            this.size
        );
    }
}
