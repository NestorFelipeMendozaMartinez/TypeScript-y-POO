"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
// 🔹 Clase abstracta (abstracción)
var Mision = /** @class */ (function () {
    function Mision(titulo, recompensa) {
        this.completada = false;
        this.titulo = titulo;
        this.recompensa = recompensa;
    }
    Mision.prototype.completar = function () {
        this.completada = true;
        console.log("\u2705 Misi\u00F3n \"".concat(this.titulo, "\" completada! Recompensa: ").concat(this.recompensa, " XP"));
    };
    Object.defineProperty(Mision.prototype, "getTitulo", {
        get: function () {
            return this.titulo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mision.prototype, "getRecompensa", {
        get: function () {
            return this.recompensa;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mision.prototype, "estaCompletada", {
        get: function () {
            return this.completada;
        },
        enumerable: false,
        configurable: true
    });
    return Mision;
}());
// 🔹 Herencia: Misiones específicas
var MisionPrincipal = /** @class */ (function (_super) {
    __extends(MisionPrincipal, _super);
    function MisionPrincipal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MisionPrincipal.prototype.iniciar = function () {
        console.log("\uD83D\uDE80 Iniciando misi\u00F3n principal: ".concat(this.getTitulo));
    };
    return MisionPrincipal;
}(Mision));
var MisionSecundaria = /** @class */ (function (_super) {
    __extends(MisionSecundaria, _super);
    function MisionSecundaria() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MisionSecundaria.prototype.iniciar = function () {
        console.log("\uD83D\uDEE1\uFE0F Iniciando misi\u00F3n secundaria: ".concat(this.getTitulo));
    };
    return MisionSecundaria;
}(Mision));
// 🔹 Clase Jugador (encapsulación + composición)
var Jugador = /** @class */ (function () {
    function Jugador(nombre) {
        this.nombre = nombre;
        this.experiencia = 0;
        this.misiones = [];
    }
    Jugador.prototype.asignarMision = function (m) {
        this.misiones.push(m);
        console.log("\uD83C\uDFAF Nueva misi\u00F3n asignada: ".concat(m.getTitulo));
    };
    Jugador.prototype.verMisiones = function () {
        console.log("\n📜 Lista de Misiones:");
        this.misiones.forEach(function (m, i) {
            console.log("".concat(i + 1, ". ").concat(m.getTitulo, " | Recompensa: ").concat(m.getRecompensa, " XP | Estado: ").concat(m.estaCompletada ? "✅ Completada" : "⏳ Pendiente"));
        });
    };
    Jugador.prototype.iniciarMision = function (indice) {
        var mision = this.misiones[indice];
        if (mision && !mision.estaCompletada) {
            mision.iniciar();
        }
        else {
            console.log("⚠️ Esa misión no existe o ya fue completada.");
        }
    };
    Jugador.prototype.completarMision = function (indice) {
        var mision = this.misiones[indice];
        if (mision && !mision.estaCompletada) {
            mision.completar();
            this.experiencia += mision.getRecompensa;
        }
        else {
            console.log("⚠️ Esa misión no existe o ya fue completada.");
        }
    };
    Object.defineProperty(Jugador.prototype, "getExperiencia", {
        get: function () {
            return this.experiencia;
        },
        enumerable: false,
        configurable: true
    });
    return Jugador;
}());
// 🔹 Simulador con menú interactivo
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var jugador = new Jugador("Link");
jugador.asignarMision(new MisionPrincipal("Derrotar al dragón", 500));
jugador.asignarMision(new MisionSecundaria("Recolectar hierbas", 100));
function mostrarMenu() {
    console.log("\n===== \uD83C\uDFAE GESTOR DE MISIONES =====\n1. Ver misiones\n2. Iniciar misi\u00F3n\n3. Completar misi\u00F3n\n4. Ver experiencia\n0. Salir\n");
    rl.question("Elige una opción: ", function (opcion) {
        switch (opcion) {
            case "1":
                jugador.verMisiones();
                mostrarMenu();
                break;
            case "2":
                rl.question("Número de misión a iniciar: ", function (num) {
                    jugador.iniciarMision(parseInt(num) - 1);
                    mostrarMenu();
                });
                break;
            case "3":
                rl.question("Número de misión a completar: ", function (num) {
                    jugador.completarMision(parseInt(num) - 1);
                    mostrarMenu();
                });
                break;
            case "4":
                console.log("\u2B50 Experiencia total: ".concat(jugador.getExperiencia));
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
