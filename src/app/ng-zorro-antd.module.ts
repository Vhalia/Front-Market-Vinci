
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';

@NgModule({
  exports: [
    NzButtonModule,
    NzDropDownModule,
    NzButtonModule,
    NzGridModule,
    NzListModule
  ]
})
export class DemoNgZorroAntdModule {

}