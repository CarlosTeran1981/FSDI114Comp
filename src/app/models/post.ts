import { SharedService } from '../service/shared.service';

export class post {
    //class attributes
    public message : string;
    public to : string;
    public from : string;
    public createdOn: Date;
    public imageUrl: string;

    //constructor
  constructor(){    
    this.to = "Everyone";
    this.createdOn = new Date(); // current date/time
  }
    //methods
}