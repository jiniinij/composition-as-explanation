import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { PositionalAudioHelper } from 'three/addons/helpers/PositionalAudioHelper.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'

let model1, model2, model3, model4, model5, model6, model7

/**
 * Base
 */
// Debug
// const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xa0a0a0 )
// scene.fog = new THREE.Fog( 0xa0a0a0, 2, 10000)

/**
 * Update all materials
 */

const updateAdateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child.isMesh && child.material.isMeshStandardMaterial)
        {
            child.material.envMapIntensity = 30
        }
    })
}

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load
(
    'textures/matcaps/3.png',
)
matcapTexture.colorSpace = THREE.SRGBColorSpace

// // Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let mixer = null

/**
 * Model
 */
gltfLoader.load(
    '/models/cube1/20240121.glb',            
    (gltf) =>
    {
        model1 = gltf.scene
        model1.scale.set(0.5, 0.5, 0.5)
        model1.position.set(0, 0, -15)
        scene.add(model1)
    })
gltfLoader.load(
    '/models/cube2/20240121.glb',            
    (gltf) =>
    {
        model2 = gltf.scene
        model2.scale.set(0.5, 0.5, 0.5)
        model2.position.set(15, 0, -15)
        scene.add(model2)

    })
gltfLoader.load(
    '/models/cube3/20240121.glb',            
    (gltf) =>
    {
        model3 = gltf.scene
        scene.add(model3)
        model3.scale.set(0.5, 0.5, 0.5)
        model3.position.set(-20, 0, 0)
    })
gltfLoader.load(
    '/models/cube4/20240121.glb',            
    (gltf) =>
    {
        model4 = gltf.scene
        scene.add(model4)
        model4.scale.set(0.5, 0.5, 0.5)
        model4.position.set(-5, 0, 0)
    })
gltfLoader.load(
    '/models/cube5/20240121.glb',            
    (gltf) =>
    {
        model5 = gltf.scene
        scene.add(model5)
        model5.scale.set(0.5, 0.5, 0.5)
        model5.position.set(10, 0, 0)
    })
gltfLoader.load(
    '/models/cube6/20240121.glb',            
    (gltf) =>
    {
        model6 = gltf.scene
        scene.add(model6)
        model6.scale.set(0.5, 0.5, 0.5)
        model6.position.set(0, 0, 15)
    })
gltfLoader.load(
    '/models/cube7/20240121.glb',            
    (gltf) =>
    {
        model7 = gltf.scene
        scene.add(model7)
        model7.scale.set(0.5, 0.5, 0.5)
        model7.position.set(15, 0, 15)
    })

/**
 * Fonts
 */
const fontLoader = new FontLoader()
let longText = `
                          WORKSSHOP : COMPOSITION AS EXPLANATION
    ORGANISED BY INSA DEISTJOERDIS / LYN BEHNCKENIN IN NOTES IN STUDIO
            CHRISTOPH KNOTH / KONRAD RENNER IN DIGITALE GRAFIK KLASSE
                     PERFORMANCE TEAM BY AKSELI MANNER / KIM KLEINERT
          FERNANDA BRAUN SANTOS / TIGRAN SSAKYN / KRISTINA SCHUSTER  
                                      LIUDMILA SAVALYEVA / YEJI CHEON
            DOCUMENT TEAM BY DONGSEOK LEE / SEOIN SONG / SO JIN PARK
                                          PHOTOGRAPHY BY SO JIN PARK  
    ` 
let longTextBottom = `
                                                                <Text>
                       No Problem: Design School as Promise by Silvio Lorusso 
                                        Chimeric Worlding by Tiger Dingsun 
                             Research and Destroy by Daniel van der Velden 
   This is not a manifesto by towards an anarcho-design practice by Jared Davidson 
                             Curating as graphic design by Sara de Bondt 
    ` 
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        // Material
        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

        // Text
        const textGeometry = new TextGeometry(
            longText,
            {
                font: font,
                size: 5,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.005,
                bevelOffset: 0,
                bevelSegments: 9
            }
        )
        //textGeometry.center()

        const text = new THREE.Mesh(textGeometry, material)
        text.position.y = 20
        text.position.x = -125
        text.position.z = -50
        text.rotation.x = Math.PI * 1.5
        scene.add(text)
        
        const textBottomGeometry = new TextGeometry(
            longTextBottom,
            {
                font: font,
                size: 2.5,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.005,
                bevelOffset: 0,
                bevelSegments: 9
            }
        )
        //textGeometry.center()

        const textBottom = new THREE.Mesh(textBottomGeometry, material)
        textBottom.position.y = 20
        textBottom.position.x = -60
        textBottom.position.z = 30
        textBottom.rotation.x = Math.PI * 1.5
        scene.add(textBottom)

        const textSmall1Geometry = new TextGeometry(
             `
            







                                                                                                                                                                                                                                                        (PER)                                                        (10.110.0.1)
            `, 
       
            {
                font: font,
                size: 1.82,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.005,
                bevelOffset: 0,
                bevelSegments: 9
            }
        )

        const textSmall1 = new THREE.Mesh(textSmall1Geometry, material)
        textSmall1.position.y = 20
        textSmall1.position.x = -125
        textSmall1.position.z = -49.7
        textSmall1.rotation.x = Math.PI * 1.5
        scene.add(textSmall1)

        const textSmall2Geometry = new TextGeometry(
            `
            







           
                                                                                                                                                                                
                                                                                                                                                                                
                                                                                                                                                                                (DIV)                                                                       (GLEAN)                                                                                     (VIKA)
    
           `, 
      
           {
               font: font,
               size: 1.82,
               height: 0.1,
               curveSegments: 12,
               bevelEnabled: true,
               bevelThickness: 0.01,
               bevelSize: 0.005,
               bevelOffset: 0,
               bevelSegments: 9
           }
       )

       const textSmall2 = new THREE.Mesh(textSmall2Geometry, material)
       textSmall2.position.y = 20
       textSmall2.position.x = -125
       textSmall2.position.z = -50.4
       textSmall2.rotation.x = Math.PI * 1.5
       scene.add(textSmall2)

       const textSmall3Geometry = new TextGeometry(
        `
        







       
                                                                                      
        


                                                                                                                                                                              
                                                                                                                                                                                                                                                               (NAKED GILL)                                                           (MIU) 

       `, 
  
       {
           font: font,
           size: 1.82,
           height: 0.1,
           curveSegments: 12,
           bevelEnabled: true,
           bevelThickness: 0.01,
           bevelSize: 0.005,
           bevelOffset: 0,
           bevelSegments: 9
       }
   )

    const textSmall3 = new THREE.Mesh(textSmall3Geometry, material)
    textSmall3.position.y = 20
    textSmall3.position.x = -125
    textSmall3.position.z = -51.1
    textSmall3.rotation.x = Math.PI * 1.5
    scene.add(textSmall3)
})

let textLink

const loader = new FontLoader()
loader.load('/fonts/helvetiker_regular.typeface.json', function (font) {
    const textLinkGeometry = new TextGeometry(
    `
    
    
    
    
    
    
            https://notes-on.studio/workshop#page://HlWfcKxQ4sNBsHR0`
    ,

    {
        font: font,
        size: 2.5,
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.005,
        bevelOffset: 0,
        bevelSegments: 9
    }
)


// Material
const textLinkMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

const textLink = new THREE.Mesh(textLinkGeometry, textLinkMaterial)
textLink.position.y = 20
textLink.position.x = -60
textLink.position.z = 30
textLink.rotation.x = Math.PI * 1.5
scene.add(textLink)

// textLink.userData.link = 'https://notes-on.studio/workshop#page://HlWfcKxQ4sNBsHR0'

// textLink.on('click', function () {
//     window.open(textLink.userData.link, '_blank')
//     })
})

//   window.addEventListener('click', function() {
//     this.window.open(textLink.userData.link, '_black')
//   })
  window.addEventListener('click', onMouseClick);

  function onMouseClick(event) {
      // Calculate mouse position in normalized device coordinates (-1 to +1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
      // Set the raycaster to shoot rays from the camera to where the mouse is
      raycaster.setFromCamera(mouse, camera);
  
      // Check for intersections between the ray and the 3D text
      const intersects = raycaster.intersectObject(textLink);
  
      // If there is an intersection, open the hyperlink
      if (intersects.length > 0) {
          const hyperlink = 'https://notes-on.studio/workshop#page://HlWfcKxQ4sNBsHR0'; // Replace with your actual hyperlink
          window.open(hyperlink, '_blank'); // Open the link in a new tab
      }
  }

/**
 * Object
 */
 
//Object form
const objectGeometry = new THREE.BoxGeometry(8.99,5.001,4.99)
       
//Material
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
       
       const object1 = new THREE.Mesh(objectGeometry, material)
       object1.position.set(0, 0, -15)

       const object2 = new THREE.Mesh(objectGeometry, material)
       object2.position.set(15, 0, -15)

       const object3 = new THREE.Mesh(objectGeometry, material)
       object3.position.set(-20, 0, 0)

       const object4 = new THREE.Mesh(objectGeometry, material)
       object4.position.set(-5, 0, 0)

       const object5 = new THREE.Mesh(objectGeometry, material)
       object5.position.set(10, 0, 0)

       const object6 = new THREE.Mesh(objectGeometry, material)
       object6.position.set(0, 0, 15)

       const object7 = new THREE.Mesh(objectGeometry, material)
       object7.position.set(15, 0, 15)

    scene.add(object1, object2, object3, object4, object5, object6, object7)
    objectGeometry.center()

/**
 * Object add for sound
 */
 
//Object form
const objectforsoundGeometry = new THREE.BoxGeometry(8, 4, 4)
       
//Material
const materialforsound = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

       const object11 = new THREE.Mesh(objectforsoundGeometry, materialforsound)
       object11.position.set(0, 0, -15)
       object11.visible = false

       const object22 = new THREE.Mesh(objectforsoundGeometry, materialforsound)
       object22.position.set(15, 0, -15)
       object22.visible = false

       const object33 = new THREE.Mesh(objectforsoundGeometry, materialforsound)
       object33.position.set(-20, 0, 0)
       object33.visible = false

    scene.add(object11, object22, object33)

/**
 * Object's text
 */
 
//Object's text form
const objectTextGeometry = new THREE.BoxGeometry(0.5,0.01,3)
       
       const objectText1 = new THREE.Mesh(objectTextGeometry, material)
       objectText1.position.x = -3
       objectText1.position.y = 2.495

       const objectText2 = new THREE.Mesh(objectTextGeometry, material)
       objectText2.position.x = -2
       objectText2.position.y = 2.495

       const objectText3 = new THREE.Mesh(objectTextGeometry, material)
       objectText3.position.x = -1
       objectText3.position.y = 2.495

       const objectText4 = new THREE.Mesh(objectTextGeometry, material)
       objectText4.position.x = 0
       objectText4.position.y = 2.495

       const objectText5 = new THREE.Mesh(objectTextGeometry, material)
       objectText5.position.x = 1
       objectText5.position.y = 2.495

       const objectText6 = new THREE.Mesh(objectTextGeometry, material)
       objectText6.position.x = 2
       objectText6.position.y = 2.495

       const objectText7 = new THREE.Mesh(objectTextGeometry, material)
       objectText7.position.x = 3
       objectText7.position.y = 2.495

    scene.add(objectText1, objectText2, objectText3, objectText4, objectText5, objectText6, objectText7)

//Floor
const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 500, 500 ), new THREE.MeshPhongMaterial( { color: 0xe9e2e2, depthWrite: false } ) )
    mesh.rotation.x = - Math.PI / 2
    mesh.position.y = -2.5
    mesh.receiveShadow = true
    scene.add( mesh )

//Grid
const grid = new THREE.GridHelper( 300, 500, 0xc1c1c1, 0xc1c1c1 )
    grid.position.y = 20
    scene.add( grid )

/**
 * Raycaster 
 */
const raycaster = new THREE.Raycaster()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Mouse
 */
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1


})

window.addEventListener('click', () =>
{
    if(currentIntersect)
    {
        switch(currentIntersect.object)
        {
            case object1:
                console.log('click on object 1')
                break

            case object2:
                console.log('click on object 2')
                break

            case object3:
                console.log('click on object 3')
                break
        }
    }
})

/**
 * Camera
 */
// Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.OrthographicCamera(- 14 * aspectRatio, 14 * aspectRatio, 14, - 14, 0.1, 1000)
camera.position.x = 1
camera.position.y = 0
camera.position.z = -100
scene.add(camera)
// camera.add(listener)

/**
 * Audio
 */
const listener = new THREE.AudioListener()
camera.add( listener )

// Hover to play
const sound7 = new THREE.PositionalAudio( listener )

const audioLoader7 = new THREE.AudioLoader()
   audioLoader7.load( '/audio/character/Yeji.mp3', function( buffer ) {
    sound7.setBuffer( buffer )
    sound7.getLoop(true)
    // https://github.com/mrdoob/three.js/pull/19079/commits/9cd0648c690684c042c4ebb0dda66b59dc0a559a
    sound7.setVolume(30)
    sound7.setRefDistance( 0.5 )
    sound7.setDirectionalCone(90, 300, 0)
    sound7.position.set(0,2.5,0)
    sound7.rotation.x = - Math.PI / 2
    // sound7.play()

    // const helper = new PositionalAudioHelper(sound7, 10)
    // sound7.add(helper)
})

object7.add(sound7)

const sound6 = new THREE.PositionalAudio( listener )

const audioLoader6 = new THREE.AudioLoader()
   audioLoader6.load( '/audio/character/Tigran.mp3', function( buffer ) {
    sound6.setBuffer( buffer )
    sound6.getLoop(true)
    sound6.setVolume(70)
    sound6.setRefDistance( 0.3 )
    sound6.setDirectionalCone(90, 200, 0)
    sound6.position.set(0,2.5,0)
    sound6.rotation.x = - Math.PI / 2
    // sound6.play()

    // const helper = new PositionalAudioHelper(sound6, 10)
    // sound6.add(helper)
})

object6.add(sound6)

const sound5 = new THREE.PositionalAudio( listener )

const audioLoader5 = new THREE.AudioLoader()
   audioLoader5.load( '/audio/character/naked gil.mp3', function( buffer ) {
    sound5.setBuffer( buffer )
    sound5.getLoop(true)
    sound5.setVolume(30)
    sound5.setRefDistance( 0.5 )
    sound5.setDirectionalCone(90, 300, 0)
    sound5.position.set(0,2.5,0)
    sound5.rotation.x = - Math.PI / 2
    // sound5.play()

    // const helper = new PositionalAudioHelper(sound5, 10)
    // sound5.add(helper)
})

object5.add(sound5)

const sound4 = new THREE.PositionalAudio( listener )

const audioLoader4 = new THREE.AudioLoader()
   audioLoader4.load( '/audio/character/Kristina.mp3', function( buffer ) {
    sound4.setBuffer( buffer )
    sound4.getLoop(true)
    sound4.setVolume(60)
    sound4.setRefDistance( 0.5 )
    sound4.setDirectionalCone(90, 300, 0)
    sound4.position.set(0,2.5,0)
    sound4.rotation.x = - Math.PI / 2
    // sound4.play()

    // const helper = new PositionalAudioHelper(sound4, 10)
    // sound4.add(helper)
})

object4.add(sound4)

const sound3 = new THREE.PositionalAudio( listener )

const audioLoader3 = new THREE.AudioLoader()
   audioLoader3.load( '/audio/character/Kim.mp3', function( buffer ) {
    sound3.setBuffer( buffer )
    sound3.getLoop(true)
    sound3.setVolume(40)
    sound3.setRefDistance( 0.5 )
    sound3.setDirectionalCone(90, 300, 0)
    sound3.position.set(0,2.5,0)
    sound3.rotation.x = - Math.PI / 2
    // sound3.play()

    // const helper = new PositionalAudioHelper(sound3, 10)
    // sound3.add(helper)
})

object33.add(sound3)

const sound2 = new THREE.PositionalAudio( listener )

const audioLoader2 = new THREE.AudioLoader()
   audioLoader2.load( '/audio/character/Fernanda.mp3', function( buffer ) {
    sound2.setBuffer( buffer )
    sound2.getLoop(true)
    sound2.setVolume(40)
    sound2.setRefDistance( 0.5 )
    sound2.setDirectionalCone(90, 300, 0)
    sound2.position.set(0,2.5,0)
    sound2.rotation.x = - Math.PI / 2
    // sound2.play()

    // const helper = new PositionalAudioHelper(sound2, 10)
    // sound2.add(helper)
})

object22.add(sound2)

const sound1 = new THREE.PositionalAudio( listener )

const audioLoader1 = new THREE.AudioLoader()
   audioLoader1.load( '/audio/character/Akseli.mp3', function( buffer ) {
    sound1.setBuffer( buffer )
    sound1.getLoop(true)
    sound1.setVolume(5)
    sound1.setRefDistance( 0.5 )
    sound1.setDirectionalCone(90, 300, 0)
    sound1.position.set(0,2.5,0)
    sound1.rotation.x = - Math.PI / 2
    // sound1.play()

    // const helper = new PositionalAudioHelper(sound1, 10)
    // sound1.add(helper)
})

object11.add(sound1)

// Click to mute on
const sound01 = new THREE.PositionalAudio( listener )

const audioLoader01 = new THREE.AudioLoader()
audioLoader01.load( '/audio/spots/01.mp3', function( buffer ) {
    sound01.setBuffer( buffer )
    sound01.getLoop(true)
    sound01.setVolume(4)
    sound01.setRefDistance( 0.5 )
    sound01.setDirectionalCone(30, 300, 0)
    sound01.play()

    // const helper = new PositionalAudioHelper(sound01, 10)
    // sound01.add(helper)
})

object11.add(sound01)

const sound02 = new THREE.PositionalAudio( listener )

const audioLoader02 = new THREE.AudioLoader()
audioLoader02.load( '/audio/spots/02.mp3', function( buffer ) {
    sound02.setBuffer( buffer )
    sound02.getLoop(true)
    sound02.setVolume(4)
    sound02.setRefDistance( 0.5 )
    sound02.setDirectionalCone(30, 300, 0)
    sound02.play()

    // const helper = new PositionalAudioHelper(sound02, 10)
    // sound02.add(helper)
})

object22.add(sound02)

const sound03 = new THREE.PositionalAudio( listener )

const audioLoader03 = new THREE.AudioLoader()
audioLoader03.load( '/audio/spots/03.mp3', function( buffer ) {
    sound03.setBuffer( buffer )
    sound03.getLoop(true)
    sound03.setVolume(4)
    sound03.setRefDistance( 0.5 )
    sound03.setDirectionalCone(30, 300, 0)
    sound03.play()

    // const helper = new PositionalAudioHelper(sound03, 10)
    // sound03.add(helper)
})

object3.add(sound03)

const sound04 = new THREE.PositionalAudio( listener )

const audioLoader04 = new THREE.AudioLoader()
audioLoader04.load( '/audio/spots/04.mp3', function( buffer ) {
    sound04.setBuffer( buffer )
    sound04.getLoop(true)
    sound04.setVolume(4)
    sound04.setRefDistance( 0.5 )
    sound04.setDirectionalCone(30, 300, 0)
    sound04.play()

    // const helper = new PositionalAudioHelper(sound04, 10)
    // sound04.add(helper)
})

object4.add(sound04)

const sound05 = new THREE.PositionalAudio( listener )

const audioLoader05 = new THREE.AudioLoader()
audioLoader05.load( '/audio/spots/05.mp3', function( buffer ) {
    sound05.setBuffer( buffer )
    sound05.getLoop(true)
    sound05.setVolume(4)
    sound05.setRefDistance( 0.5 )
    sound05.setDirectionalCone(30, 300, 0)
    sound05.play()

    // const helper = new PositionalAudioHelper(sound05, 10)
    // sound05.add(helper)
})

object5.add(sound05)

const sound06 = new THREE.PositionalAudio( listener )

const audioLoader06 = new THREE.AudioLoader()
audioLoader06.load( '/audio/spots/06.mp3', function( buffer ) {
    sound06.setBuffer( buffer )
    sound06.getLoop(true)
    sound06.setVolume(4)
    sound06.setRefDistance( 0.5 )
    sound06.setDirectionalCone(30, 300, 0)
    sound06.play()

    // const helper = new PositionalAudioHelper(sound06, 10)
    // sound06.add(helper)
})

object6.add(sound06)

const sound07 = new THREE.PositionalAudio( listener )

const audioLoader07 = new THREE.AudioLoader()
audioLoader07.load( '/audio/spots/07.mp3', function( buffer ) {
    sound07.setBuffer( buffer )
    sound07.getLoop(true)
    sound07.setVolume(4)
    sound07.setRefDistance( 0.5 )
    sound07.setDirectionalCone(30, 300, 0)
    sound07.play()

    // const helper = new PositionalAudioHelper(sound07, 10)
    // sound07.add(helper)
})

object7.add(sound07)

function toggleMute(sound01, sound02, sound03, sound04, sound05, sound06, sound07) {
    sound01.setVolume(sound01.getVolume() === 0 ? 4 : 0)
    sound02.setVolume(sound02.getVolume() === 0 ? 4 : 0)
    sound03.setVolume(sound03.getVolume() === 0 ? 4 : 0)
    sound04.setVolume(sound04.getVolume() === 0 ? 4 : 0)
    sound05.setVolume(sound05.getVolume() === 0 ? 4 : 0)
    sound06.setVolume(sound06.getVolume() === 0 ? 4 : 0)
    sound07.setVolume(sound07.getVolume() === 0 ? 4 : 0)
  }

  window.addEventListener('click', function() {
    toggleMute(sound01, sound02, sound03, sound04, sound05, sound06, sound07)
  })

// function toggleMute(clickedSound, allSounds) {
//     allSounds.forEach(sound => {
//         if (sound === clickedSound) {
//             // Toggle the clicked sound's volume (mute/unmute)
//             sound.setVolume(sound.getVolume() === 0 ? 2 : 0);
//         } else {
//             // Unmute other sounds
//             sound.setVolume(2);
//         }
//     });
// }

// var allSounds = [sound01, sound02, sound03, sound04, sound05, sound06, sound07];

// window.addEventListener('click', function() {
//     // Assuming you have a variable representing the clicked sound (replace it accordingly)
//     var clickedSound = sound01;  // Replace this with the actual clicked sound variable

//     toggleMute(clickedSound, allSounds);
// });

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild( renderer.domElement )

// Tone mapping
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 5

// Shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas, 
    // renderer.domElement
    )
controls.enableDamping = true
controls.autoRotate = true
controls.autoRotateSpeed = 0.05
controls.maxPolarAngle = Math.PI / 1
// controls.minDistance = 0.5
// controls.maxDistance =30
controls.minZoom = 0.2
// 0>minzoom
controls.maxZoom = 9
// 0<maxzoom

/**
 * Button
 */
document.querySelector('#frontView').addEventListener('click', () => {
    console.log("frontview")
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = -100
    
    // 위아래 회전 고정 및 팬(Pan) 제한
    controls.minPolarAngle = Math.PI / 2
    controls.maxPolarAngle = Math.PI / 2
    controls.enablePan = false
    
    controls.update()
    controls.minZoom = 0.8
    controls.maxZoom = 5.6
})

document.querySelector('#sideView').addEventListener('click', () => {
    console.log("Side View")
    camera.position.x = 0
    camera.position.y = 20
    camera.position.z = 0
    
    // 카메라 회전 고정 및 팬 제한 풀기
    controls.minPolarAngle = 0
    controls.maxPolarAngle = Math.PI / 1
    controls.enablePan = true
    
    controls.update()
    controls.minZoom = 0.7
    controls.maxZoom = 4
})

document.querySelector('#backView').addEventListener('click', () => {
    console.log("Back View")
    camera.position.x = 0
    camera.position.y = 500
    camera.position.z = 0.01
    
    // 카메라 회전 고정 및 팬 제한 풀기
    controls.minPolarAngle = 0
    controls.maxPolarAngle = Math.PI / 1
    controls.enablePan = true
    
    controls.update()
    controls.minZoom = 0.2
    controls.maxZoom = 4
})

/**
 * Lights
 */
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d, 1 )
hemiLight.position.set( 0, 2000, 0 )
scene.add( hemiLight )

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.01 )
scene.add(ambientLight)

const dirLight = new THREE.DirectionalLight( 0xffffff, 0.01 )
dirLight.position.set( 5, 5, 0 )
scene.add( dirLight )

// Shadows
dirLight.castShadow = true
dirLight.shadow.camera.far = 15
dirLight.shadow.normalBias = 0.027
dirLight.shadow.bias = - 0.004
dirLight.shadow.mapSize.set(512, 512)

// Target
dirLight.target.position.set(0, 4, 0)
dirLight.target.updateWorldMatrix()

/**
 * Animate
 */
const clock = new THREE.Clock()

let currentIntersect = null

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate models
    if (model1)
    {
        model1.position.z = -15 + Math.sin(elapsedTime * 0.13) * 5
        model1.rotation.y = Math.sin(elapsedTime * 0.013) * 5
    }
    if (model2)
    {
        model2.position.z = -15 + Math.sin(elapsedTime * 0.17) * 5
        model2.rotation.y = Math.sin(elapsedTime * 0.0007) * 5
    }
    if (model3)
    {
        model3.position.z = Math.sin(elapsedTime * 0.10) * 5
        model3.rotation.y = Math.sin(elapsedTime * 0.001) * 5
    }
    if (model4)
    {
        model4.position.z = Math.sin(elapsedTime * 0.15) * 5
        model4.rotation.y = Math.sin(elapsedTime * 0.0005) * 5
    }
    if (model5)
    {
        model5.position.z = Math.sin(elapsedTime * 0.14) * 5
        model5.rotation.y = Math.sin(elapsedTime * 0.0004) * 5
    }
    if (model6)
    {
        model6.position.z = 15 + Math.sin(elapsedTime * 0.12) * 5
        model6.rotation.y = Math.sin(elapsedTime * 0.0002) * 5
    }
    if (model7)
    {
        model7.position.z = 15 + Math.sin(elapsedTime * 0.16) * 5
        model7.rotation.y = Math.sin(elapsedTime * 0.0006) * 5
    }


    // Animate objects

    object1.position.z = -15 + Math.sin(elapsedTime * 0.13) * 5
    object1.rotation.y = Math.sin(elapsedTime * 0.013) * 5
    object11.position.z = -15 + Math.sin(elapsedTime * 0.13) * 5
    object11.rotation.y = Math.sin(elapsedTime * 0.013) * 5
    object2.position.z = -15 + Math.sin(elapsedTime * 0.17) * 5
    object2.rotation.y = Math.sin(elapsedTime * 0.0007) * 5
    object22.position.z = -15 + Math.sin(elapsedTime * 0.17) * 5
    object22.rotation.y = Math.sin(elapsedTime * 0.0007) * 5
    object3.position.z = Math.sin(elapsedTime * 0.10) * 5
    object3.rotation.y = Math.sin(elapsedTime * 0.001) * 5
    object33.position.z = Math.sin(elapsedTime * 0.10) * 5
    object33.rotation.y = Math.sin(elapsedTime * 0.001) * 5
    object4.position.z = Math.sin(elapsedTime * 0.15) * 5
    object4.rotation.y = Math.sin(elapsedTime * 0.0005) * 5
    object5.position.z = Math.sin(elapsedTime * 0.14) * 5
    object5.rotation.y = Math.sin(elapsedTime * 0.0004) * 5
    object6.position.z = 15 + Math.sin(elapsedTime * 0.12) * 5
    object6.rotation.y = Math.sin(elapsedTime * 0.0002) * 5
    object7.position.z = 15 + Math.sin(elapsedTime * 0.16) * 5
    object7.rotation.y = Math.sin(elapsedTime * 0.0006) * 5
    
    //Animate object's text
    objectText1.position.z = (object1.position.z) - 1.5
    objectText2.position.z = (object2.position.z) - 1.5
    objectText3.position.z = (object3.position.z) - 1.5
    objectText4.position.z = (object4.position.z) - 1.5
    objectText5.position.z = (object5.position.z) - 1.5
    objectText6.position.z = (object6.position.z) - 1.5
    objectText7.position.z = (object7.position.z) - 1.5

    //Cast a ray
    raycaster.setFromCamera(mouse, camera)

    const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest)

    for(const object of objectsToTest)
    {
        object.material.color.set()
    }
    for(const intersect of intersects)
    {
        intersect.object.material.color.set() 
    }

    //Hover text size
    if(intersects,length)
    {
            if(currentIntersect === null)
            {
                console.log('mouse enter')
            }
            
            currentIntersect = intersects[0]
    }
    else
    {
            if(currentIntersect)
            {
                console.log('mouse leave')
            }
            currentIntersect = null
    }

    //Hover play sound
    if(object11)
    {
        const object11Intersects = raycaster.intersectObject(object11)

        if(object11Intersects.length)
        {
            sound1.play()
        }
        else
        {
            sound1.pause()
        }
    }
    if(object22)
    {
        const object22Intersects = raycaster.intersectObject(object22)

        if(object22Intersects.length)
        {
            sound2.play()
        }
        else
        {
            sound2.pause()
        }
    }
    if(object33)
    {
        const object33Intersects = raycaster.intersectObject(object33)

        if(object33Intersects.length)
        {
            sound3.play()
        }
        else
        {
            sound3.pause()
        }
    }

    //Hover object size
    if(object1)
    {
        const object1Intersects = raycaster.intersectObject(object1)
        
        
        if(object1Intersects.length)
        {
            object1.scale.y = 0.99
        }
        else
        {
            object1.scale.y = 1.0
        }
    }
    if(object2)
    {
        const object2Intersects = raycaster.intersectObject(object2)
        
        
        if(object2Intersects.length)
        {
            object2.scale.y = 0.99
        }
        else
        {
            object2.scale.y = 1.0
        }
    }
    if(object3)
    {
        const object3Intersects = raycaster.intersectObject(object3)
        
        
        if(object3Intersects.length)
        {
            object3.scale.y = 0.99
        }
        else
        {
            object3.scale.y = 1.0
        }
    }
    if(object4)
    {
        const object4Intersects = raycaster.intersectObject(object4)
        
        
        if(object4Intersects.length)
        {
            object4.scale.y = 0.99
            sound4.play()
        }
        else
        {
            object4.scale.y = 1.0
            sound4.pause()
        }
    }
    if(object5)
    {
        const object5Intersects = raycaster.intersectObject(object5)
        
        
        if(object5Intersects.length)
        {
            object5.scale.y = 0.99
            sound5.play()
        }
        else
        {
            object5.scale.y = 1.0
            sound5.pause()
        }
    }
    if(object6)
    {
        const object6Intersects = raycaster.intersectObject(object6)
        
        
        if(object6Intersects.length)
        {
            object6.scale.y = 0.99
            sound6.play()
        }
        else
        {
            object6.scale.y = 1.0
            sound6.pause()
        }
    }
    if(object7)
    {
        const object7Intersects = raycaster.intersectObject(object7)
        
        
        if(object7Intersects.length)
        {
            object7.scale.y = 0.99
            sound7.play()
        }
        else
        {
            object7.scale.y = 1.0
            sound7.pause()
        }
    }
    if(objectText1)
    {
        const objectText1Intersects = raycaster.intersectObject(objectText1)
        
        
        if(objectText1Intersects.length)
        {
            objectText1.scale.z = 1
            objectText1.position.z = (object1.position.z) - 1.5
        }
        else
        {
            objectText1.scale.z = 0.1
            objectText1.position.z = object1.position.z
        }
    }
    if(objectText2)
    {
        const objectText2Intersects = raycaster.intersectObject(objectText2)
        
        
        if(objectText2Intersects.length)
        {
            objectText2.scale.z = 1
            objectText2.position.z = (object2.position.z) - 1.5
        }
        else
        {
            objectText2.scale.z = 0.1
            objectText2.position.z = object2.position.z
        }
    }
    if(objectText3)
    {
        const objectText3Intersects = raycaster.intersectObject(objectText3)
        
        
        if(objectText3Intersects.length)
        {
            objectText3.scale.z = 1
            objectText3.position.z = (object3.position.z) - 1.5
        }
        else
        {
            objectText3.scale.z = 0.1
            objectText3.position.z = object3.position.z
        }
    }
    if(objectText4)
    {
        const objectText4Intersects = raycaster.intersectObject(objectText4)
        
        
        if(objectText4Intersects.length)
        {
            objectText4.scale.z = 1
            objectText4.position.z = (object4.position.z) - 1.5
        }
        else
        {
            objectText4.scale.z = 0.1
            objectText4.position.z = object4.position.z
        }
    }
    if(objectText5)
    {
        const objectText5Intersects = raycaster.intersectObject(objectText5)
        
        
        if(objectText5Intersects.length)
        {
            objectText5.scale.z = 1
            objectText5.position.z = (object5.position.z) - 1.5
        }
        else
        {
            objectText5.scale.z = 0.1
            objectText5.position.z = object5.position.z
        }
    }
    if(objectText6)
    {
        const objectText6Intersects = raycaster.intersectObject(objectText6)
        
        
        if(objectText6Intersects.length)
        {
            objectText6.scale.z = 1
            objectText6.position.z = (object6.position.z) - 1.5
        }
        else
        {
            objectText6.scale.z = 0.1
            objectText6.position.z = object6.position.z
        }
    }
    if(objectText7)
    {
        const objectText7Intersects = raycaster.intersectObject(objectText7)
        
        
        if(objectText7Intersects.length)
        {
            objectText7.scale.z = 1
            objectText7.position.z = (object7.position.z) - 1.5
        }
        else
        {
            objectText7.scale.z = 0.1
            objectText7.position.z = object7.position.z
        }
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()