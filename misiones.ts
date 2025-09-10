// 🔹 Abstracción: Clase abstracta base para todas las misiones
abstract class Mision {
  protected titulo: string;
  protected descripcion: string;
  protected recompensa: number;
  protected completada: boolean = false;

  constructor(titulo: string, descripcion: string, recompensa: number) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.recompensa = recompensa;
  }

  // Método abstracto que cada misión deberá implementar
  abstract iniciar(): void;

  // Encapsulación: uso de getter/setter para la recompensa
  get getRecompensa(): number {
    return this.recompensa;
  }

  set setRecompensa(nuevaRecompensa: number) {
    if (nuevaRecompensa > 0) {
      this.recompensa = nuevaRecompensa;
    }
  }

  completar(): void {
    this.completada = true;
    console.log(`✅ Misión "${this.titulo}" completada! Has ganado ${this.recompensa} puntos.`);
  }
}

// 🔹 Herencia + Polimorfismo: dos tipos de misiones distintas
class MisionPrincipal extends Mision {
  iniciar(): void {
    console.log(`🚀 Misión Principal "${this.titulo}" iniciada: ${this.descripcion}`);
  }
}

class MisionSecundaria extends Mision {
  iniciar(): void {
    console.log(`🛡️ Misión Secundaria "${this.titulo}" iniciada: ${this.descripcion}`);
  }
}

// 🔹 Composición: un jugador tiene misiones
class Jugador {
  public nombre: string;
  private nivel: number;
  private experiencia: number = 0;
  private misiones: Mision[] = [];

  constructor(nombre: string, nivel: number) {
    this.nombre = nombre;
    this.nivel = nivel;
  }

  asignarMision(mision: Mision): void {
    this.misiones.push(mision);
    console.log(`🎯 Misión asignada al jugador ${this.nombre}: "${mision.constructor.name}"`);
  }

  iniciarMision(index: number): void {
    if (this.misiones[index]) {
      this.misiones[index].iniciar();
    }
  }

  completarMision(index: number): void {
    if (this.misiones[index]) {
      this.misiones[index].completar();
      this.experiencia += this.misiones[index].getRecompensa;
    }
  }

  get getExperiencia(): number {
    return this.experiencia;
  }
}

// 🔹 Uso del sistema
let jugador1 = new Jugador("Link", 5);

let m1 = new MisionPrincipal("Derrotar al dragón", "Debes eliminar al dragón que amenaza la aldea", 500);
let m2 = new MisionSecundaria("Recolectar hierbas", "Consigue 10 hierbas medicinales", 100);

jugador1.asignarMision(m1);
jugador1.asignarMision(m2);

jugador1.iniciarMision(0);
jugador1.completarMision(0);

jugador1.iniciarMision(1);
jugador1.completarMision(1);

console.log(`⭐ Experiencia total del jugador ${jugador1.nombre}: ${jugador1.getExperiencia}`);
