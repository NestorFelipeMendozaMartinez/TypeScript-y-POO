# TypeScript y POO — Gestor de Misiones de Videojuego

> Informe y mini–proyecto de ejemplo en TypeScript que cubre los pilares de la Programación Orientada a Objetos (POO) y su aplicación en un **Gestor de Misiones**.

## ¿Qué es TypeScript y en qué se diferencia de JavaScript?
**TypeScript (TS)** es un superconjunto tipado de JavaScript que añade **tipos estáticos**, **interfaces**, **modificadores de acceso**, **decoradores (propuesta)** y herramientas de POO más ergonómicas. Se **transpila** a JS estándar para ejecutarse en navegadores o Node.js.  
Diferencias clave:
- Tipado estático y chequeo en tiempo de compilación.
- Mejor autocompletado, refactorizaciones seguras y detección temprana de errores.
- Soporte de POO más expresivo (clases, interfaces, abstract, public/private/protected, readonly).

## Ventajas de TypeScript para POO
- **Modelado explícito** de dominios con clases, interfaces y tipos.
- **Encapsulación real** con `private`, `protected` y `readonly` (además de getters/setters).
- **Herencia y polimorfismo** claros con `extends`/`implements` y `override`.
- **Abstracción** con `abstract class` e `interface` para contratos.
- **Mantenibilidad**: refactors seguros y menos bugs.
- **Tooling** superior (VS Code, diagnósticos, navegación de símbolos).

## Modificadores de acceso (`public`, `private`, `protected`) — Ejemplos
- `public`: accesible desde cualquier lugar (por defecto).
  ```ts
  class A { public x = 1 } // igual a: class A { x = 1 }
  ```
- `private`: sólo dentro de la misma clase.
  ```ts
  class B { private secreto = 42; getSecreto() { return this.secreto } }
  ```
- `protected`: accesible en la clase y sus subclases.
  ```ts
  class C { protected dato = "ok" } class D extends C { usa() { return this.dato } }
  ```

## ¿Qué es `readonly` y para qué se usa?
`readonly` marca propiedades que **no pueden reasignarse** tras su inicialización (usualmente en el constructor). Útil para **identificadores** o **constantes de instancia**.
```ts
class Ticket { constructor(public readonly id: string) {} }
```

## ¿Cómo se definen clases y objetos en TS?
```ts
class Persona { constructor(public nombre: string) {} }
const p = new Persona("Ada");
```

## Constructores: ¿qué son y para qué sirven?
El **constructor** inicializa el estado del objeto al momento de crear la instancia.
```ts
class Punto { constructor(public x: number, public y: number) {} }
```

## Herencia en TS (`extends` / `super`)
La **herencia** permite crear clases hijas que reutilizan/expanden una clase base. `super` invoca al constructor/métodos de la base.
```ts
class Animal { constructor(public nombre: string) {} }
class Perro extends Animal { ladra(){ return `${this.nombre} guau` } }
```

## Polimorfismo en TS
**Polimorfismo**: diferentes clases hijas **sobrescriben** un mismo método y pueden tratarse uniformemente por su tipo base.
```ts
abstract class Figura { abstract area(): number }
class Cuadrado extends Figura { constructor(private a: number){ super() } area(){ return this.a*this.a } }
```

## Clases abstractas vs clases normales
Una **clase abstracta** puede definir **miembros abstractos** (sin implementación) y no se puede instanciar directamente; sirve como **plantilla** para subclases. Una clase normal sí se puede instanciar y no requiere métodos abstractos.
```ts
abstract class Repo { abstract save(): void }
```

## `interface` en TS y diferencia con clase abstracta
Una **interface** define un **contrato de forma** (métodos/propiedades) sin implementación ni estado. Una **clase abstracta** puede incluir **implementación parcial** y **estado**.
```ts
interface Serializable { toJSON(): string }
```

## POO en una línea (mínimos por pilar)
- **Encapsulación:** `class Caja{ private v=0; get V(){return this.v} }`
- **Herencia:** `class Hija extends Base {}`
- **Polimorfismo:** `class Derivada extends Base { override run(){ /*...*/ } }`
- **Abstracción:** `abstract class Base { abstract run(): void }`

---

# Configuración de TypeScript con Node.js y VS Code

## Requisitos
- Node.js 18+ (recomendado) y npm.
- VS Code con la extensión oficial **TypeScript and JavaScript Language Features** (incluida) y **ESLint** (opcional).

## Pasos rápidos
1. **Inicializar proyecto**
   ```bash
   npm init -y
   npm i -D typescript ts-node @types/node rimraf
   npx tsc --init
   ```
2. **Ajustes sugeridos** en `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "module": "commonjs",
       "rootDir": "src",
       "outDir": "dist",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true
     }
   }
   ```
3. **Scripts en `package.json`:**
   ```json
   { "scripts": { "build": "tsc -p .", "start": "ts-node src/app.ts", "start:js": "node dist/app.js" } }
   ```
4. **Estructura**:
   ```text
   src/
     app.ts
     domain/
       Mission.ts
       FetchMission.ts
       TimedMission.ts
       MissionManager.ts
   ```
5. **Ejecutar en dev**:
   ```bash
   npm run start
   ```
   **Compilar a JS** y correr:
   ```bash
   npm run build && npm run start:js
   ```

## VS Code
- Abre la carpeta del proyecto. TS funciona out‑of‑the‑box.
- Depurar: crea `.vscode/launch.json` con una configuración Node + ts-node (opcional) o depura el JS compilado apuntando a `dist/app.js`.

```jsonc
// .vscode/launch.json (opcional)
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Run app.ts (ts-node)",
      "runtimeExecutable": "npx",
      "runtimeArgs": ["ts-node", "src/app.ts"],
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

---

# Implementación: Gestor de Misiones de Videojuego (TS)

La carpeta `src/` contiene una implementación mínima que demuestra:

- **Encapsulación**: `private _completed`, `protected title`, `readonly id`, getters como `completed` y método controlado `complete()`.
- **Herencia**: `FetchMission` y `TimedMission` **extienden** de `Mission`.
- **Polimorfismo**: `describe()` y `complete()`/`grantReward()` **sobrescritos** con `override`.
- **Abstracción**: `abstract class Mission` y `interface Rewardable`.
- **Composición**: `MissionManager` **contiene** un arreglo de `Mission` y las **usa**.

## Cómo probar
1. Instalar dependencias:
   ```bash
   npm i
   ```
2. Ejecutar en TypeScript con ts-node:
   ```bash
   npm run start
   ```
   Verás el listado de misiones y las recompensas acumuladas por el jugador.
3. Compilar a JavaScript y ejecutar:
   ```bash
   npm run build
   npm run start:js
