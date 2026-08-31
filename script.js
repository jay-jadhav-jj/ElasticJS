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
    constructor(floorHeight) {
        this.floorHeight = floorHeight;
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


    let scene = new Scene(floorHeight=50);

    scene.addPlatform(new Platform("red", 400, 260, 32, 100));
    scene.addPlatform(new Platform("yellow", 500, 210, 32, 150));
    scene.addPlatform(new Platform("blue", 600, 160, 32, 200));
    scene.addPlatform(new Platform("green", 700, 110, 32, 32));

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
        gravity: 10,
        jumpForce: 500
    };

    let playerGhost = {
        diameter: 32,
        x: 0,
        y: 0,
        speed: 200,
        velocityY: 0,
        gravity: 10,
        jumpForce: 500,
        topCollisionFactor: 5
    };

    let lastTime = 0;

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
        if (player.y + player.diameter > gamePanel.height - scene.floorHeight) {
            player.y = gamePanel.height - scene.floorHeight - player.diameter;
        }

        scene.platforms.forEach(platform => {
            //top
            if ((player.y + player.diameter > platform.y) && (player.y + player.diameter <= platform.y + platform.height)) {
                if ((player.x + player.diameter > platform.x) && (player.x < platform.x + platform.width)) {
                    if (playerGhost.y + playerGhost.diameter <= platform.y) {
                        player.y = platform.y - player.diameter;
                    }
                }
            }

            //bottom
            if ((player.y < platform.y + platform.height) && (player.y > platform.y)) {
                if ((player.x + player.diameter > platform.x) && (player.x < platform.x + platform.width)) {
                    if (playerGhost.y >= platform.y + platform.height) {
                        player.y = platform.y + platform.height;
                    }
                }
            }

            //left 
            if ((player.x + player.diameter > platform.x) && (player.x < platform.x + platform.width)) {
                if ((player.y + player.diameter > platform.y) && (player.y < platform.y + platform.height)) {
                    if (playerGhost.x + playerGhost.diameter <= platform.x) {
                        player.x = platform.x - player.diameter;
                    }
                }
            }
            
            //right
            if ((player.x < platform.x + platform.width) && (player.x + player.diameter > platform.width)) {
                if ((player.y + player.diameter > platform.y) && (player.y < platform.y + platform.height)) {
                    if (playerGhost.x >= platform.x + platform.width) {
                        player.x = platform.x + platform.width;
                    }
                }
            }
        });
    };

    function updatePlayer(deltaTime) {
        if (controls.a || controls.left) {
            player.x -= player.speed * deltaTime;

            if (player.x < 0) {
                player.x = 0;
            }
        }

        if (controls.d || controls.right) {
            player.x += player.speed * deltaTime;

            if (player.x + player.diameter > gamePanel.width) {
                player.x = gamePanel.width - player.diameter;
            }
        }
    
        if (playerGrounded()) {
            player.velocityY = 0;
            if (controls.w || controls.up || controls.space) {
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
        player.speed = speedSlider.value;
    });

    jumpForceSlider.addEventListener("input", () => {
        player.jumpForce = jumpForceSlider.value;
    });

    gravitySlider.addEventListener("input", () => {
        player.gravity = gravitySlider.value;
    });

    gameLoop();
});