import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Hero visual styles based on selection
const heroStyles = {
  "Raghav": { color: 0xffa500 },      // Saffron/orange
  "Devi Aarohi": { color: 0x4169e1 },  // Royal blue
  "Vikram": { color: 0x006400 },       // Deep green
  "Kaveri": { color: 0xff1493 },       // Fuchsia
  "Siddharth": { color: 0x87cefa }      // Pastel blue
};

function DivineAkshayaGame({ selectedHero }) {
  const mountRef = useRef(null);
  const [points, setPoints] = useState(0);
  const backgroundMusicRef = useRef(null);
  const pickupSoundRef = useRef(null);

  useEffect(() => {
    // --- Start Background Music ---
    backgroundMusicRef.current = new Audio('/assets/sounds/divine_akshaya_theme.mp3');
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = 0.5;
    backgroundMusicRef.current.play().catch((err) => console.warn("Background music error:", err));

    // Preload pickup sound
    pickupSoundRef.current = new Audio('/assets/sounds/celestial_chime_pickup.mp3');
    pickupSoundRef.current.volume = 0.8;

    // --- Setup Three.js Scene ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // --- Create the Player (Hero) ---
    const playerGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const playerMaterial = new THREE.MeshStandardMaterial({ color: heroStyles[selectedHero].color });
    const player = new THREE.Mesh(playerGeometry, playerMaterial);
    scene.add(player);

    // --- Create the Divine Akshaya Collectible Token ---
    const textureLoader = new THREE.TextureLoader();
    const tokenTexture = textureLoader.load('/assets/images/divine_akshaya_token.png');
    const tokenGeometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
    const tokenMaterial = new THREE.MeshStandardMaterial({
      map: tokenTexture,
      emissive: 0xffa500,
      emissiveIntensity: 0.7
    });
    const token = new THREE.Mesh(tokenGeometry, tokenMaterial);
    scene.add(token);

    // Spawn token at a random location
    function spawnToken() {
      const range = 10;
      token.position.x = (Math.random() - 0.5) * range;
      token.position.y = (Math.random() - 0.5) * range;
      token.position.z = (Math.random() - 0.5) * range;
    }
    spawnToken();

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // --- Keyboard Controls for Movement ---
    const keysPressed = {};
    const onKeyDown = (event) => { keysPressed[event.key.toLowerCase()] = true; };
    const onKeyUp = (event) => { keysPressed[event.key.toLowerCase()] = false; };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // --- Collision Detection ---
    function checkCollision(obj1, obj2) {
      return obj1.position.distanceTo(obj2.position) < 1.0;
    }

    // --- Infinite Game Loop ---
    let lastTime = performance.now();
    const animate = () => {
      requestAnimationFrame(animate);

      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Update player position based on keyboard input
      const moveSpeed = 6;
      let dx = 0, dy = 0;
      if (keysPressed['arrowup'] || keysPressed['w']) dy += moveSpeed * delta;
      if (keysPressed['arrowdown'] || keysPressed['s']) dy -= moveSpeed * delta;
      if (keysPressed['arrowleft'] || keysPressed['a']) dx -= moveSpeed * delta;
      if (keysPressed['arrowright'] || keysPressed['d']) dx += moveSpeed * delta;
      player.position.x += dx;
      player.position.y += dy;

      // Rotate the token for visual effect
      token.rotation.x += 0.02;
      token.rotation.y += 0.02;

      // Check for collision and update points
      if (checkCollision(player, token)) {
        setPoints(prev => prev + 50);
        if (pickupSoundRef.current) {
          pickupSoundRef.current.currentTime = 0;
          pickupSoundRef.current.play().catch(err => console.warn("Pickup sound error:", err));
        }
        spawnToken();
      }

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      if (mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
      }
    };

  }, [selectedHero]);

  return (
    <div>
      <div style={{ textAlign: 'center', margin: '10px' }}>
        <h2>Wallet Points: {points}</h2>
      </div>
      <div className="game-canvas" ref={mountRef}></div>
    </div>
  );
}

export default DivineAkshayaGame;