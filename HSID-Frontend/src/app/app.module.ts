import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";

import { LoginComponent } from './login/login.component';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatTableModule} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatInput} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "./guards/auth.guard";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {RegisterComponent} from "./register/register.component";
import { HlisComponent } from './hlis/hlis.component';
import { MlisComponent } from './mlis/mlis.component';
import { PopUpDetailsComponent } from './pop-up-details/pop-up-details.component';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import { FilterpageComponent } from './filterpage/filterpage.component';
import {MatOption, MatSelect} from "@angular/material/select";
import { MfilterpageComponent } from './mfilterpage/mfilterpage.component';
import { EditMessageDialogComponent } from './edit-message-dialog/edit-message-dialog.component';
import { AddProtocoleComponent } from './add-protocole/add-protocole.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { DecoderComponent } from './decoder/decoder.component';
import { AccesspanelComponent } from './accesspanel/accesspanel.component';
import { TimerComponent } from './timer/timer.component';
import { PasswordComponent } from './password/password.component';
import { EditProtocoleComponent } from './edit-protocole/edit-protocole.component';
import { AddMessageDialogComponent } from './add-message-dialog/add-message-dialog.component';
import { UpdateRequirementDialogComponent } from './update-requirement-dialog/update-requirement-dialog.component';
import {MatChip} from "@angular/material/chips";
import { VerificationComponent } from './verification/verification.component';



@NgModule({
    declarations: [
        AppComponent,
        AdminTemplateComponent,
        LoginComponent,
        RegisterComponent,
        HlisComponent,
        MlisComponent,
        PopUpDetailsComponent,
        FilterpageComponent,
        MfilterpageComponent,
        EditMessageDialogComponent,
        AddProtocoleComponent,
        SearchFormComponent,
        DecoderComponent,
        AccesspanelComponent,
        TimerComponent,
        PasswordComponent,
        EditProtocoleComponent,
        AddMessageDialogComponent,
        UpdateRequirementDialogComponent,
        VerificationComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        MatListItem,
        MatNavList,
        MatCardModule,
        MatDividerModule,
        MatTableModule,
        MatPaginator,
        MatSort,
        MatSortHeader,
        MatInput,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCheckbox,
        FormsModule,
        MatSlider,
        MatSliderThumb,
        MatSlideToggle,
        MatSnackBarModule,
        HttpClientModule,
        NgForOf,
        NgIf,
        NgForOf,
        NgIf,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatSelect,
        MatOption,
        MatChip
    ],
    providers: [
        AuthGuard, AuthorizationGuard
    ],
    exports: [
        AddProtocoleComponent
    ],

    bootstrap: [AppComponent
    ]
})
export class AppModule { }
