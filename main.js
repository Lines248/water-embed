const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 55, window.innerWidth/window.innerHeight, 1, 20000 );
camera.position.set( 30, 30, 100 );

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );
const water = new THREE.Water( waterGeometry, {
  color: 0x001e0f,
  scale: 1,
  flowDirection: new THREE.Vector2(1, 1),
  textureWidth: 1024,
  textureHeight: 1024
});
water.rotation.x = - Math.PI / 2;
scene.add( water );

const light = new THREE.DirectionalLight( 0xffffff, 0.8 );
light.position.set( - 1, 1, 1 );
scene.add( light );

function animate() {
  requestAnimationFrame( animate );
  water.material.uniforms[ 'time' ].value += 1 / 60;
  renderer.render( scene, camera );
}
animate();

window.addEventListener( 'resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
});