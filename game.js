// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("game") });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Test card (Pepe placeholder)
const cardGeo = new THREE.PlaneGeometry(1, 1.5); // Card size
const cardMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green for Pepe
const pepeCard = new THREE.Mesh(cardGeo, cardMat);
scene.add(pepeCard);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    pepeCard.rotation.y += 0.01; // Spin for fun
    renderer.render(scene, camera);
}
animate();