
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';



@NgModule({
  exports: [
    NzButtonModule,
    NzDropDownModule,
    NzTableModule,
    NzIconModule
  ]
})
export class DemoNgZorroAntdModule {

}