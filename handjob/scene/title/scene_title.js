class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)

        game.registerAction('v', function() {
            var s = Scene.new(game)
            game.replaceScene(s)
        })

        this.bg = GuaImage.new(game, 'sky')

        // var label = GuaLabel.new(game, '按 V 开始游戏', 100, 200)
        // this.addElement(label)
    }

    static new(game) {
        return new this(game)
    }

    draw() {
        var ctx = this.game.context
        ctx.drawImage(this.bg.texture, 0, 0, this.game.canvas.width, this.game.canvas.height)

        ctx.fillStyle = '#FFF'        
        ctx.font = '20px serif'
        ctx.fillText('按 V 开始游戏', 100, 200)
    }

}