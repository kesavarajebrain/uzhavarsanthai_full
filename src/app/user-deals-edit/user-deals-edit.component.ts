
import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import {ActivatedRoute, Params} from '@angular/router'
import { Router} from '@angular/router'

@Component({
  selector: 'app-user-deals-edit',
  templateUrl: './user-deals-edit.component.html',
  styleUrls: ['./user-deals-edit.component.css']
})
export class UserDealsEditComponent implements OnInit {
  id:any;
  dealslists = [];
  deallistobj={
    category:'',
    name:'',
    quantity:'',
    qnty:'',
    price:'',
    description:''

  }
  constructor(private  _dealsService:DealsService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    // console.log(this.id)
    this._dealsService.getDeals()
    .subscribe(
      res=>{
        this.dealslists = res
        // console.log(this.dealslists)
        for(let i=0; i < this.dealslists.length; i++){
          if(this.id == this.dealslists[i]._id){
            this.deallistobj.category = this.dealslists[i].category
            this.deallistobj.name = this.dealslists[i].name
            this.deallistobj.quantity = this.dealslists[i].quantity
            this.deallistobj.qnty = this.dealslists[i].qnty
            this.deallistobj.price = this.dealslists[i].price
            this.deallistobj.description = this.dealslists[i].description
            // console.log(this.deallistobj.productCatogory)
            // console.log( this.deallistobj.productName)
            // console.log(this.deallistobj.productQty )
            // console.log( this.deallistobj.productUnit)
            // console.log(this.deallistobj.productCost)
            // console.log(this.deallistobj.productDescription)
          }
        }

      },
      err=>{
        console.log(err)
      }
    )
  }


  update(){
    console.log(this.deallistobj)
    this._dealsService.editDeals(this.deallistobj,this.id)
    .subscribe(
      res=>{console.log(this.deallistobj),
        this.router.navigate[('/user-deals')]},
      err=>console.log(err),

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
