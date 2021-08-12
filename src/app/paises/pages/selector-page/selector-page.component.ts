import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import { Paises, PaisSmall } from '../../interfaces/paises.interface';
import {catchError , switchMap, tap} from 'rxjs/operators'; 
import { of } from 'rxjs';
@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {


  miFormulario = this.fb.group({
    continente: ['', [Validators.required]],
    pais:       [{value:'',disabled:true},[Validators.required]],
    frontera:   [{value:'',disabled:true},[Validators.required]]
  })
  //llenar selectories
  regiones:string[]=[]; 
  paises:PaisSmall[]=[];
  //fronterizos: string[]=[]; 
  fronterizos: PaisSmall[]=[]; 
  fronteras:boolean = true; 
  cargando:boolean = false; 
  constructor(private fb: FormBuilder ,private paisesService:PaisesService) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones; 
    
    //cuando cambie la región


    this.miFormulario.get('continente')?.valueChanges.subscribe(region=>{
      if(this.miFormulario.get('continente')?.value){
        this.cargando=true; 
        this.miFormulario.get('pais')?.setValue('');
        this.miFormulario.get('frontera')?.disable();  
        this.paisesService.getPaisesXRegion(region).subscribe(paises=>{
          this.cargando=false;
          this.miFormulario.get('pais')?.enable(); 
          this.paises = paises; 
        }) 
      }else{
        this.miFormulario.get('pais')?.setValue('');
        //this.miFormulario.get('frontera')?.setValue('');
        this.miFormulario.get('pais')?.disable(); 
        this.miFormulario.get('frontera')?.disable();     
        this.paises=[];
        this.fronterizos=[]; 
      }
    });
    /*-------------------------------------BUSCAR LOS PAÍSES FRONTERIZOS ---------------------------*/
    this.miFormulario.get('pais')?.valueChanges.subscribe(pais=>{
      if(pais!=""){
        this.miFormulario.get('frontera')?.setValue('');
        this.cargando=true;
        this.paisesService.getFronteras(pais).subscribe(fronterizos=>{
          this.cargando=false;
          if(fronterizos?.borders.length!==0){ 
            this.miFormulario.get('frontera')?.enable(); 
            console.log("entra")
            this.fronteras=true
            this.paisesService.getxCodigo(fronterizos?.borders!).subscribe(paises =>{
              this.fronterizos = paises || [];
            })
          }else{
            this.fronterizos=[]; 
            this.fronteras=false;
          }  
          

        })
      }else{
        console.log("paisxd: ",pais)
        this.miFormulario.get('frontera')?.setValue('');
        this.fronterizos=[]; 
      }
    });
    /*-----------------------------------FIN BUSCAR LOS PAÍSES FRONTERIZOS ---------------------------*/
    /*this.miFormulario.get('continente')?.valueChanges
    .pipe(
      tap(region =>{  
        this.miFormulario.get('pais')?.setValue('');
      }),
      switchMap((region:string)=> this.paisesService.getPaisesXRegion(region))
    )
    .subscribe(paises=>{
      if(paises.length==0) console.log("error")
      console.log(paises)
      this.miFormulario.get('pais')?.setValue('');
      this.paises=paises; 
    }, error => {
      this.paises=[]
    });*/

  }
  guardar(){

  }

}
