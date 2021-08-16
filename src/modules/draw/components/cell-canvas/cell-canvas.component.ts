import { AfterViewChecked, AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { LifeService }                                                       from "../../../life/services/life/life.service";
import { DrawService }                                                       from "../../services/draw/draw.service";

@Component({
    selector: "app-cell-canvas",
    templateUrl: "./cell-canvas.component.html",
    styleUrls: ["./cell-canvas.component.css"]
})
export class CellCanvasComponent implements AfterViewInit {

    @ViewChild("canvas")
    private canvasElement!: ElementRef<HTMLCanvasElement>;

    private canvasContext!: CanvasRenderingContext2D;

    constructor(private drawService: DrawService, private lifeService: LifeService) {
    }

    ngAfterViewInit(): void {
        this.drawService.cellSizePixels = 1;

        this.canvasContext = this.canvasElement.nativeElement.getContext("2d") as CanvasRenderingContext2D;
        this.canvasContext.imageSmoothingEnabled = false;

        this.canvasContext.fillRect(this.drawService.cellSizePixels, this.drawService.cellSizePixels, this.drawService.cellSizePixels, this.drawService.cellSizePixels);
        this.canvasContext.fillRect(2 * this.drawService.cellSizePixels, this.drawService.cellSizePixels, this.drawService.cellSizePixels, this.drawService.cellSizePixels);
        this.canvasContext.fillRect(3 * this.drawService.cellSizePixels, this.drawService.cellSizePixels, this.drawService.cellSizePixels, this.drawService.cellSizePixels);

        const cellGridFromCanvas = this.drawService.readCanvasPixelsToCellGrid(this.canvasContext, (a) => !!a.slice(-1)[0]);
        const nextCellGrid = this.lifeService.tick(cellGridFromCanvas);

        this.drawService.writeCellGridToCanvasPixels(
            this.canvasContext,
            nextCellGrid,
            (v) => v ? [0, 0, 0, 255] : [0, 0, 0, 0]
        );

    }

}
