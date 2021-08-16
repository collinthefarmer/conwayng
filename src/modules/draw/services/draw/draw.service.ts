import { Injectable } from "@angular/core";
import { CellGrid }   from "../../../life/services/life/life.service";

export type PixelStateFn = (pixel: Uint8ClampedArray) => boolean;
export type PixelValueFn = (cellValue: boolean) => [number, number, number, number];

@Injectable()
export class DrawService {

    // will need this: https://stackoverflow.com/questions/13242660/list-unique-colors-in-an-html-canvas

    public cellSizePixels: number = 1;

    constructor() {
    }

    readCanvasPixelsToCellGrid(canvasContext: CanvasRenderingContext2D, pixelStateFn: PixelStateFn): CellGrid {
        const cellGrid: CellGrid = [];

        for (let ix = 0; ix < canvasContext.canvas.width; ix++) {
            const column: boolean[] = [];

            for (let iy = 0; iy < canvasContext.canvas.height; iy++) {
                const pixel = canvasContext.getImageData(iy * this.cellSizePixels, ix * this.cellSizePixels, this.cellSizePixels, this.cellSizePixels).data;
                const pixelCellState = pixelStateFn(pixel);

                column.push(pixelCellState);
            }

            cellGrid.push(column);
        }

        return cellGrid;
    }

    writeCellGridToCanvasPixels(canvasContext: CanvasRenderingContext2D, cellGrid: CellGrid, pixelValueFn: PixelValueFn): void {

        const pixelValues: number[] = [];

        for (let ix = 0; ix < canvasContext.canvas.width; ix++) {

            for (let iy = 0; iy < canvasContext.canvas.height; iy++) {

                const cellValue = cellGrid[ix][iy];
                const cellPixelValue = pixelValueFn(cellValue);

                const resizedCellPixelValue: number[] = [];
                const totalPixelsToCell = this.cellSizePixels ** 2;

                for (let i = 0; i < totalPixelsToCell; i++) {
                    resizedCellPixelValue.push(...cellPixelValue)
                }

                pixelValues.push(...resizedCellPixelValue);
            }

        }

        const pixelArray = new Uint8ClampedArray(pixelValues);

        canvasContext.putImageData(
            new ImageData(pixelArray, canvasContext.canvas.width, canvasContext.canvas.height),
            0,
            0
        );
    }

}
