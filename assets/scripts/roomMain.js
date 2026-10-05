import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// ------ SETUP ------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 9, 17);
const textureLoader = new THREE.TextureLoader();

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load(
    [
        'assets/textures/nightSky.jpg',
        'assets/textures/nightSky.jpg',
        'assets/textures/nightSky.jpg',
        'assets/textures/grass.jpg',
        'assets/textures/nightSky.jpg',
        'assets/textures/nightSky.jpg'
    ]
);

//scene.background = new THREE.Color(0x0b0a2a);


// ------ SCENE LIGHTS ------
renderer.shadowMap.enabled = true;

const sceneAmbientLight = new THREE.AmbientLight(0x0024a8, 2.5);
scene.add(sceneAmbientLight);

const directionalLightMoon = new THREE.DirectionalLight(0xb8cdda, 0.2);
directionalLightMoon.position.set(7, 15, -10);
directionalLightMoon.castShadow = true;
scene.add(directionalLightMoon);

directionalLightMoon.shadow.camera.left = -30;
directionalLightMoon.shadow.camera.right = 30;
directionalLightMoon.shadow.camera.top = 30;
directionalLightMoon.shadow.camera.bottom = -30;
directionalLightMoon.shadow.camera.near = 1;
directionalLightMoon.shadow.camera.far = 80;


// ------ ROOM BUILD ------
const roomWidth = 40;
const roomHeight = 20;
const roomDepth = 25;

const roofGeo = new THREE.PlaneGeometry(roomWidth, roomDepth);
const roofMat = new THREE.MeshLambertMaterial({color: 0xd2cac6, side: THREE.DoubleSide});
const roof = new THREE.Mesh(roofGeo, roofMat);
roof.rotateX(-0.5 * Math.PI);
roof.position.set(0, roomHeight, 0);
roof.receiveShadow = true;

const floorGeo = new THREE.PlaneGeometry(roomWidth, roomDepth);
const floorMat = new THREE.MeshPhongMaterial({
    map: textureLoader.load('assets/textures/wood.jpg'),
    shininess: 150,
    specular: 0x736b68,
    side: THREE.DoubleSide
});
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotateX(-0.5 * Math.PI);
floor.receiveShadow = true;

const lWallGeo = new THREE.PlaneGeometry(roomDepth, roomHeight);
const lWallMat = new THREE.MeshPhongMaterial({
    map: textureLoader.load('assets/textures/catTiles.jpg'),
    shininess: 100,
    specular: 0xa9c9d6,
    side: THREE.DoubleSide
});
const leftWall = new THREE.Mesh(lWallGeo, lWallMat);
leftWall.rotateY(Math.PI / 2)
leftWall.position.set(-roomWidth / 2, roomHeight / 2, 0);
leftWall.receiveShadow = true;

const rWallGeo = new THREE.PlaneGeometry(roomDepth, roomHeight);
const rWallMat = new THREE.MeshLambertMaterial({color: 0xcc89a9, side: THREE.DoubleSide});
const rightWall = new THREE.Mesh(rWallGeo, rWallMat);
rightWall.rotateY(Math.PI / 2);
rightWall.position.set(roomWidth / 2, roomHeight / 2, 0);
rightWall.receiveShadow = true;

scene.add(roof, floor, leftWall, rightWall);

// Back Walls ----
const bWallMat = new THREE.MeshLambertMaterial({color: 0xe0b0ad, side: THREE.DoubleSide});

const doorWidth = 11;
const doorHeight = 17;
const doorX = 3.5;
const doorLeft = doorX - doorWidth / 2; 
const doorRight = doorX + doorWidth / 2;
const wallZ = -roomDepth / 2;

const leftW = doorLeft + roomWidth / 2;
const bWallGeo1 = new THREE.PlaneGeometry(leftW, roomHeight);
const backWall1 = new THREE.Mesh(bWallGeo1, bWallMat);
backWall1.position.set(-roomWidth / 2 + leftW / 2, roomHeight / 2, wallZ);
backWall1.receiveShadow = true;

const rightW = roomWidth / 2 - doorRight;
const bWallGeo2 = new THREE.PlaneGeometry(rightW, roomHeight);
const backWall2 = new THREE.Mesh(bWallGeo2, bWallMat);
backWall2.position.set(doorRight + rightW / 2, roomHeight / 2, wallZ);
backWall2.receiveShadow = true;

const topH = roomHeight - doorHeight;
const bWallGeo3 = new THREE.PlaneGeometry(doorWidth, topH);
const backWall3 = new THREE.Mesh(bWallGeo3, bWallMat);
backWall3.position.set(doorX, doorHeight + topH / 2, wallZ);
backWall3.receiveShadow = true;

scene.add(backWall1, backWall2, backWall3);


// ------ MAIN FURNITURE ------
// Main Lamp ----
const mainLampStandGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.3, 32);
const mainLampStandMat = new THREE.MeshLambertMaterial({color: 0x826951});
const mainLampStand = new THREE.Mesh(mainLampStandGeo, mainLampStandMat);
mainLampStand.position.set(0, roomHeight - 0.2, 0);
mainLampStand.receiveShadow = true;

const mainLampStringGeo = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
const mainLampStringMat = new THREE.MeshLambertMaterial({color: 0x1a1918});
const mainLampString = new THREE.Mesh(mainLampStringGeo, mainLampStringMat);
mainLampString.position.set(0, roomHeight - 1.3, 0);
mainLampString.receiveShadow = true;

const mainLampShadeGeo = new THREE.SphereGeometry(2, 32, 16);
const mainLampShadeMat = new THREE.MeshPhongMaterial({
    color: 0xfaecd2,
    emissive: 0xffe9a8,
    emissiveIntensity: 0.8
});
const mainLampShade = new THREE.Mesh(mainLampShadeGeo, mainLampShadeMat);
mainLampShade.position.set(0, roomHeight - 4, 0);

scene.add(mainLampShade, mainLampString, mainLampStand);

// Main Lamp Light ----
const mainLampLight = new THREE.PointLight(0xebc296, 60, 70);
mainLampLight.position.copy(mainLampShade.position);
mainLampLight.castShadow = true;
scene.add(mainLampLight);

// Sofas ----
const sofaBottomGeo = new RoundedBoxGeometry(5, 1.7, 6, 4, 0.3);
const sofaBackGeo = new RoundedBoxGeometry(1.5, 5.5, 6, 4, 0.3);
const sofaCushionGeo = new RoundedBoxGeometry(5.3, 1, 6, 4, 0.3);

const sofaMat1 = new THREE.MeshLambertMaterial({color: 0x99dece});

const sofaBottom1 = new THREE.Mesh(sofaBottomGeo, sofaMat1);
sofaBottom1.position.set(roomWidth / 2.5, roomHeight / 23, roomDepth - 16);
sofaBottom1.castShadow = true;
sofaBottom1.receiveShadow = true;
const sofaBack1 = new THREE.Mesh(sofaBackGeo, sofaMat1);
sofaBack1.position.set(roomWidth / 2.1, roomHeight / 7.2, roomDepth - 16);
sofaBack1.castShadow = true;
sofaBack1.receiveShadow = true;
const sofaCushion1 = new THREE.Mesh(sofaCushionGeo, sofaMat1);
sofaCushion1.position.set(roomWidth / 2.5, roomHeight / 9, roomDepth - 16);
sofaCushion1.castShadow = true;
sofaCushion1.receiveShadow = true;

scene.add(sofaBottom1, sofaBack1, sofaCushion1);

const sofaMat2 = new THREE.MeshLambertMaterial({color: 0xebb7de});

const sofaBottom2 = new THREE.Mesh(sofaBottomGeo, sofaMat2);
sofaBottom2.position.set(roomWidth / 2.5, roomHeight / 23, roomDepth - 22);
sofaBottom2.castShadow = true;
sofaBottom2.receiveShadow = true;
const sofaBack2 = new THREE.Mesh(sofaBackGeo, sofaMat2);
sofaBack2.position.set(roomWidth / 2.1, roomHeight / 7.2, roomDepth - 22);
sofaBack2.castShadow = true;
sofaBack2.receiveShadow = true;
const sofaCushion2 = new THREE.Mesh(sofaCushionGeo, sofaMat2);
sofaCushion2.position.set(roomWidth / 2.5, roomHeight / 9, roomDepth - 22);;
sofaCushion2.castShadow = true;
sofaCushion2.receiveShadow = true;

scene.add(sofaBottom2, sofaBack2, sofaCushion2);

const sofaMat3 = new THREE.MeshLambertMaterial({color: 0xe3ddaa});

const sofaBottom3 = new THREE.Mesh(sofaBottomGeo, sofaMat3);
sofaBottom3.position.set(roomWidth / 2.5, roomHeight / 23, -3);
sofaBottom3.castShadow = true;
sofaBottom3.receiveShadow = true;
const sofaBack3 = new THREE.Mesh(sofaBackGeo, sofaMat3);
sofaBack3.position.set(roomWidth / 2.1, roomHeight / 7.2, -3);
sofaBack3.castShadow = true;
sofaBack3.receiveShadow = true;
const sofaCushion3 = new THREE.Mesh(sofaCushionGeo, sofaMat3);
sofaCushion3.position.set(roomWidth / 2.5, roomHeight / 9, roomDepth - 28);;
sofaCushion3.castShadow = true;
sofaCushion3.receiveShadow = true;

scene.add(sofaBottom3, sofaBack3, sofaCushion3);

const sofaStoolGeo = new RoundedBoxGeometry(6, 1.8, 6, 4, 0.3);
const sofaStoolCusionGeo = new RoundedBoxGeometry(6, 1, 6, 4, 0.3);
const sofaStoolMat = new THREE.MeshLambertMaterial({map: textureLoader.load('assets/textures/pinkBrownPlaid.jpg')});

const sofaStool = new THREE.Mesh(sofaStoolGeo, sofaStoolMat);
sofaStool.position.set(roomWidth / 3.9, roomHeight / 22, roomDepth - 16);
sofaStool.castShadow = true;
sofaStool.receiveShadow = true;
const sofaStoolCusion = new THREE.Mesh(sofaStoolCusionGeo, sofaStoolMat);
sofaStoolCusion.position.set(roomWidth / 3.9, roomHeight / 8.8, roomDepth - 16);
sofaStoolCusion.castShadow = true;
sofaStoolCusion.receiveShadow = true;

scene.add(sofaStool, sofaStoolCusion);

// Table ----
const tableTopGeo = new THREE.CylinderGeometry(5, 5, 0.3, 32);
const tableTopMat = new THREE.MeshStandardMaterial({
    color: 0xFCDDA7,
    transparent: true,
    opacity: 0.5,
    metalness: 0.4,
    roughness: 0.1,
    side: THREE.DoubleSide
});
const tableTop = new THREE.Mesh(tableTopGeo, tableTopMat);
tableTop.position.set(2.8, 2, -1);
tableTop.castShadow = true;
scene.add(tableTop);

const tableLegsGeo = new THREE.CylinderGeometry(0.5, 0.5, 2.3, 32);
const tableLegsMat = new THREE.MeshLambertMaterial({color: 0x826951});

const tableLeg1 = new THREE.Mesh(tableLegsGeo, tableLegsMat);
tableLeg1.castShadow = true;
tableLeg1.receiveShadow = true;
tableLeg1.position.set(0, 1.3, 3);

const tableLeg2 = new THREE.Mesh(tableLegsGeo, tableLegsMat);
tableLeg2.castShadow = true;
tableLeg2.receiveShadow = true;
tableLeg2.position.set(7.8, 1.3, 0);

const tableLeg3 = new THREE.Mesh(tableLegsGeo, tableLegsMat);
tableLeg3.castShadow = true;
tableLeg3.receiveShadow = true;
tableLeg3.position.set(-1, 1.3, -4);

scene.add(tableLeg1, tableLeg2, tableLeg3);

// TV Console ----
const consoleShelfGeo = new THREE.PlaneGeometry(4.5, 15);
const consoleMat = new THREE.MeshStandardMaterial({
    color: 0xb28cc2,
    metalness: 0.3,
    roughness: 0.2,
    side: THREE.DoubleSide
});

const consoleShelfBottom = new THREE.Mesh(consoleShelfGeo, consoleMat);
consoleShelfBottom.position.set(-roomWidth / 2.3, roomHeight / 17, 1);
consoleShelfBottom.rotateX(-0.5 * Math.PI);
consoleShelfBottom.castShadow = true;
consoleShelfBottom.receiveShadow = true;

const consoleShelfTop = new THREE.Mesh(consoleShelfGeo, consoleMat);
consoleShelfTop.position.set(-roomWidth / 2.3, roomHeight / 6, 1);
consoleShelfTop.rotateX(-0.5 * Math.PI);
consoleShelfTop.castShadow = true;
consoleShelfTop.receiveShadow = true;
scene.add(consoleShelfBottom, consoleShelfTop);

const consoleLegGeo = new THREE.CapsuleGeometry(0.2, 3.5, 4, 8, 1);
const consoleLegMat = new THREE.MeshStandardMaterial({
    color: 0xdbe9ff,
    metalness: 0.3,
    roughness: 0.2,
    side: THREE.DoubleSide
});

const consoleLeg1 = new THREE.Mesh(consoleLegGeo, consoleLegMat);
consoleLeg1.position.set(-roomWidth / 2.3, 2, roomWidth / 4.6);
consoleLeg1.castShadow = true;
consoleLeg1.receiveShadow = true;

const consoleLeg2 = new THREE.Mesh(consoleLegGeo, consoleLegMat);
consoleLeg2.position.set(-roomWidth / 2.3, 2, -7);
consoleLeg2.castShadow = true;
consoleLeg2.receiveShadow = true;

scene.add(consoleLeg1, consoleLeg2);

// TV ----
const tvBoxGeo = new THREE.BoxGeometry(11, 6.5, 0.5);
const tvBoxMat = new THREE.MeshStandardMaterial({
    color: 0x2d3645,
    metalness: 0.3,
    roughness: 0.5,
    side: THREE.DoubleSide
});

const tvBox = new THREE.Mesh(tvBoxGeo, tvBoxMat);
tvBox.position.set(-roomWidth / 2.2, 6.7, 1.3);
tvBox.rotateY(0.5 * Math.PI);
tvBox.castShadow = true;
tvBox.receiveShadow = true;

const tvScreenGeo = new THREE.PlaneGeometry(10, 5.5);

// TV Video (kept video.muted in case it needs to be muted again) ----
const video = document.createElement('video');
video.loop = true;
//video.muted = true;
video.volume = 0.1;
video.src = 'assets/videos/sealVideo.mp4';
video.play().catch(() => {
    window.addEventListener('click', () => video.play(), {once: true});
});

const tvTexture = new THREE.VideoTexture(video);
const tvScreenMat = new THREE.MeshBasicMaterial({map: tvTexture});

const tvScreen = new THREE.Mesh(tvScreenGeo, tvScreenMat);
tvScreen.position.set(-roomWidth / 2.24, 6.7, 1.3);
tvScreen.rotateY(0.5 * Math.PI);

scene.add(tvBox, tvScreen);

// TV Light ----
const tvLight = new THREE.PointLight(0xdbe9ff, 40, 30);
tvLight.position.set(-roomWidth / 2.6, 7, 1.3);
scene.add(tvLight);

// Bottom Storage Shelf ----
const bottomShelfGeo = new THREE.BoxGeometry(11, 6, 2.5);
const storageShelfMat = new THREE.MeshPhongMaterial({color: 0xf5ebda, 
    shininess: 100,
    specular: 0xfaf6f0,
    side: THREE.DoubleSide});
const bottomShelf = new THREE.Mesh( bottomShelfGeo, storageShelfMat );
bottomShelf.position.set(-roomWidth / 4, 3.1, -11);
bottomShelf.castShadow = true;

const bottomDoorGeo = new THREE.BoxGeometry(4.7, 5.2, 0.2);
const bottomDoorMat = new THREE.MeshLambertMaterial({map: textureLoader.load('assets/textures/starMoonTiles.jpg')});

const bottomDoor1 = new THREE.Mesh(bottomDoorGeo, bottomDoorMat);
bottomDoor1.position.set(-roomWidth / 3.2, 2.9, -9.7);
bottomDoor1.receiveShadow = true;

const bottomDoor2 = new THREE.Mesh(bottomDoorGeo, bottomDoorMat);
bottomDoor2.position.set(-roomWidth / 5.3, 2.9, -9.7);
bottomDoor2.receiveShadow = true;

scene.add(bottomShelf, bottomDoor1, bottomDoor2);

// Storage Shelf ----
const storageSidesGeo = new THREE.BoxGeometry(2, 10, 0.3);
const storageSideL = new THREE.Mesh(storageSidesGeo, storageShelfMat);

storageSideL.position.set(-roomWidth / 2.7, 10.8, -11);
storageSideL.rotateY(0.5 * Math.PI);
storageSideL.castShadow = true;
storageSideL.receiveShadow = true;

const storageSideR = new THREE.Mesh(storageSidesGeo, storageShelfMat);
storageSideR.position.set(-roomWidth / 8, 10.8, -11);
storageSideR.rotateY(0.5 * Math.PI);
storageSideR.castShadow = true;
storageSideR.receiveShadow = true;

scene.add(storageSideL, storageSideR);

const storageTopGeo = new THREE.BoxGeometry(10, 1.2, 0.3);
const storageTop = new THREE.Mesh(storageTopGeo, storageShelfMat);
storageTop.position.set(-roomWidth / 4, 15.8, -11);
storageTop.rotateX(-0.5 * Math.PI);
storageTop.castShadow = true;
storageTop.receiveShadow = true;

const storageShelf1 = new THREE.Mesh(storageTopGeo, storageShelfMat);
storageShelf1.position.set(-roomWidth / 4, 12.8, -11);
storageShelf1.rotateX(-0.5 * Math.PI);
storageShelf1.castShadow = true;
storageShelf1.receiveShadow = true;

const storageShelf2 = new THREE.Mesh(storageTopGeo, storageShelfMat);
storageShelf2.position.set(-roomWidth / 4, 9.2, -11);
storageShelf2.rotateX(-0.5 * Math.PI);
storageShelf2.castShadow = true;
storageShelf2.receiveShadow = true;

scene.add(storageTop, storageShelf1, storageShelf2);

// Plant Pot ----
const plantPotGeo = new THREE.CylinderGeometry(1.3, 1, 2, 32, 1, true);
const plantPotMat = new THREE.MeshLambertMaterial({color: 0x826951, side: THREE.DoubleSide});
const plantPot = new THREE.Mesh(plantPotGeo, plantPotMat);
plantPot.position.set(-roomWidth / 17, 1, -10);
plantPot.rotateY(5);
plantPot.castShadow = true;
plantPot.receiveShadow = true;
scene.add(plantPot);

// Plant ----
const plant = new THREE.Group();
plant.position.copy(plantPot.position);

const soilGeo = new THREE.CylinderGeometry(1.2, 1.05, 0.2, 32);
const soilMat = new THREE.MeshLambertMaterial({ color: 0x3b2a1e });
const soil = new THREE.Mesh(soilGeo, soilMat);
soil.position.y = 0.8;
soil.receiveShadow = true;
plant.add(soil);

const leafGeo = new THREE.SphereGeometry(1, 12, 8);
const leafMat = new THREE.MeshLambertMaterial({color: 0x3f8f4a, side: THREE.DoubleSide});

const leafCount = 8;
for (let i = 0; i < leafCount; i++) {
    const pivot = new THREE.Group();
    pivot.rotation.y = (i / leafCount) * Math.PI * 2 + Math.random() * 0.3;
    pivot.position.y = 0.9;   // top of the soil

    const length = 1.6 + Math.random() * 0.8;
    const tilt = 0.5 + Math.random() * 0.6;

    const leaf = new THREE.Mesh(leafGeo, leafMat);
    leaf.scale.set(0.35, 0.06, length);
    leaf.rotation.x = -tilt;
    leaf.position.set(0, Math.sin(tilt) * length, Math.cos(tilt) * length);
    leaf.castShadow = true;
    leaf.receiveShadow = true;

    pivot.add(leaf);
    plant.add(pivot);
}
scene.add(plant);

// Random Cupboard ----
const cupboardGeo = new THREE.BoxGeometry(7.2, 3.3, 2.5);
const cupboardMat = new THREE.MeshPhongMaterial({
    color: 0xf0c9e1,
    shininess: 150,
    specular: 0xa9c9d6
});
const cupboard = new THREE.Mesh(cupboardGeo, cupboardMat);
cupboard.position.set(roomWidth / 2.8, 13, -11.2);
cupboard.castShadow = true;
cupboard.receiveShadow = true;
scene.add(cupboard);

const cupboardDoorGeo = new THREE.BoxGeometry(3.2, 2.8, 0.2);
const cupboardDoorMat = new THREE.MeshPhongMaterial({
    map: textureLoader.load('assets/textures/flowerStripes.jpg'),
    shininess: 150,
    specular: 0xa9c9d6
});

const cupboardDoorL = new THREE.Mesh(cupboardDoorGeo, cupboardDoorMat);
cupboardDoorL.position.set(roomWidth / 3.2, 13, -9.9);
cupboardDoorL.castShadow = true;
cupboardDoorL.receiveShadow = true;

const cupboardDoorR = new THREE.Mesh(cupboardDoorGeo, cupboardDoorMat);
cupboardDoorR.position.set(roomWidth / 2.5, 13, -9.9);
cupboardDoorR.castShadow = true;
cupboardDoorR.receiveShadow = true;

scene.add(cupboardDoorL, cupboardDoorR);

// Tall Lamp ----
const lampX = roomWidth / 2.3;
const lampZ = -7.5;

const tallLampStandGeo = new THREE.CylinderGeometry(0.2, 0.2, 7.5, 32);
const tallLampStandMat = new THREE.MeshStandardMaterial({
    color: 0xd9b3e8,
    metalness: 0.5,
    roughness: 0.1,
});
const tallLampStand = new THREE.Mesh(tallLampStandGeo, tallLampStandMat);
tallLampStand.position.set(lampX, 3.8, lampZ);
tallLampStand.castShadow = true;
tallLampStand.receiveShadow = true;

const lampShadeGeo = new THREE.CylinderGeometry(1.2, 1.7, 2.8, 32, 1, true);
const lampShadeMat = new THREE.MeshPhongMaterial({
    map: textureLoader.load('assets/textures/purpleStarsTiles.jpg'),
    emissiveMap: textureLoader.load('assets/textures/purpleGradientTiles.jpg'),
    emissive: 0xffe2a0,
    emissiveIntensity: 0.3,
    shininess: 150,
    specular: 0xa9c9d6,
    side: THREE.DoubleSide 
});
const lampShade = new THREE.Mesh(lampShadeGeo, lampShadeMat);
lampShade.position.set(lampX, 8.5, lampZ);

scene.add(tallLampStand, lampShade);

// Tall Lamp Light ----
const tallLampLight = new THREE.SpotLight(0xe6ceb3, 50, 40, Math.PI / 2.5, 0.6);
tallLampLight.position.set(lampX, 8.2, lampZ);
tallLampLight.target.position.set(lampX, 0, lampZ);
tallLampLight.castShadow = true;

scene.add(tallLampLight, tallLampLight.target);


// ------ DECOR ------
// Rug ----
const rugGeo = new RoundedBoxGeometry(0.1, 15, 17);
const rugMat = new THREE.MeshLambertMaterial({map: textureLoader.load('assets/textures/purpleStarsTiles.jpg'), side: THREE.DoubleSide });
const rug = new THREE.Mesh(rugGeo, rugMat);
rug.position.set(roomWidth / 7, 0.06, 0);
rug.rotateZ(-0.5 *Math.PI);
rug.castShadow = true;
rug.receiveShadow = true;  
scene.add(rug);

// Curtains ----
const curtainRodGeo = new THREE.CapsuleGeometry(0.1, 11, 4, 8, 1);
const curtainRodMat = new THREE.MeshLambertMaterial({color: 0x8B4513, side: THREE.DoubleSide});
const curtainRod = new THREE.Mesh(curtainRodGeo,curtainRodMat);
curtainRod.position.set(3.5, 17.3, -roomDepth / 2.02);
curtainRod.rotateZ(0.5 * Math.PI);
curtainRod.castShadow = true;
curtainRod.receiveShadow = true;
scene.add(curtainRod);

const curtainMat = new THREE.MeshPhongMaterial({map: textureLoader.load('assets/textures/pinkBrownPlaid.jpg'), side: THREE.DoubleSide});
const curtainCircleGeo = new THREE.CircleGeometry(4.5, 32, 0,Math.PI);
const curtainSideLongGeo = new THREE.PlaneGeometry(3, 9.5);


const curtainSideCircleL = new THREE.Mesh(curtainCircleGeo,curtainMat);
curtainSideCircleL.position.set(9, 13, -roomDepth / 2.02);
curtainSideCircleL.rotation.z = 1.57;
curtainSideCircleL.castShadow = true;
curtainSideCircleL.receiveShadow = true;
const curtainSideLongL = new THREE.Mesh(curtainSideLongGeo,curtainMat);
curtainSideLongL.castShadow = true;
curtainSideLongL.receiveShadow = true;
curtainSideLongL.position.set(7.5, 5, -roomDepth / 2.01);

scene.add(curtainSideCircleL, curtainSideLongL);

const curtainSideCircleR = new THREE.Mesh(curtainCircleGeo,curtainMat);
curtainSideCircleR.position.set(-2, 13, -roomDepth / 2.02);
curtainSideCircleR.rotation.z = -1.57;
curtainSideCircleR.castShadow = true;
curtainSideCircleR.receiveShadow = true;
const curtainSideLongR = new THREE.Mesh(curtainSideLongGeo,curtainMat);
curtainSideLongR.castShadow = true;
curtainSideLongR.receiveShadow = true;
curtainSideLongR.position.set(-0.5, 5, -roomDepth / 2.01);

scene.add(curtainSideCircleR, curtainSideLongR);

// Teddy Bear ----
const teddyMat1 = new THREE.MeshLambertMaterial({map: textureLoader.load('assets/textures/pinkBlackPattern.jpg'), side: THREE.DoubleSide});

const teddyHeadGeo = new THREE.SphereGeometry(1, 32, 16);
const teddyHead = new THREE.Mesh(teddyHeadGeo, teddyMat1);
teddyHead.position.set(roomWidth / 2.4, 5.5, -2);
teddyHead.castShadow = true;
teddyHead.receiveShadow = true;

const teddyTorsoGeo = new THREE.CapsuleGeometry(0.9, 0.5, 4, 8, 1);
const teddyTorso = new THREE.Mesh(teddyTorsoGeo, teddyMat1);
teddyTorso.position.set(roomWidth / 2.4, 3.6, -2);
teddyTorso.castShadow = true;
teddyTorso.receiveShadow = true;

const teddyLimbsGeo = new THREE.CapsuleGeometry(0.6, 0.3, 4, 8, 1);

const teddyLeg1 = new THREE.Mesh(teddyLimbsGeo, teddyMat1);
teddyLeg1.position.set(roomWidth / 2.5, 3, -1.1);
teddyLeg1.rotateX(Math.PI / 2);
teddyLeg1.rotateZ(10);
teddyLeg1.castShadow = true;
teddyLeg1.receiveShadow = true;

const teddyLeg2 = new THREE.Mesh(teddyLimbsGeo, teddyMat1);
teddyLeg2.position.set(roomWidth / 2.5, 3, -2.4);
teddyLeg2.rotateX(Math.PI / 2);
teddyLeg2.rotateZ(5);
teddyLeg2.castShadow = true;
teddyLeg2.receiveShadow = true;

const teddyArm1 = new THREE.Mesh(teddyLimbsGeo, teddyMat1);
teddyArm1.position.set(roomWidth / 2.4, 4, -1);
teddyArm1.rotateX(8);
teddyArm1.castShadow = true;
teddyArm1.receiveShadow = true;

const teddyArm2 = new THREE.Mesh(teddyLimbsGeo, teddyMat1);
teddyArm2.position.set(roomWidth / 2.4, 3.6, -3);
teddyArm2.rotateX(6);
teddyArm2.castShadow = true;
teddyArm2.receiveShadow = true;

const teddyEar = new THREE.CircleGeometry(0.6, 32);

const teddyEar1 = new THREE.Mesh(teddyEar, teddyMat1);
teddyEar1.position.set(roomWidth / 2.4, 6.5, -2.8);
teddyEar1.rotateY(0.5 * Math.PI);
teddyEar1.castShadow = true;
teddyEar1.receiveShadow = true;

const teddyEar2 = new THREE.Mesh(teddyEar, teddyMat1);
teddyEar2.position.set(roomWidth / 2.4, 6.5, -1);
teddyEar2.rotateY(-0.5 * Math.PI);
teddyEar2.castShadow = true;
teddyEar2.receiveShadow = true;

scene.add(teddyHead);
scene.add(teddyTorso);
scene.add(teddyLeg1, teddyLeg2, teddyArm1, teddyArm2);
scene.add(teddyEar1, teddyEar2);

// Meat Cube ----
const cubeGeo = new THREE.BoxGeometry( 1, 1, 1 );
const cubeMat = new THREE.MeshLambertMaterial({map: textureLoader.load('assets/textures/meat.jpg'), side: THREE.DoubleSide});
const cube = new THREE.Mesh(cubeGeo, cubeMat);
cube.position.set(2.8, 2.7, -1);
cube.castShadow = true;
cube.receiveShadow = true;
scene.add(cube);

// Eyeball ----
const eyeGeo = new THREE.SphereGeometry(0.5, 32, 16);
const eyeMat = new THREE.MeshPhongMaterial({map: textureLoader.load('assets/textures/eye.jpg'), 
    shininess: 20,
    specular: 0xfaf6f0,
    side: THREE.DoubleSide});
const eye = new THREE.Mesh(eyeGeo, eyeMat);
eye.position.set(3, 2.7, 1);
eye.rotateY(-10);
eye.castShadow = true;
eye.receiveShadow = true;
scene.add(eye);

// Album Covers ----
const albumGeo = new THREE.BoxGeometry(2.5, 2.5, 0.2);

const albumMat1 = new THREE.MeshLambertMaterial({map: textureLoader.load('assets/textures/puyat.jpg'), side: THREE.DoubleSide});
const album1 = new THREE.Mesh(albumGeo, albumMat1);
album1.position.set(12.2, 8.5, -12.3);
album1.castShadow = true;
album1.receiveShadow = true;

const albumMat2 = new THREE.MeshLambertMaterial({map: textureLoader.load('assets/textures/rulerOfMyHeart.jpg'), side: THREE.DoubleSide});
const album2 = new THREE.Mesh(albumGeo, albumMat2);
album2.position.set(16, 8.5, -12.3);
album2.castShadow = true;
album2.receiveShadow = true;

const albumMat3 = new THREE.MeshLambertMaterial({map: textureLoader.load('assets/textures/otsukareSummer.jpg'), side: THREE.DoubleSide});
const album3 = new THREE.Mesh(albumGeo, albumMat3);
album3.position.set(12.2, 5, -12.3);
album3.castShadow = true;
album3.receiveShadow = true;

const albumMat4 = new THREE.MeshLambertMaterial({map: textureLoader.load('assets/textures/patchesOfViolet.jpg'), side: THREE.DoubleSide});
const album4 = new THREE.Mesh(albumGeo, albumMat4);
album4.position.set(16, 5, -12.3);
album4.castShadow = true;
album4.receiveShadow = true;

scene.add(album1, album2, album3, album4);

// Material Speheres (purely fill in for empty storage) ----
const sphereGeo = new THREE.SphereGeometry(0.8, 32, 163);

const sphereMat1 = new THREE.MeshPhongMaterial({
    color: 0xf542b0,
    shininess: 50,
    specular:0xfa57bb
});
const sphere1 = new THREE.Mesh(sphereGeo, sphereMat1);
sphere1.castShadow = true;
sphere1.position.set(-roomWidth / 4, 13.7, -11);

const sphereMat2 = new THREE.MeshLambertMaterial({color: 0xb95ae8});
const sphere2 = new THREE.Mesh(sphereGeo, sphereMat2);
sphere2.castShadow = true;
sphere2.position.set(-roomWidth / 4, 10, -11);

const sphereMat3 = new THREE.MeshStandardMaterial({
    color: 0x3470c9,
    roughness: 0.3,
    metalness: 0.4
});
const sphere3 = new THREE.Mesh(sphereGeo, sphereMat3);
sphere3.castShadow = true;
sphere3.position.set(-roomWidth / 4, 7, -11);

scene.add(sphere1, sphere2, sphere3)

// ----- RENDERER -----
controls.update();
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();