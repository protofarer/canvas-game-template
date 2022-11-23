import Constants from '../Constants'

// chomp works for both segged and segless ents
export default class Collisions {

  // basic collision where an effect is imbued on aggressor
  static [Constants.collisionFunction.HIT] (agg, def) {
    def.hitArea = new Path2D()
    // get the effect from defender and apply it to agg (entAffected)
    const hitEffect = Collisions[def.hitEffectWord]
    hitEffect?.call(def, agg)
  }

  // Apply an effect to some ent, eg absorb/apply experience
  static [Constants.collisionFunction.AFFECT](entAffected) {
    // do something to entAffected
  }
  
  // basic collision that triggers the "harm" behavior on both agg and def
  static harm(agg, def) {
    def.harmed?.()
    agg.canHarm = false
    setTimeout(() => agg.canHarm = true, Constants.HARM_COOLDOWN)
  }
}