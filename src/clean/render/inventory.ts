import * as Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import { GraphicElementBase } from './graphic.base';

export class InventoryGraphic extends GraphicElementBase {
    private rexUI: RexUIPlugin;
    private sizer: any;
    private labels: Phaser.GameObjects.GameObject[] = [];
    private names: string[] = [];
    private selectedIndex: number | null = null;
    private cursorImage!: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, x: number, y: number, rexUI: RexUIPlugin) {
        super(scene, x, y);
        this.scene = scene;
        this.rexUI = rexUI;
        this.sizer = this.rexUI.add.sizer({
            x: scene.scale.width / 2,
            y: scene.scale.height - 30,
            orientation: 'horizontal',
            space: { item: 10 }
        });

        for (let i = 0; i < 9; i++) {
            const bg = this.rexUI.add.roundRectangle(0, 0, 40, 40, 6, 0x333333);
            bg.setStrokeStyle(2, 0xffffff);
            const icon = this.scene.add.image(0, 0, 'null').setDisplaySize(32, 32);
            const label = this.rexUI.add.label({
                width: 40,
                height: 40,
                background: bg,
                icon: icon,
                align: 'center'
            }).setInteractive();

            const index = i;
            label.on('pointerover', () => {
                if (this.selectedIndex !== index) {
                    (label.getElement('background') as any).setStrokeStyle(2, 0xffff00);
                }
            });
            label.on('pointerout', () => {
                if (this.selectedIndex !== index) {
                    (label.getElement('background') as any).setStrokeStyle(2, 0xffffff);
                }
            });
            label.on('pointerdown', () => {
                if (this.selectedIndex === index) {
                    this.selectedIndex = null;
                    (label.getElement('background') as any).setStrokeStyle(2, 0xffffff);
                    this.cursorImage.setVisible(false);
                } else {
                    if (this.selectedIndex !== null) {
                        const prevLabel: any = this.labels[this.selectedIndex];
                        prevLabel.getElement('background').setStrokeStyle(2, 0xffffff);
                    }
                    this.selectedIndex = index;
                    (label.getElement('background') as any).setStrokeStyle(2, 0xffff00);

                    const icon = label.getElement('icon') as Phaser.GameObjects.Image;
                    this.cursorImage.setTexture(icon.texture.key);
                    this.cursorImage.setDisplaySize(icon.displayWidth, icon.displayHeight);
                    this.cursorImage.setVisible(true);
                }

            });

            this.sizer.add(label);
            this.labels.push(label);
        }
        this.sizer.layout();

        this.cursorImage = this.scene.add.image(0, 0, 'null')
            .setDisplaySize(32, 32)
            .setVisible(false)
            .setDepth(9999);

        this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            this.cursorImage.setPosition(pointer.x + 8, pointer.y + 8);
        });
        this.scene.add.existing(this.sizer);

        this.handleCamera();
    }

    public setTextureForIndex(index: number, textureKey: string): void {
        if (index < 0 || index >= this.labels.length) return;
        const label: any = this.labels[index];
        const icon = label.getElement('icon') as Phaser.GameObjects.Image;
        if (icon) {
            icon.setTexture(textureKey);

            // Автомасштаб под рамку 32x32 (можно подогнать)
            const maxW = 32;
            const maxH = 32;

            const tex = this.scene.textures.get(textureKey);
            const frame = tex.getSourceImage();
            const ratio = Math.min(maxW / frame.width, maxH / frame.height);

            icon.setDisplaySize(frame.width * ratio, frame.height * ratio);
        }
        this.names[index] = textureKey;
    }

    public getUIObjects(): Phaser.GameObjects.GameObject[] {
        return [this.sizer, this.cursorImage];
    }

    public getSelectedItem(): string {
        return this.names[this.selectedIndex];
    }

    handleCamera(): void {
        this.scene.cameras.main.ignore(this.getUIObjects());
    }

    getGraphics(): Phaser.GameObjects.GameObject {
        return null;
    }

    updateGraphic(): void {

    }
}
