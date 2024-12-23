import { NgModule } from "@angular/core";

import { MatButtonModule } from "@angular/material/button"
import { MatInputModule } from "@angular/material/input"
import { MatCardModule } from "@angular/material/card"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatDividerModule } from "@angular/material/divider"
import { MatProgressBarModule } from "@angular/material/progress-bar"


@NgModule({
    exports: [
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatToolbarModule,
        MatDividerModule,
        MatProgressBarModule
    ],

    providers: [

    ]
})

export class AngularMaterialModule {}