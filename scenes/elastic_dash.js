import { Platform, Scene, loadCustomScene, getDeltaTime, setPlayerSpeed, setPlayerGravity, setPlayerJumpForce } from "../script.js";

let scene = new Scene(10, 100, 500, 20, 0, 368);

let spawnCount = 0;
let frozen = false;
let spawnTimeoutId = null;
let animationFrameId = null;

let speedProgression = new Map();

speedProgression.set(5, 150);
speedProgression.set(10, 200);
speedProgression.set(20, 250);
speedProgression.set(35, 300);
speedProgression.set(50, 400);

let heightProgression = new Map();

heightProgression.set(5, 30);
heightProgression.set(10, 40);
heightProgression.set(20, 50);
heightProgression.set(35, 60);
heightProgression.set(50, 70);

let spawnRateProgression = new Map();

spawnRateProgression.set(5, 2000);
spawnRateProgression.set(10, 1500);
spawnRateProgression.set(20, 1250);
spawnRateProgression.set(35, 1100);
spawnRateProgression.set(50, 900);

function onLoad() {
    let spikes = []
    
    frozen = false;
    spawnCount = 0;

    function spawnLoop() {
        if (frozen) {
            return;
        }

        var height = 20;
            
        for (const [key, value] of heightProgression) {
            if (spawnCount > key) {
                height = value;
            }
        };

        var spike = new Platform("red", 760, 400 - height, 20, height, true, false, () => {
            alert("You lost! Reload the scene to try again.");
            frozen = true;
            setPlayerGravity(0);
            setPlayerJumpForce(0);
            if (spawnTimeoutId) {
                clearTimeout(spawnTimeoutId);
                spawnTimeoutId = null;
            }
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        }, -1);
        scene.addPlatform(spike);
        spikes.push(spike);
        spawnCount += 1;

        var spawnRate = 3500;

        for (const [key, value] of spawnRateProgression) {
                if (spawnCount > key) {
                    spawnRate = value;
                }
            };

        spawnTimeoutId = setTimeout(spawnLoop, spawnRate);
    };

    function gameLoop() {
        if (frozen) {
            return;
        };
        spikes.forEach(spike => {
            var speed = 125;
            
            for (const [key, value] of speedProgression) {
                if (spawnCount > key) {
                    speed = value;
                }
            };

            spike.x -= speed * getDeltaTime();
        });

        scene.platforms = spikes.filter((spike) => {
            return spike.x + spike.width > 0;
        });

        animationFrameId = requestAnimationFrame(gameLoop);
    };

    let startPlatform = new Platform("lime", 132, 390, 32, 10, true, false, () => {
        startPlatform.color = "rgba(0,0,0,0)";
        startPlatform.collision = false;
        setPlayerSpeed(0);
        frozen = false;
        spawnLoop();
        gameLoop();
    });

    scene.addPlatform(startPlatform);
};

scene.onLoad = onLoad;
scene.onDestroy = () => {
    scene.platforms = [];
    frozen = true;
    if (spawnTimeoutId) {
        clearTimeout(spawnTimeoutId);
        spawnTimeoutId = null;
    }
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
};

loadCustomScene(scene, 4);
