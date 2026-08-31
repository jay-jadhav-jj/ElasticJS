# Elastic JS  

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
Each scene has a preset speed, jump force, and gravity value for the player.
Every scene also has platforms, objects that the player can collide with, along with a floor, set at a chosen height.   

## Custom scenes 
---
You can easily create your own custom scenes. In the `script.js` file, you'll see some comments I left with placeholders
to help make custom scenes.   

Here are steps on making a custom scene   
- On line 43, add a new `Scene` object into the `scenes` list. The constructor is `Scene(Floor Height, Player Speed, Player Jump Force, Player Gravity);`
- On line 71, add the platforms you want into your scene, with the `Scene.addPlatform(Platform)` function. The constructor for platforms is `Platform(Color, X, Y, Width, Height)`. Make sure the scene's index is correct (`scenes[4]` by default).
- And that's it. Now, if you press the 'C' button, it should load your custom scene.


## What can you do with ElasticJS
---
You can use ElasticJS for any open-source project, as long as you credit me. You MUST publish the source-code publicly.   
