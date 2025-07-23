import { Component } from '@angular/core';
import { AddHotelsService } from 'src/app/core/add-hotels.service';
import { FormsModule,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-add-hotels',
  templateUrl: './add-hotels.component.html',
  styleUrls: ['./add-hotels.component.css']
})
export class AddHotelsComponent {
  hotel = {
    name:'',
    location:'',
    price: 0 as number,

  };
  selectedFile:File| null = null

  constructor(private service : AddHotelsService){}

  onFileSelected(event : any){
    this.selectedFile = event.target.files[0]
  }

  onSubmit(){

    if(!this.selectedFile){
      alert("Please select a file");
      return
    }

    const formData = new FormData();
    formData.append('name',this.hotel.name)
    formData.append('location',this.hotel.location)
    formData.append('price',this.hotel.price.toString())
    if(this.selectedFile){
      formData.append('image',this.selectedFile)
    }
    this.service.addHotels(formData).subscribe({
      next:()=>{
        alert("Hotel added successfully")
      },
      error : (err)=>{
        console.log(err)
        alert("Could not add hotel")
      }
    })
  }
}
