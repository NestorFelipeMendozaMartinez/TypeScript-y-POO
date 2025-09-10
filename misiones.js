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
// 🔹 Abstracción: Clase abstracta base para todas las misiones
var Mision = /** @class */ (function () {
    function Mision(titulo, descripcion, recompensa) {
        this.completada = false;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.recompensa = recompensa;
    }
    Object.defineProperty(Mision.prototype, "getRecompensa", {
        // Encapsulación: uso de getter/setter para la recompensa
        get: function () {
            return this.recompensa;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mision.prototype, "setRecompensa", {
        set: function (nuevaRecompensa) {
            if (nuevaRecompensa > 0) {
                this.recompensa = nuevaRecompensa;
            }
        },
        enumerable: false,
        configurable: true
    });
    Mision.prototype.completar = function () {
        this.completada = true;
        console.log("\u2705 Misi\u00F3n \"".concat(this.titulo, "\" completada! Has ganado ").concat(this.recompensa, " puntos."));
    };
    return Mision;
}());
// 🔹 Herencia + Polimorfismo: dos tipos de misiones distintas
var MisionPrincipal = /** @class */ (function (_super) {
    __extends(MisionPrincipal, _super);
    function MisionPrincipal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MisionPrincipal.prototype.iniciar = function () {
        console.log("\uD83D\uDE80 Misi\u00F3n Principal \"".concat(this.titulo, "\" iniciada: ").concat(this.descripcion));
    };
    return MisionPrincipal;
}(Mision));
var MisionSecundaria = /** @class */ (function (_super) {
    __extends(MisionSecundaria, _super);
    function MisionSecundaria() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MisionSecundaria.prototype.iniciar = function () {
        console.log("\uD83D\uDEE1\uFE0F Misi\u00F3n Secundaria \"".concat(this.titulo, "\" iniciada: ").concat(this.descripcion));
    };
    return MisionSecundaria;
}(Mision));
// 🔹 Composición: un jugador tiene misiones
var Jugador = /** @class */ (function () {
    function Jugador(nombre, nivel) {
        this.experiencia = 0;
        this.misiones = [];
        this.nombre = nombre;
        this.nivel = nivel;
    }
    Jugador.prototype.asignarMision = function (mision) {
        this.misiones.push(mision);
        console.log("\uD83C\uDFAF Misi\u00F3n asignada al jugador ".concat(this.nombre, ": \"").concat(mision.constructor.name, "\""));
    };
    Jugador.prototype.iniciarMision = function (index) {
        if (this.misiones[index]) {
            this.misiones[index].iniciar();
        }
    };
    Jugador.prototype.completarMision = function (index) {
        if (this.misiones[index]) {
            this.misiones[index].completar();
            this.experiencia += this.misiones[index].getRecompensa;
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
// 🔹 Uso del sistema
var jugador1 = new Jugador("uno", 5);
var m1 = new MisionPrincipal("Derrotar al dragón", "Debes eliminar al dragón que amenaza la aldea", 500);
var m2 = new MisionSecundaria("Recolectar hierbas", "Consigue 10 hierbas medicinales", 100);
jugador1.asignarMision(m1);
jugador1.asignarMision(m2);
jugador1.iniciarMision(0);
jugador1.completarMision(0);
jugador1.iniciarMision(1);
jugador1.completarMision(1);
console.log("\u2B50 Experiencia total del jugador ".concat(jugador1.nombre, ": ").concat(jugador1.getExperiencia));
