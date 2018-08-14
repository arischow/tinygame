const randomBetween = function (start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start)
}
class Scene extends GuaScene {
    constructor(game) {
        super(game)

        var bg = GuaImage.new(game, 'day')
        this.addElement(bg)

        // pipes
        this.pipes = Pipes.new(game)
        this.addElement(this.pipes)

        // bird
        var bird = GuaAnimation.new(game)
        bird.x = 100
        bird.y = 300

        // 🐦速
        this.birdSpeed = config.bird_speed.value

        this.bird = bird
        this.addElement(this.bird)
        this.game.bird = this.bird
        this.setupInputs()

        // scoreImages
        this.scoreImages = []
        for (var i = 0; i < 10; i++) {
            this.scoreImages.push(this.game.images[String(i)])
        }

        // Land
        this.land = Land.new(game, 'land')
        this.addElement(this.land)
    }

    debug() {
        this.birdSpeed = config.bird_speed.value
        this.pipeSpace = config.pipe_space.value
    }

    setupInputs () {
        var self = this
        self.game.registerAction('a', function() {
            self.bird.move(-self.birdSpeed)
        })

        self.game.registerAction('d', function() {
            self.bird.move(self.birdSpeed)
        })

        self.game.registerAction('j', function() {
            self.bird.jump()
        })
    }

    update() {
        this.debug && this.debug()
        super.update()
    }

    draw() {
        super.draw()
        this.game.printScores()
    }
}