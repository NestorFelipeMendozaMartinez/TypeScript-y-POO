import * as readline from "readline";

// 🔹 Clase abstracta (abstracción)
abstract class Mision {
  protected titulo: string;
  protected recompensa: number;
  protected completada: boolean = false;

  constructor(titulo: string, recompensa: number) {
    this.titulo = titulo;
    this.recompensa = recompensa;
  }

  abstract iniciar(): void; // polimorfismo

  completar(): void {
    this.completada = true;
    console.log(`✅ Misión "${this.titulo}" completada! Recompensa: ${this.recompensa} XP`);
  }

  get getTitulo(): string {
    return this.titulo;
  }

  get getRecompensa(): number {
    return this.recompensa;
  }

  get estaCompletada(): boolean {
    return this.completada;
  }
}

// 🔹 Herencia: Misiones específicas
class MisionPrincipal extends Mision {
  iniciar(): void {
    console.log(`🚀 Iniciando misión principal: ${this.getTitulo}`);
  }
}

class MisionSecundaria extends Mision {
  iniciar(): void {
    console.log(`🛡️ Iniciando misión secundaria: ${this.getTitulo}`);
  }
}

// 🔹 Clase Jugador (encapsulación + composición)
class Jugador {
  private experiencia: number = 0;
  private misiones: Mision[] = [];

  constructor(public nombre: string) {}

  asignarMision(m: Mision): void {
    this.misiones.push(m);
    console.log(`🎯 Nueva misión asignada: ${m.getTitulo}`);
  }

  verMisiones(): void {
    console.log("\n📜 Lista de Misiones:");
    this.misiones.forEach((m, i) => {
      console.log(
        `${i + 1}. ${m.getTitulo} | Recompensa: ${m.getRecompensa} XP | Estado: ${
          m.estaCompletada ? "✅ Completada" : "⏳ Pendiente"
        }`
      );
    });
  }

  iniciarMision(indice: number): void {
    const mision = this.misiones[indice];
    if (mision && !mision.estaCompletada) {
      mision.iniciar();
    } else {
      console.log("⚠️ Esa misión no existe o ya fue completada.");
    }
  }

  completarMision(indice: number): void {
    const mision = this.misiones[indice];
    if (mision && !mision.estaCompletada) {
      mision.completar();
      this.experiencia += mision.getRecompensa;
    } else {
      console.log("⚠️ Esa misión no existe o ya fue completada.");
    }
  }

  get getExperiencia(): number {
    return this.experiencia;
  }
}

// 🔹 Simulador con menú interactivo
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let jugador = new Jugador("Link");
jugador.asignarMision(new MisionPrincipal("Derrotar al dragón", 500));
jugador.asignarMision(new MisionSecundaria("Recolectar hierbas", 100));

function mostrarMenu() {
  console.log(`
===== 🎮 GESTOR DE MISIONES =====
1. Ver misiones
2. Iniciar misión
3. Completar misión
4. Ver experiencia
0. Salir
`);
  rl.question("Elige una opción: ", (opcion) => {
    switch (opcion) {
      case "1":
        jugador.verMisiones();
        mostrarMenu();
        break;
      case "2":
        rl.question("Número de misión a iniciar: ", (num) => {
          jugador.iniciarMision(parseInt(num) - 1);
          mostrarMenu();
        });
        break;
      case "3":
        rl.question("Número de misión a completar: ", (num) => {
          jugador.completarMision(parseInt(num) - 1);
          mostrarMenu();
        });
        break;
      case "4":
        console.log(`⭐ Experiencia total: ${jugador.getExperiencia}`);
        mostrarMenu();
        break;
      case "0":
        console.log("👋 Saliendo del juego...");
        rl.close();
        break;
      default:
        console.log("❌ Opción inválida.");
        mostrarMenu();
        break;
    }
  });
}

// 🔹 Iniciar simulador
mostrarMenu();
