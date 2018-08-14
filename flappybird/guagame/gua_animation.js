class GuaAnimation {
    constructor(game) {
        this.game = game
        
        // hard-coded animations
        this.animations = {
            fly: []
        }

        for (var i = 0; i < 3; i++) {  // b1 - b12
            var name = `bird0${i}`
            var t = game.textureByName(name)
            this.animations['fly'].push(t)
        }

        this.animationName = 'fly'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height

        this.frameIndex = 0
        this.frameCount = 3

        this.flipX = false
        this.rotation = 0
        this.alpha = 1

        // 重力 & 加速度
        this.gy = 10
        this.vy = 0
        
        this.alive = true
    }

    static new(game) {
        return new this(game)
    }

    collide() {
        
    } 
    frames() {
        return this.animations[this.animationName]
    }

    jump() {
        this.vy = -10
        this.rotation = -45
    }

    debug() {
        this.bird_speed = config.bird_speed.value
    }

    update() {
        // 更新 alpha
        if (this.alpha > 0) {
            this.alpha -= 0.05
        }

        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.2
        
        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }

        // 只掉到地面就 OK
        var h = 445
        if (this.y > h) {
            this.y = h
        }

        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }

        if (this.y >= 445) {
            this.alive = false
            if (this.alive == false) {
                var s = SceneEnd.new(this.game)
                this.game.replaceScene(s)
            }
        }

    }

    draw() {
        var context = this.game.context

        context.save()

        var w2 = this.w / 2
        var h2 = this.h / 2

        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)            
        }

        // 透明度 (i.e. 逐渐消失)
        context.globalAlpha = this.alpha

        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)

        context.drawImage(this.texture, 0, 0)
        context.restore()
    }

    move(x) {
        this.flipX = (x < 0)
        this.x += x
        // this.changeAnimation('fly')
    }

    // changeAnimation(name) {
    //     this.animationName = name
    // }
}

class SceneTitleBird extends GuaAnimation {
    constructor(game) {
        super(game)
    }

    static new(game) {
        return new this(game)
    }

    jump() {

    }

    debug() {

    }

    update() {
        // 只掉到地面就 OK
        var h = 445
        if (this.y > h) {
            this.y = h
        }

        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }

    draw() {
        var context = this.game.context
        context.drawImage(this.texture, this.x, this.y)
    }

    move(x) {
        this.flipX = (x < 0)
        this.x += x
    }
}