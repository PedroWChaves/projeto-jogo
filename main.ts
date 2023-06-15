namespace SpriteKind {
    export const EnemyAttack = SpriteKind.create()
    export const Ammo = SpriteKind.create()
    export const SpecialAttack = SpriteKind.create()
    export const Enemy2 = SpriteKind.create()
    export const Enemy2Attack = SpriteKind.create()
    export const Attack = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const BossAttack = SpriteKind.create()
}
namespace StatusBarKind {
    export const EnemyHealth2 = StatusBarKind.create()
    export const BossHealth = StatusBarKind.create()
}
sprites.onOverlap(SpriteKind.SpecialAttack, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -2
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
function spawnGasoline () {
    gasoline = spawnEntity(sprites.create(img`
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
        `, SpriteKind.Food), 80)
}
sprites.onOverlap(SpriteKind.Attack, SpriteKind.Enemy2Attack, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    sprites.destroy(otherSprite)
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
function SpawnBigboss () {
    if (level < 2) {
        BigBossShip = spawnEntity(sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 2 . . 2 . . . . . . 
            2 . . . 2 2 2 2 2 2 2 2 . . . 2 
            2 2 2 2 2 f 2 2 2 2 f 2 2 2 2 2 
            2 2 2 2 2 2 f 2 2 f 2 2 2 2 2 2 
            2 . 2 2 2 2 2 2 2 2 2 2 2 2 . 2 
            . 2 2 2 2 f f 2 2 f f 2 2 2 2 . 
            . 2 2 . 2 2 2 2 2 2 2 2 . 2 2 . 
            2 2 2 2 . . 2 f f 2 . . 2 2 2 2 
            . 2 2 . . 2 f 2 2 f 2 . . 2 2 . 
            . . . . . . 2 2 2 2 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Boss), 40)
        scaling.scaleByPercent(BigBossShip, 100, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        BossHealth = statusbars.create(60, 4, StatusBarKind.BossHealth)
        BossHealth.max = 10
        BossHealth.attachToSprite(BigBossShip, 5, 0)
        BossHealth.value = 10
    }
}
statusbars.onZero(StatusBarKind.BossHealth, function (status) {
    sprites.destroy(status.spriteAttachedTo(), effects.fire, 500)
    game.gameOver(true)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    timer.throttle("action", 500, function () {
        if (ammoAmount.value > 0) {
            statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, myShip).value += -1
            specialShoot = spawnEntity(sprites.create(img`
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
                `, SpriteKind.SpecialAttack), -30)
            specialShoot.setPosition(myShip.x, myShip.y)
            music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.UntilDone)
        }
    })
})
sprites.onOverlap(SpriteKind.Attack, SpriteKind.Boss, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    statusbars.getStatusBarAttachedTo(StatusBarKind.BossHealth, otherSprite).value += -1
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Attack, SpriteKind.EnemyAttack, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    sprites.destroy(otherSprite)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
function spawnEntities () {
    spawnEnemy()
    spawnAmmo()
    spawnGasoline()
    if (level >= 2) {
        spawnEnemy2()
    }
    SpawnBigboss()
}
sprites.onOverlap(SpriteKind.Attack, SpriteKind.BossAttack, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    sprites.destroy(otherSprite)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    timer.throttle("action", 200, function () {
        shoot = spawnEntity(sprites.create(img`
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
            `, SpriteKind.Attack), -50)
        shoot.setPosition(myShip.x, myShip.y)
    })
})
function BossMove () {
    BigBossShip.setVelocity(40, 0)
    BigBossShip.setPosition(85, 30)
    BigBossShip.setBounceOnWall(true)
}
statusbars.onZero(StatusBarKind.EnemyHealth2, function (status) {
    sprites.destroy(status.spriteAttachedTo(), effects.fire, 500)
    info.changeScoreBy(2)
})
function enemyFire () {
    for (let value4 of sprites.allOfKind(SpriteKind.Enemy)) {
        enemyShoot = spawnEntity(sprites.create(img`
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
            `, SpriteKind.EnemyAttack), 70)
        enemyShoot.setPosition(value4.x, value4.y)
    }
}
function spawnAmmo () {
    ammo = spawnEntity(sprites.create(img`
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
        `, SpriteKind.Ammo), 60)
}
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    sprites.destroy(status.spriteAttachedTo(), effects.fire, 500)
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
    if (level >= 2) {
        enemy2Move()
        enemy2Fire()
    }
    if (level < 2) {
        BossMove()
        Bossfire()
        Bossfire22()
    }
}
function spawnEnemy2 () {
    if (randint(0, 10) <= 2) {
        enemy2Ship = spawnEntity(sprites.create(img`
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
            `, SpriteKind.Enemy2), 40)
        enemy2Life = statusbars.create(20, 4, StatusBarKind.EnemyHealth2)
        enemy2Life.value = 3
        enemy2Life.max = 3
        enemy2Life.attachToSprite(enemy2Ship, 5, 0)
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
info.onScore(0, function () {
    pause(5000)
    SpawnBigboss()
})
sprites.onOverlap(SpriteKind.Attack, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -1
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
info.onScore(36, function () {
    level += 1
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.UntilDone)
})
function enemy2Fire () {
    for (let value2 of sprites.allOfKind(SpriteKind.Enemy2)) {
        enemy2Shoot = spawnEntity(sprites.create(img`
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
            `, SpriteKind.Enemy2Attack), 70)
        enemy2Shoot.setPosition(value2.x, value2.y)
    }
}
function Bossfire () {
    BossShoot = spawnEntity(sprites.create(img`
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
        `, SpriteKind.BossAttack), 70)
    BossShoot.setPosition(BigBossShip.right, BigBossShip.bottom)
}
sprites.onOverlap(SpriteKind.SpecialAttack, SpriteKind.EnemyAttack, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy2, function (sprite, otherSprite) {
    takeDamage(2)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy2Attack, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    takeDamage(2)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.BossAttack, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    takeDamage(2)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyAttack, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    takeDamage(1)
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
        statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, sprite).value += 0.2
    }
    music.play(music.melodyPlayable(music.sonar), music.PlaybackMode.UntilDone)
})
info.onScore(20, function () {
    level += 1
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.UntilDone)
})
info.onScore(35, function () {
    level += 1
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.UntilDone)
})
function Bossfire22 () {
    BossShoot = spawnEntity(sprites.create(img`
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
        `, SpriteKind.BossAttack), 70)
    BossShoot.setPosition(BigBossShip.left, BigBossShip.bottom)
}
sprites.onOverlap(SpriteKind.SpecialAttack, SpriteKind.Enemy2, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth2, otherSprite).value += -3
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
function spawnEnemy () {
    enemyShip = spawnEntity(sprites.create(img`
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
        `, SpriteKind.Enemy), 40)
    enemyLife = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    enemyLife.max = 2
    enemyLife.value = 2
    enemyLife.attachToSprite(enemyShip, 5, 0)
}
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.gameOver(false)
})
function spawnEntity (sprite: Sprite, speed: number) {
    entity = sprite
    entity.setPosition(randint(0, scene.screenWidth()), 10)
    entity.setVelocity(0, speed)
    entity.setFlag(SpriteFlag.AutoDestroy, true)
    return entity
}
sprites.onOverlap(SpriteKind.SpecialAttack, SpriteKind.Enemy2Attack, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Attack, SpriteKind.Enemy2, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth2, otherSprite).value += -1
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    takeDamage(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    takeDamage(3)
})
let entity: Sprite = null
let enemyLife: StatusBarSprite = null
let enemyShip: Sprite = null
let BossShoot: Sprite = null
let enemy2Shoot: Sprite = null
let enemy2Life: StatusBarSprite = null
let enemy2Ship: Sprite = null
let ammo: Sprite = null
let enemyShoot: Sprite = null
let shoot: Sprite = null
let specialShoot: Sprite = null
let BossHealth: StatusBarSprite = null
let BigBossShip: Sprite = null
let gasoline: Sprite = null
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
game.setGameOverScoringType(game.ScoringType.HighScore)
game.onUpdateInterval(2000, function () {
    spawnEntities()
    handleActions()
})
game.onUpdateInterval(1000, function () {
    gasolineAmount.value += -0.05
})
