import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';

const $ = id => document.getElementById(id);

const FALLBACK_CUPS = {
  sunset: {
    name: 'Sunset Cup',
    tracks: ['canyon-sprint', 'harbor-hustle', 'mushroom-meadow', 'neon-nightway']
  },
  wild: {
    name: 'Wild Cup',
    tracks: ['frostbite-pass', 'jungle-jam', 'clockwork-circuit', 'volcano-run']
  }
};

const FALLBACK_TRACKS = {
  'canyon-sprint': {
    id: 'canyon-sprint', name: 'Canyon Sprint', width: 12, ground: '#9b704d', road: '#c18b55', sky: '#f4b16e', edge: '#f4df9c', decoration: '#376b45',
    points: [[-24, -20], [0, -36], [28, -18], [36, 12], [12, 34], [-24, 24], [-36, 0]]
  },
  'harbor-hustle': {
    id: 'harbor-hustle', name: 'Harbor Hustle', width: 12, ground: '#4f8790', road: '#5e9cae', sky: '#9bd9e8', edge: '#f4df9c', decoration: '#376b45',
    points: [[-30, -15], [-15, -34], [18, -30], [34, -8], [28, 22], [0, 34], [-30, 20]]
  },
  'mushroom-meadow': {
    id: 'mushroom-meadow', name: 'Mushroom Meadow', width: 12, ground: '#4c8052', road: '#72a85c', sky: '#9ad9f2', edge: '#f4df9c', decoration: '#376b45',
    points: [[-22, -28], [10, -36], [34, -12], [26, 22], [0, 34], [-32, 20], [-36, -8]]
  },
  'neon-nightway': {
    id: 'neon-nightway', name: 'Neon Nightway', width: 12, ground: '#242844', road: '#343b5e', sky: '#171c48', edge: '#f4df9c', decoration: '#376b45',
    points: [[-30, -10], [-18, -34], [16, -30], [34, -5], [20, 28], [-10, 34], [-34, 12]]
  },
  'frostbite-pass': {
    id: 'frostbite-pass', name: 'Frostbite Pass', width: 12, ground: '#7f9eae', road: '#d2e6ee', sky: '#c5e8ff', edge: '#f4df9c', decoration: '#376b45',
    points: [[-25, -24], [0, -36], [30, -18], [32, 14], [8, 34], [-24, 26], [-36, 0]]
  },
  'jungle-jam': {
    id: 'jungle-jam', name: 'Jungle Jam', width: 12, ground: '#376e42', road: '#57964e', sky: '#80c9a5', edge: '#f4df9c', decoration: '#376b45',
    points: [[-28, -22], [-5, -36], [25, -24], [36, 5], [20, 32], [-12, 34], [-36, 8]]
  },
  'clockwork-circuit': {
    id: 'clockwork-circuit', name: 'Clockwork Circuit', width: 12, ground: '#77736b', road: '#a39b8c', sky: '#e5c47a', edge: '#f4df9c', decoration: '#376b45',
    points: [[-30, -20], [-12, -35], [16, -32], [34, -12], [32, 18], [8, 34], [-22, 30], [-36, 2]]
  },
  'volcano-run': {
    id: 'volcano-run', name: 'Volcano Run', width: 12, ground: '#5a3930', road: '#8c4a35', sky: '#ff8a54', edge: '#f4df9c', decoration: '#376b45',
    points: [[-26, -22], [0, -36], [28, -22], [36, 8], [18, 32], [-14, 34], [-36, 8]]
  }
};

const FALLBACK_DRIVERS = {
  rex: { id: 'rex', name: 'Rex', color: '#ff654f', stats: { speed: 7, acceleration: 7, handling: 7 } },
  nova: { id: 'nova', name: 'Nova', color: '#4fc3f7', stats: { speed: 7, acceleration: 7, handling: 7 } },
  pip: { id: 'pip', name: 'Pip', color: '#ffd34e', stats: { speed: 7, acceleration: 7, handling: 7 } },
  moss: { id: 'moss', name: 'Moss', color: '#79d68c', stats: { speed: 7, acceleration: 7, handling: 7 } },
  vex: { id: 'vex', name: 'Vex', color: '#c59aff', stats: { speed: 7, acceleration: 7, handling: 7 } },
  bolt: { id: 'bolt', name: 'Bolt', color: '#ff91c8', stats: { speed: 7, acceleration: 7, handling: 7 } },
  skye: { id: 'skye', name: 'Skye', color: '#eeeeee', stats: { speed: 7, acceleration: 7, handling: 7 } },
  drift: { id: 'drift', name: 'Drift', color: '#ff9b42', stats: { speed: 7, acceleration: 7, handling: 7 } }
};

const FALLBACK_KARTS = {
  rally: { id: 'rally', name: 'Rally', stats: { topSpeed: 8, acceleration: 9, grip: 8 } },
  comet: { id: 'comet', name: 'Comet', stats: { topSpeed: 7, acceleration: 8, grip: 7 } },
  zip: { id: 'zip', name: 'Zip', stats: { topSpeed: 8, acceleration: 9, grip: 8 } },
  sprout: { id: 'sprout', name: 'Sprout', stats: { topSpeed: 8, acceleration: 9, grip: 7 } },
  phantom: { id: 'phantom', name: 'Phantom', stats: { topSpeed: 9, acceleration: 7, grip: 8 } },
  rocket: { id: 'rocket', name: 'Rocket', stats: { topSpeed: 7, acceleration: 8, grip: 8 } },
  buggy: { id: 'buggy', name: 'Buggy', stats: { topSpeed: 9, acceleration: 7, grip: 7 } },
  titan: { id: 'titan', name: 'Titan', stats: { topSpeed: 7, acceleration: 8, grip: 7 } }
};

const driverIds = ['rex', 'nova', 'pip', 'moss', 'vex', 'bolt', 'skye', 'drift'];
const kartIds = ['rally', 'comet', 'zip', 'sprout', 'phantom', 'rocket', 'buggy', 'titan'];
const palette = [0xff654f, 0x4fc3f7, 0xffd34e, 0x79d68c, 0xc59aff, 0xff91c8, 0xeeeeee, 0xff9b42];

let cups = structuredClone(FALLBACK_CUPS);
let tracksCache = structuredClone(FALLBACK_TRACKS);
let racers = [];
let sharedScene = null;
let sharedCurve = null;
let anim = 0;
let keys = {};
let paused = false;
let last = 0;
let raceStart = 0;
let elapsed = 0;
let trackData = null;
let raceDone = false;
let lapCount = 3;

async function fetchJson(path, fallback) {
  try {
    const res = await fetch(path);
    if (!res.ok) return fallback;
    return await res.json();
  } catch {
    return fallback;
  }
}

function refreshTracks() {
  const trackEl = $('track');
  const cupEl = $('cup');
  const selected = trackEl.value;
  const all = [...cups.sunset.tracks, ...cups.wild.tracks];

  trackEl.innerHTML = `
    <optgroup label="${cups.sunset.name.toUpperCase()}">
      ${cups.sunset.tracks.map(id => `<option value="${id}">${tracksCache[id]?.name || id}</option>`).join('')}
    </optgroup>
    <optgroup label="${cups.wild.name.toUpperCase()}">
      ${cups.wild.tracks.map(id => `<option value="${id}">${tracksCache[id]?.name || id}</option>`).join('')}
    </optgroup>
  `;

  if (all.includes(selected)) {
    trackEl.value = selected;
  } else {
    const cupKey = cupEl.value in cups ? cupEl.value : 'sunset';
    trackEl.value = cups[cupKey].tracks[0];
  }
}

async function initManifests() {
  refreshTracks();
  const [sunsetCup, wildCup] = await Promise.all([
    fetchJson('cups/sunset-cup.json', null),
    fetchJson('cups/wild-cup.json', null)
  ]);
  if (sunsetCup?.tracks?.length) cups.sunset = { name: sunsetCup.name || 'Sunset Cup', tracks: sunsetCup.tracks };
  if (wildCup?.tracks?.length) cups.wild = { name: wildCup.name || 'Wild Cup', tracks: wildCup.tracks };

  const allIds = [...new Set([...cups.sunset.tracks, ...cups.wild.tracks])];
  await Promise.all(allIds.map(async id => {
    const data = await fetchJson(`tracks/${id}.json`, null);
    if (data && Array.isArray(data.points) && data.points.length >= 4) {
      tracksCache[id] = data;
    }
  }));
  refreshTracks();
}

$('cup').addEventListener('change', () => {
  const cupKey = $('cup').value in cups ? $('cup').value : 'sunset';
  $('track').value = cups[cupKey].tracks[0];
});

initManifests();

function makeKart(color) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.5 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.48, 2), mat);
  body.position.y = 0.55;
  g.add(body);

  const nose = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.28, 0.55), mat);
  nose.position.set(0, 0.7, -0.95);
  g.add(nose);

  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.48, 0.7), new THREE.MeshStandardMaterial({ color: 0x263044 }));
  seat.position.set(0, 0.95, 0.12);
  g.add(seat);

  for (const x of [-0.8, 0.8]) {
    for (const z of [-0.65, 0.65]) {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.22, 14), new THREE.MeshStandardMaterial({ color: 0x15191e }));
      w.rotation.z = Math.PI / 2;
      w.position.set(x, 0.28, z);
      g.add(w);
    }
  }
  return g;
}

function buildTrack(scene, data) {
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(260, 260), new THREE.MeshStandardMaterial({ color: data.ground }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.25;
  scene.add(ground);

  const pts = data.points.map(p => new THREE.Vector3(p[0], 0, p[1]));
  const curve = new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.15);
  const samples = 320;
  const verts = [];
  const indices = [];

  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const p = curve.getPointAt(t);
    const tan = curve.getTangentAt(t);
    const side = new THREE.Vector3(-tan.z, 0, tan.x).normalize();
    const half = (data.width || 12) / 2;
    verts.push(p.x + side.x * half, 0.015, p.z + side.z * half, p.x - side.x * half, 0.015, p.z - side.z * half);
    if (i < samples) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  const road = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: data.road, side: THREE.DoubleSide, roughness: 0.95 }));
  scene.add(road);

  const edgeMat = new THREE.MeshStandardMaterial({ color: data.edge || '#f2d18a' });
  for (const side of [-1, 1]) {
    const ev = [];
    for (let i = 0; i <= samples; i++) {
      const p = curve.getPointAt(i / samples);
      const t = curve.getTangentAt(i / samples);
      const s = new THREE.Vector3(-t.z, 0, t.x).normalize();
      ev.push(new THREE.Vector3(p.x + s.x * ((data.width || 12) / 2 + 0.35) * side, 0.12, p.z + s.z * ((data.width || 12) / 2 + 0.35) * side));
    }
    const line = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ev), samples, 0.16, 6, false), edgeMat);
    scene.add(line);
  }

  // Start / Finish arch
  const startPt = curve.getPointAt(0);
  const startTan = curve.getTangentAt(0);
  const archGroup = new THREE.Group();
  archGroup.position.set(startPt.x, 0, startPt.z);
  archGroup.rotation.y = Math.atan2(-startTan.x, -startTan.z);
  const archMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const postL = new THREE.Mesh(new THREE.BoxGeometry(0.45, 4.5, 0.45), archMat);
  postL.position.set(-((data.width || 12) / 2 + 0.4), 2.25, 0);
  const postR = postL.clone();
  postR.position.x = (data.width || 12) / 2 + 0.4;
  const banner = new THREE.Mesh(new THREE.BoxGeometry((data.width || 12) + 1.4, 0.85, 0.45), new THREE.MeshStandardMaterial({ color: 0xffd36b }));
  banner.position.set(0, 4.3, 0);
  archGroup.add(postL, postR, banner);
  scene.add(archGroup);

  const deco = new THREE.MeshStandardMaterial({ color: data.decoration || '#386a45' });
  for (let i = 0; i < 48; i++) {
    const p = curve.getPointAt(i / 48);
    const tan = curve.getTangentAt(i / 48);
    const s = new THREE.Vector3(-tan.z, 0, tan.x).normalize();
    const tree = new THREE.Mesh(new THREE.ConeGeometry(1.25, 3.7, 7), deco);
    tree.position.set(p.x + s.x * ((data.width || 12) / 2 + 7), 1.8, p.z + s.z * ((data.width || 12) / 2 + 7));
    scene.add(tree);
  }

  return curve;
}

async function loadDriver(id) {
  return fetchJson(`drivers/${id}.json`, FALLBACK_DRIVERS[id] || { id, name: id, color: '#ff654f' });
}

async function loadKart(id) {
  return fetchJson(`karts/${id}.json`, FALLBACK_KARTS[id] || { id, name: id, stats: { topSpeed: 8, acceleration: 8, grip: 8 } });
}

function getConnectedPads() {
  const raw = navigator.getGamepads ? navigator.getGamepads() : [];
  const pads = [];
  for (let i = 0; i < raw.length; i++) {
    if (raw[i]) pads.push(raw[i]);
  }
  return pads;
}

function readPadInput(pad) {
  if (!pad) return { steer: 0, throttle: 0, brake: 0 };
  const deadzone = 0.16;
  let axisX = pad.axes?.[0] || 0;
  if (Math.abs(axisX) < deadzone) axisX = 0;

  const dpadLeft = pad.buttons?.[14]?.pressed ? -1 : 0;
  const dpadRight = pad.buttons?.[15]?.pressed ? 1 : 0;
  const steer = THREE.MathUtils.clamp(axisX + dpadLeft + dpadRight, -1, 1);

  const rt = pad.buttons?.[7]?.value || 0;
  const btnA = pad.buttons?.[0]?.pressed ? 1 : 0;
  const btnX = pad.buttons?.[2]?.pressed ? 1 : 0;
  const throttle = Math.max(rt, btnA, btnX);

  const lt = pad.buttons?.[6]?.value || 0;
  const btnB = pad.buttons?.[1]?.pressed ? 1 : 0;
  const brake = Math.max(lt, btnB);

  return { steer, throttle, brake };
}

function getControls(r, humans, pads) {
  if (r.bot) {
    return { steer: r.aiTargetOffset - r.offset, throttle: 0.84, brake: 0 };
  }

  // Player 1 (index 0): Supports BOTH WASD and Arrow Keys in 1P mode (plus Gamepad 0);
  // in 2+ player mode, Player 1 uses WASD (+ Gamepad 0) while Player 2 uses Arrows (+ Gamepad 1).
  if (r.index === 0) {
    const useArrowsForP1 = humans === 1;
    const kbSteer =
      (keys.KeyA || (useArrowsForP1 && keys.ArrowLeft) ? -1 : 0) +
      (keys.KeyD || (useArrowsForP1 && keys.ArrowRight) ? 1 : 0);
    const kbThrottle = keys.KeyW || (useArrowsForP1 && keys.ArrowUp) ? 1 : 0;
    const kbBrake = keys.KeyS || (useArrowsForP1 && keys.ArrowDown) ? 1 : 0;
    const gp = readPadInput(pads[0]);
    return {
      steer: THREE.MathUtils.clamp(kbSteer + gp.steer, -1, 1),
      throttle: Math.max(kbThrottle, gp.throttle),
      brake: Math.max(kbBrake, gp.brake)
    };
  }

  if (r.index === 1) {
    const kbSteer = (keys.ArrowLeft ? -1 : 0) + (keys.ArrowRight ? 1 : 0);
    const kbThrottle = keys.ArrowUp ? 1 : 0;
    const kbBrake = keys.ArrowDown ? 1 : 0;
    const gp = readPadInput(pads[1]);
    return {
      steer: THREE.MathUtils.clamp(kbSteer + gp.steer, -1, 1),
      throttle: Math.max(kbThrottle, gp.throttle),
      brake: Math.max(kbBrake, gp.brake)
    };
  }

  // Players 3 & 4 use Gamepads 2 & 3 (or 0 & 1 if keyboard players don't use pads)
  const pad = pads[r.index] || pads[r.index - 2];
  return readPadInput(pad);
}

function createRacer(i, humans, scene, curve, driver, kart) {
  const isHuman = i < humans;
  const color = i === 0 ? new THREE.Color(driver.color || palette[0]) : new THREE.Color(driver.color || palette[i % palette.length]);
  const car = makeKart(color);
  scene.add(car);

  const progress = (i / 8 + 0.985) % 1;
  const p = curve.getPointAt(progress);
  const tan = curve.getTangentAt(progress);
  const laneOffset = (i % 2 === 0 ? -0.35 : 0.35);
  const side = new THREE.Vector3(-tan.z, 0, tan.x).normalize();

  car.position.set(p.x + side.x * laneOffset * 2, 0.05, p.z + side.z * laneOffset * 2);
  car.rotation.y = Math.atan2(-tan.x, -tan.z);

  let wrap = null;
  let renderer = null;
  let camera = null;

  // Create split-screen viewports ONLY for human local players (1 viewport for 1P, 2 for 2P, etc.)
  if (isHuman) {
    wrap = document.createElement('div');
    wrap.className = 'viewport';
    wrap.innerHTML = `<span class="tag">P${i + 1} · ${driver.name} (${kart.name}) · LAP 1/${lapCount}</span>`;
    $('views').append(wrap);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    wrap.append(renderer.domElement);

    camera = new THREE.PerspectiveCamera(62, 1, 0.1, 400);
    camera.position.set(car.position.x, 4.2, car.position.z + 7);
  }

  const speedBonus = ((kart?.stats?.topSpeed || 8) - 7) * 0.6;
  const accelBonus = ((kart?.stats?.acceleration || 8) - 7) * 0.8;

  return {
    wrap,
    renderer,
    camera,
    car,
    progress,
    speed: 0,
    maxSpeed: (isHuman ? 25 : 21) + speedBonus,
    accel: 19 + accelBonus,
    bot: !isHuman,
    index: i,
    driver,
    kart,
    finished: false,
    lap: 0,
    offset: laneOffset,
    aiTargetOffset: laneOffset,
    aiTimer: Math.random() * 2
  };
}

async function startRace() {
  $('error').textContent = '';
  const humans = Number($('players').value);
  const bots = Number($('bots').value);
  const total = humans + bots;

  if (total < 1 || total > 8) {
    $('error').textContent = 'Choose between 1 and 8 racers in total.';
    return;
  }

  $('start').disabled = true;
  $('start').textContent = 'LOADING TRACK…';

  try {
    if (racers.length) disposeRace();

    const id = $('track').value || cups.sunset.tracks[0];
    const fetchedTrack = await fetchJson(`tracks/${id}.json`, null);
    trackData = fetchedTrack && Array.isArray(fetchedTrack.points) && fetchedTrack.points.length >= 4
      ? fetchedTrack
      : tracksCache[id] || FALLBACK_TRACKS[id];

    if (!trackData || !Array.isArray(trackData.points) || trackData.points.length < 4) {
      throw Error('Selected track could not be loaded.');
    }

    const selectedDriver = await loadDriver($('driver').value);
    const selectedKart = await loadKart($('kart').value);

    const drivers = [];
    const karts = [];
    for (let i = 0; i < total; i++) {
      drivers.push(i === 0 ? selectedDriver : await loadDriver(driverIds[(i + 1) % driverIds.length]));
      karts.push(i === 0 ? selectedKart : await loadKart(kartIds[(i + 1) % kartIds.length]));
    }

    $('menu').classList.add('hidden');
    $('results').classList.add('hidden');
    $('race').classList.remove('hidden');
    $('views').innerHTML = '';

    // Grid layout sized strictly to human local players (1P = 1x1 full screen, 2P = 2x1, 3-4P = 2x2)
    const cols = humans === 1 ? 1 : 2;
    const rows = Math.ceil(humans / cols);
    $('views').style.setProperty('--cols', cols);
    $('views').style.setProperty('--rows', rows);

    sharedScene = new THREE.Scene();
    sharedScene.background = new THREE.Color(trackData.sky || '#87b9d8');
    sharedScene.fog = new THREE.Fog(trackData.sky || '#87b9d8', 95, 220);
    sharedScene.add(new THREE.HemisphereLight(0xffffff, 0x56614d, 2));
    const sun = new THREE.DirectionalLight(0xffffff, 2.2);
    sun.position.set(20, 40, 10);
    sharedScene.add(sun);

    sharedCurve = buildTrack(sharedScene, trackData);
    lapCount = Number($('laps').value);
    racers = drivers.map((d, i) => createRacer(i, humans, sharedScene, sharedCurve, d, karts[i]));

    raceStart = performance.now() + 3000;
    elapsed = 0;
    paused = false;
    raceDone = false;
    $('pause').textContent = 'Ⅱ PAUSE';
    $('trackName').textContent = trackData.name || id;
    last = performance.now();

    cancelAnimationFrame(anim);
    anim = requestAnimationFrame(frame);
  } catch (e) {
    $('error').textContent = 'Could not load race: ' + (e?.message || e);
    $('race').classList.add('hidden');
    $('menu').classList.remove('hidden');
  } finally {
    $('start').disabled = false;
    $('start').textContent = '▶ START RACE';
  }
}

function frame(now) {
  anim = requestAnimationFrame(frame);
  if (paused || raceDone) {
    last = now;
    return;
  }

  const dt = Math.min(0.04, (now - last) / 1000);
  last = now;
  const humans = Number($('players').value);
  const pads = getConnectedPads();

  const countingDown = now < raceStart;
  if (countingDown) {
    $('clock').textContent = Math.ceil((raceStart - now) / 1000);
  } else {
    $('clock').textContent = 'GO!';
    elapsed = (now - raceStart) / 1000;
  }

  const roadHalf = ((trackData?.width || 12) / 2) - 1.2;

  for (const r of racers) {
    if (!countingDown) {
      if (r.bot) {
        r.aiTimer -= dt;
        if (r.aiTimer <= 0) {
          r.aiTimer = 1.5 + Math.random() * 2.5;
          r.aiTargetOffset = (Math.random() * 1.4) - 0.7;
        }
      }

      const c = getControls(r, humans, pads);
      r.speed = THREE.MathUtils.clamp(r.speed + (c.throttle * r.accel - c.brake * 26 - r.speed * 0.55) * dt, 0, r.maxSpeed);
      r.progress += (r.speed * dt) / 120;

      if (r.progress >= 1) {
        r.progress -= 1;
        r.lap++;
        if (r.lap >= lapCount) r.finished = true;
      }

      r.offset = THREE.MathUtils.clamp(r.offset + c.steer * dt * 2.4, -1, 1);
      r.steerVisual = c.steer;
    } else {
      r.steerVisual = 0;
    }

    const p = sharedCurve.getPointAt(r.progress);
    const t = sharedCurve.getTangentAt(r.progress);
    const side = new THREE.Vector3(-t.z, 0, t.x).normalize();
    const lateral = r.offset * Math.max(2, roadHalf);

    r.car.position.set(p.x + side.x * lateral, 0.05, p.z + side.z * lateral);
    const angle = Math.atan2(-t.x, -t.z) - (r.steerVisual || 0) * 0.15;
    r.car.rotation.y = angle;

    if (r.camera && r.renderer && r.wrap) {
      const back = new THREE.Vector3(Math.sin(angle) * 7, 4.2, Math.cos(angle) * 7);
      const cp = new THREE.Vector3(p.x + back.x + side.x * lateral, back.y, p.z + back.z + side.z * lateral);
      r.camera.position.lerp(cp, countingDown ? 1 : 0.16);
      r.camera.lookAt(p.x + side.x * lateral * 0.5, 1, p.z + side.z * lateral * 0.5);

      const tag = r.wrap.querySelector('.tag');
      if (tag) {
        const displayLap = Math.min(r.lap + 1, lapCount);
        tag.textContent = `P${r.index + 1} · ${r.driver.name} (${r.kart.name}) · LAP ${displayLap}/${lapCount}`;
      }

      const w = r.wrap.clientWidth;
      const h = r.wrap.clientHeight;
      if (w && h) {
        r.renderer.setSize(w, h, false);
        r.camera.aspect = w / h;
        r.camera.updateProjectionMatrix();
        r.renderer.render(sharedScene, r.camera);
      }
    }
  }

  $('raceInfo').textContent = countingDown ? 'GET READY' : `${elapsed.toFixed(1)}s · ${lapCount} LAPS`;

  const humanRacers = racers.filter(r => !r.bot);
  if ((humanRacers.length > 0 && humanRacers.every(r => r.finished)) || racers.every(r => r.finished) || elapsed > 240) {
    finishRace();
  }
}

function finishRace() {
  if (raceDone) return;
  raceDone = true;
  cancelAnimationFrame(anim);
  const order = [...racers].sort((a, b) => (b.lap + b.progress) - (a.lap + a.progress));
  $('places').innerHTML = order
    .map((r, i) => `<li><b>${i + 1}.</b> ${r.bot ? 'CPU' : 'Player ' + (r.index + 1)} — ${r.driver.name} (${r.kart.name})</li>`)
    .join('');
  $('race').classList.add('hidden');
  $('results').classList.remove('hidden');
}

function disposeRace() {
  cancelAnimationFrame(anim);
  for (const r of racers) {
    if (r.renderer) r.renderer.dispose();
    if (r.wrap) r.wrap.remove();
  }
  if (sharedScene) {
    sharedScene.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        if (Array.isArray(o.material)) o.material.forEach(m => m.dispose());
        else o.material.dispose();
      }
    });
    sharedScene = null;
  }
  sharedCurve = null;
  racers = [];
}

function leaveRace() {
  disposeRace();
  $('race').classList.add('hidden');
  $('results').classList.add('hidden');
  $('menu').classList.remove('hidden');
}

$('start').addEventListener('click', startRace);
$('again').addEventListener('click', startRace);
$('home').addEventListener('click', leaveRace);
$('quit').addEventListener('click', leaveRace);
$('pause').addEventListener('click', () => {
  paused = !paused;
  $('pause').textContent = paused ? '▶ RESUME' : 'Ⅱ PAUSE';
});

addEventListener('keydown', e => {
  keys[e.code] = true;
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code) && !$('race').classList.contains('hidden')) {
    e.preventDefault();
  }
  if (e.code === 'Escape' && !$('race').classList.contains('hidden')) {
    $('pause').click();
  }
});

addEventListener('keyup', e => {
  keys[e.code] = false;
});

addEventListener('resize', () => {
  for (const r of racers) {
    if (r.wrap && r.camera && r.renderer) {
      const w = r.wrap.clientWidth;
      const h = r.wrap.clientHeight;
      if (w && h) {
        r.camera.aspect = w / h;
        r.camera.updateProjectionMatrix();
        r.renderer.setSize(w, h, false);
      }
    }
  }
});
