class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }
    setup() {
        this.life = 3
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }

    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy

        var velocity = 0.01
        this.vx += velocity * this.vx
        this.vy += velocity * this.vy
    }
}

class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(game) {
        return new this(game)
    }

    setup() {
        this.duration = 10
        this.x = 150
        this.y = 200
        this.numberOfParticles = 100
        this.particles = []
    }

    update() {
        this.duration--
        // 添加
        if (this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)

            // v for vector
            var vx = randomBetween(-10, 10)
            var vy = randomBetween(-10, 10)

            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }

        // 更新
        for (var p of this.particles) {
            p.update()
        }

        // 删除
        this.particles = this.particles.filter(p => p.life > 0)
    }

    draw() {
        // TODO: Fix it
        if (this.duration < 0) {
            return
        }

        for (var p of this.particles) {
            p.draw()
        }
    }

}
