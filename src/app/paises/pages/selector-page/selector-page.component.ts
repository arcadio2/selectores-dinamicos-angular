import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {


  miFormulario = this.fb.group({
    continente: ['', [Validators.required]]
  })
  //llenar selectories
  regiones:string[]=[]; 


  constructor(private fb: FormBuilder ,private paisesService:PaisesService) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones; 
    
    //cuando cambie la región
    this.miFormulario.get('continente')?.valueChanges.subscribe(region=>{
      console.log(region)
    });

  }
  guardar(){

  }

}
