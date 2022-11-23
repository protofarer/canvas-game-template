import Entity from './ents/Entity'
import { moveEdgeWrap } from './behaviors/movements'
import Traits from './ents/Traits'
import Apple from './ents/immobs/Apple'

/** Runs world events and spawning behaviors
 * @class
 * @property {boolean} isSpawning - flag used for timing spawn functions
 */
export default class World {
  constructor(game) {
    this.game = game
    this.ctx = this.game.ctx
    this.canvas = this.game.canvas
    this.isSpawning = false
  }

  /** Controlled ent placement in world. 
   *  - automatically positions ents for testing.
   *  - immobilizes ent
   * @function
   */
  addEnt(entWord, position=null) {
    const entClass = this.getEntClass(entWord)
    const ent = new entClass(
      this.ctx, 
      {
        x: position?.x || this.game.canvas.width * 0.5,
        y: position?.y || this.game.canvas.height * 0.85,
      }, 
      this.game
    )
    ent.parent = this.game
    
    if (!position) {
      const xInterval = this.game.canvas.width * 0.10
      const yInterval = this.game.canvas.height * 0.10
      ent.position.y -= (yInterval * (ent.id - Traits.Snek.baseSegmentCount))

      if (ent.position.y < 0) {
        let n = Math.floor(Math.abs(ent.position.y) 
          / this.game.canvas.height) + 1
        ent.position.y += n * this.game.canvas.height
        ent.position.x += n * xInterval
      }
    }

    ent.isMobile = false
    ent.setHitAreas()   // for good measure
    return ent
  }

  removeEnt(id) {
    // ! Placeholder until ent recycling in working order
    Entity.stack.delete(id)
  }

  /** Randomized ent placement in world
   * @method
   */
  spawnEnts(entWord, n=1, position=null) {
    const ents = []
    const entClass = this.getEntClass(entWord)
    for(let i = 0; i < n; i++) {
      const ent = new entClass(
        this.ctx, 
        position || 
        {
          x:Math.random()*this.canvas.width - 1,
          y:Math.random()*this.canvas.height - 1,
        }, 
        this.game
      )

      if (ent.entGroup === 'mob') {
        ent.headingDegrees = Math.random() * 360
      }
      ents.push(ent)
    }
    
    return ents
  }

  /** Base world spawning function
   *  @method
   */
  async randomSpawns() {
    if (
      this.game.clock.getElapsedSeconds() % 5 === 0 
        && this.game.clock.getElapsedSeconds() !== 0 && this.isSpawning === false
    ) {
      this.isSpawning = true
      // eslint-disable-next-line no-unused-vars
      // await new Promise (_ => { setTimeout(_ => this.isSpawning = false, 1000) })
      
      // const rng = Math.random()
      // if (rng < 0.3) {
      //   this.game.spawnEnts('apple')
      // } else if (rng < 0.6) {
      //   this.game.spawnEnts('ant')
      // } else if (rng < 0.65 ) {
      //   this.game.spawnEnts('centipede')
      // } else if (rng < 0.7) {
      //   this.game.spawnEnts('pebble')
      // }
    }
  }

  render() {
    for(const ent of Entity.stack.values()) {
      ent.isVisible && ent.render()
    }
  }

  countEntBySpecies(species) {
    return Entity.bySpecies({ species }).size
  }


  update(t) {
    for(const ent of Entity.stack.values()) {

      // Generally, immobs don't have an update function since they are *acted
      // upon* or manipulated by other ents
      ent.update?.(t)

      // **********************************************************************
      // * Hit Detection
      // * - only when parent = game
      // **********************************************************************

      if (ent.parent === this.game) {
        if (ent.entGroup === 'mob') {
          moveEdgeWrap.call(ent)
        }

        // ent collides with something
        // if (this.snek && this.snek.swallowables.includes(ent.species)) {
        //   this.collisionResolver(
        //     () => {
        //       Collisions.chomp(this.snek, ent)
        //       this.game.randomSounds.playRandomSwallowSound()
        //       this.game.stateMachine.current.score++
        //     },
        //     this.snek, 
        //     ent,
        //   )
        // }
      }
    }
    // catch all gameover
    if (false) {
      this.game.stateMachine.change('gameOver', {
        data: 'here'
      })
    }
  }

  /** Determine whether ent mouth is contacting another ent's body 
   * @function
   * @param {Entity} agg aka aggressor - entity with an initiating action, 
   *    e.g. chomp or carry
   * @param {Entity} def aka defender - entity being initiated upon
   * @param {function} collider - resolves collision
  */
  collisionResolver(resolver, agg, def, collisionDetector=this.pointCollisionDetector.bind(this)) {
    const isContacting = collisionDetector(agg, def)
    isContacting && resolver(agg, def)
    return isContacting
  }

  AABBCollisionDetector(rect1, rect2) {
    return !(
      rect2.left > rect1.right
      || rect2.right < rect1.left
      || rect2.bottom < rect1.top 
      || rect2.top > rect1.bottom
    )
  }

  /**
   * @param {*} point - has an x and y property
   * @param {*} hitArea - Path2D object that is the area
   * @returns 
   */
  pointCollisionDetector(point, hitArea) {
    return this.game.ctx.isPointInPath(
      hitArea,
      point.x,
      point.y
    )
  }

  /**
   * @param {string} entWord - string that maps to a class
   * @returns reference to the class
   */
  getEntClass(entWord) {
    switch (entWord) {
      case 'apple':
        return Apple
      default:
        throw Error(`Invalid class string: ${entWord}`)
    }
  }
}
