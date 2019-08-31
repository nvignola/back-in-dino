import { Sprite } from "kontra";

export const createEnemy = ctx => {
  const size = Math.round(Math.random() * 20 + 1);

  return Sprite({
    type: "bullet",
    x: -size * 0.5,
    y: -size * 0.5,
    dx: Math.random() * 4 - 2,
    dy: Math.random() * 4 - 2,
    radius: size,
    render() {
      this.context.fillStyle = "firebrick";

      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      this.context.fill();
    },
  });
};
