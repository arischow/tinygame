class GuaImage {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        
        this.flipY = false
        this.rotation = 0
    }
    static new(game, name) {
        var i = new this(game, name)
        return i
    }
    draw() {
        this.game.drawImage(this)
    }
    update() {

    }
}

class Land extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.setup()
    }
    setup() {
        this.x = 0
        this.y = 482
    }
    update() {
        this.x -= 5
        if(this.x == -50) {
            this.x = 0
        }
    }
}