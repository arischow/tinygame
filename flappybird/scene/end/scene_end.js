class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)

        var bg = GuaImage.new(game, 'night')
        this.addElement(bg)

        // bird
        var bird = SceneTitleBird.new(game)
        bird.x = 115
        bird.y = 256

        this.bird = bird
        this.addElement(bird)

        // 地面循环移动
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'land')

            g.x = i * 19
            g.y = 480
            this.addElement(g)
            this.grounds.push(g)
        }
        this.setupInputs()
    }

    setupInputs() {
        var self = this
        self.game.registerAction('r', function() {
            var s = SceneTitle.new(self.game)
            self.game.replaceScene(s)
        })
    }
    
    static new(game) {
        return new this(game)
    }

    draw() {
        super.draw()
        var ctx = this.game.context
        ctx.fillStyle = '#FFF'        
        ctx.font = '20px serif'
        ctx.fillText('按 R 回到界面', 80, 450)

        ctx.fillText('最终得分', 100, 140)
        this.game.printScores()
    }
 }