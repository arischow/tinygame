var config = {
    player_speed: 10,
    bullet_speed: 2,
    fire_cooldown: 3,
    enemy_speed: 5,
    cloud_speed: 1,
    enemy_bullet_speed: 10,
}
const randomBetween = function (start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start)
}

class Bullet extends GuaImage {
    constructor(game, who) {
        super(game, 'bullet')
        this.setup()
        this.who = who
    }

    killEnemies() {
        var b = this
        var s = b.scene
        var enemies = s.enemies

        var player = s.player
        for(var e of enemies) {
            if(b.alive && b.who == 'player' && e.alive) {
                if(rectIntersects(b, e) || rectIntersects(e, b)) {
                    b.kill()
                    e.kill()
                    player.scores += 10
                    s.boom(e.x, e.y)
                }
            }
            
            if(b.alive && b.who == 'enemy' && player.alive) {
                if(rectIntersects(b, player) || rectIntersects(player, b)) {
                    b.kill()
                    player.kill()
                    s.boom(e.x, e.y)
                }
            }

            if(e.alive && player.alive) {
                if(rectIntersects(e, player) || rectIntersects(player, e)) {
                    e.kill()
                    player.kill()
                    s.boom(e.x, e.y)
                }
            }
        }
    }

    setup() {
        this.speed = 2
        this.alive = true
    }

    update() {
        if (this.who == 'player') {
            this.y -= this.speed            
        } else {
            this.y += config.enemy_bullet_speed
        }

        if (this.y < 0) {
            this.alive = false
        }
        this.killEnemies()
    }

    debug() {
        this.speed = config.bullet_speed
    }

    kill() {
        this.alive = false
    }

    draw() {
        if (this.alive) {
            this.game.drawImage(this)
        }
    }
}

class Cloud extends GuaImage {
    constructor(game) {
        super(game, 'cloud')
        this.setup()
    }

    setup() {
        this.speed = 1
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }

    update() {
        this.y += config.cloud_speed
        if (this.y > 600) {
            this.setup()
        }
    }

    debug() {
        this.speed = config.cloud_speed
    }
}

class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }

    setup() {
        this.alive = true
        this.speed = 5
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
        this.fireFrequency = randomBetween(10, 40)
    }

    update() {
        this.y += this.speed
        this.fireFrequency--
        if (this.alive && this.fireFrequency == 0){
            this.fire()
            this.fireFrequency = randomBetween(25, 50)
        }
        if (this.y > 600) {
            this.setup()
        }
    }

    debug() {
        this.speed = config.enemy_speed
    }

    kill() {
        this.alive = false
    }

    draw() {
        if (this.alive) {
            this.game.drawImage(this)
        }
    }

    fire() {
        var x = this.x + this.w / 2
        var y = this.y
        var b = Bullet.new(this.game, 'enemy')
        b.x = x
        b.y = y
        this.scene.addElement(b)
    }
}

class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }

    kill() {
        this.alive = false
    }

    setup() {
        this.alive = true
        this.speed = 10
        this.cooldown = 3
        this.scores = 0 
    }

    update() {
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    
    moveLeft() {
        if (this.x <= 0) {

        } else {
            this.x -= this.speed    
        }
    }
    moveRight() {
        if (this.x >= this.game.canvas.width - this.texture.width) {
            
        } else {
            this.x += this.speed            
        }
    }
    moveUp() {
        if (this.y < 0 + this.texture.height) {
            
        } else {
            this.y -= this.speed    
        }
    }
    moveDown() {
        if (this.y > this.game.canvas.height - this.texture.height) {

        } else {
            this.y += this.speed    
        }
    }

    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game, 'player')
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }

    debug() {
        this.speed = config.player_speed
    }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    setup() {
        var game = this.game
        this.numberOfEnemies = 10
        this.bg = GuaImage.new(game, 'sky')

        this.cloud = Cloud.new(game)

        this.player = Player.new(game)
        this.player.x = 100
        this.player.y = 150
        
        this.scores = 0

        this.addElement(this.player)

        this.addEnemies()

        // particles
        var ps = GuaParticleSystem.new(this.game)
        this.addElement(ps)

        // Cloud shoud be the last
        this.addElement(this.cloud)        
    }

    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }

    setupInputs() {
        var g = this.game
        var self = this

        g.registerAction('a', function () {
            self.player.moveLeft()
        })
        g.registerAction('d', function () {
            self.player.moveRight()
        })
        g.registerAction('w', function () {
            self.player.moveUp()
        })
        g.registerAction('s', function () {
            self.player.moveDown()
        })
        g.registerAction('j', function () {
            self.player.fire()
        })
    }

    boom(x, y) {
        var b = GuaAnimation.new(this.game)
        b.x = x
        b.y = y
        this.addElement(b)
    }

    update() {
        super.update()
        this.cloud.y += 1
        log('scores', this.player.scores)
    }

    draw() {
        var ctx = this.game.context
        ctx.drawImage(this.bg.texture, 0, 0, this.game.canvas.width, this.game.canvas.height)        
        ctx.fillStyle = '#FFF'        
        ctx.font = '20px serif'
        ctx.fillText(`分数: ${this.player.scores}`, 0, 50)   
        if (this.player.alive == false) {
            var s = SceneEnd.new(this.game, this.player.scores)
            this.game.replaceScene(s)
        }
                
         
        super.draw()
        
    }
}
