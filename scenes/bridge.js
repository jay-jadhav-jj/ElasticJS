import { Platform, Scene, loadCustomScene } from "../script.js";

let bridge = new Scene(0, 200, 0, 10);

bridge.addPlatform(new Platform("#3E2723", 0, 200, 50, 210));
bridge.addPlatform(new Platform("#3E2723", 700, 200, 50, 210));
bridge.addPlatform(new Platform("#3E2723", 5, 190, 40, 10));
bridge.addPlatform(new Platform("#3E2723", 705, 190, 40, 10));

bridge.addPlatform(new Platform("lightblue", 50, 340, 650, 70));

for (let i = 0; i < 11; i++) {
    bridge.addPlatform(new Platform("#6D4C41", 50 + 60 * i, 275, 50, 25));
};

bridge.addPlatform(new Platform("#8D6E63", 50, 255, 650, 10, false));
bridge.addPlatform(new Platform("#8D6E63", 50, 235, 650, 10, false));

loadCustomScene(bridge, 4);