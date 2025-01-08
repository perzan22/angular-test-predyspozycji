import { NgModule } from "@angular/core";

import { MatButtonModule } from "@angular/material/button"
import { MatInputModule } from "@angular/material/input"
import { MatCardModule } from "@angular/material/card"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatDividerModule } from "@angular/material/divider"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from "@angular/material/select"


@NgModule({
    exports: [
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatToolbarModule,
        MatDividerModule,
        MatProgressBarModule,
        MatCheckboxModule,
        MatIconModule,
        MatSelectModule
    ],

    providers: [

    ]
})

export class AngularMaterialModule {}