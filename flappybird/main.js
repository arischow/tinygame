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
        day: 'img/bg_day.png',
        night: 'img/bg_night.png',

        land: 'img/land.png',

        bird00: 'img/bird0_0.png',
        bird01: 'img/bird0_1.png',
        bird02: 'img/bird0_2.png',

        pipe: 'img/pipe_up.png',

        button_play: 'img/button_play.png',

        // number
        '0': 'img/number_score_00.png',
        '1': 'img/number_score_01.png',
        '2': 'img/number_score_02.png',
        '3': 'img/number_score_03.png',
        '4': 'img/number_score_04.png',
        '5': 'img/number_score_05.png',
        '6': 'img/number_score_06.png',
        '7': 'img/number_score_07.png',
        '8': 'img/number_score_08.png',
        '9': 'img/number_score_09.png',
    }
    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)        
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
