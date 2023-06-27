import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ButtonFloatBottomComponent } from './button-float-bottom/button-float-bottom.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseFormComponent } from './base-form/base-form.component';
import { BaseListComponent } from './base-list/base-list.component';
import { ButtonFormFooterComponent } from './button-form-footer/button-form-footer.component';
import { MdlMessageActionComponent } from './mdl-message-action/mdl-message-action.component';
import { ButtonListAddComponent } from './button-list-add/button-list-add.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPipesModule } from 'ngx-pipes';
import { BtnActionsComponent } from './btn-actions/btn-actions.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderPageComponent } from './header-page/header-page.component';
@NgModule({
  declarations: [
    HeaderComponent,
    ButtonFloatBottomComponent,
    LoadingPageComponent,
    BaseFormComponent,
    BaseListComponent,
    ButtonFormFooterComponent,
    MdlMessageActionComponent,
    ButtonListAddComponent,
    BtnActionsComponent,
    ThemeSwitcherComponent,
    HeaderPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgPipesModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
  exports: [
    HeaderComponent,
    ButtonFloatBottomComponent,
    LoadingPageComponent,
    FormsModule,
    ReactiveFormsModule,
    ButtonFormFooterComponent,
    MdlMessageActionComponent,
    ButtonListAddComponent,
    NgxPaginationModule,
    NgPipesModule,
    BtnActionsComponent,
    ThemeSwitcherComponent,
    HeaderPageComponent
  ],
})
export class CompartidoModule {}
