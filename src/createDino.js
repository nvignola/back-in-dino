import { Sprite, SpriteSheet } from "kontra";

export let dino;

let image = new Image();
image.src = "assets/dino.png";
image.onload = function() {
  let spriteSheet = SpriteSheet({
    image: image,
    frameWidth: 24,
    frameHeight: 30,
    animations: {
      idle: {
        frames: "0..2",
        frameRate: 5,
      },
      jump: {
        frames: "11..12",
        frameRate: 10,
        loop: true,
        frameRate: 3,
      },
      walk: {
        frames: "3..8",
        frameRate: 10,
      },
      moonwalk: {
        frames: "8..3",
        frameRate: 10,
      },
      cry: {
        frames: "14..16",
        frameRate: 10,
      },
    },
  });

  dino = Sprite({
    type: "dino",
    x: 125 + 12,
    y: 120,
    gravity: 0.75,
    grounded: false,
    jumping: false,
    lastY: 0,
    animations: spriteSheet.animations,
  });
};
