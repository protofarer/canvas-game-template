import Constants from '../Constants'
import Scenarios from '../debug/Scenarios'

export default class LevelMaker {
  constructor(game) {
    this.game = game
    this.spawnEnts = this.game.world.spawnEnts.bind(this.game.world)
    this.addEnt = this.game.world.addEnt.bind(this.game.world)
  }

  spawn(level) {
    switch (level) {
      case 0:   // debug level
        // this.spawnLevelZero(snek)
        this.initSpawnSurvival()
        break
      case 1:
        this.spawnLevelOne()
        break
      case 's':
        this.initSpawnSurvival()
        break
    }
  }

  spawnRandomPositions(ents) {
    for (let [entWord, n] of Object.entries(ents)) {
      this.spawnEnts(entWord, n)
    }
  }

  // debug level
  spawnLevelZero() {
    this.case = new Scenarios(this.game)
    this.case.base()
    // this.addEnt('apple')
    // this.addEnt('apple')
    // this.addEnt('apple')
    // this.addEnt('centipede').setMobile(true)
  }

  // first normal level
  spawnLevelOne() {
    this.spawnRandomPositions({
      apple: 10,
      // pebble: 5,
      // mango: 3,
      // banana: 1,
      // ant: 2,
      // centipede: 1
    })

    // this.spawnEnts(Apple, 15)
    // this.spawnEnts(Pebble, 25)
    // this.spawnEnts(Mango, 3)
    // this.spawnEnts(Ant, 2)
    // this.spawnEnts(Centipede, 1)
  }

  /** Initial spawn for survival mode
   * @method
   */
  initSpawnSurvival() {
    // this.spawnEnts('someEnt', 1)
  }

  /** Ongoing spawn behavior for survival mode
   * @method
   */
  spawnSurvival(startT) {
    // let isAppleSpawning = false
    // let isMangoSpawning = false
    // let isBananaSpawning = false
    // let hasCentipedeSpawned = false
    // let hasSecondCentipedeSpawned = false
    // let isAntSpawning = false
    // let isAntSwarmSpawning = false
    // return (t) => {
    //   if (!isAppleSpawning) {
    //     isAppleSpawning = true
    //     setTimeout(() => { 
    //       this.game.world.spawnEnts('apple')
    //       isAppleSpawning = false
    //     }, Constants.spawnTimers.apple)
    //   }
    //   if (!isMangoSpawning) {
    //     isMangoSpawning = true
    //     setTimeout(() => { 
    //       this.game.world.spawnEnts('mango')
    //       isMangoSpawning = false
    //     }, Constants.spawnTimers.mango)
    //   }
    //   if (!isBananaSpawning) {
    //     isBananaSpawning = true
    //     setTimeout(() => { 
    //       this.game.world.spawnEnts('banana')
    //       isBananaSpawning = false
    //     }, Constants.spawnTimers.banana)
    //   }
    //   if (this.game.world.countSweets() > 4 && !isAntSpawning) {
    //     this.game.world.spawnEnts('ant')
    //     isAntSpawning = true
    //     setTimeout(() => {
    //       isAntSpawning = false
    //     }, Constants.spawnTimers.ant)
    //   }

    //   if (this.game.world.countSweets() > 15 && !isAntSwarmSpawning) {
    //     isAntSwarmSpawning = true
    //     this.game.world.spawnEnts('ant', 5)
    //     for (let i = 1; i < 6; ++i) {
    //       setTimeout(() => this.game.world.spawnEnts('ant', 3), i*1000)
    //     }
    //     // setTimeout(() => {
    //       // isAntSwarmSpawning = false
    //     // }, Constants.spawnTimers.antSwarm)
    //   }

    //   if (!hasCentipedeSpawned && t - startT >= 60000) {
    //     this.game.world.spawnEnts('centipede')
    //     hasCentipedeSpawned = true
    //   }

    //   if (!hasSecondCentipedeSpawned && this.game.world.snek.segments.length >= Constants.spawnConditionals.secondCentipede.segcount) {
    //     this.game.world.spawnEnts('centipede')
    //     hasSecondCentipedeSpawned = true
    //   }
  }
}