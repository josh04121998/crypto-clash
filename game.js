// Mocked deck (20 cards)
const starterDeck = [
    { name: "Pepe", attack: 6, health: 5, energy: 5, ability: "Scam" },
    { name: "Pepe", attack: 6, health: 5, energy: 5, ability: "Scam" },
    { name: "Pepe", attack: 6, health: 5, energy: 5, ability: "Scam" },
    { name: "Pepe", attack: 6, health: 5, energy: 5, ability: "Scam" },
    { name: "Doge", attack: 5, health: 6, energy: 5, ability: "Hodl" },
    { name: "Doge", attack: 5, health: 6, energy: 5, ability: "Hodl" },
    { name: "Doge", attack: 5, health: 6, energy: 5, ability: "Hodl" },
    { name: "Shiba", attack: 4, health: 4, energy: 3, ability: "Woof Swarm" },
    { name: "Shiba", attack: 4, health: 4, energy: 3, ability: "Woof Swarm" },
    { name: "Shiba", attack: 4, health: 4, energy: 3, ability: "Woof Swarm" },
    { name: "To the Moon", type: "speed", damage: 4, energy: 4 },
    { name: "To the Moon", type: "speed", damage: 4, energy: 4 },
    { name: "FOMO", type: "speed", draw: 2, energy: 3 },
    { name: "FOMO", type: "speed", draw: 2, energy: 3 },
    { name: "Pump It", type: "speed", healthBoost: 3, energy: 2 },
    { name: "Bear Market", type: "trap", attackReduction: 2 },
    { name: "Bear Market", type: "trap", attackReduction: 2 },
    { name: "Whale Dump", type: "trap", discard: 1 },
    { name: "Whale Dump", type: "trap", discard: 1 },
    { name: "Rug Pull", type: "trap", swapHP: true }
];

function getDeck() {
    return starterDeck.slice(); // Return a copy
}
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