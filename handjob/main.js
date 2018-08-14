var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var images = {
        bullet: 'img/bullet2.png',
        cloud: 'img/clouds-transparent.png',
        player: 'img/player.png',
        sky: 'img/desert-background.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy3.png',
        enemy4: 'img/enemy4.png',
        fire: 'img/boom11.png',

        // 爆炸!
        b1: 'img/boom1.png',
        b2: 'img/boom2.png',
        b3: 'img/boom3.png',
        b4: 'img/boom4.png',
        b5: 'img/boom5.png',
        b6: 'img/boom6.png',
        b7: 'img/boom7.png',
        b8: 'img/boom8.png',
        b9: 'img/boom9.png',
        b10: 'img/boom10.png',
        b11: 'img/boom11.png',
        b12: 'img/boom12.png',        
        
    }
    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)        
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
