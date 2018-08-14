class SceneEnd extends GuaScene {
    constructor(game, scores) {
        super(game)
        this.scores = scores
        
        this.setupInputs()
    }

    setupInputs() {
        let self = this
        self.game.registerAction('r', function(){
            let s = SceneTitle.new(self.game)
            self.game.replaceScene(s)
        })
    }
    static new(game, scores) {
        return new this(game, scores)
    }

    draw() {
        // draw labels
        this.bg = GuaImage.new(this.game, 'sky')        
        var ctx = this.game.context
        ctx.drawImage(this.bg.texture, 0, 0, this.game.canvas.width, this.game.canvas.height)        
        ctx.fillStyle = '#FFF'        
        ctx.font = '20px serif'
        ctx.fillText(`最终得分: ${this.scores}`, 0, 50)
        ctx.fillText(`按 R 回到标题界面`, 0, 200)           
    }
}
