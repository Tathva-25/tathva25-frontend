"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MapControls } from "three/examples/jsm/controls/MapControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { EventPanel } from "./EventPanel"; // Make sure this is the version from our last conversation
import { createRoot } from "react-dom/client";
import BuildingMarker from "./BuildingMarker"; // Assuming this is in './BuildingMarker.jsx'
import BuildingCard from "./BuildingCard"; // Assuming this is in './BuildingCard.jsx'
import { IoHome } from "react-icons/io5";
// Removed direct LoadingBar usage in favor of looping variant
import LoopingLoadingBar from "@/components/LoopingLoadingBar";
import Link from "next/link";

// --- CONFIGURATION ---

const CONFIG = {
  CAMERA: {
    FOV: 60,
    NEAR: 0.1,
    FAR: 2000,
    MIN_HEIGHT_ABOVE_TERRAIN: 5, // Minimum height above ground/buildings
    DEFAULT_POSITION: new THREE.Vector3(0, 50, 80),
    DEFAULT_TARGET: new THREE.Vector3(0, 0, 0),
  },
  CONTROLS: {
    MIN_DISTANCE: 10,
    MAX_DISTANCE: 300,
    DAMPING_FACTOR: 0.05,
  },
  MAP_BOUNDS: {
    // These will be calculated from the model, but here are fallback values
    MIN_X: -200,
    MAX_X: 200,
    MIN_Z: -200,
    MAX_Z: 200,
    PADDING: 100, // Extra padding to prevent going too far out
  },
  ANIMATION: {
    LERP_FACTOR: 0.05,
    COLLISION_LERP_FACTOR: 0.3, // Faster correction for collisions
    COMPLETION_THRESHOLD: 0.5,
  },
  INTERACTION: {
    DOUBLE_TAP_TIMEOUT: 300,
    SWIPE_THRESHOLD: 10,
  },
  FLY_TO: {
    CAMERA_OFFSET: { x: -30, y: 25, z: -30 },
  },
};

const GEOSPATIAL_CONFIG = {
  // Primary reference point - NLHC (New Lecture Hall Complex)
  REFERENCE_POINT_GPS: { lat: 11.321779, lon: 75.933029 },
  REFERENCE_POINT_MODEL: new THREE.Vector3(-226.99, 27.8, -57.81),

  // Secondary reference points for verification
  SECONDARY_POINTS: [
    {
      name: "OAT (Open Air Theatre)",
      gps: { lat: 11.322217, lon: 75.933403 },
      model: new THREE.Vector3(-186.67, 17.59, -95.55),
    },
    {
      name: "ELHC Pits",
      gps: { lat: 11.322614, lon: 75.93383 },
      model: new THREE.Vector3(-127.98, 21.13, -133.26),
    },
    {
      name: "Aryabhatta/Chanakya/Bhaskara Hostels",
      gps: { lat: 11.320881, lon: 75.934079 },
      model: new THREE.Vector3(-91.75, 14.57, 49.07),
    },
    {
      name: "Main Building",
      gps: { lat: 11.321675, lon: 75.934221 },
      model: new THREE.Vector3(-87.7, 26.57, -29.69),
    },
    {
      name: "CCC",
      gps: { lat: 11.321632, lon: 75.933689 },
      model: new THREE.Vector3(-139.62, 22.95, -22.56),
    },
    {
      name: "NSL/SSL",
      gps: { lat: 11.32288, lon: 75.93425 },
      model: new THREE.Vector3(-76.46, 23.7, -155.65),
    },
    {
      name: "DB",
      gps: { lat: 11.32232, lon: 75.93491 },
      model: new THREE.Vector3(11.57, 29.36, -98.66),
    },
    {
      name: "Archi",
      gps: { lat: 11.32262, lon: 75.93682 },
      model: new THREE.Vector3(181.91, 5.32, -145.47),
    },
    {
      name: "Chemical",
      gps: { lat: 11.3233, lon: 75.93739 },
      model: new THREE.Vector3(272.35, 24.54, -220.31),
    },
    {
      name: "ECLC",
      gps: { lat: 11.32259, lon: 75.9379 },
      model: new THREE.Vector3(370.16, 14.53, -258.99),
    },
    {
      name: "G Host",
      gps: { lat: 11.32137, lon: 75.93694 },
      model: new THREE.Vector3(239.39, 24.17, -19.28),
    },
    {
      name: "D Host",
      gps: { lat: 11.32008, lon: 75.93783 },
      model: new THREE.Vector3(306.02, 23.1, 135.59),
    },
    {
      name: "E Host",
      gps: { lat: 11.31961, lon: 75.93847 },
      model: new THREE.Vector3(406.7, 21.97, 186.57),
    },
    {
      name: "F Host",
      gps: { lat: 11.32072, lon: 75.93741 },
      model: new THREE.Vector3(317.54, 20.83, 76.24),
    },
    {
      name: "C Host",
      gps: { lat: 11.32025, lon: 75.93666 },
      model: new THREE.Vector3(205.05, 25.81, 129.75),
    },
    {
      name: "B Host",
      gps: { lat: 11.32051, lon: 75.93603 },
      model: new THREE.Vector3(103.46, 31.24, 129.23),
    },
    {
      name: "A Host",
      gps: { lat: 11.32073, lon: 75.93524 },
      model: new THREE.Vector3(13.19, 26.99, 80.71),
    },
    {
      name: "Milma",
      gps: { lat: 11.3207, lon: 75.93662 },
      model: new THREE.Vector3(189.29, 22.96, 56.09),
    },
    {
      name: "Audi",
      gps: { lat: 11.32242, lon: 75.93582 },
      model: new THREE.Vector3(106.15, 18.41, -119.15),
    },
    {
      name: "Proshow",
      gps: { lat: 11.32127, lon: 75.93243 },
      model: new THREE.Vector3(-279.07, 12.88, -5.02),
    },
    {
      name: "Hockey ground",
      gps: { lat: 11.32066, lon: 75.93151 },
      model: new THREE.Vector3(-348.23, 59.43, 50.16),
    },
    {
      name: "Canteen",
      gps: { lat: 11.31998, lon: 75.932 },
      model: new THREE.Vector3(-308.08, 13.7, 159.34),
    },
    {
      name: "Tennis",
      gps: { lat: 11.32032, lon: 75.9338 },
      model: new THREE.Vector3(-133.91, 6.69, 116.23),
    },
  ],

  MODEL_SCALE: 1.0, // Will be auto-calculated
  MODEL_ROTATION_OFFSET: 0,
};

// --- DATA ---

// We will populate modelCoords dynamically from the 3D model
const LOCATION_DATA = [
  {
    id: "Building 121",
    name: "Main Building (Admin)",
    modelCoords: null,
  },
  {
    id: "Building 118",
    name: "ELHC (Electronics)",
    modelCoords: null,
  },
  {
    id: "Building 028",
    name: "CSE Building",
    modelCoords: null,
  },
];

// Note: locationId now matches the building names from your model
// let EVENT_DATA = [];
//
// async function loadEvents() {
//   try {
//     const today = new Date().getDate();
//     // const response = await fetch(`https://api.tathva.org/api/events/today/?date=${today}`);
//     const response = await fetch(`https://api.tathva.org/api/events/all`);
//
//     const data = await response.json();
//
//     // Transform the API data to match your required format
//     EVENT_DATA = data.events.map(event => ({
//       id: event.id,
//       name: event.heading,
//       committee: event.committee,
//       type: event.type,
//       startTime: event.startTime,
//       endTime: event.endTime,
//       venue: event.venue
//     }));
//
//     console.log('Events loaded:', EVENT_DATA);
//     return EVENT_DATA;
//   } catch (error) {
//     console.error('Error loading events:', error);
//     return [];
//   }
// }
//
// // Call this function when your app initializes
// loadEvents();

// --- GEOSPATIAL FUNCTIONS ---

// Haversine distance calculation
function haversineDistance(p1, p2) {
  const R = 6371e3;
  const phi1 = (p1.lat * Math.PI) / 180;
  const phi2 = (p2.lat * Math.PI) / 180;
  const deltaPhi = ((p2.lat - p1.lat) * Math.PI) / 180;
  const deltaLambda = ((p2.lon - p1.lon) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function gpsToScene(gpsCoords) {
  const {
    REFERENCE_POINT_GPS,
    REFERENCE_POINT_MODEL,
    MODEL_SCALE,
    MODEL_ROTATION_OFFSET,
  } = GEOSPATIAL_CONFIG;

  const latDistance = haversineDistance(REFERENCE_POINT_GPS, {
    lat: gpsCoords.lat,
    lon: REFERENCE_POINT_GPS.lon,
  });
  const lonDistance = haversineDistance(REFERENCE_POINT_GPS, {
    lat: REFERENCE_POINT_GPS.lat,
    lon: gpsCoords.lon,
  });

  const latSign = Math.sign(gpsCoords.lat - REFERENCE_POINT_GPS.lat);
  const lonSign = Math.sign(gpsCoords.lon - REFERENCE_POINT_GPS.lon);

  let zOffset = (latDistance * latSign) / MODEL_SCALE;
  let xOffset = (lonDistance * lonSign) / MODEL_SCALE;

  if (MODEL_ROTATION_OFFSET !== 0) {
    const rotatedX =
      xOffset * Math.cos(MODEL_ROTATION_OFFSET) -
      zOffset * Math.sin(MODEL_ROTATION_OFFSET);
    const rotatedZ =
      xOffset * Math.sin(MODEL_ROTATION_OFFSET) +
      zOffset * Math.cos(MODEL_ROTATION_OFFSET);
    xOffset = rotatedX;
    zOffset = rotatedZ;
  }

  const newPosition = new THREE.Vector3(
    REFERENCE_POINT_MODEL.x + xOffset,
    REFERENCE_POINT_MODEL.y,
    REFERENCE_POINT_MODEL.z - zOffset
  );

  return newPosition;
}

// Calculate model scale from reference points
function calculateModelScale() {
  const points = [
    {
      gps1: GEOSPATIAL_CONFIG.REFERENCE_POINT_GPS,
      model1: GEOSPATIAL_CONFIG.REFERENCE_POINT_MODEL,
      gps2: GEOSPATIAL_CONFIG.SECONDARY_POINTS[0].gps,
      model2: GEOSPATIAL_CONFIG.SECONDARY_POINTS[0].model,
    },
    {
      gps1: GEOSPATIAL_CONFIG.REFERENCE_POINT_GPS,
      model1: GEOSPATIAL_CONFIG.REFERENCE_POINT_MODEL,
      gps2: GEOSPATIAL_CONFIG.SECONDARY_POINTS[1].gps,
      model2: GEOSPATIAL_CONFIG.SECONDARY_POINTS[1].model,
    },
    {
      gps1: GEOSPATIAL_CONFIG.REFERENCE_POINT_GPS,
      model1: GEOSPATIAL_CONFIG.REFERENCE_POINT_MODEL,
      gps2: GEOSPATIAL_CONFIG.SECONDARY_POINTS[2].gps,
      model2: GEOSPATIAL_CONFIG.SECONDARY_POINTS[2].model,
    },
  ];

  const scales = points.map(({ gps1, model1, gps2, model2 }) => {
    const realDistance = haversineDistance(gps1, gps2);
    const modelDistance = Math.sqrt(
      Math.pow(model2.x - model1.x, 2) + Math.pow(model2.z - model1.z, 2)
    );
    return realDistance / modelDistance;
  });

  const avgScale = scales.reduce((a, b) => a + b, 0) / scales.length;

  console.log("=== MODEL SCALE CALCULATION ===");
  console.log(
    "Individual scales:",
    scales.map((s) => s.toFixed(3))
  );
  console.log("Average MODEL_SCALE:", avgScale.toFixed(3), "meters per unit");
  console.log("===============================");

  GEOSPATIAL_CONFIG.MODEL_SCALE = avgScale;
  return avgScale;
}

// --- HOOKS & HELPERS ---

// Custom hook for GPS tracking
function useGeolocation() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          heading: pos.coords.heading,
        });
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { position, error, loading };
}

// --- MAIN COMPONENT ---

export default function NITCMapPage() {
  const mountRef = useRef(null); // Three.js core objects

  const {
    position: userGps,
    error: gpsError,
    loading: gpsLoading,
  } = useGeolocation();

  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  const groundPlaneRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());

  // Map bounds (calculated from model)
  const mapBoundsRef = useRef({ ...CONFIG.MAP_BOUNDS }); // Animation state

  const targetPositionRef = useRef(null);
  const targetLookAtRef = useRef(null);
  const isAnimatingRef = useRef(false); // Interaction state

  const lastTapTimeRef = useRef(0);
  const tapStartPosRef = useRef(new THREE.Vector2());
  const isSwipingRef = useRef(false);

  // ---  MERGED STATE ---
  // GPS / UI State
  const [panelView, setPanelView] = useState(null); // null, 'events', 'location'
  const [activeLocation, setActiveLocation] = useState(null); // Holds data for the *clicked* location
  const [isGpsInfoOpen, setIsGpsInfoOpen] = useState(false);
  // State from File 2 for smart GPS handling
  const [isInitializing, setIsInitializing] = useState(true);
  const [isOnCampus, setIsOnCampus] = useState(null); // null = loading, true/false = status
  const hasInitialGPSFlownRef = useRef(false);
  // --- END MERGED STATE ---

  // Use a simple loaded flag for the overlay
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  // +++ ADD: State for dynamic location and event data +++
  const [locationData, setLocationData] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  // +++ ADD: New function to fetch venues from your API +++
  async function loadVenuesAndEvents() {
    try {
      // Using a placeholder URL, replace with your actual venues endpoint
      const response = await fetch(`https://api.tathva.org/api/venue`);
      const data = await response.json();

      if (!data || !Array.isArray(data.venues)) {
        console.error("Venue data is not in the expected format:", data);
        return { venues: [], allEvents: [] };
      }

      console.log("Venues loaded:", data.venues);

      // Extract all events from all venues into a flat list
      const extractedEvents = data.venues.flatMap((venue) =>
        venue.events.map((event) => ({
          ...event,
          venueName: venue.name.trim(),
        }))
      );

      // setAllEvents(extractedEvents);
      // return { venues: data.venues, allEvents: extractedEvents };
      return { venues: data.venues };
    } catch (error) {
      console.error("Error loading venues:", error);
      return { venues: [], allEvents: [] };
    }
  }

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const { scene, camera, renderer, controls } = initializeScene(currentMount);
    cameraRef.current = camera;
    rendererRef.current = renderer;
    controlsRef.current = controls;

    setupLighting(scene);

    const groundPlane = createGroundPlane();
    scene.add(groundPlane);
    groundPlaneRef.current = groundPlane;

    // +++ MODIFIED: Pass the data loading function to loadModel +++
    loadModel(scene, controls, groundPlane, camera, loadVenuesAndEvents);

    const handlers = setupEventHandlers(renderer, camera, controls);
    const animationFrameId = startAnimationLoop(
      renderer,
      scene,
      camera,
      controls
    );

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      cleanup(currentMount, renderer, scene, handlers);

      // Clean up building labels on unmount
      const labelContainer = document.getElementById("building-labels");
      if (labelContainer) labelContainer.remove();

      // Clean up window functions
      window.updateBuildingLabels = null;
      window.setActiveBuildingUI = null;
      window.getBuildingFromMesh = null;
    };
  }, []);

  // --- MERGED: SMART GPS INITIAL LOAD (from File 2) ---
  useEffect(() => {
    // We wait for BOTH GPS and the Model to be ready.
    // modelRef.current being set implies highlightBuildings has run and LOCATION_DATA is populated.
    if (userGps && modelRef.current && !hasInitialGPSFlownRef.current) {
      setIsInitializing(true);

      setTimeout(() => {
        const scenePos = gpsToScene(userGps);
        const bounds = mapBoundsRef.current;

        // Check if user is within the model bounds with some tolerance
        const TOLERANCE = 50; // Allow some margin
        const isWithinBounds =
          scenePos.x >= bounds.MIN_X - TOLERANCE &&
          scenePos.x <= bounds.MAX_X + TOLERANCE &&
          scenePos.z >= bounds.MIN_Z - TOLERANCE &&
          scenePos.z <= bounds.MAX_Z + TOLERANCE;

        setIsOnCampus(isWithinBounds);

        if (isWithinBounds) {
          // User is on campus - show their location marker and fly to it
          console.log("Initial GPS load: Flying to user location (on campus)");
          flyToLocation(new THREE.Vector3(scenePos.x, scenePos.y, scenePos.z));
        } else {
          // User is outside campus - DON'T show location marker, just pan to view
          console.log(
            "User is outside campus bounds, positioning view of Main Building area (no location marker)"
          );

          // Get key landmark positions
          const mainBuildingPos = GEOSPATIAL_CONFIG.SECONDARY_POINTS.find(
            (p) => p.name === "Main Building"
          ).model;

          const aryabhattaPos = GEOSPATIAL_CONFIG.SECONDARY_POINTS.find(
            (p) => p.name === "Aryabhatta/Chanakya/Bhaskara Hostels"
          ).model;

          const cccPos = GEOSPATIAL_CONFIG.SECONDARY_POINTS.find(
            (p) => p.name === "CCC"
          ).model;

          const tennisPos = GEOSPATIAL_CONFIG.SECONDARY_POINTS.find(
            (p) => p.name === "Tennis"
          ).model;

          // Target point: slightly in front of Main Building
          // --- NEW STARTING POSITION ---
          // Calculate the center point (the "between" point) you requested
          const avgX = (mainBuildingPos.x + aryabhattaPos.x + cccPos.x + tennisPos.x) / 4;
          const avgY = (mainBuildingPos.y + aryabhattaPos.y + cccPos.y + tennisPos.y) / 4;
          const avgZ = (mainBuildingPos.z + aryabhattaPos.z + cccPos.z + tennisPos.z) / 4;
          
          // This is the point the camera will look at
          const targetPoint = new THREE.Vector3(avgX, avgY, avgZ);

          // Position the camera to look at this central point.
          // We'll position it to the South-West (negative X, positive Z) and elevated
          // You can tweak these offsets (e.g., -80, +70, +100) to get the perfect angle
          targetPositionRef.current = new THREE.Vector3(
            targetPoint.x - 80,  // Move camera west
            targetPoint.y + 70,  // Elevate camera
            targetPoint.z + 100  // Move camera south
          );
          targetLookAtRef.current = targetPoint;
          // --- END NEW STARTING POSITION ---
          isAnimatingRef.current = true;
        }

        hasInitialGPSFlownRef.current = true;
        setIsInitializing(false);
      }, 3500); // 3.5 second delay for calculations
    } else if (
      !userGps &&
      gpsError &&
      modelRef.current &&
      !hasInitialGPSFlownRef.current
    ) {
      // Handle case where GPS fails on load
      console.log("GPS failed on load, flying to Main Building");
      setIsInitializing(false);
      setIsOnCampus(false); // We don't know, but assume off-campus
      hasInitialGPSFlownRef.current = true; // Mark as "done"
      if (LOCATION_DATA.length > 0 && LOCATION_DATA[0].modelCoords) {
        flyToLocation(LOCATION_DATA[0].modelCoords);
      }
    }
  }, [userGps, gpsError, modelRef.current]); // Depends on all these

  // --- MERGED: CONTINUOUS ON-CAMPUS CHECK (from File 2) ---
  useEffect(() => {
    // This runs *after* the initial load check
    if (userGps && modelRef.current && hasInitialGPSFlownRef.current) {
      const scenePos = gpsToScene(userGps);
      const bounds = mapBoundsRef.current;

      const TOLERANCE = 50;
      const isWithinBounds =
        scenePos.x >= bounds.MIN_X - TOLERANCE &&
        scenePos.x <= bounds.MAX_X + TOLERANCE &&
        scenePos.z >= bounds.MIN_Z - TOLERANCE &&
        scenePos.z <= bounds.MAX_Z + TOLERANCE;

      setIsOnCampus(isWithinBounds);
    }
  }, [userGps]); // Only depends on userGps changing

  const initializeScene = (mount) => {
    // ... (This function is unchanged from File 1)
    const scene = sceneRef.current;
    scene.background = new THREE.Color(0xddf7ff); // Reverted to light sky blue for daylight
    scene.fog = new THREE.Fog(0xddf7ff, 100, 500);
    const camera = new THREE.PerspectiveCamera(
      CONFIG.CAMERA.FOV,
      mount.clientWidth / mount.clientHeight,
      CONFIG.CAMERA.NEAR,
      CONFIG.CAMERA.FAR
    );
    camera.position.copy(CONFIG.CAMERA.DEFAULT_POSITION);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    const controls = new MapControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = CONFIG.CONTROLS.DAMPING_FACTOR;
    controls.minDistance = CONFIG.CONTROLS.MIN_DISTANCE;
    controls.maxDistance = CONFIG.CONTROLS.MAX_DISTANCE;
    return { scene, camera, renderer, controls };
  };

  const setupLighting = (scene) => {
    // Reverted to original ambient and hemisphere lights for daylight
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0); // Reverted ground color for daylight
    hemisphereLight.position.set(0, 100, 0);
    scene.add(hemisphereLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5); // Can adjust intensity for brighter sun
    directionalLight.position.set(50, 100, 75); // Position can be adjusted for sun angle
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.left = -200;
    directionalLight.shadow.camera.right = 200;
    directionalLight.shadow.camera.top = 200;
    directionalLight.shadow.camera.bottom = -200;
    scene.add(directionalLight);
  };

  const createGroundPlane = () => {
    // ... (This function is unchanged from File 1)
    const groundPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000),
      new THREE.MeshStandardMaterial({
        color: 0x888888, // Light grey for the ground
        depthWrite: false,
        visible: true, // Reverted to visible for daylight effect
      })
    );
    groundPlane.rotation.x = -Math.PI / 2;
    groundPlane.receiveShadow = true;
    return groundPlane;
  };

  const highlightBuildings = (model, scene, camera, dynamicLocationData) => {
    // ... (This entire complex function is unchanged from your code)
    const buildingGroups = {};
    const buildingMeshMap = new Map();

    // === STEP 1: Group meshes by building name ===
    model.traverse((child) => {
      if (child.isMesh) {
        let baseName = null;

        // Use the full name if it's one of our mapped IDs
        if (dynamicLocationData.some((loc) => loc.id === child.name)) {
          baseName = child.name;
        }

        // Your old logic can be a fallback if needed, but the above is more direct
        // if (child.name.includes("maposm_buildings")) { ... }

        if (baseName) {
          if (!buildingGroups[baseName]) buildingGroups[baseName] = [];
          buildingGroups[baseName].push(child);
          buildingMeshMap.set(child, baseName);
          if (!child.userData.originalMaterial)
            child.userData.originalMaterial = child.material;
        }
      }
    });

    // console.log("🏢 Tracking buildings:", Object.keys(buildingGroups));

    // === STEP 2: Setup container ===
    let container = document.getElementById("building-labels");
    if (container) container.remove();

    container = document.createElement("div");
    container.id = "building-labels";
    container.className =
      "absolute top-0 left-0 w-full h-full pointer-events-none z-[1000]";
    document.body.appendChild(container);

    const root = createRoot(container);

    // === STEP 3: React UI Logic ===
    let activeBuilding = null; // Local state for this UI

    window.setActiveBuildingUI = (buildingName) => {
      if (activeBuilding === buildingName) return;
      activeBuilding = buildingName;
      highlightBuilding(buildingName); // Apply glow
      renderUI(); // Re-render this UI
    };

    const BuildingUI = ({ active, onMarkerClick, onCardAction }) => {
      return (
        <>
          {Object.entries(buildingGroups).map(([buildingName, meshes]) => {
            const box = new THREE.Box3();
            meshes.forEach((m) => box.expandByObject(m));
            const worldCenter = box.getCenter(new THREE.Vector3());

            const locationEntry = dynamicLocationData.find(
              // <-- Use parameter
              (loc) => loc.id === buildingName
            );
            if (locationEntry && !locationEntry.modelCoords) {
              console.log(`Populating modelCoords for ${buildingName}`);
              locationEntry.modelCoords = worldCenter.clone();
            }

            worldCenter.y = box.max.y + 5; // Set label position above building

            // Project 3D to 2D
            const vector = worldCenter.clone();
            vector.project(camera);
            const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
            const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;
            const distance = camera.position.distanceTo(worldCenter);

            if (distance > 250 || vector.z > 1 || vector.z < -1) return null;

            return (
              <div
                key={buildingName}
                className="absolute"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  opacity: Math.max(0.4, Math.min(1, 180 / distance)),
                  pointerEvents: "auto",
                  transform: "translate(-50%, -50%)", // Center marker
                }}
              >
                <BuildingMarker
                  buildingName={buildingName.slice(5, -2)}
                  isActive={active === buildingName}
                  onClick={() => onMarkerClick(buildingName)}
                />
                <BuildingCard
                  buildingName={buildingName.slice(5, -2)}
                  visible={active === buildingName}
                  onAction={() => onCardAction(buildingName)}
                />
              </div>
            );
          })}
        </>
      );
    };

    const renderUI = () => {
      root.render(
        <BuildingUI
          active={activeBuilding}
          onMarkerClick={(b) => {
            const newActive = activeBuilding === b ? null : b;
            window.setActiveBuildingUI(newActive); // Use controller

            if (newActive === null) {
              setPanelView(null);
              setActiveLocation(null);
            }
          }}
          const
          onCardAction={(buildingName) => {
            const locationDataEntry = dynamicLocationData.find(
              // <-- Use parameter
              (loc) => loc.id === buildingName
            );
            if (locationDataEntry) {
              setActiveLocation(locationDataEntry);
              setPanelView("location");
            }
          }}
        />
      );
    };

    renderUI();

    // === STEP 4: Highlight / Glow Logic ===
    const highlightBuilding = (buildingName) => {
      // Clear previous highlight
      Object.entries(buildingGroups).forEach(([name, meshes]) => {
        meshes.forEach((mesh) => {
          mesh.material = mesh.userData.originalMaterial;
          mesh.userData.pulsating = false;
        });
      });

      // Apply glow
      if (buildingName) {
        const meshes = buildingGroups[buildingName];
        if (meshes) {
          const glowColor = new THREE.Color(1.0, 0.95, 0.7);
          meshes.forEach((mesh) => {
            const mat = mesh.userData.originalMaterial.clone();
            mat.transparent = true;
            mat.opacity = 0.85;
            mat.emissive = glowColor;
            mat.emissiveIntensity = 0.5;
            mat.color.lerp(glowColor, 0.3);
            mesh.material = mat;
            mesh.userData.pulsating = true;
            mesh.userData.pulseTime = 0;
          });
        }
      }
    };

    // === STEP 5: Animate Pulsation === (Unchanged)
    const animatePulsating = () => {
      Object.values(buildingGroups).forEach((meshes) => {
        meshes.forEach((mesh) => {
          if (mesh.userData.pulsating) {
            mesh.userData.pulseTime += 0.02;
            const intensity = 0.5 + Math.sin(mesh.userData.pulseTime * 3) * 0.2;
            mesh.material.emissiveIntensity = intensity;
            mesh.material.opacity =
              0.8 + Math.sin(mesh.userData.pulseTime * 3) * 0.1;
          }
        });
      });
    };

    // === STEP 6: Update Positions ===
    const updateAllLabels = () => {
      animatePulsating();
      renderUI();
    };

    // Store globally for access
    window.getBuildingFromMesh = (mesh) => buildingMeshMap.get(mesh);

    return updateAllLabels;
  };

  const loadModel = (scene, controls, groundPlane, camera, dataFetcher) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
        "/models/finalv2compressed.glb",
        async (gltf) => {
          const model = gltf.scene;
          modelRef.current = model;

          calculateModelScale();

          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          // --- 1. FETCH API DATA ---
          const { venues } = await dataFetcher();

          // --- 2. GET MODEL BUILDING NAMES ---
          const modelBuildingNames = [];
          model.traverse((child) => {
            // prefix
            if (
                child.isMesh &&
                child.name &&
                child.name.toLowerCase().startsWith("nitc_")
            ) {
              if (!modelBuildingNames.includes(child.name)) {
                modelBuildingNames.push(child.name);
              }
            }
          });
          console.log(
              "🏫 Mappable Buildings Found in Model:",
              modelBuildingNames
          );

          // --- 3. PERFORM THE MAPPING & CREATE FINAL DATA ---
          const mappedLocations = [];
          const finalAllEvents = []; // Create a new temporary array for events

          if (venues && venues.length > 0) {
            venues.forEach((venue) => {
              const normalizedVenueName = venue.name
                  .trim()
                  .toLowerCase()
                  .replace(/\s+/g, "_");
              if (!normalizedVenueName) return;

              const modelNameMatch = modelBuildingNames.find((modelName) => {
                // Extract suffix after "nitc_" or "NITC_"
                const modelSuffix = modelName.substring(5);
                // Remove trailing _number pattern and convert to lowercase for comparison
                const cleanModelSuffix = modelSuffix.replace(/_\d+$/, '').toLowerCase();
                return cleanModelSuffix === normalizedVenueName;
              });

              if (modelNameMatch) {
                console.log(
                    `✅ Mapped API Venue [${venue.name.trim()}] to Model [${modelNameMatch}]`
                );

                // Add the mapped location
                mappedLocations.push({
                  id: modelNameMatch,
                  name: venue.name.trim(),
                  events: venue.events,
                  modelCoords: null,
                });

                // For each event in this venue, add it to our final list
                // with the correct locationId (the model name)
                venue.events.forEach((event) => {
                  finalAllEvents.push({
                    ...event,
                    locationId: modelNameMatch, // <-- THIS IS THE FIX!
                  });
                });
              } else {
                console.warn(
                    `⚠️ No matching model found for API Venue: "${venue.name.trim()}"`
                );
              }
            });
          }

          // --- 4. UPDATE REACT STATE WITH CORRECTLY LINKED DATA ---
          setLocationData(mappedLocations);
          setAllEvents(finalAllEvents); // Set the final, corrected events list
          console.log("📍 Final Mapped Location Data:", mappedLocations);
          console.log("🎉 Final Events Data with locationId:", finalAllEvents);

          // === Setup model bounds and position (Unchanged) ===
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const internalPadding = 50; // Reduced from 600
          mapBoundsRef.current = {
            MIN_X: box.min.x + internalPadding,
            MAX_X: box.max.x - internalPadding,
            MIN_Z: box.min.z + internalPadding,
            MAX_Z: box.max.z - internalPadding,
            PADDING: CONFIG.MAP_BOUNDS.PADDING,
          };
          controls.target.copy(center);
          groundPlane.position.y = box.min.y;
          scene.add(model);

          // --- 5. PASS MAPPED DATA TO THE HIGHLIGHTER (Unchanged) ---
          const updateLabels = highlightBuildings(
              model,
              scene,
              camera,
              mappedLocations
          );
          if (updateLabels) {
            window.updateBuildingLabels = updateLabels;
          }

          // === Start geolocation handling ===
          handleGeolocation();
          setIsModelLoaded(true);
        },
        (xhr) => {
          console.log(
              `Model ${((xhr.loaded / xhr.total) * 100).toFixed(2)}% loaded`
          );
        },
        (error) => {
          console.error("❌ Error loading model:", error);
          setIsModelLoaded(true);
        }
    );
  };

  // --- (UTILITY FUNCTIONS: UNCHANGED from File 1) ---

  const findGroundHeight = (x, z) => {
    if (!modelRef.current || !groundPlaneRef.current) return 0;

    const raycaster = raycasterRef.current;
    const rayStart = new THREE.Vector3(x, 500, z); // Start high above
    raycaster.set(rayStart, new THREE.Vector3(0, -1, 0));

    const intersects = raycaster.intersectObject(modelRef.current, true);
    if (intersects.length > 0) {
      return intersects[0].point.y;
    }

    const groundIntersects = raycaster.intersectObject(groundPlaneRef.current);
    if (groundIntersects.length > 0) {
      return groundIntersects[0].point.y;
    }

    return groundPlaneRef.current.position.y;
  };

  const checkCollisionAtPosition = (position) => {
    if (!modelRef.current) return null;

    const raycaster = raycasterRef.current;

    const rayStart = new THREE.Vector3(position.x, 500, position.z);
    raycaster.set(rayStart, new THREE.Vector3(0, -1, 0));
    const intersects = raycaster.intersectObject(modelRef.current, true);

    if (intersects.length > 0) {
      return intersects[0].point.y;
    }

    return null;
  };

  const clampToMapBounds = (position) => {
    const bounds = mapBoundsRef.current;
    const clamped = position.clone();

    clamped.x = Math.max(bounds.MIN_X, Math.min(bounds.MAX_X, clamped.x));
    clamped.z = Math.max(bounds.MIN_Z, Math.min(bounds.MAX_Z, clamped.z));

    return clamped;
  };

  const flyToLocation = (modelCoords) => {
    // ... (This function is unchanged from File 1)
    const groundY = findGroundHeight(modelCoords.x, modelCoords.z);
    const targetPoint = new THREE.Vector3(
      modelCoords.x,
      groundY,
      modelCoords.z
    );
    targetPositionRef.current = new THREE.Vector3(
      targetPoint.x + CONFIG.FLY_TO.CAMERA_OFFSET.x,
      targetPoint.y + CONFIG.FLY_TO.CAMERA_OFFSET.y,
      targetPoint.z + CONFIG.FLY_TO.CAMERA_OFFSET.z
    );
    targetLookAtRef.current = targetPoint;
    isAnimatingRef.current = true;
  };

  // --- (EVENT HANDLERS) ---

  const handleGeolocation = () => {
    // --- KEPT SUPERIOR LOGIC from File 1 ---
    // This is for the "recenter" button.
    if (userGps) {
      const scenePos = gpsToScene(userGps);
      flyToLocation(new THREE.Vector3(scenePos.x, scenePos.y, scenePos.z));
    } else if (LOCATION_DATA.length > 0 && LOCATION_DATA[0].modelCoords) {
      console.warn("GPS not available. Flying to Main Building.");
      flyToLocation(LOCATION_DATA[0].modelCoords);
    } else {
      console.warn(
        "Geolocation fallback: userGps not ready or model coords not ready."
      );
      if (controlsRef.current) {
        flyToLocation(controlsRef.current.target);
      }
    }
  };

  const setupEventHandlers = (renderer, camera, controls) => {
    const handleResize = () => {
      // ... (This function is unchanged from File 1)
      if (!mountRef.current || !cameraRef.current || !rendererRef.current)
        return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    const handleKeyDown = (event) => {
      // ... (This function is unchanged from File 1)
      if (event.key.toLowerCase() === "r") {
        targetPositionRef.current = CONFIG.CAMERA.DEFAULT_POSITION.clone();
        targetLookAtRef.current = CONFIG.CAMERA.DEFAULT_TARGET.clone();
        isAnimatingRef.current = true;
      }
    };

    const getEventPosition = (event) => {
      // ... (This function is unchanged from File 1)
      if (event.touches) {
        return event.touches[0] || event.changedTouches[0];
      }
      return event;
    };

    const handleTapStart = (event) => {
      // ... (This function is unchanged from File 1)
      isSwipingRef.current = false;
      const pos = getEventPosition(event);
      tapStartPosRef.current.set(pos.clientX, pos.clientY);
    };

    const handleTapMove = (event) => {
      // ... (This function is unchanged from File 1)
      if (isSwipingRef.current) return;
      const pos = getEventPosition(event);
      const distance = tapStartPosRef.current.distanceTo(
        new THREE.Vector2(pos.clientX, pos.clientY)
      );
      if (distance > CONFIG.INTERACTION.SWIPE_THRESHOLD) {
        isSwipingRef.current = true;
      }
    };

    const handleTapEnd = (event) => {
      // ... (This function is unchanged from File 1)
      // It already correctly handles closing the panel, GPS info, and building UI.
      if (isSwipingRef.current) {
        isSwipingRef.current = false;
        return; // It was a swipe/pan, not a tap
      }

      const now = performance.now();
      const timeSinceLastTap = now - lastTapTimeRef.current;

      const input = getEventPosition(event);
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((input.clientX - rect.left) / rect.width) * 2 - 1,
        -((input.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = raycasterRef.current;
      raycaster.setFromCamera(mouse, camera);

      // 1. ❌ Cone marker intersection check REMOVED (File 1 doesn't use it)

      // 2. Check for double-tap-to-fly
      if (timeSinceLastTap < CONFIG.INTERACTION.DOUBLE_TAP_TIMEOUT) {
        // ... (double-tap logic unchanged) ...
        event.preventDefault();
        const intersects = raycaster.intersectObjects(
          [modelRef.current, groundPlaneRef.current].filter(Boolean),
          true
        );
        if (intersects.length > 0) {
          const point = intersects[0].point;
          flyToLocation(new THREE.Vector3(point.x, point.y, point.z));
        }
        lastTapTimeRef.current = 0;
      } else {
        // --- Single-tap on nothing ---
        // ✅ MODIFIED: Close panel AND building UI AND GPS Info
        setPanelView(null);
        setActiveLocation(null);
        setIsGpsInfoOpen(false); // ✅ Close GPS info on background click
        if (window.setActiveBuildingUI) {
          window.setActiveBuildingUI(null); // Clear highlight
        }
        lastTapTimeRef.current = now;
      }
    };

    const handleControlsStart = () => {
      // ... (This function is unchanged from File 1)
      // It already correctly handles closing the panel, GPS info, and building UI on pan.
      if (isAnimatingRef.current) {
        isAnimatingRef.current = false;
        targetPositionRef.current = null;
        targetLookAtRef.current = null;
      }
      setPanelView(null);
      setActiveLocation(null);
      setIsGpsInfoOpen(false); // ✅ Close GPS info on pan/zoom start
      if (window.setActiveBuildingUI) {
        window.setActiveBuildingUI(null);
      }
    };

    // ... (Attaching listeners is unchanged from File 1)

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    renderer.domElement.addEventListener("mousedown", handleTapStart, {
      passive: true,
    });
    renderer.domElement.addEventListener("touchstart", handleTapStart, {
      passive: true,
    });
    renderer.domElement.addEventListener("mousemove", handleTapMove, {
      passive: true,
    });
    renderer.domElement.addEventListener("touchmove", handleTapMove, {
      passive: true,
    });
    renderer.domElement.addEventListener("mouseup", handleTapEnd);
    renderer.domElement.addEventListener("touchend", handleTapEnd);
    controls.addEventListener("start", handleControlsStart);

    return {
      handleResize,
      handleKeyDown,
      handleTapStart,
      handleTapMove,
      handleTapEnd,
      handleControlsStart,
    };
  };

  const startAnimationLoop = (renderer, scene, camera, controls) => {
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // --- MERGED: ENHANCED USER LOCATION MARKER (from File 2) ---
      if (userGps && sceneRef.current && isOnCampus) {
        const scenePos = gpsToScene(userGps);

        // Create marker if it doesn't exist
        if (!window.userLocationMarker) {
          console.log("Creating user location marker...");
          const group = new THREE.Group();

          // ===== GPS PIN SHAPE =====
          // Top sphere (the "head" of the pin)
          const pinHeadGeom = new THREE.SphereGeometry(3.5, 32, 32);
          const pinHeadMat = new THREE.MeshStandardMaterial({
            color: 0xff4444,
            emissive: 0xff4444,
            emissiveIntensity: 1.5,
            transparent: true,
            opacity: 1.0,
          });
          const pinHead = new THREE.Mesh(pinHeadGeom, pinHeadMat);
          pinHead.position.y = 15; // Top of the pin
          group.add(pinHead);

          // Pin body (teardrop shape using cone)
          const pinBodyGeom = new THREE.ConeGeometry(4, 12, 32);
          const pinBodyMat = new THREE.MeshStandardMaterial({
            color: 0xff4444,
            emissive: 0xff4444,
            emissiveIntensity: 1.2,
            transparent: true,
            opacity: 0.95,
          });
          const pinBody = new THREE.Mesh(pinBodyGeom, pinBodyMat);
          pinBody.position.y = 7; // Middle section
          group.add(pinBody);

          // White dot in the center (like Google Maps pin)
          const dotGeom = new THREE.SphereGeometry(1.5, 16, 16);
          const dotMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: false,
          });
          const dot = new THREE.Mesh(dotGeom, dotMat);
          dot.position.y = 15; // Same as pin head
          group.add(dot);

          // Pulsing accuracy circle (ground level)
          const accuracyRingGeom = new THREE.RingGeometry(5, 7, 32);
          const accuracyRingMat = new THREE.MeshBasicMaterial({
            color: 0xff4444,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide,
          });
          const accuracyRing = new THREE.Mesh(
            accuracyRingGeom,
            accuracyRingMat
          );
          accuracyRing.rotation.x = -Math.PI / 2;
          accuracyRing.position.y = 0.5;
          group.add(accuracyRing);

          // Shadow/ground circle
          const shadowGeom = new THREE.CircleGeometry(3, 32);
          const shadowMat = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide,
          });
          const shadow = new THREE.Mesh(shadowGeom, shadowMat);
          shadow.rotation.x = -Math.PI / 2;
          shadow.position.y = 0.1;
          group.add(shadow);

          sceneRef.current.add(group);
          window.userLocationMarker = group;
        }

        // Update color based on campus status
        const onCampusColor = 0x0099ff; // Blue
        const offCampusColor = 0xff6600; // Orange
        const targetColor = isOnCampus ? onCampusColor : offCampusColor;

        const sphere = window.userLocationMarker.children[0];
        const beam = window.userLocationMarker.children[1];
        const ring = window.userLocationMarker.children[2];

        sphere.material.color.setHex(targetColor);
        sphere.material.emissive.setHex(targetColor);
        beam.material.color.setHex(targetColor);
        ring.material.color.setHex(targetColor);

        // Animate pulsing effect
        // Get references to marker parts
        const pinHead = window.userLocationMarker.children[0];
        const pinBody = window.userLocationMarker.children[1];
        const dot = window.userLocationMarker.children[2];
        const accuracyRing = window.userLocationMarker.children[3];

        // Animate pulsing effect on pin head
        const time = Date.now() * 0.003;
        const headScale = 1 + Math.sin(time * 2) * 0.1;
        pinHead.scale.set(headScale, headScale, headScale);
        dot.scale.set(headScale, headScale, headScale);

        // Pulsing accuracy ring
        const ringScale = 1 + Math.sin(time * 1.5) * 0.4;
        accuracyRing.scale.set(ringScale, ringScale, 1);
        accuracyRing.material.opacity = 0.3 - Math.sin(time * 1.5) * 0.15;

        // Gentle bobbing animation
        // Gentle bobbing animation - reduced amount
        const bobOffset = Math.sin(time * 1.2) * 1.2; // Reduced from 2 to 1.2
        pinHead.position.y = 15 + bobOffset; // Adjusted base height
        pinBody.position.y = 7 + bobOffset * 0.5; // Adjusted base height
        dot.position.y = 15 + bobOffset; // Adjusted base height

        // Find ground height for the marker
        const markerGroundY = findGroundHeight(scenePos.x, scenePos.z);
        window.userLocationMarker.position.set(
          scenePos.x,
          markerGroundY,
          scenePos.z
        );
      } else if (
        window.userLocationMarker &&
        (!userGps || isOnCampus === false)
      ) {
        // Only remove marker if GPS signal is lost
        console.log("Removing user location marker (GPS lost)...");
        sceneRef.current.remove(window.userLocationMarker);
        // Dispose of geometries and materials
        window.userLocationMarker.children.forEach((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
        window.userLocationMarker = null;
      }
      // --- (End user location logic) ---
      // --- TEMPORARY TEST AVATAR (REMOVE LATER) ---
      // This creates a test avatar at Main Building for testing
      // --- (Camera animation logic: UNCHANGED from File 1) ---
      if (
        isAnimatingRef.current &&
        targetPositionRef.current &&
        targetLookAtRef.current
      ) {
        camera.position.lerp(
          targetPositionRef.current,
          CONFIG.ANIMATION.LERP_FACTOR
        );
        controls.target.lerp(
          targetLookAtRef.current,
          CONFIG.ANIMATION.LERP_FACTOR
        );

        const positionDistance = camera.position.distanceTo(
          targetPositionRef.current
        );
        const targetDistance = controls.target.distanceTo(
          targetLookAtRef.current
        );

        if (
          positionDistance < CONFIG.ANIMATION.COMPLETION_THRESHOLD &&
          targetDistance < CONFIG.ANIMATION.COMPLETION_THRESHOLD
        ) {
          camera.position.copy(targetPositionRef.current);
          controls.target.copy(targetLookAtRef.current);
          targetPositionRef.current = null;
          targetLookAtRef.current = null;
          isAnimatingRef.current = false;
          controls.update();
        }
      }

      controls.update();

      // --- MERGED: STRICT TERRAIN/COLLISION LOGIC (from File 2) ---
      if (modelRef.current) {
        // STRICT terrain locking - force camera to stay within bounds
        const clampedCameraPos = clampToMapBounds(camera.position);
        if (!clampedCameraPos.equals(camera.position)) {
          // Smooth lerp back instead of immediate snap
          camera.position.lerp(clampedCameraPos, 0.1);
        }

          const groundHeight = checkCollisionAtPosition(camera.position);
          if (groundHeight !== null) {
            const minCameraY =
              groundHeight + CONFIG.CAMERA.MIN_HEIGHT_ABOVE_TERRAIN;

            if (camera.position.y < minCameraY) {
              // OLD: camera.position.y = minCameraY; // Immediate correction (causes snapping)
              // NEW: Smoothly push the camera up
              camera.position.lerp(
                  new THREE.Vector3(camera.position.x, minCameraY, camera.position.z),
                  CONFIG.ANIMATION.COLLISION_LERP_FACTOR
              );
            }
          }

        if (!isAnimatingRef.current) {
          // Also strictly lock the controls target
          const clampedTargetPos = clampToMapBounds(controls.target);
          if (!clampedTargetPos.equals(controls.target)) {
            controls.target.lerp(clampedTargetPos, 0.1); // Smooth correction
          }

          const targetGroundHeight = findGroundHeight(
            controls.target.x,
            controls.target.z
          );
          if (controls.target.y < targetGroundHeight) {
            // OLD: controls.target.y = targetGroundHeight; // Immediate correction
            // NEW: Smoothly push the target up
            controls.target.lerp(
                new THREE.Vector3(controls.target.x, targetGroundHeight, controls.target.z),
                CONFIG.ANIMATION.COLLISION_LERP_FACTOR
            );
          }
        }
      }
      // --- (End Terrain/Collision logic) ---

      // --- (Update building labels every frame: UNCHANGED from File 1) ---
      if (window.updateBuildingLabels) {
        window.updateBuildingLabels();
      }

      renderer.render(scene, camera);
    };

    animate();
    return animationFrameId;
  };

  const cleanup = (mount, renderer, scene, handlers) => {
    // ... (This function is unchanged from File 1)
    window.removeEventListener("resize", handlers.handleResize);
    window.removeEventListener("keydown", handlers.handleKeyDown);
    if (renderer.domElement) {
      renderer.domElement.removeEventListener(
        "mousedown",
        handlers.handleTapStart
      );
      renderer.domElement.removeEventListener(
        "touchstart",
        handlers.handleTapStart
      );
      renderer.domElement.removeEventListener(
        "mousemove",
        handlers.handleTapMove
      );
      renderer.domElement.removeEventListener(
        "touchmove",
        handlers.handleTapMove
      );
      renderer.domElement.removeEventListener("mouseup", handlers.handleTapEnd);
      renderer.domElement.removeEventListener(
        "touchend",
        handlers.handleTapEnd
      );
    }
    if (controlsRef.current && handlers.handleControlsStart) {
      controlsRef.current.removeEventListener(
        "start",
        handlers.handleControlsStart
      );
    }
    if (mount && renderer.domElement.parentElement === mount) {
      mount.removeChild(renderer.domElement);
    }
    renderer.dispose();
    scene.traverse((object) => {
      if (object.isMesh) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else if (object.material?.isMaterial) {
          object.material.dispose();
        }
      }
      if (object.material?.map) {
        object.material.map.dispose();
      }
    });

    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }
  };

  const handleNavigation = (locationId) => {
    // ... (This function is unchanged, but its behavior is now correct
    // because it triggers pulsation that will persist)
    const location = locationData.find((l) => l.id === locationId);

    if (location && location.modelCoords) {
      flyToLocation(location.modelCoords);
      // Set the building glow/card
      if (window.setActiveBuildingUI) {
        window.setActiveBuildingUI(location.id);
      }
      // Set the panel state
      setActiveLocation(location);
      setPanelView("location");
    } else if (location) {
      // Fallback if coords aren't populated yet
      console.warn(`Cannot navigate to ${locationId}, modelCoords not ready.`);
      setActiveLocation(location);
      setPanelView("location");
    } else {
      // Add this else block for better debugging
      console.error(
        `Navigation failed: Could not find location with id "${locationId}"`
      );
    }
  };

  // --- (UI Components) ---

  const uiButtonClasses = `
  fixed z-10 flex items-center justify-center
  rounded-full border shadow-lg backdrop-blur-sm
  transition-all duration-200 ease-in-out
  text-blue-400 border-gray-700 bg-gray-800/90
  hover:bg-gray-700 hover:scale-110
  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
  focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900

  /* Mobile-first sizing (smaller, closer to edge) */
  bottom-4 h-12 w-12
  
  /* Desktop sizing (larger, more padding) */
  md:bottom-8 md:h-14 md:w-14
  `;

  const GeolocationIcon = () => (
    // ... (Icon unchanged)
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 md:h-6 md:w-6"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  );

  const CompassIcon = () => (
    // ... (Icon unchanged)
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 md:h-6 md:w-6"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
    </svg>
  );

  const CalendarIcon = () => (
    // ... (Icon unchanged)
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 md:h-6 md:w-6"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );

  // --- (JSX RENDER) ---

  const handleClosePanel = () => {
    setPanelView(null);
    setActiveLocation(null);
    // Pulsation persists even when panel is closed
  };

  const toggleGpsInfo = () => {
    setIsGpsInfoOpen((prev) => !prev);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen overflow-hidden bg-white/80 font-sans">
      {/* Minimal full-screen loading overlay */}
      {!isModelLoaded && (
        <div className="fixed inset-0 z-[2000]">
          <LoopingLoadingBar isLoaded={isModelLoaded} />
          <div className="absolute z-[10001] top-[65%] left-1/2 -translate-x-1/2 text-2xl font-semibold text-black">
            LOADING MAP
          </div>
        </div>
      )}
      {/* --- MERGED: GPS Info Panel (with isInitializing state) --- */}
      <div
        className={`absolute top-4 left-4 z-20 max-w-xs text-sm transition-all duration-300 ease-in-out
          rounded-lg border shadow-lg backdrop-blur-sm
          border-gray-700 bg-gray-800/90 text-white/90
          ${
            isGpsInfoOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
      >
        <div className="p-3 space-y-1">
          {isInitializing && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent"></div>
              <p className="text-gray-400">Calculating location...</p>
            </div>
          )}
          {!isInitializing && gpsLoading && (
            <p className="text-gray-400"> Getting GPS location.</p>
          )}
          {!isInitializing && gpsError && (
            <p className="text-red-500"> GPS Error: {gpsError}</p>
          )}
          {!isInitializing && userGps && (
            <>
              <p className="font-semibold text-white">Your Location:</p>
              <p className="text-xs text-gray-400">
                {userGps.lat.toFixed(6)}, {userGps.lon.toFixed(6)}
              </p>
              <p className="text-xs text-gray-400">
                Accuracy: ±{userGps.accuracy?.toFixed(0)}m
              </p>
              <p
                className={`text-xs font-semibold ${
                  isOnCampus === false ? "text-orange-400" : "text-green-400"
                }`}
              >
                {isOnCampus === false
                  ? "⚠️ You are far from campus"
                  : "✓ You are on campus"}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Three.js Canvas */}
      <div
        ref={mountRef}
        className="h-full w-full bg-gray-700"
        aria-label="Map container"
      ></div>

      {/* --- UI Buttons (Unchanged from File 1) --- */}

      {/* Toggle GPS Info Button */}
      <button
        onClick={toggleGpsInfo}
        className={`${uiButtonClasses} right-4 md:right-8`}
        title="Show location info"
      >
        <CompassIcon />
      </button>

      {/* Geolocation Button */}
      {/* Geolocation Button */}
      <button
        onClick={handleGeolocation}
        disabled={isOnCampus === false}
        className={`${uiButtonClasses} right-[4.5rem] md:right-[7rem] ${
          isOnCampus === false
            ? "opacity-50 cursor-not-allowed hover:scale-100 hover:bg-gray-800/90"
            : ""
        }`}
        title={
          isOnCampus === false
            ? "Location unavailable (outside campus)"
            : "Recenter to my location"
        }
      >
        <GeolocationIcon />
      </button>

      {/* All Events Button */}
      <button
        onClick={() => setPanelView("events")}
        className={`${uiButtonClasses} left-4 md:left-8`}
        title="Show all events"
      >
        <CalendarIcon />
      </button>
      <a href="/" className="absolute left-20 md:left-27 ">
        <button className={`${uiButtonClasses} `} title="Home">
          <IoHome />
        </button>
      </a>

      {/* Event Panel (Unchanged from File 1) */}
      <EventPanel
        panelView={panelView}
        activeLocation={activeLocation}
        allEvents={allEvents}
        allLocations={locationData}
        onClose={handleClosePanel}
        onNavigate={handleNavigation}
        onViewChange={setPanelView}
        onSelectLocation={(location) => {
          handleNavigation(location.id);
        }}
      />
    </div>
  );
}
