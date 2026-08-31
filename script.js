class Platform {
    constructor(color, x, y, width, height) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };
};

class Scene {
    constructor(floorHeight, speed, jumpForce, gravity) {
        this.floorHeight = floorHeight;
        this.speed = speed;
        this.jumpForce = jumpForce;
        this.gravity = gravity;
        this.platforms = new Array();
    };

    addPlatform(platform) {
        this.platforms.push(platform);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    /** @type { HTMLCanvasElement } */
    const gamePanel = document.getElementById("game-panel");
    /** @type { CanvasRenderingContext2D }*/
    const ctx = gamePanel.getContext('2d');

    /** @type { HTMLInputElement } */
    const speedSlider = document.getElementById("plrSpeed");
    /** @type { HTMLInputElement } */
    const jumpForceSlider = document.getElementById("plrJumpForce");
    /** @type { HTMLInputElement } */
    const gravitySlider = document.getElementById("plrGravity");
    const sceneButtons = Array.from(document.querySelectorAll("#scene-buttons button"));

    const scenes = [new Scene(50, 200, 500, 10),
                           new Scene(50, 150, 400, 10),
                           new Scene(50, 200, 600, 50),
                           new Scene(10, 1000, 350, 10)
                           /* Add a custom scene here: new Scene(Floor Height, Player Speed, Player Jump Force, Player Gravity) */];

    scenes[0].addPlatform(new Platform("red", 400, 260, 40, 100));
    scenes[0].addPlatform(new Platform("yellow", 500, 210, 40, 150));
    scenes[0].addPlatform(new Platform("blue", 600, 160, 40, 200));
    scenes[0].addPlatform(new Platform("green", 700, 110, 40, 40));

    scenes[1].addPlatform(new Platform("grey", 200, 230, 20, 130));
    scenes[1].addPlatform(new Platform("grey", 300, 160, 20, 160));
    scenes[1].addPlatform(new Platform("grey", 400, 90, 20, 230));
    scenes[1].addPlatform(new Platform("grey", 550, 150, 20, 170));
    scenes[1].addPlatform(new Platform("gold", 720, 100, 40, 30));
    
    scenes[2].addPlatform(new Platform("black", 100, 310, 70, 50));
    scenes[2].addPlatform(new Platform("black", 170, 260, 70, 100));
    scenes[2].addPlatform(new Platform("black", 240, 210, 70, 150));
    scenes[2].addPlatform(new Platform("black", 310, 160, 70, 200));
    scenes[2].addPlatform(new Platform("black", 380, 110, 70, 250));
    scenes[2].addPlatform(new Platform("black", 450, 60, 70, 300));
    scenes[2].addPlatform(new Platform("gold", 520, 50, 240, 310));

    scenes[3].addPlatform(new Platform("grey", 32, 0, 32, 368));
    scenes[3].addPlatform(new Platform("turquoise", 710, 330, 50, 30));
    scenes[3].addPlatform(new Platform("turquoise", 64, 260, 50, 30));
    scenes[3].addPlatform(new Platform("turquoise", 710, 190, 50, 30));
    scenes[3].addPlatform(new Platform("turquoise", 64, 120, 50, 30));
    scenes[3].addPlatform(new Platform("gold", 710, 50, 50, 30));

    /* 
        Customise your custom scene over here, with the addPlatform function.

        scenes[4].addPlatform(new Platform(Color, X, Y, Width, Height));

        Add as many platforms as you'd like.
    */

    let scene;

    let settings = {
        collision: false,
        controls: false
    };

    let controls = {
        a: false,
        left: false,
        d: false,
        right: false,
        w: false,
        up: false,
        space: false
    };

    let player = {
        diameter: 32,
        x: 0,
        y: 0,
        speed: 200,
        velocityY: 0,
        jumpForce: 500,
        gravity: 10
    };

    let playerGhost = {
        diameter: 32,
        x: 0,
        y: 0,
        speed: 200,
        velocityY: 0,
        jumpForce: 500,
        gravity: 10
    };

    let lastTime = 0;

    function syncSceneStats() {
        player.speed = scene.speed;
        player.jumpForce = scene.jumpForce;
        player.gravity = scene.gravity;

        speedSlider.value = scene.speed;
        jumpForceSlider.value = scene.jumpForce;
        gravitySlider.value = scene.gravity;
    };

    function playerGrounded() {
        if (player.y + player.diameter == gamePanel.height - scene.floorHeight) {
            return true;
        }

        if (scene.platforms.some(platform => {
          if (player.y + player.diameter == platform.y) {
            if ((player.x + player.diameter > platform.x) && (player.x < platform.x + platform.width)) {
                return true;
            }
          }  
        })) {
            return true;
        }

        return false;
    };

    function playerCollision() {
        if (!settings.collision) {
            return;
        }

        if (player.y + player.diameter > gamePanel.height - scene.floorHeight) {
            player.y = gamePanel.height - scene.floorHeight - player.diameter;
        }

        scene.platforms.forEach(platform => {
            //top
            if ((player.y + player.diameter > platform.y)) {
                if ((player.x + player.diameter > platform.x) && (player.x < platform.x + platform.width)) {
                    if (playerGhost.y + playerGhost.diameter <= platform.y) {
                        player.y = platform.y - player.diameter;
                    }
                }
            }

            //bottom
            if ((player.y < platform.y + platform.height)) {
                if ((player.x + player.diameter > platform.x) && (player.x < platform.x + platform.width)) {
                    if (playerGhost.y >= platform.y + platform.height) {
                        player.y = platform.y + platform.height;
                    }
                }
            }

            //left 
            if ((player.x + player.diameter > platform.x)) {
                if ((player.y + player.diameter > platform.y) && (player.y < platform.y + platform.height)) {
                    if (playerGhost.x + playerGhost.diameter <= platform.x) {
                        player.x = platform.x - player.diameter;
                    }
                }
            }
            
            //right
            if ((player.x < platform.x + platform.width)) {
                if ((player.y + player.diameter > platform.y) && (player.y < platform.y + platform.height)) {
                    if (playerGhost.x >= platform.x + platform.width) {
                        player.x = platform.x + platform.width;
                    }
                }
            }
        });
    };

    function updatePlayer(deltaTime) {
        if ((controls.a || controls.left) && settings.controls) {
            player.x -= player.speed * deltaTime;

            if (player.x < 0) {
                player.x = 0;
            }
        }

        if ((controls.d || controls.right) && settings.controls) {
            player.x += player.speed * deltaTime;

            if (player.x + player.diameter > gamePanel.width) {
                player.x = gamePanel.width - player.diameter;
            }
        }
    
        if (playerGrounded()) {
            player.velocityY = 0;
            if ((controls.w || controls.up || controls.space) && settings.controls) {
                player.velocityY = -player.jumpForce;
            }
        } else {
            player.velocityY += player.gravity;
        }
        

        player.y += player.velocityY * deltaTime;
        
        playerCollision();
    };

    function drawPlayer() {
        ctx.beginPath();
        ctx.fillStyle = "cyan";
        ctx.strokeStyle = "black";
        ctx.arc(player.x + player.diameter / 2, player.y + player.diameter / 2, player.diameter / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };

    function drawFloor() {
        ctx.beginPath()
        ctx.fillStyle = "gray";
        ctx.strokeStyle = "black";
        ctx.fillRect(0, gamePanel.height - scene.floorHeight, gamePanel.width, scene.floorHeight);
        ctx.strokeRect(0, gamePanel.height - scene.floorHeight, gamePanel.width, scene.floorHeight);
        ctx.closePath();
    };

    function drawPlatform(platform) {
        ctx.beginPath();
        ctx.fillStyle = platform.color;
        ctx.strokeStyle = "black";
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
        ctx.closePath();
    };

    function gameLoop(currentTime) {
        deltaTime = (currentTime - lastTime) / 1000;

        if (deltaTime == 0 || isNaN(deltaTime)) {
            deltaTime = 0;
        }
        
        // console.log("Player (X,Y): ", player.x, ", ", player.y);
        ctx.clearRect(0, 0, gamePanel.width, gamePanel.height);

        updatePlayer(deltaTime);

        drawPlayer();
        scene.platforms.forEach(platform => {
            drawPlatform(platform);
        });
        drawFloor();

        lastTime = currentTime;
        playerGhost = { ...player };

        requestAnimationFrame(gameLoop);
    };

    window.addEventListener("keydown", (event) => {
        var key = event.key.toLowerCase();
        
        if (key == "a") {
            controls.a = true;
        } 

        if (key == "arrowleft") {
            controls.left = true;
        }
        
        if (key == "d") {
            controls.d = true;
        }

        if (key == "arrowright") {
            controls.right = true;
        }

        if (key == "w") {
            controls.w = true;
        }

        if (key == "arrowup") {
            controls.up = true;
        }
        
        if (key == " ") {
            controls.space = true;
        }
    });

    window.addEventListener("keyup", (event) => {
        var key = event.key.toLowerCase();

        if (key == "a") {
            controls.a = false;
        } 

        if (key == "arrowleft") {
            controls.left = false;
        }
        
        if (key == "d") {
            controls.d = false;
        }

        if (key == "arrowright") {
            controls.right = false;
        }

        if (key == "w") {
            controls.w = false;
        }

        if (key == "arrowup") {
            controls.up = false;
        }
        
        if (key == " ") {
            controls.space = false;
        }
    });

    speedSlider.addEventListener("input", () => {
        player.speed = parseInt(speedSlider.value);
    });

    jumpForceSlider.addEventListener("input", () => {
        player.jumpForce = parseInt(jumpForceSlider.value);
    });

    gravitySlider.addEventListener("input", () => {
        player.gravity = parseInt(gravitySlider.value);
    });

    function setScene(sceneIndex) {
        if (sceneIndex < 0 || sceneIndex >= scenes.length) {
            alert("Invalid scene index! Check the github page for a guide on creating custom scenes!");
            return;
        }

        scene = scenes[sceneIndex];
        syncSceneStats();
        settings.controls = false;
        settings.collision = false;
        player.x = 0;
        player.y = 0;
        player.velocityY = 0;
        playerGhost = { ... player };
        settings.collision = true;
        setTimeout(() => {
            settings.controls = true;
        }, 1000);
    };

    sceneButtons.forEach((btn, idx) => {
        btn.onclick = () => {
            setScene(idx);
            btn.blur();
        };
    });

    setScene(0);
    gameLoop();
});