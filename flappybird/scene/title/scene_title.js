class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = config.pipe_space.value

        // 横向间距
        this.pipeInterval = config.pipe_interval.value
        this.columnsOfPipe = 3

        for (var i = 0; i < this.columnsOfPipe; i++) {
            var p1 = GuaImage.new(game, 'pipe')
            
            p1.flipY = true

            // 500 是为了初始位置 （游戏初始化第一对柱子）
            p1.x = 500 + i * this.pipeInterval

            var p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            log(p1.y, p2.y)       

            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)         
        }
        this.game.scores = 0        
    }

    generateNumberImage() {

    }

    static new(game) {
        return new this(game)
    }

    // 垂直管子间距
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-200, 0)
        p2.y = p1.y + p1.h + this.pipeSpace

    }

    debug() {
        this.pipeSpace = config.pipe_space.value
        this.pipeInterval = config.pipe_interval.value             
    }
    update() {
        this.debug && this.debug() // 更改配置

        for (var i=0; i<this.pipes.length/2; i+=2) {
            
            var p1 = this.pipes[i]
            var p2 = this.pipes[i+1]

            p1.x -=5
            p2.x -=5

            // 解决第一根柱子的计分问题
            if (this.game.scores == 0 && p1.x < 100 ) {
                this.game.scores++
            }

            if (p1.x < -100) {
                p1.x += this.pipeInterval * this.columnsOfPipe - 220
            }

            if (p2.x < -100) {
                p2.x += this.pipeInterval * this.columnsOfPipe - 220
                this.game.scores += 1
                this.resetPipesPosition(p1, p2)
            }
        }
        if (rectIntersects(p1, this.game.bird) == true) {
            var s = SceneEnd.new(this.game)
            this.game.replaceScene(s)
        } 
    }

    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()
            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)

            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
    
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
    
            context.drawImage(p.texture, 0, 0)
            context.restore()
        }
    }
 }

 class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)

        var bg = GuaImage.new(game, 'day')
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
        self.game.registerAction('v', function() {
            var s = Scene.new(self.game)
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
        ctx.fillText('按 V 开始游戏', 80, 450)
    }
 }