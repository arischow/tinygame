class GuaAnimation {
    constructor(game) {
        this.game = game

        this.frames = []
        for (var i = 1; i < 13; i++) {  // b1 - b12
            var name = `b${i}`
            var t = game.textureByName(name)
            this.frames.push(t)
        }

        this.texture = this.frames[0]
        this.frameIndex = 0
        this.frameCount = 3

        this.alive = true
        this.aliveTime = 15
    }

    static new(game) {
        return new this(game)
    }

    update() {
        this.aliveTime--
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames.length
            this.texture = this.frames[this.frameIndex]
        }
        if (this.aliveTime == 0) {
            this.alive = false
        }
    }

    draw() {
        if (this.alive == true) {
           this.game.drawImage(this)
        }
    }
}