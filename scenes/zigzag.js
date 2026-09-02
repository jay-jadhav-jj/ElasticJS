import { Platform, Scene, loadCustomScene } from "../script.js"

let zigzag = new Scene(10, 150, 600, 50);

zigzag.addPlatform(new Platform("rgba(50, 50, 50, 0.1)", 0, 0, 32, 400, false, false));
zigzag.addPlatform(new Platform("grey", 32, 0, 30, 360));
zigzag.addPlatform(new Platform("grey", 730, 0, 30, 400));
zigzag.addPlatform(new Platform("lightgrey", 32, 360, 30, 40, false));

zigzag.addPlatform(new Platform("darkorange", 62, 350, 628, 10));
zigzag.addPlatform(new Platform("orange", 102, 300, 628, 10));
zigzag.addPlatform(new Platform("darkorange", 62, 250, 628, 10));
zigzag.addPlatform(new Platform("orange", 102, 200, 628, 10));
zigzag.addPlatform(new Platform("darkorange", 62, 150, 628, 10));
zigzag.addPlatform(new Platform("orange", 102, 100, 628, 10));
zigzag.addPlatform(new Platform("darkorange", 62, 50, 628, 10));

zigzag.addPlatform(new Platform("rgba(0, 255, 255, 0.5)", 690, 350, 40, 10, false, false));
zigzag.addPlatform(new Platform("rgba(0, 255, 255, 0.5)", 62, 300, 40, 10, false, false));
zigzag.addPlatform(new Platform("rgba(0, 255, 255, 0.5)", 690, 250, 40, 10, false, false));
zigzag.addPlatform(new Platform("rgba(0, 255, 255, 0.5)", 62, 200, 40, 10, false, false));
zigzag.addPlatform(new Platform("rgba(0, 255, 255, 0.5)", 690, 150, 40, 10, false, false));
zigzag.addPlatform(new Platform("rgba(0, 255, 255, 0.5)", 62, 100, 40, 10, false, false));
zigzag.addPlatform(new Platform("rgba(0, 255, 255, 0.5)", 690, 50, 40, 10, false, false));

zigzag.addPlatform(new Platform("gold", 62, 0, 50, 50, true, false, () => {
    alert("You win!");
}, -1));


loadCustomScene(zigzag, 4);