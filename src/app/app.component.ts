import { Component, OnInit } from '@angular/core';
import { bike } from './models';
import { HttpClientService } from './services/httpClient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public title: string = "PAGE TITLE..."; 
  public bikes: bike[] = [];
  public isLoading: boolean = false;

//***********ngModel */
  public idM: number = 0;
  public name: string = '';
  public color: string = '';
  public country: string = '';
  public createdAt: string = '';
//***********ngModel */

  Finalputmethod(e:Event) {
    let u: bike = {
      id: this.idM,
      createdAt: this.createdAt,
      name: this.name,
      color: this.color,
      country: this.country
    };
    console.log(u);
    this.httpClientService.putBike(this.idM,u)
    .then((result) => {
      let idx = this.bikes.findIndex((arr) => arr.id === this.idM);
      console.log(result);
      this.bikes.splice(idx,1,result);
      alert("data edit successfully id ="+ this.idM);
    }, (error) => {
      console.log('HI'); 
      this.httpClientService.postBike(this.idM,u);
    });
  }
  
  putmethod(id:number,event:Event){
      console.log('event', event);
      let value = (event.target as HTMLInputElement).value;
      (event.target as HTMLInputElement).value = 'Please Wait';
      (event.target as HTMLInputElement).disabled = true;

      let idx = this.bikes.findIndex((arr) => arr.id === id);
      this.idM = id;
      this.name = this.bikes[idx].name;
      this.color = this.bikes[idx].color;
      this.country = this.bikes[idx].country;
      this.createdAt = this.bikes[idx].createdAt;
      alert("You Can Edit Record on Top");
  }

  constructor(
    private httpClientService: HttpClientService
  ){}

  public deleteFunc(id: number, event: Event) {
    console.log('event', event);
    let value = (event.target as HTMLInputElement).value;
    (event.target as HTMLInputElement).value = 'Loading...';
    (event.target as HTMLInputElement).disabled = true;
    this.httpClientService.deleteBike(id)
    .then((result) => {
      let idx = this.bikes.findIndex((arr) => arr.id === id);
      this.bikes.splice(idx, 1);
      alert("data delete successfully id ="+ id);
    }, (error) => {
      console.log('HI'); 
    });
  }

	ngOnInit() {
    this.isLoading = true;
    this.httpClientService.getBikesAngular()
    .then((result: any) => {
      this.isLoading = false;
      this.bikes = result;
    }, (error) => {
      this.isLoading = false;
      // any
    });
	}
}
