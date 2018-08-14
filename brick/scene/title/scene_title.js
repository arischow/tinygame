class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function(){
            var s = Scene(game)
            game.replaceScene(s)
        })
        game.registerAction('e', function(){
            var s = SceneEditor(game)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw labels
        this.game.context.fillText('按 k 开始游戏，按 e 编辑关卡', 100, 190)
    }
}
