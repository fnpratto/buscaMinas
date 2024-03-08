import { Component } from '@angular/core';
import casillero from '../../@types/Casillero';

@Component({
  selector: 'app-juegito',
  templateUrl: './juegito.component.html',
  styleUrls: ['./juegito.component.css']
})


export class JuegitoComponent {
  title = 'buscaMinas_angular';
  filas = 10;
  columnas = 10;
  minas = 10;
  tablero: casillero[][] = [];

  gameOver = false;

  constructor() { } // talvez dsps hago dependency injection

  ngOnInit() {
    this.inicializarTablero();
    this.colocarMinas();
  }

  inicializarTablero() {
    let un_casillero: casillero = { valor: 0, revelado: false, bandera: false, mina: false };
    for (let i = 0; i < this.filas; i++) {
      this.tablero[i] = [];
      for (let j = 0; j < this.columnas; j++) {
        this.tablero[i][j] = un_casillero;
      }
    }
  }

  /**
   * Places mines randomly on the game board.
   */
  colocarMinas() {
    let minasColocadas = 0;
    while (minasColocadas < this.minas) {
      let fila = Math.floor(Math.random() * this.filas);
      let columna = Math.floor(Math.random() * this.columnas);
      modificarCasillasCercanas(fila, columna);
      minasColocadas++;
    }

  }

}

function modificarCasillasCercanas(fila: number, columna: number) {


}
