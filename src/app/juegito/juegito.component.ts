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
  private celdasReveladas = 0;
  gameOver = false;
  gameWin = true;

  constructor() { } // talvez dsps hago dependency injection

  ngOnInit() {
    this.inicializarTablero();
    this.colocarMinas();
  }

  private inicializarTablero() {
    for (let i = 0; i < this.filas; i++) {
      this.tablero[i] = [];
      for (let j = 0; j < this.columnas; j++) {
        let un_casillero: casillero = { valor: 0, revelado: false, bandera: false, mina: false, coordX: i, coordY: j };
        this.tablero[i][j] = un_casillero;
      }
    }
  }

  private colocarMinas() {
    let minasColocadas = 0;
    while (minasColocadas < this.minas) {
      let fila = Math.floor(Math.random() * this.filas);
      let columna = Math.floor(Math.random() * this.columnas);
      this.tablero[fila][columna].mina = true;
      this.tablero[fila][columna].valor = -1;
      this.modificarCasillasCercanas(fila, columna);
      minasColocadas++;
    }
  }

  private modificarCasillasCercanas(fila: number, columna: number) {
    for (let i = fila - 1; i <= fila + 1; i++) {
      for (let j = columna - 1; j <= columna + 1; j++) {
        if (this.en_matriz(i, j) && !this.tablero[i][j].mina) {
          this.tablero[i][j].valor++;
        }
      }
    }
  }

  private en_matriz(i: number, j: number) {
    return i >= 0 && i < this.filas && j >= 0 && j < this.columnas
  }

  private chequearCeldasContinuasACero(filas: number, columnas: number) {
    if (this.tablero[filas][columnas].revelado) {
      return;
    }

    this.tablero[filas][columnas].revelado = true;
    this.celdasReveladas++;

    if (this.tablero[filas][columnas].valor === 0) {
      for (let i = filas - 1; i <= filas + 1; i++) {
        for (let j = columnas - 1; j <= columnas + 1; j++) {
          if (this.en_matriz(i, j)) {
            this.chequearCeldasContinuasACero(i, j);
          }
        }
      }
    }
  }

  public revelar(celda: casillero) {
    if (this.gameOver || celda.revelado || celda.bandera) {
      return;
    }

    if (celda.mina) {
      this.gameOver = true;
    }

    if (celda.valor == 0) {
      this.chequearCeldasContinuasACero(celda.coordX, celda.coordY);
    } else {
      celda.revelado = true;
      this.celdasReveladas++;
    }

    if (this.celdasReveladas === (this.filas * this.columnas) - this.minas) {
      this.gameWin = true;
    }
  }
}


