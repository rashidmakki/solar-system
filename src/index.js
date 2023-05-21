import * as THREE from 'three';
import { CubeTextureLoader } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import starsTexture from '../dist/img/stars.jpg';
import sunTexture from '../dist/img/sun.jpg';
import mercuryTexture from '../dist/img/mercury.jpg';
import venusTexture from '../dist/img/venus.jpg';
import earthTexture from '../dist/img/earth.jpg';
import marsTexture from '../dist/img/mars.jpg';
import jupiterTexture from '../dist/img/jupiter.jpg';
import saturnTexture from '../dist/img/saturn.jpg';
import saturnRingTexture from '../dist/img/saturn_ring.png';
import uranusTexture from '../dist/img/uranus.jpg';
import neptuneTexture from '../dist/img/neptune.jpg';

const scene = new THREE.Scene();
// adding scene texture 
var textureLoader = new THREE.TextureLoader().load( "https://www.solarsystemscope.com/textures/download/8k_stars_milky_way.jpg");
// scene.background=sceneTexture;
var cubeTextureLoader=new THREE.CubeTextureLoader();
scene.background=cubeTextureLoader.load(
  [
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
  ]
);
// scene.background = new THREE.Color( 0xffffff );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );
// Create a sphere for planet

function createPlanet(radius,color,planetPos){
  const geometry=new THREE.SphereGeometry(radius, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);  
  const material=new THREE.MeshBasicMaterial(color);
  const planet = new THREE.Mesh( geometry, material );
  planet.position.x=planetPos.x;
  planet.position.y=planetPos.y;
  return planet;
}

// creating a elliptical shape
function createEllipse(xradius,yRadius){
const curve = new THREE.EllipseCurve(
  0,  0,            // ax, aY
  xradius, yRadius,           // xRadius, yRadius
  0,  2 * Math.PI,  // aStartAngle, aEndAngle
  false,            // aClockwise
  0                 // aRotation
);
const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color: 0xffffff } );
// Create the final object to add to the scene
const ellipse = new THREE.Line( geometry, material );
return ellipse;
}

// const planets=[
//   createPlanet(2,{color:0xeff542},{x:0,y:0}),
//   createPlanet(0.2,{color:0xaeb0ac},{x:3,y:0}),
//   createPlanet(0.4,{color:0xa88532},{x:4,y:0}),
//   createPlanet(0.5,{color:0x4faaf0},{x:5,y:0}),
//   createPlanet(0.3,{color:0xa64f3c},{x:6,y:0}),
//   createPlanet(1.5,{color:0x9e8680},{x:9,y:0}),
//   createPlanet(0.8,{color:0xc2fcc2},{x:12,y:0}),
//   createPlanet(0.6,{color:0x43a7a8},{x:15,y:0}),
//   createPlanet(0.6,{color:0x0348a8},{x:17,y:0})
//   ]

//texture
var textureLoader = new THREE.TextureLoader();
const sun = createPlanet(2,{map:textureLoader.load(sunTexture)},{x:0,y:0});
scene.add(sun);
camera.position.z=25;


const light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 0, 0, 0 );
scene.add(light);

controls.update();
//  Mercury
const mercuryEllipse=createEllipse(3,3);
const mercury=createPlanet(0.2,{map:textureLoader.load(mercuryTexture)},{x:3,y:0});
scene.add(mercuryEllipse);
scene.add(mercury);

// Venus
const venusEllipse=createEllipse(4,4);
const venus=createPlanet(0.4,{map:textureLoader.load(venusTexture)},{x:4,y:0});
scene.add(venusEllipse);
scene.add(venus);

// Earth
const earthEllipse=createEllipse(5,5);
const earth=createPlanet(0.5,{map:textureLoader.load(earthTexture)},{x:5,y:0});
scene.add(earthEllipse);
scene.add(earth);

//Mars
const marsEllipse=createEllipse(6,6);
const mars=createPlanet(0.3,{map:textureLoader.load(marsTexture)},{x:6,y:0});
scene.add(marsEllipse);
scene.add(mars);

//Jupiter
const jupiterEllipse=createEllipse(9,9);
const jupiter=createPlanet(1.5,{map:textureLoader.load(jupiterTexture)},{x:9,y:0});
scene.add(jupiterEllipse);
scene.add(jupiter);

//Saturn Group ( Planet and Ring Object)
const group = new THREE.Group();
//Saturn
const saturnEllipse=createEllipse(12,12);
const saturn=createPlanet(0.8,{map:textureLoader.load(saturnTexture)},{x:12,y:0});
scene.add(saturnEllipse);
scene.add(saturn);

//Uranus 
const uranusEllipse=createEllipse(15,15);
const uranus=createPlanet(0.6,{map:textureLoader.load(uranusTexture)},{x:15,y:0});
scene.add(uranusEllipse);
scene.add(uranus);

//Neptune
const neptuneEllipse=createEllipse(17,17);
const neptune=createPlanet(0.6,{map:textureLoader.load(neptuneTexture)},{x:17,y:0});
scene.add(neptuneEllipse);
scene.add(neptune);

var date;
var circularSpeed=0.0001;
function animate() {
requestAnimationFrame( animate );
 sun.rotation.z += 0.01; 
 mercury.rotation.z+=0.008;
 venus.rotation.z+=0.009;
 earth.rotation.z+=0.007;
 mars.rotation.z+=0.003;
 jupiter.rotation.z+=0.002;
 saturn.rotation.z+=0.003;
 uranus.rotation.z+=0.002;
 neptune.rotation.z+=0.001;
 date = Date.now() *(circularSpeed+0.0009);
 mercury.position.set(
  Math.cos(date) * 3,
  Math.sin(date) * 3,
  0
);

 date = Date.now() * (circularSpeed+0.0006);
  venus.position.set(
  Math.cos(date) * 4,
  Math.sin(date) * 4,
  0
);
  date = Date.now() * (circularSpeed+0.0002);
  earth.position.set(
  Math.cos(date) * 5,
  Math.sin(date) * 5,
  0
);
  date = Date.now() * (circularSpeed+0.0001);
  mars.position.set(
  Math.cos(date) * 6,
  Math.sin(date) * 6,
  0
);
  date = Date.now() * (circularSpeed+0.000004);
  jupiter.position.set(
  Math.cos(date) * 9,
  Math.sin(date) * 9,
  0
);

  date = Date.now() * (circularSpeed+0.000006);
  saturn.position.set(
  Math.cos(date) * 12,
  Math.sin(date) * 12,
  0
);

  date = Date.now() * (circularSpeed+0.0000002);
  uranus.position.set(
  Math.cos(date) * 15,
  Math.sin(date) * 15,
  0
);

  date = Date.now() * (circularSpeed+0.00000001);
  neptune.position.set(
  Math.cos(date) * 17,
  Math.sin(date) * 17,
  0
);
 controls.update();
 renderer.render( scene, camera );
}

animate();