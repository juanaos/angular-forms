import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})



export class DinamicosComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: [ '', [Validators.required, Validators.minLength(3)] ],
    favoritos: this.fb.array( [
      ['Metal Gear', Validators.required],
      ['Death Stranding'],
    ], Validators.required )
  });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required);


  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  campoEsValido( campo:string ) {

    return this.miFormulario.controls[campo].invalid 
           && this.miFormulario.controls[campo].touched

  }

  agregarFavorito() {
    if(this.nuevoFavorito.invalid) {return;}

    this.favoritosArr.push( new FormControl( this.nuevoFavorito.value ) );

  }

  guardar() {
    if( this.miFormulario.invalid ) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    
  }

}
