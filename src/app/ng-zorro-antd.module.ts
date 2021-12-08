
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  exports: [
    NzButtonModule,
    NzDropDownModule
  ]
})
export class DemoNgZorroAntdModule {

}