import { Component, OnInit } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {


  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.http.get("https://vinci-treasures-back.azurewebsites.net/weatherforecast")
      .subscribe((Response) =>{
        if(Response) console.log(Response)
      })
  }

}
