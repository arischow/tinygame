// 2017-08-13

var blocks = []

function blocksToLevel(blocks) {
    l = []
    for (var i = 0; i < blocks.length; i++) {
        b = blocks[i]
        l.push([b.x, b.y])
    }
    return l
}
var SceneEditor = function (game) {
    game.registerAction('s', function () {
        level = blocksToLevel(blocks)
        levels.push(level)
        var s = Scene(game)
        game.replaceScene(s)
    })

    var s = {
        game: game,
    }
    // 初始化
    var score = 0
    var paddle = Paddle(game)

    s.handleEdgeCollisions = function (rect1, rect2) {
        console.log('rect1', rect1.x, rect1.y)
        if (rect1.x < rect2.x + rect2.w &&
            rect1.x + rect1.w > rect2.x &&
            rect1.y < rect2.y + rect2.h &&
            rect1.h + rect1.y > rect2.y) {
            console.log('撞了')
            return true
        } else {
            console.log('没撞')
            return false
        }
    }

    s.allReturnFalse = function (block) {
        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i]
            console.log('?????!')
            if (s.handleEdgeCollisions(b, block) === true) {
                return true
            }
        }
        return false
    }
    s.draw = function () {
        // draw 背景
        game.context.fillStyle = "#fff"
        game.context.fillRect(0, 0, 400, 300)

        // draw
        game.drawImage(paddle)

        // draw labels
        game.context.fillText('分数: ' + score, 10, 290)
        game.context.fillText('按 s 保存并开始游戏', 300, 0)

        // custom
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
    }
    s.update = function () {
        // if (window.paused) {
        //     return
        // }

        // ball.move()
        // // 判断游戏结束
        // if (ball.y > paddle.y) {
        //     // 跳转到 游戏结束 的场景
        //     var end = SceneEnd.new(game)
        //     game.replaceScene(end)
        // }
        // // 判断相撞
        // if (paddle.collide(ball)) {
        //     // 这里应该调用一个 ball.反弹() 来实现
        //     ball.反弹()
        // }
        // // 判断 ball 和 blocks 相撞
        // for (var i = 0; i < blocks.length; i++) {
        //     var block = blocks[i]
        //     if (block.collide(ball)) {
        //         // log('block 相撞')
        //         block.kill()
        //         ball.反弹()
        //         // 更新分数
        //         score += 100
        //     }
        // }
    }

    // mouse event
    var enableDrag = false
    game.canvas.addEventListener('mousedown', function (event) {
        // 鼠标指针所在为砖块中心
        var blockImg = game.imageByName('block')
        var x = event.offsetX // - (blockImg.w / 2)
        var y = event.offsetY // - (blockImg.h / 2)

        var block = Block(game, [x, y])
        if (blocks.length === 0) {
            blocks.push(block)
        } else if (s.allReturnFalse(block) === false) {
            console.log('pushed')
            blocks.push(block)

        }



    })
    game.canvas.addEventListener('mousemove', function (event) {
        var x = event.offsetX
        var y = event.offsetY
        // log(x, y, 'move')
        if (enableDrag) {
            log(x, y, 'drag')
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', function (event) {
        var x = event.offsetX
        var y = event.offsetY
        log(x, y, 'up')
        enableDrag = false
    })

    return s
}