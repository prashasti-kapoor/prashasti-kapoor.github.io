// src/components/NeuralNet.js
import * as THREE from 'three';

const canvas = document.getElementById('neural-net');
if (!canvas) {
  console.warn('[NeuralNet] Canvas #neural-net not found.');
} else {
  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,          // transparent so backgrounds show
    premultipliedAlpha: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0); // fully transparent

  // Scene & camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 60;

  // ---------- Helper: circular sprite texture for round points ----------
  function makeCircleTexture(size = 64) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');

    // transparent background
    ctx.clearRect(0, 0, size, size);

    // soft radial alpha for smooth edges
    const r = size / 2;
    const g = ctx.createRadialGradient(r, r, r * 0.1, r, r, r);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(r, r, r, 0, Math.PI * 2);
    ctx.fill();

    const tex = new THREE.Texture(c);
    tex.needsUpdate = true;
    tex.flipY = false;
    return tex;
  }

  // --- NEURON INITIALIZATION (incremental growth kept) ---
  const MAX_NEURONS = 250;
  let currentNeuronCount = 0;
  const positions = new Float32Array(MAX_NEURONS * 3);

  const pointsGeom = new THREE.BufferGeometry();
  pointsGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  pointsGeom.setDrawRange(0, 0);

  const pointsMat = new THREE.PointsMaterial({
    size: 1.8,
    sizeAttenuation: true,
    transparent: true,
    color: 0x00ffff,              // cyan
    map: makeCircleTexture(),     // circular shape
    alphaTest: 0.05,
    depthWrite: false
  });
  const points = new THREE.Points(pointsGeom, pointsMat);
  scene.add(points);

  // Lines (connections)
  const maxConnections = 400; // total connections drawn (segments)
  const linePositions = new Float32Array(maxConnections * 2 * 3);
  const lineGeom = new THREE.BufferGeometry();
  lineGeom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  lineGeom.setDrawRange(0, 0);
  const lineMat = new THREE.LineBasicMaterial({
    transparent: true,
    opacity: 0.45,
    color: 0x00ffff // cyan
  });
  const lines = new THREE.LineSegments(lineGeom, lineMat);
  scene.add(lines);

  // Resize
  function setSize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w || canvas.height !== h) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
  }

  // Growth timing
  let lastNeuronAddTime = 0;
  const NEURON_ADD_INTERVAL = 40; // ms — 25 per second → ~10s to reach 250

  function animate(time) {
    setSize();

    // Add neurons over time
    if (currentNeuronCount < MAX_NEURONS && time - lastNeuronAddTime > NEURON_ADD_INTERVAL) {
      lastNeuronAddTime = time;

      const idx = currentNeuronCount * 3;
      const arr = pointsGeom.attributes.position.array;

      // random cube; you can later swap to a brain or sphere sampler if you want
      arr[idx + 0] = (Math.random() - 0.5) * 120;
      arr[idx + 1] = (Math.random() - 0.5) * 70;
      arr[idx + 2] = (Math.random() - 0.5) * 80;

      currentNeuronCount++;
      pointsGeom.setDrawRange(0, currentNeuronCount);
      pointsGeom.attributes.position.needsUpdate = true;
    }

    // Slow rotation
    scene.rotation.y = time * 0.0001;

    // ---------- Connection logic with constraints ----------
    // Rules: max 3 connections per neuron, min 1 connection per neuron
    const pos = pointsGeom.attributes.position.array;
    const maxSegments = maxConnections;          // number of line segments allowed
    const threshold = 18;                        // distance threshold
    const maxPerNeuron = 3;
    const minPerNeuron = 1;

    // Track how many connections each neuron currently has
    const connCounts = new Uint8Array(currentNeuronCount);
    let write = 0;

    // First pass: connect close-by neurons up to maxPerNeuron
    for (let i = 0; i < currentNeuronCount && write / 6 < maxSegments; i++) {
      // skip if i is already saturated
      if (connCounts[i] >= maxPerNeuron) continue;

      const ix = i * 3;
      for (let j = i + 1; j < currentNeuronCount && write / 6 < maxSegments; j++) {
        if (connCounts[i] >= maxPerNeuron) break;
        if (connCounts[j] >= maxPerNeuron) continue;

        const jx = j * 3;
        const dx = pos[ix] - pos[jx];
        const dy = pos[ix + 1] - pos[jx + 1];
        const dz = pos[ix + 2] - pos[jx + 2];
        const d2 = dx * dx + dy * dy + dz * dz;

        if (d2 < threshold * threshold) {
          linePositions[write++] = pos[ix];
          linePositions[write++] = pos[ix + 1];
          linePositions[write++] = pos[ix + 2];
          linePositions[write++] = pos[jx];
          linePositions[write++] = pos[jx + 1];
          linePositions[write++] = pos[jx + 2];

          connCounts[i] += 1;
          connCounts[j] += 1;
        }
      }
    }

    // Second pass: ensure minimum connections (connect to nearest if needed)
    if (currentNeuronCount > 1) {
      for (let i = 0; i < currentNeuronCount && write / 6 < maxSegments; i++) {
        if (connCounts[i] >= minPerNeuron) continue;

        const ix = i * 3;
        // find nearest neighbor that still has capacity
        let bestJ = -1;
        let bestD2 = Infinity;

        for (let j = 0; j < currentNeuronCount; j++) {
          if (i === j) continue;
          if (connCounts[j] >= maxPerNeuron) continue;

          const jx = j * 3;
          const dx = pos[ix] - pos[jx];
          const dy = pos[ix + 1] - pos[jx + 1];
          const dz = pos[ix + 2] - pos[jx + 2];
          const d2 = dx * dx + dy * dy + dz * dz;

          if (d2 < bestD2) {
            bestD2 = d2;
            bestJ = j;
          }
        }

        if (bestJ !== -1 && write / 6 < maxSegments) {
          const jx = bestJ * 3;

          linePositions[write++] = pos[ix];
          linePositions[write++] = pos[ix + 1];
          linePositions[write++] = pos[ix + 2];
          linePositions[write++] = pos[jx];
          linePositions[write++] = pos[jx + 1];
          linePositions[write++] = pos[jx + 2];

          connCounts[i] += 1;
          connCounts[bestJ] += 1;
        }
      }
    }

    const segmentsUsed = Math.floor(write / 6);
    lineGeom.setDrawRange(0, segmentsUsed * 2);
    lineGeom.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  // Handle window resize (CSS size changes)
  window.addEventListener('resize', () => setSize());
}
