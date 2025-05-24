import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { MachineComponent } from './machines/machines.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CustomLoginComponent } from './custom-login/custom-login.component';
import { NbCardModule, NbInputModule, NbButtonModule ,NbLayoutModule} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NbIconModule } from '@nebular/theme';
import { CustomSignupComponent } from './customer-signup/customer-signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DatepickerEditorComponent } from './datepicker-editor/datepicker-editor.component';
import { ProduitsComponent } from './produits/produits.component';
import { NumbereditorComponent } from './numbereditor/numbereditor.component';
import { EmployeesComponent } from './employees/employees.component';
import { OrderfabricationComponent } from './orderfabrication/orderfabrication.component';
import { DashboardfabricationComponent } from './dashboardfabrication/dashboardfabrication.component';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbCardModule,
    Ng2SmartTableModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NbLayoutModule,
    HttpClientModule,
    NbIconModule,
  ],
  declarations: [
    PagesComponent,
    MachineComponent,
    CustomLoginComponent,
    CustomSignupComponent,
    UserProfileComponent,
    DatepickerEditorComponent,
    ProduitsComponent,
    NumbereditorComponent,
    EmployeesComponent,
    OrderfabricationComponent,
    DashboardfabricationComponent,
  ],
})
export class PagesModule {
}
