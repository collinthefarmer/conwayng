import { NgModule }            from "@angular/core";
import { CommonModule }        from "@angular/common";
import { CanvasModule }        from "@ng-web-apis/canvas";
import { LifeModule }          from "../life/life.module";
import { CellCanvasComponent } from "./components/cell-canvas/cell-canvas.component";
import { GamePageComponent }   from "./pages/game-page/game-page.component";
import { DrawService }         from "./services/draw/draw.service";


@NgModule({
    declarations: [
        CellCanvasComponent,
        GamePageComponent
    ],
    exports: [
        CellCanvasComponent,
        GamePageComponent
    ],
    imports: [
        CommonModule,
        CanvasModule,
        LifeModule
    ],
    providers: [
        DrawService
    ]
})
export class DrawModule {
}
