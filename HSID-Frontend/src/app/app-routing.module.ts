import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthGuard} from "./guards/auth.guard";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {MsidComponent} from "./msid/msid.component";
import {RegisterComponent} from "./register/register.component";
import {HsidComponent} from "./hsid/hsid.component";
import {HlisComponent} from "./hlis/hlis.component";
import {MlisComponent} from "./mlis/mlis.component";
import {AttributeComponent} from "./attribute/attribute.component";
import {AttributeMComponent} from "./attribute-m/attribute-m.component";
import {PopUpDetailsComponent} from "./pop-up-details/pop-up-details.component";
import {FilterpageComponent} from "./filterpage/filterpage.component";
import {MfilterpageComponent} from "./mfilterpage/mfilterpage.component";
import {SearchFormComponent} from "./search-form/search-form.component";
import {DecoderComponent} from "./decoder/decoder.component";
import {AccesspanelComponent} from "./accesspanel/accesspanel.component";
import {PasswordComponent} from "./password/password.component";
import {VerificationComponent} from "./verification/verification.component";


const routes: Routes = [
  {path : "", component : LoginComponent},
  {path : "login", component : LoginComponent},
  {path : "register", component : RegisterComponent},
  {path : "admin", component : AdminTemplateComponent, canActivate : [AuthGuard],
    children : [

      {path : "dashboard", component : DashboardComponent},
      {path : "panel", component : AccesspanelComponent,
        canActivate : [AuthorizationGuard], data : {roles : ['ADMIN']} },
      {path : "hsid", component : HsidComponent},
      {path : "hlis", component : HlisComponent},
      {path : "msid", component : MsidComponent},
      {path : "mlis", component : MlisComponent},
      {path : "attribute", component : AttributeComponent},
      {path : "attribute-m", component : AttributeMComponent},
      {path : "popup", component : PopUpDetailsComponent},
      {path : "filter", component : FilterpageComponent},
      {path : "convert", component : DecoderComponent},
      {path : "mfilter", component : MfilterpageComponent},
      {path : "service", component : SearchFormComponent},
      {path : "password", component : PasswordComponent},
      {path : "verify", component : VerificationComponent}

    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
