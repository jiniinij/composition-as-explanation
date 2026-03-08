import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'

/**
 * Base
 */
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xa0a0a0)

/**
 * Loaders
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('textures/matcaps/3.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Materials
 */
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

/**
 * Models
 */
const models = [null, null, null, null, null, null, null]

const modelPositions = [
    { x: 0,   z: -15 },
    { x: 15,  z: -15 },
    { x: -20, z: 0   },
    { x: -5,  z: 0   },
    { x: 10,  z: 0   },
    { x: 0,   z: 15  },
    { x: 15,  z: 15  },
]

modelPositions.forEach((pos, i) => {
    gltfLoader.load(`/models/cube${i + 1}/20240121.glb`, (gltf) => {
        models[i] = gltf.scene
        models[i].scale.set(0.5, 0.5, 0.5)
        models[i].position.set(pos.x, 0, pos.z)
        scene.add(models[i])
    })
})

/**
 * Fonts & Text
 */
const fontLoader = new FontLoader()

const longText = `
                          WORKSHOP : COMPOSITION AS EXPLANATION
    ORGANISED BY INSA DEISTJOERDIS / LYN BEHNCKENIN IN NOTES IN STUDIO
            CHRISTOPH KNOTH / KONRAD RENNER IN DIGITALE GRAFIK KLASSE
                     PERFORMANCE TEAM BY AKSELI MANNER / KIM KLEINERT
          FERNANDA BRAUN SANTOS / TIGRAN SSAKYN / KRISTINA SCHUSTER  
                                      LIUDMILA SAVALYEVA / YEJI CHEON
            DOCUMENT TEAM BY DONGSEOK LEE / SEOIN SONG / SO JIN PARK
                                          PHOTOGRAPHY BY SO JIN PARK  
    `

const longTextBottom = `
                                                                <Text>
                       No Problem: Design School as Promise by Silvio Lorusso 
                                        Chimeric Worlding by Tiger Dingsun 
                             Research and Destroy by Daniel van der Velden 
   This is not a manifesto by towards an anarcho-design practice by Jared Davidson 
                             Curating as graphic design by Sara de Bondt 
    `

let textLink

fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {

    const textConfig = (size) => ({
        font,
        size,
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.005,
        bevelOffset: 0,
        bevelSegments: 9
    })

    // Main title
    const text = new THREE.Mesh(new TextGeometry(longText, textConfig(5)), material)
    text.position.set(-125, 20, -50)
    text.rotation.x = Math.PI * 1.5
    scene.add(text)

    // Bottom text
    const textBottom = new THREE.Mesh(new TextGeometry(longTextBottom, textConfig(2.5)), material)
    textBottom.position.set(-60, 20, 30)
    textBottom.rotation.x = Math.PI * 1.5
    scene.add(textBottom)

    // Clickable link text
    const textLinkGeometry = new TextGeometry(
        `
    
    
    
    
    
    
            https://notes-on.studio/workshop#page://HlWfcKxQ4sNBsHR0`,
        textConfig(2.5)
    )
    textLink = new THREE.Mesh(textLinkGeometry, material)
    textLink.position.set(-60, 20, 30)
    textLink.rotation.x = Math.PI * 1.5
    scene.add(textLink)
})

/**
 * Objects (hitboxes for raycasting)
 */
const objectGeometry = new THREE.BoxGeometry(8.99, 5.001, 4.99)
objectGeometry.center()

const objectPositions = [
    { x: 0,   z: -15 },
    { x: 15,  z: -15 },
    { x: -20, z: 0   },
    { x: -5,  z: 0   },
    { x: 10,  z: 0   },
    { x: 0,   z: 15  },
    { x: 15,  z: 15  },
]

const objects = objectPositions.map(pos => {
    const obj = new THREE.Mesh(objectGeometry, material)
    obj.position.set(pos.x, 0, pos.z)
    scene.add(obj)
    return obj
})
const [object1, object2, object3, object4, object5, object6, object7] = objects

// Invisible sound trigger boxes for objects 1-3
const soundBoxGeo = new THREE.BoxGeometry(8, 4, 4)
const soundMat = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

const makeSoundBox = (x, z) => {
    const box = new THREE.Mesh(soundBoxGeo, soundMat)
    box.position.set(x, 0, z)
    box.visible = false
    scene.add(box)
    return box
}
const object11 = makeSoundBox(0, -15)
const object22 = makeSoundBox(15, -15)
const object33 = makeSoundBox(-20, 0)

/**
 * Floor & Grid
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(500, 500),
    new THREE.MeshPhongMaterial({ color: 0xe9e2e2, depthWrite: false })
)
floor.rotation.x = -Math.PI / 2
floor.position.y = -2.5
floor.receiveShadow = true
scene.add(floor)

const grid = new THREE.GridHelper(300, 500, 0xc1c1c1, 0xc1c1c1)
grid.position.y = 20
scene.add(grid)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.OrthographicCamera(
    -14 * aspectRatio, 14 * aspectRatio, 14, -14, 0.1, 1000
)
camera.position.set(1, 0, -100)
scene.add(camera)

/**
 * Audio
 */
const listener = new THREE.AudioListener()
camera.add(listener)

const makePositionalAudio = (url, volume, refDistance, cone, targetObject, autoplay = false) => {
    const sound = new THREE.PositionalAudio(listener)
    const loader = new THREE.AudioLoader()
    loader.load(url, (buffer) => {
        sound.setBuffer(buffer)
        sound.setLoop(true)
        sound.setVolume(volume)
        sound.setRefDistance(refDistance)
        sound.setDirectionalCone(...cone)
        sound.position.set(0, 2.5, 0)
        sound.rotation.x = -Math.PI / 2
        if (autoplay) sound.play()
    })
    targetObject.add(sound)
    return sound
}

// Hover sounds (character)
const sound1 = makePositionalAudio('/audio/character/Akseli.mp3',    5,  0.5, [90, 300, 0], object11)
const sound2 = makePositionalAudio('/audio/character/Fernanda.mp3',  40, 0.5, [90, 300, 0], object22)
const sound3 = makePositionalAudio('/audio/character/Kim.mp3',       40, 0.5, [90, 300, 0], object33)
const sound4 = makePositionalAudio('/audio/character/Kristina.mp3',  60, 0.5, [90, 300, 0], object4)
const sound5 = makePositionalAudio('/audio/character/naked gil.mp3', 30, 0.5, [90, 300, 0], object5)
const sound6 = makePositionalAudio('/audio/character/Tigran.mp3',    70, 0.3, [90, 200, 0], object6)
const sound7 = makePositionalAudio('/audio/character/Yeji.mp3',      30, 0.5, [90, 300, 0], object7)

// Ambient spot sounds (autoplay)
const sound01 = makePositionalAudio('/audio/spots/01.mp3', 4, 0.5, [30, 300, 0], object11, true)
const sound02 = makePositionalAudio('/audio/spots/02.mp3', 4, 0.5, [30, 300, 0], object22, true)
const sound03 = makePositionalAudio('/audio/spots/03.mp3', 4, 0.5, [30, 300, 0], object3,  true)
const sound04 = makePositionalAudio('/audio/spots/04.mp3', 4, 0.5, [30, 300, 0], object4,  true)
const sound05 = makePositionalAudio('/audio/spots/05.mp3', 4, 0.5, [30, 300, 0], object5,  true)
const sound06 = makePositionalAudio('/audio/spots/06.mp3', 4, 0.5, [30, 300, 0], object6,  true)
const sound07 = makePositionalAudio('/audio/spots/07.mp3', 4, 0.5, [30, 300, 0], object7,  true)

const spotSounds = [sound01, sound02, sound03, sound04, sound05, sound06, sound07]

window.addEventListener('click', () => {
    spotSounds.forEach(s => s.setVolume(s.getVolume() === 0 ? 4 : 0))
})

/**
 * Mouse & Raycaster
 */
const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()

window.addEventListener('mousemove', (event) => {
    mouse.x =  (event.clientX / sizes.width)  * 2 - 1
    mouse.y = -(event.clientY / sizes.height) * 2 + 1
})

window.addEventListener('click', (event) => {
    mouse.x =  (event.clientX / window.innerWidth)  * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    if (textLink && raycaster.intersectObject(textLink).length > 0) {
        window.open('https://notes-on.studio/workshop#page://HlWfcKxQ4sNBsHR0', '_blank')
    }
})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 5
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true
controls.autoRotateSpeed = 0.05
controls.maxPolarAngle = Math.PI
controls.minZoom = 0.2
controls.maxZoom = 9

/**
 * View Buttons
 */
document.querySelector('#frontView').addEventListener('click', () => {
    camera.position.set(0, 0, -100)
    controls.minPolarAngle = Math.PI / 2
    controls.maxPolarAngle = Math.PI / 2
    controls.enablePan = false
    controls.minZoom = 0.8
    controls.maxZoom = 5.6
    controls.update()
})

document.querySelector('#sideView').addEventListener('click', () => {
    camera.position.set(0, 20, 0)
    controls.minPolarAngle = 0
    controls.maxPolarAngle = Math.PI
    controls.enablePan = true
    controls.minZoom = 0.7
    controls.maxZoom = 4
    controls.update()
})

document.querySelector('#backView').addEventListener('click', () => {
    camera.position.set(0, 500, 0.01)
    controls.minPolarAngle = 0
    controls.maxPolarAngle = Math.PI
    controls.enablePan = true
    controls.minZoom = 0.2
    controls.maxZoom = 4
    controls.update()
})

/**
 * Lights
 */
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 1)
hemiLight.position.set(0, 2000, 0)
scene.add(hemiLight)

scene.add(new THREE.AmbientLight(0xffffff, 0.01))

const dirLight = new THREE.DirectionalLight(0xffffff, 0.01)
dirLight.position.set(5, 5, 0)
dirLight.castShadow = true
dirLight.shadow.camera.far = 15
dirLight.shadow.normalBias = 0.027
dirLight.shadow.bias = -0.004
dirLight.shadow.mapSize.set(512, 512)
dirLight.target.position.set(0, 4, 0)
dirLight.target.updateWorldMatrix()
scene.add(dirLight)

/**
 * Animation config
 */
const animConfigs = [
    { obj: object1, model: () => models[0], baseZ: -15, speedZ: 0.13, speedR: 0.013  },
    { obj: object2, model: () => models[1], baseZ: -15, speedZ: 0.17, speedR: 0.0007 },
    { obj: object3, model: () => models[2], baseZ: 0,   speedZ: 0.10, speedR: 0.001  },
    { obj: object4, model: () => models[3], baseZ: 0,   speedZ: 0.15, speedR: 0.0005 },
    { obj: object5, model: () => models[4], baseZ: 0,   speedZ: 0.14, speedR: 0.0004 },
    { obj: object6, model: () => models[5], baseZ: 15,  speedZ: 0.12, speedR: 0.0002 },
    { obj: object7, model: () => models[6], baseZ: 15,  speedZ: 0.16, speedR: 0.0006 },
]

const soundBoxConfigs = [
    { box: object11, sound: sound1 },
    { box: object22, sound: sound2 },
    { box: object33, sound: sound3 },
]

const hoverSoundConfigs = [
    { obj: object4, sound: sound4 },
    { obj: object5, sound: sound5 },
    { obj: object6, sound: sound6 },
    { obj: object7, sound: sound7 },
]

/**
 * Animate
 */
const clock = new THREE.Clock()
let currentIntersect = null

const tick = () => {
    const t = clock.getElapsedTime()

    animConfigs.forEach(({ obj, model, baseZ, speedZ, speedR }, i) => {
        const newZ = baseZ + Math.sin(t * speedZ) * 5
        const newRY = Math.sin(t * speedR) * 5
        obj.position.z = newZ
        obj.rotation.y = newRY

        if (i === 0) { object11.position.z = newZ; object11.rotation.y = newRY }
        if (i === 1) { object22.position.z = newZ; object22.rotation.y = newRY }
        if (i === 2) { object33.position.z = newZ; object33.rotation.y = newRY }

        const m = model()
        if (m) { m.position.z = newZ; m.rotation.y = newRY }
    })

    raycaster.setFromCamera(mouse, camera)

    animConfigs.forEach(({ obj }) => {
        const hit = raycaster.intersectObject(obj).length > 0
        obj.scale.y = hit ? 0.99 : 1.0
    })

    soundBoxConfigs.forEach(({ box, sound }) => {
        const hit = raycaster.intersectObject(box).length > 0
        hit ? sound.play() : sound.pause()
    })

    hoverSoundConfigs.forEach(({ obj, sound }) => {
        const hit = raycaster.intersectObject(obj).length > 0
        hit ? sound.play() : sound.pause()
    })

    const hits = raycaster.intersectObjects(objects)
    if (hits.length) {
        if (!currentIntersect) console.log('mouse enter')
        currentIntersect = hits[0]
    } else {
        if (currentIntersect) console.log('mouse leave')
        currentIntersect = null
    }

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()