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

// Game state
let player = {
    deck: getDeck(),
    hand: [],
    field: [],
    hp: 20,
    energy: 1,
    maxEnergy: 1
};
let ai = { deck: getDeck(), hand: [], field: [], hp: 20, energy: 1, maxEnergy: 1 };

// Draw initial hand (5 cards)
function drawCards(player, num) {
    for (let i = 0; i < num && player.deck.length > 0; i++) {
        const card = player.deck.shift();
        player.hand.push(card);
    }
}
drawCards(player, 5);
drawCards(ai, 5);

// Render hand
const handGroup = new THREE.Group();
scene.add(handGroup);
function updateHand() {
    handGroup.children.forEach(child => scene.remove(child));
    handGroup.children = [];
    player.hand.forEach((card, i) => {
        const cardGeo = new THREE.PlaneGeometry(1, 1.5);
        const cardMat = new THREE.MeshBasicMaterial({ color: card.name === "Pepe" ? 0x00ff00 : 0xffff00 }); // Green Pepe, Yellow others
        const cardMesh = new THREE.Mesh(cardGeo, cardMat);
        cardMesh.position.x = i * 1.2 - 2; // Spread hand
        cardMesh.position.y = -2; // Bottom of screen
        handGroup.add(cardMesh);
    });
}
updateHand();

// Render field
const fieldGroup = new THREE.Group();
scene.add(fieldGroup);
function updateField() {
    fieldGroup.children.forEach(child => scene.remove(child));
    fieldGroup.children = [];
    player.field.forEach((card, i) => {
        const cardGeo = new THREE.PlaneGeometry(1, 1.5);
        const cardMat = new THREE.MeshBasicMaterial({ color: card.name === "Pepe" ? 0x00ff00 : 0xffff00 });
        const cardMesh = new THREE.Mesh(cardGeo, cardMat);
        cardMesh.position.x = i * 1.2 - 1;
        fieldGroup.add(cardMesh);
    });
}

// Click handler
let selectedCard = null;
renderer.domElement.addEventListener("click", (event) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(handGroup.children);
    if (intersects.length > 0) {
        const cardMesh = intersects[0].object;
        const index = handGroup.children.indexOf(cardMesh);
        selectedCard = player.hand[index];
        if (player.energy >= selectedCard.energy && !selectedCard.type) { // Play Meme
            player.field.push(player.hand.splice(index, 1)[0]);
            player.energy -= selectedCard.energy;
            cardMesh.position.y = 0; // Move to field
            updateHand();
        }
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    updateField();
    renderer.render(scene, camera);
}
animate();