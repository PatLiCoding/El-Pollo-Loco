class CollidableObject extends MoveableObject {
  collidable = true;
  damage = 0;
  offset = { top: 0, right: 0, bottom: 0, left: 0 };

  constructor() {
    super();
    this.getRealFrame();
  }

  getRealFrame() {
    this.rx = this.x + this.offset.left;
    this.ry = this.y + this.offset.top;
    this.rw = this.w - this.offset.left - this.offset.right;
    this.rh = this.h - this.offset.top - this.offset.bottom;
  }
}
