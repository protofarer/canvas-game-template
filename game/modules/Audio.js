/**
 * @description - Load audio assets
 * @returns 
 */
export default function Audio() {
  // eslint-disable-next-line no-unused-vars
  let assetsLoaded = 0

  // Arrayed collection of sounds for randomized selection for play
  //    or ordered, deliberate access (king)
  let sounds = {
    soundType: [],
  }

  // **********************************************************************
  // * Get object from html and insert into "sounds" to be loaded
  // **********************************************************************
  // const swallowC2 = document.querySelector('#swallowC2')
  // sounds.swallow.push(swallowC2)

  for (let soundsOfType of Object.values(sounds)) {
    soundsOfType.forEach(s => {
      s.addEventListener(
        'canplaythrough', 
        soundLoadHandler, 
        { capture: false, once: true }
      )
      s.load()
    })
  }

  // ! understand canplaythrough event
  // ! why removeEventListener?
  function soundLoadHandler() {
    assetsLoaded++
    // for (let soundsOfType of Object.values(sounds)) {
    //   soundsOfType.forEach(s => {
    //     s.removeEventListener('canplaythrough', soundLoadHandler, false)
    //   })
    // }
  }
    
  // const playRandomMusic = playRandomSoundType(sounds.music)
  // let randomMusic = playRandomMusic()
  // randomMusic.volume = 0.1

  // Manual loading for single sounds
  // const melody1 = document.querySelector('#melody1')
  // sounds.melody1 = melody1
  // melody1.load()

  // **********************************************************************
  // ********************   Sound Play Factories
  // **********************************************************************

  // const playRandomDeathSound = playRandomSoundType(sounds.death)

  const playRandomSwallowSound = () => {
    const playSwallowSound = playRandomSoundType(sounds.swallow)
    playSwallowSound()

    // let deathSound
    // swallowSound.addEventListener('ended', () => {
    //   if (species === 'ant') {
    //     // ant being swallowed sound
    //     sounds.king[1].currentTime = 0
    //     sounds.king[1].play()
    //     deathSound = sounds.king[1]
    //   } else {
    //     deathSound = playRandomDeathSound()
    //   }
    // }, { once: true })
    // return deathSound
  }

  function playRandomSoundType(sounds) {
    return () => {
      const sound = sounds[Math.floor(Math.random() * sounds.length)]
      sound.currentTime = 0
      sound.play()
      return sound
    }
  }
  
  return { 
    sounds, 
    // random: {
    //   playRandomSwallowSound,
    // }
  }
}


