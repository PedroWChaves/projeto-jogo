namespace SpriteKind {
    export const EnemyAttack = SpriteKind.create()
    export const Ammo = SpriteKind.create()
    export const SpecialAttack = SpriteKind.create()
    export const Enemy2 = SpriteKind.create()
    export const Enemy2Attack = SpriteKind.create()
    export const tiro = SpriteKind.create()
}
namespace StatusBarKind {
    export const EnemyHealth2 = StatusBarKind.create()
}
sprites.onOverlap(SpriteKind.SpecialAttack, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value += -1
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
function enemyMove () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.x <= scene.screenWidth() / 2) {
            value.setVelocity(randint(0, 50), value.vy)
        } else {
            value.setVelocity(randint(-50, 0), value.vy)
        }
    }
}
sprites.onOverlap(SpriteKind.tiro, SpriteKind.Enemy2Attack, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    sprites.destroy(otherSprite, effects.fire, 500)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (ammoAmount.value > 0) {
        statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, myShip).value += -1
        meuTiroEspecial = sprites.create(img`
            . . . . . . c c c . . . . . . . 
            . . . . . c a a a c . . . . . . 
            . . . . c a a 1 a a c . . . . . 
            . . . . c a 1 1 1 a c . . . . . 
            . . . . c a 1 1 1 a c . . . . . 
            . . . . c a 1 1 1 a c . . . . . 
            . . . . . c 1 1 1 c . . . . . . 
            . . . . . c c 1 c c . . . . . . 
            . . . . . . c a c . . . . . . . 
            . . . . . . c a c . . . . . . . 
            . . . . . . c a c . . . . . . . 
            . . . . . . c a c . . . . . . . 
            . . . . . . c c c . . . . . . . 
            . . . . . . . c . . . . . . . . 
            . . . . . . . c . . . . . . . . 
            . . . . . . . c . . . . . . . . 
            `, SpriteKind.SpecialAttack)
        meuTiroEspecial.setPosition(myShip.x, myShip.y)
        meuTiroEspecial.setVelocity(0, -30)
        meuTiroEspecial.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.UntilDone)
        pause(500)
    }
})
function spawnFood () {
    Gasolina = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . b b b b b . . . . . . 
        . . . . b 3 3 3 3 3 b . . . . . 
        . . . b 3 3 3 3 3 3 3 b . . . . 
        . . . b b 3 3 3 3 3 b b . . . . 
        . . . b 3 b b b b b 3 b . . . . 
        . . . b 3 3 3 3 3 3 3 b . . . . 
        . . . b 5 5 5 5 5 5 5 b . . . . 
        . . . b 5 5 5 5 5 5 5 b . . . . 
        . . . b 3 3 3 3 3 3 3 b . . . . 
        . . . b 5 5 5 5 5 5 5 b . . . . 
        . . . b 5 5 5 5 5 5 5 b . . . . 
        . . . b 3 3 3 3 3 3 3 b . . . . 
        . . . . b b b b b b b . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    Gasolina.setPosition(randint(0, scene.screenWidth()), 10)
    Gasolina.setVelocity(0, 80)
    Gasolina.setFlag(SpriteFlag.AutoDestroy, true)
}
function spawnEntities () {
    spawnEnemy()
    spawnAmmo()
    spawnFood()
    if (level >= 2) {
        spawnEnemy2()
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    meuTiro = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 8 8 8 8 8 . . . . . 
        . . . . . 8 a a 8 a a 8 . . . . 
        . . . . 8 a a 8 1 8 a a 8 . . . 
        . . . . 8 a 1 1 1 1 1 a 8 . . . 
        . . . . 8 a 1 1 1 1 1 a 8 . . . 
        . . . . 8 a 1 1 1 1 1 a 8 . . . 
        . . . . . 8 a 1 1 1 a 8 . . . . 
        . . . . . 8 8 1 1 1 8 8 . . . . 
        . . . . . . 8 8 1 8 8 . . . . . 
        . . . . . . . 8 a 8 . . . . . . 
        . . . . . . . 8 a 8 . . . . . . 
        . . . . . . . 8 a 8 . . . . . . 
        . . . . . . . 8 a 8 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, myShip, 0, -50)
    meuTiro.setKind(SpriteKind.tiro)
    meuTiro.setFlag(SpriteFlag.AutoDestroy, true)
    pause(200)
})
sprites.onOverlap(SpriteKind.tiro, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, inimigo).value += -1
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
statusbars.onZero(StatusBarKind.EnemyHealth2, function (status) {
    sprites.destroy(status.spriteAttachedTo())
    info.changeScoreBy(2)
})
function enemyFire () {
    for (let value4 of sprites.allOfKind(SpriteKind.Enemy)) {
        tiro2 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . 2 3 2 . . . . . . 
            . . . . . . . 2 3 2 . . . . . . 
            . . . . . . . 2 3 2 . . . . . . 
            . . . . . . . 2 3 2 . . . . . . 
            . . . . . . 2 2 1 2 2 . . . . . 
            . . . . . . 2 1 1 1 2 . . . . . 
            . . . . . . 2 1 1 1 2 . . . . . 
            . . . . . . 2 3 1 3 2 . . . . . 
            . . . . . . 2 3 1 3 2 . . . . . 
            . . . . . . 2 3 3 3 2 . . . . . 
            . . . . . . 2 2 3 2 2 . . . . . 
            . . . . . . . 2 2 2 . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.EnemyAttack)
        tiro2.setPosition(value4.x, value4.y)
        tiro2.setVelocity(0, 70)
        tiro2.setFlag(SpriteFlag.AutoDestroy, true)
    }
}
function spawnAmmo () {
    ammo = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 7 f 7 f 7 . . . . 
        . . . . . . 7 f 7 f 7 7 . . . . 
        . . . . . 7 f 7 f 7 7 7 . . . . 
        . . . . . 7 f 7 f 7 7 7 . . . . 
        . . . . . 7 f 7 f 7 7 7 . . . . 
        . . . . . 7 f 7 f 7 7 7 . . . . 
        . . . . . 7 f 7 f 7 7 . . . . . 
        . . . . . 7 f 7 f 7 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Ammo)
    ammo.setPosition(randint(0, scene.screenWidth()), 10)
    ammo.setVelocity(0, 60)
    ammo.setFlag(SpriteFlag.AutoDestroy, true)
}
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    sprites.destroy(status.spriteAttachedTo())
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Ammo, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    if (ammoAmount.value < ammoAmount.max) {
        statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, sprite).value += 1
    }
    music.play(music.melodyPlayable(music.sonar), music.PlaybackMode.UntilDone)
})
function handleActions () {
    enemyFire()
    enemyMove()
    if (level >= 2) {
        enemy2Move()
        enemy2Fire()
    }
}
function spawnEnemy2 () {
    pause(200)
    if (randint(0, 10) >= 2) {
        Inimigo2 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 6 . . 6 . . . . . . 
            . 6 . . 6 6 6 6 6 6 6 6 . . 6 . 
            . 6 6 6 6 6 3 6 6 3 6 6 6 6 6 . 
            . 6 6 6 6 9 6 6 6 6 9 6 6 6 6 . 
            . 6 . . 6 6 3 3 3 3 6 6 . . 6 . 
            . . . . . 3 6 6 6 6 3 . . . . . 
            . . . . . . 6 6 6 6 . . . . . . 
            . . . . . . . 6 6 . . . . . . . 
            . . . . . . . 6 6 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy2)
        posAleatoria2 = randint(0, scene.screenWidth())
        statusbaren2 = statusbars.create(20, 4, StatusBarKind.EnemyHealth2)
        statusbaren2.value = 3
        statusbaren2.max = 3
        statusbaren2.attachToSprite(Inimigo2, 5, 0)
        Inimigo2.setPosition(posAleatoria2, 1)
        Inimigo2.setVelocity(0, 40)
        Inimigo2.setFlag(SpriteFlag.AutoDestroy, true)
    }
}
function takeDamage (amount: number) {
    scene.cameraShake(4, 500)
    music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.UntilDone)
    info.changeLifeBy(amount * -1)
    if (info.life() == 0) {
        game.gameOver(false)
    }
}
function enemy2Fire () {
    for (let value2 of sprites.allOfKind(SpriteKind.Enemy2)) {
        tiroini2 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . 8 9 8 . . . . . . 
            . . . . . . . 8 9 8 . . . . . . 
            . . . . . . . 8 9 8 . . . . . . 
            . . . . . . . 8 9 8 . . . . . . 
            . . . . . . 8 8 1 8 8 . . . . . 
            . . . . . . 8 1 1 1 8 . . . . . 
            . . . . . . 8 1 1 1 8 . . . . . 
            . . . . . . 8 9 1 9 8 . . . . . 
            . . . . . . 8 9 1 9 8 . . . . . 
            . . . . . . 8 9 9 9 8 . . . . . 
            . . . . . . 8 8 9 8 8 . . . . . 
            . . . . . . . 8 8 8 . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy2Attack)
        tiroini2.setPosition(value2.x, value2.y)
        tiroini2.setVelocity(0, 70)
        tiroini2.setFlag(SpriteFlag.AutoDestroy, true)
    }
}
sprites.onOverlap(SpriteKind.EnemyAttack, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    takeDamage(1)
})
sprites.onOverlap(SpriteKind.SpecialAttack, SpriteKind.EnemyAttack, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy2, function (sprite, otherSprite) {
    takeDamage(2)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy2Attack, function (sprite, otherSprite) {
    takeDamage(2)
})
sprites.onOverlap(SpriteKind.tiro, SpriteKind.Enemy2, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth2, otherSprite).value += -1
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
function enemy2Move () {
    for (let value3 of sprites.allOfKind(SpriteKind.Enemy2)) {
        if (value3.x <= scene.screenWidth() / 2) {
            value3.setVelocity(randint(0, 50), value3.vy)
        } else {
            value3.setVelocity(randint(-50, 0), value3.vy)
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    if (gasolineAmount.value < gasolineAmount.max) {
        statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, sprite).value += 0.1
    }
    music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.UntilDone)
})
info.onScore(20, function () {
    level += 1
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.SpecialAttack, SpriteKind.Enemy2, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth2, otherSprite).value += -3
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
function spawnEnemy () {
    inimigo = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . b . . b . . . . . . 
        . b . . b b b b b b b b . . b . 
        . b b b b b 4 b b 4 b b b b b . 
        . b b b b b b b b b b b b b b . 
        . b . . b b 4 4 4 4 b b . . b . 
        . . . . . 4 b b b b 4 . . . . . 
        . . . . . . b b b b . . . . . . 
        . . . . . . . b b . . . . . . . 
        . . . . . . . b b . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    posAleatoria = randint(0, scene.screenWidth())
    statusbar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    statusbar.max = 1
    statusbar.value = 1
    statusbar.attachToSprite(inimigo, 5, 0)
    inimigo.setPosition(posAleatoria, 10)
    inimigo.setVelocity(0, 40)
    inimigo.setFlag(SpriteFlag.AutoDestroy, true)
}
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.tiro, SpriteKind.EnemyAttack, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    sprites.destroy(otherSprite, effects.fire, 500)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    takeDamage(1)
})
let statusbar: StatusBarSprite = null
let posAleatoria = 0
let tiroini2: Sprite = null
let statusbaren2: StatusBarSprite = null
let posAleatoria2 = 0
let Inimigo2: Sprite = null
let ammo: Sprite = null
let tiro2: Sprite = null
let inimigo: Sprite = null
let meuTiro: Sprite = null
let Gasolina: Sprite = null
let meuTiroEspecial: Sprite = null
let level = 0
let gasolineAmount: StatusBarSprite = null
let ammoAmount: StatusBarSprite = null
let myShip: Sprite = null
game.showLongText("\"Aperte Espaço para atirar e use as setas para se mover\"", DialogLayout.Bottom)
game.showLongText("\"Desvie dos projeteis e naves inimigas, você também pode destruir eles com seus foguetes\"", DialogLayout.Bottom)
myShip = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . 1 1 . . . . . . . 
    . . . . . . . 1 1 . . . . . . . 
    . . . . . . 1 1 1 1 . . . . . . 
    . . . . . . 1 1 1 1 . . . . . . 
    . . . . . 1 b 1 1 b 1 . . . . . 
    . . . 1 . 1 1 1 1 1 1 . 1 . . . 
    . . 1 1 . 1 b 1 1 b 1 . 1 1 . . 
    . . 1 1 1 1 1 b b 1 1 1 1 1 . . 
    . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
    . . . . . . 1 . . 1 . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
myShip.setStayInScreen(true)
controller.moveSprite(myShip)
ammoAmount = statusbars.create(20, 4, StatusBarKind.Magic)
ammoAmount.attachToSprite(myShip, 1, 0)
ammoAmount.value = 0
ammoAmount.max = 5
gasolineAmount = statusbars.create(20, 4, StatusBarKind.Energy)
gasolineAmount.attachToSprite(myShip, -18, 0)
gasolineAmount.value = 1
gasolineAmount.max = 1
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
effects.starField.startScreenEffect()
info.setScore(0)
info.setLife(3)
level = 1
music.play(music.createSong(hex`0078000408080106001c00010a006400f401640000040000000000000000000000000000000002d80000000400012a04000800012a08000c00012510001400012a18001c00012a20002400012224002800012228002c00012530003400012938003c00012940004400012a44004800012a48004c00012250005400012260006400012268006c00012570007400012974007800012a80008400012a84008800012a88008c00012590009400012a98009c00012aa000a4000122a400a8000122a800ac000125b000b4000129b800bc000129c000c400012ac400c800012ac800cc000122d000d4000122e000e4000122e800ec000125f000f4000129f400f800012a`), music.PlaybackMode.LoopingInBackground)
game.onUpdateInterval(2000, function () {
    spawnEntities()
    handleActions()
})
forever(function () {
    pause(500)
    gasolineAmount.value += -0.05
})
