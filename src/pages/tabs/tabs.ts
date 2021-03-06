import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';
import { Tab10Root } from '../pages';
import { Tab4Root } from '../pages';
import { Tab5Root } from '../pages';
import {FirebaseService} from '../../providers/firebase'

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab10Root;
  tab5Root: any = Tab5Root;
  tab4Root: any = Tab4Root;

  tab1Title = "Ranks";
  tab2Title = "Create";
  tab3Title = "Profile";
  tab4Title = "Posts";
  tab5Title = "Chats"
  unread:number=0
  constructor(public fbs:FirebaseService, public navCtrl: NavController, public translateService: TranslateService) {
    this.fbs.getAuth().onAuthStateChanged((e)=>{
      if(e){
        var sRef= this.fbs.getRef("/users/"+this.fbs.currentUser().uid+"/unread")
        console.log(sRef)
        sRef.on('value',(snap)=>{
          var snaps=snap.val()
          if(typeof snaps=='number'){
            this.unread=snaps
          }
        })
      }
    })
  }

}
