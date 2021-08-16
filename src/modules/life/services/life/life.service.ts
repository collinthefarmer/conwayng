import { Injectable } from "@angular/core";
import { LifeModule } from "../../life.module";


/*
* 2-dimensional array of booleans representing the state of the environment's cells for a given frame.
* */
export type CellGrid = boolean[][];

interface ICellCoordinates {
    x: number;
    y: number;
}

type CellNeighborCoordinates = [ICellCoordinates, ICellCoordinates, ICellCoordinates, ICellCoordinates, ICellCoordinates, ICellCoordinates, ICellCoordinates, ICellCoordinates];

@Injectable({
    providedIn: LifeModule
})
export class LifeService {

    constructor() {
    }

    private static adjustPositionToroidal(axisPosition: number, maxAxisPosition: number): number {
        return axisPosition >= 0 ? axisPosition < maxAxisPosition ? axisPosition : axisPosition % maxAxisPosition : maxAxisPosition - 1;
    }

    private static fetchCellStateFromCellGrid(cellGrid: CellGrid, cellCoordinates: ICellCoordinates): boolean {
        return cellGrid[cellCoordinates.x][cellCoordinates.y];
    }

    private static cellNeighborCoordinates(cellGrid: CellGrid, cellCoordinates: ICellCoordinates): CellNeighborCoordinates {
        const maxWidth = cellGrid.length;
        const maxHeight = cellGrid[0].length;

        const cellX = cellCoordinates.x;
        const cellY = cellCoordinates.y;

        return [
            {x: this.adjustPositionToroidal(cellX + 1, maxWidth), y: this.adjustPositionToroidal(cellY + 1, maxHeight)},
            {x: this.adjustPositionToroidal(cellX + 1, maxWidth), y: this.adjustPositionToroidal(cellY, maxHeight)},
            {x: this.adjustPositionToroidal(cellX + 1, maxWidth), y: this.adjustPositionToroidal(cellY - 1, maxHeight)},
            {x: this.adjustPositionToroidal(cellX, maxWidth), y: this.adjustPositionToroidal(cellY + 1, maxHeight)},
            {x: this.adjustPositionToroidal(cellX - 1, maxWidth), y: this.adjustPositionToroidal(cellY - 1, maxHeight)},
            {x: this.adjustPositionToroidal(cellX - 1, maxWidth), y: this.adjustPositionToroidal(cellY, maxHeight)},
            {x: this.adjustPositionToroidal(cellX - 1, maxWidth), y: this.adjustPositionToroidal(cellY + 1, maxHeight)},
            {x: this.adjustPositionToroidal(cellX, maxWidth), y: this.adjustPositionToroidal(cellY - 1, maxHeight)}
        ];
    }

    private static cellNeighborStateSum(cellGrid: CellGrid, cellNeighborCoordinates: CellNeighborCoordinates): number {
        return cellNeighborCoordinates.filter((c) => this.fetchCellStateFromCellGrid(cellGrid, c)).length;
    }

    /*
    * true = alive, false = dead
    *
    * Rules:
    * Any live cell with two or three live neighbours survives.
    * Any dead cell with three live neighbours becomes a live cell.
    * All other live cells die in the next generation. Similarly, all other dead cells stay dead.
    *
    * */
    private static cellStateNextTick(currentCellState: boolean, cellNeighborStateSum: number): boolean {
        return currentCellState ? cellNeighborStateSum === 3 || cellNeighborStateSum === 2 : cellNeighborStateSum === 3;
    }

    tick(currentFrame: CellGrid): CellGrid {
        const height = currentFrame.length;
        const width = currentFrame[0].length;

        const nextFrame: CellGrid = [];

        for (let ix = 0; ix < width; ix++) {
            const column = []

            for (let iy = 0; iy < height; iy++) {
                const thisCellValue = currentFrame[ix][iy];
                const thisCellCoordinates = {x: ix, y: iy}
                const neighbors = LifeService.cellNeighborCoordinates(currentFrame, thisCellCoordinates);
                const neighborSum = LifeService.cellNeighborStateSum(currentFrame, neighbors);

                column.push(LifeService.cellStateNextTick(thisCellValue, neighborSum));
            }

            nextFrame.push(column);
        }

        return nextFrame;
    }

}



