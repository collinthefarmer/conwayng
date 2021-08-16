import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { DrawModule }    from "../modules/draw/draw.module";

import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        DrawModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
