import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import {ActivatedRoute} from '@angular/router';
import {Router, ParamMap} from '@angular/router';
// loader 
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-user-deals',
  templateUrl: './user-deals.component.html',
  styleUrls: ['./user-deals.component.css']
})
export class UserDealsComponent implements OnInit {

  crdDeals = [];
  userName = {};
  userDeals = [];
  id:any;
  errMsg : any

  constructor(private  _dealsService:DealsService,private route:ActivatedRoute,private router:Router,public loadingCtrl: NgxSpinnerService) { 
    for(let i=1;i<=1; i++){
      this.userDeals.push('Angular ${i}.0');
      }
    }
  

  ngOnInit() {

    this.userName = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.userName)
    this.loadingCtrl.show();
    this._dealsService.getDeals()
      .subscribe(
        res =>{
          this.loadingCtrl.hide();
          let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
          let j = 0;
          
          this.crdDeals = res

          for(let i=0; i < this.crdDeals.length; i++){
            if(acntID == this.crdDeals[i].accountId){
              this.userDeals[j] = this.crdDeals[i];
             
          console.log(this.crdDeals[i]);
          console.log(this.userDeals[j]);
          j++;
            }
          }
          if (this.userDeals.length == 0){
            this.errMsg = "Still you not post any deals"
            document.getElementById('search_box').style.display='none';
            console.log(this.errMsg)
          }
     
        },
        err => console.log(err)
      )
  }

  deleteuser(){
    this.id = this.route.snapshot.params['id']
    this._dealsService.deletedeal(this.id)
    .subscribe(
       res=>{ console.log(res)
     
       },
       err=>{ console.log(err);
      },
    
    )
   }
}
