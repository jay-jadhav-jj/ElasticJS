# Elastic JS   

> [!IMPORTANT]
> ElasticJS is built specifically for a 1280px x 585px screen. It may not function properly on devices with other screen sizes.   

## What is it?
---
ElasticJS is a HTML-CSS-JS program I made. Usually, I make games with tools such as Pygame and Unity.
I decided to try and make a game system without a game engine, from scratch. I also wanted it to be web-based.
Hence, ElasticJS' logic is written in Javascript.  

## What does it do
---
The user can control the player, a cyan ball, using their keyboard. The controls are listed on the webpage.
The game has fully implemented movement, upwards velocity/gravity, and collision.
On the webpage, there are sliders for you to adjust the player's speed, jump force, and gravity.   

## Scenes
---
Similar to Unity, there is a scene system I added.
Each scene has a preset speed, jump force, gravity value, and spawn location for the player.
Every scene also has platforms, objects that the player can collide with, along with a floor, set at a chosen height.   

## Custom scenes 
---
> [!IMPORTANT]
> The game panel size is 760 x 410.

You can easily create your own custom scenes. In the `scenes/` folder, you can create your own scenes.
I also left a file named `custom.js` with comments to help you get started, along with other example scripts.   

Here are the steps on creating a custom scene

- Fork the project and create a github site (Pages) or download the code and host it locally
- Make sure your script is in the `scenes/` folder.
- Import the `Platform` class, `Scene` class, and `loadCustomScene` function from `../script.js`.
- Create a new `Scene` instance. The constructor is `(floorHeight, speed, jumpForce, gravity, spawnX = 0, spawnY = 0)`
- Now, as many times as you want, you can add platforms to the scene, using the `.addPlatform` function, which accepts a `Platform`.
- The constructor for the `Platform` class is `(color, x, y, width, height, collision = true)`.
- When you are done customizing your scene, use the `loadCustomScene(scene, index)` function.
- Depending on what index you pass, your scene will be assigned to a different scene button. Since there are five scene buttons, you can only use indexes between 0-4.
- In `index.html`, you need to add your new script in. At line 17, you can use the comment placeholder to help you add your script.
- If all the steps were followed correctly, the site should notify you accordingly.

## What can you do with ElasticJS
---
You can use ElasticJS for any open-source project, as long as you credit me. You MUST publish the source-code publicly.   
