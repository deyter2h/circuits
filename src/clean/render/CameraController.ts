// CameraController.ts
import * as Phaser from "phaser";

export class CameraController {
  private scene: Phaser.Scene;
  private camera: Phaser.Cameras.Scene2D.Camera;
  private isDragging: boolean = false;
  private dragStart: Phaser.Math.Vector2 = new Phaser.Math.Vector2();
  private cameraDragStart: Phaser.Math.Vector2 = new Phaser.Math.Vector2();
  private zoomStep: number;
  private zoomMin: number;
  private zoomMax: number;

  constructor(
    scene: Phaser.Scene,
    camera: Phaser.Cameras.Scene2D.Camera,
    zoomStep: number = 0.03,
    zoomMin: number = 0.5,
    zoomMax: number = 3
  ) {
    this.scene = scene;
    this.camera = camera;
    this.zoomStep = zoomStep;
    this.zoomMin = zoomMin;
    this.zoomMax = zoomMax;
    this.registerEvents();
  }

  private registerEvents(): void {
    // Handle mouse dragging
    this.scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonDown()) {
        this.isDragging = true;
        this.dragStart.set(pointer.x, pointer.y);
        this.cameraDragStart.set(this.camera.scrollX, this.camera.scrollY);
      }
    });

    this.scene.input.on("pointerup", () => {
      this.isDragging = false;
    });

    this.scene.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      if (!this.isDragging) return;
      // Calculate screen delta
      const deltaX = pointer.x - this.dragStart.x;
      const deltaY = pointer.y - this.dragStart.y;
      // Convert screen delta to world delta (divide by zoom)
      this.camera.scrollX = this.cameraDragStart.x - (deltaX / this.camera.zoom);
      this.camera.scrollY = this.cameraDragStart.y - (deltaY / this.camera.zoom);
    });

    // Handle zoom with mouse wheel
    this.scene.input.on("wheel", (_pointer, _gameObjects, _dx, dy) => {
      const newZoom = Phaser.Math.Clamp(
        this.camera.zoom + (dy < 0 ? this.zoomStep : -this.zoomStep),
        this.zoomMin,
        this.zoomMax
      );
      this.camera.setZoom(newZoom);
    });
  }
}
