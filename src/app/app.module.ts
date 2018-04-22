import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsDropdownModule, AccordionModule, TabsModule, PaginationModule } from 'ngx-bootstrap';
import { VrsRouterModule } from './vrs-router.module';
import { AppComponent } from './app.component';
import { SpinnerModule } from './shared-modules/spinner/spinner.module';
import { EditcmsModule } from './shared-modules/editcms/editcms.module';
import { SharedModule } from './shared/shared.module';
import { UserService } from './shared/service/user.service';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/**
 * Top level module that loads all globally used modules
 */

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    VrsRouterModule,
    SharedModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    SpinnerModule,
    EditcmsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
