
const escena = new THREE.Scene();
const renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderizador.domElement);

const ancho = window.innerWidth;
const alto = window.innerHeight;
const camara = new THREE.OrthographicCamera(ancho / -2, ancho / 2, alto / 2, alto / -2, 0.1, 1000);
camara.position.set(0, 0, 100); //eje de la camara

//Datos de la esfera
const sphericalGeometry = new THREE.SphereGeometry( 80, 10, 10 ); 
const sphericalMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } ); 
const sphere = new THREE.Mesh( sphericalGeometry, sphericalMaterial );
escena.add( sphere );
sphere.position.set(-200, 0, 0);

//Datos del cilindro
const textureCylinderLoader = new THREE.TextureLoader();
const textureCylinder = textureCylinderLoader.load('./images/umbrella-logo.png');
textureCylinder.center.set(0.5, 0.5);
textureCylinder.rotation = 2;
const cylindricalGeometry = new THREE.CylinderGeometry( 80, 80, 50, 8 );
const cylindricalMaterial = [
  new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true}), // cara frontal
  new THREE.MeshBasicMaterial({map: textureCylinder}), // cara trasera
  new THREE.MeshBasicMaterial({map: textureCylinder}), // cara superior
];
const cylinder = new THREE.Mesh( cylindricalGeometry, cylindricalMaterial );
escena.add( cylinder );
cylinder.position.set(200, 0, 0);

//Datos Piramide
const texturePyramidLoader = new THREE.TextureLoader();
const texturePyramid = texturePyramidLoader.load('./images/brick-wall.jpeg');
const pyramidalGeometry = new THREE.ConeGeometry(80, 80, 4);
texturePyramid.center.set(0.5, 0.5);
const pyramidalMaterial = [
  new THREE.MeshBasicMaterial({map: texturePyramid}), // cara frontal
  new THREE.MeshBasicMaterial({map: texturePyramid}), // cara trasera
  new THREE.MeshBasicMaterial({color: 0xff4500}), // base
];
const pyramid = new THREE.Mesh(pyramidalGeometry, pyramidalMaterial);
escena.add(pyramid);

//Esto hace que se repita recursivamente
function animacion() {
    requestAnimationFrame(animacion);
    //rotacion piramide
    pyramid.rotation.y += 0.04; //se mueve con un periodo de 0.04
    pyramid.rotation.z += 0.02;
    //rotacion esfera
    sphere.rotation.z += 0.01;
    sphere.rotation.x += 0.05;
    //rotacion cilindro
    cylinder.rotation.x += 0.01;
    cylinder.rotation.y += 0.01;
    renderizador.render(escena, camara); //esto lo carga
}

animacion();

window.addEventListener('resize', () => {
    const ancho = window.innerWidth;
    const alto = window.innerHeight;
    camara.left = ancho / -2;
    camara.right = ancho / 2;
    camara.top = alto / 2;
    camara.bottom = alto / -2;
    camara.updateProjectionMatrix();
    renderizador.setSize(ancho, alto);
});