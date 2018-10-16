import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  deals = [];
  productData = {
    accountId:'',
    qnty:'',
    category:''
  };
  
  
  constructor(private _dealsService:DealsService,private route:Router) {

   this.productData.qnty = '';
   this.productData.category = ''
  
   }

  
  ngOnInit() {

    // this.accountId = JSON.parse(localStorage.getItem('currentUser'));
    //    console.log(this.accountId);
    // err =>{
    //   if(err instanceof HttpErrorResponse){
    //    if(err.status === 401){
    //      this.route.navigate(['/login'])
    //    }
    //   }
    // }
  }


  postProduct(){
    this.productData.accountId = JSON.parse(localStorage.getItem('currentUser'))._id;
    //  acntId = accountId;
    this._dealsService.addPost(this.productData)
      .subscribe((data:any) =>{
       // console.log(this.accountId)
        console.log(data);
        this.route.navigate[('/deals')]

      
      err =>{
          if(err instanceof HttpErrorResponse){
           if(err.status === 401){
             this.route.navigate(['/login'])
           }
          }
        }
      }
      
       
      )
  }


  handleInput(evt)
			{
				var charCode = (evt.which) ? evt.which : evt.keyCode;
				if (charCode != 46 && charCode > 31 
				&& (charCode < 48 || charCode > 57))
				return true;
				return false;
			} 
}
