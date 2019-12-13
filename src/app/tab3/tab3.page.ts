import { Component } from '@angular/core';
import { Friend } from '../models/Friend';
import { DataService } from '../service/data.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  model : Friend = new Friend();
  friendsToDisplay : Friend[] = [];

  constructor(private data : DataService, private shared : SharedService) {
    data.getAllFriends().subscribe(list => {

      //clear
      this.friendsToDisplay = [];
      //filter to see only my friends

      /* 
      travel the list array
      get each friend there
      compare if friends.belongsTo its equal to my userName ( " " )
      then, push the friend in to this.friendsToDisplay array*/

      for(let i=0; i< list.length; i++){
        let friend = list[i];
        console.log(list, "form db")
        if(friend.belongsTo == shared.userName){
          this.friendsToDisplay.push(friend);
        }
      }

      // sort the array
      this.friendsToDisplay =this.friendsToDisplay.sort ((left,right) => {
        if(left.name.toLowerCase() < right.name.toLowerCase()) return -1;
        else return 1;
      });
    });
  }

  register(){
    // set the belongsTo to model
    this.model.belongsTo = this.shared.userName;
    
    //send the object to data service

    this.data.saveFriend(this.model);

    //clear form
    this.model = new Friend();
  }

  unfriend(friendToRemove : Friend){
    console.log('remove', friendToRemove);
    this.data.removeFriend( friendToRemove.fbId );
  }

}
