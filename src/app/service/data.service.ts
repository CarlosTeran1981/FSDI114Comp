import { Injectable } from '@angular/core';
import { post } from '../models/post';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Friend } from '../models/Friend';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  allPosts: Observable<post[]>;
  postCollection: AngularFirestoreCollection<post>;

  allFriends: Observable<Friend[]>;
  friendCollection: AngularFirestoreCollection<Friend>;

  

  constructor(private fb:AngularFirestore) {
      this.postCollection = fb.collection<post>('posts');
      this.friendCollection = fb.collection<Friend>('friends');
      
      //read all the messages from database and popular local array
      this.allPosts = this.postCollection.valueChanges();
      //read all friends

      this.allFriends = this.friendCollection.valueChanges();
  }

  public savePost(post: post) {
    var item = Object.assign({}, post);
    
    this.postCollection.add(post);
    
    console.log('original', post);
    console.log('simpler', item);

   
  }

  public getAllPost(){
    return this.allPosts;
  }

  public saveFriend(theNewFriendObject: Friend){
    var item = Object.assign({}, theNewFriendObject);
    this.friendCollection.add(item);
  }

  public removeFriend(objId : string){
    //this.fb.doc("friends/" + objId).set(friendIntanceWithNewInfo);

    this.fb.doc("friends/" + objId).delete();
  }

  public getAllFriends(){
    //read all friends

    this.allFriends = this.friendCollection.snapshotChanges().pipe
    (map(actions => {
      return actions.map(m => {
        let id = m.payload.doc.id;
        let friend : Friend = m.payload.doc.data();
        friend.fbId = id;
        return friend;
      });
    })
    );
    return this.allFriends;
  }
}
