﻿class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.blockSize = BLOCK_SIZE;
        this.blocks = [];
        this.addBlock(this.x, this.y);
        this.alive = true;
    }

    addBlock(x, y) {
        const block = new Block(x, y, this.blockSize);
        this.blocks.push(block);
    }

    checkWalls() {
        if (walls) {
            const head = this.blocks[0];
            if (head.x < 0 || head.x > APP_SIZE / this.blockSize - 1) {
                this.alive = false;
            }
            if (head.y < 0 || head.y > APP_SIZE / this.blockSize - 1) {
                this.alive = false;
            }
        }
    }

    moveHead() {
        const head = this.blocks[0];
        head.oldX = head.x;
        head.oldY = head.y;
        switch (currentDirection) {
            case "up":
                head.y -= 1;
                break;
            case "down":
                head.y += 1;
                break;
            case "left":
                head.x -= 1;
                break;
            case "right":
                head.x += 1;
                break;
            default:
                break;
        }
        if (walls == true) {
            this.checkWalls();
        } else {
            head.teleportIfOutOfBounds();
        }
    }

    calculateNewBlockPosition() {
        let { x, y } = this.blocks[this.blocks.length - 1];
        switch (currentDirection) {
            case "up":
                y += 1;
                break;
            case "down":
                y -= 1;
                break;
            case "left":
                x += 1;
                break;
            case "right":
                x -= 1;
                break;
            default:
                break;
        }
        return { x, y };
    }

    eat() {
        const head = this.blocks[0];
        if (head.x === food.x && head.y === food.y) {
            const { x, y } = this.calculateNewBlockPosition();
            this.addBlock(x, y);
            food.setRandmPosition();
            if (gameSpeed > 40) {
                if (difficulty == "ez") {
                    gameSpeed -= 1;
                } else if (difficulty == "diff") {
                    gameSpeed -= 3;
                } else {
                    gameSpeed -= 5;
                }
            }
            score++;
            score_display.innerHTML = score;
        }
    }

    blockTouchHead(block) {
        const head = this.blocks[0];
        const headX = head.x;
        const headY = head.y;

        return headX === block.x && headY === block.y;
    }

    update() {
        this.moveHead();
        this.eat();

        for (const [index, block] of this.blocks.entries()) {
            if (index > 0) {
                const { oldX, oldY } = this.blocks[index - 1];
                block.setPosition(oldX, oldY);
                if (this.blockTouchHead(block)) {
                    this.alive = false;
                }
            }
            block.draw();
        }
    }
}
