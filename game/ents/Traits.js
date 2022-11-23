import Constants from '../Constants'

export default {
  Immob: {
    r: 1,
    hitOffset: 7,
    position: {
      x: 25,
      y: 25
    },
    scale: {
      x: 1,
      y: 1
    },
    headingDegrees: 0,
    digestion: {
      baseTime: 3000,
      timeLeft: 3000
    },
    underDigestionData: null,
    baseExp: 0,
    primaryColor: {
      hueStart: 125,
      hueEnd: 125 ,
      satStart: 70, 
      satEnd: 30,
      lumStart: 50, 
      lumEnd: 25,
    },
    secondaryColor: ''
  },

  // Apple: {
  //   r: 6,
  //   baseExp: 10,
  //   primaryColor: {
  //     hueStart: 0, 
  //     hueEnd: 25, 
  //     satStart: 70,
  //     satEnd: 30,
  //     lumStart: 50,
  //     lumEnd: 25,
  //   },
  //   secondaryColor: 'hsl(95, 60%, 50%)',
  //   chompEffectWord: Constants.collisionFunction.BASE_CHOMP,
  //   digestion: {
  //     timeLeft: 5000,
  //     baseTime: 5000
  //   },
  //   postDigestionData: [
  //     {
  //       effect: 'moveSpeed',
  //       type: 'offset',
  //       moveSpeed: 0.25,
  //       duration: 8000,
  //       timeLeft: 8000
  //     }
  //   ],
  // },

  Mob: {
    headingDegrees: -90,
    primaryColor: 'blue',
    secondaryColor: '',
    chompEffectWord: Constants.collisionFunction.BASE_CHOMP,
    baseMoveSpeed: 1,
    minMoveSpeed: 0.3,
    turnRateOffset: 5,
    minTurnRate: 0,
  },

  // Ant: {
  //   r: 4,
  //   baseExp: 10,
  //   primaryColor: {
  //     hueStart: 0,
  //     hueEnd: 0,
  //     satStart: 0,
  //     satEnd: 0,
  //     lumStart: 0,
  //     lumEnd: 0,
  //     alphaStart: 1,
  //     alphaEnd: 0.2
  //   },
  //   baseMoveSpeed: 2,
  //   turnRateOffset: 5,
  //   swallowables: [
  //     'apple', 
  //     'mango', 
  //     'banana'
  //   ],
  // },

  // Snek: {
  //   r: 10,
  //   hitOffset: 4,
  //   baseExp: 10,
  //   level: 3,
  //   levelMultiplier: 2,
  //   segLevelMultiplier: 1.25,
  //   baseSegmentCount: 3,
  //   basePrimaryColor: `hsl(100, 100%, 32%)`,
  //   colorTongue: 'red',
  //   colorEyeWhites: 'white',
  //   colorFangs: 'white',
  //   colorLeftEye: 'hsl(55, 100%, 25%)',
  //   colorRightEye: 'hsl(230, 100%, 80%)',
  //   baseMoveSpeed: 2,
  //   turnRateOffset: 4,
  //   swallowables: [ 'apple', 'mango', 'ant', 'pebble', 'banana' ],
  //   enemySpecies: ['centipede'],
  //   effectPanic: {
  //     effect: 'panic',
  //     moveSpeed: 2,
  //     turnRate: 10,
  //     timeLeft: 4000,
  //     duration: 4000
  //   },
  // },
}