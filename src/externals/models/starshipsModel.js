"use strict";

module.exports = class starshipsModel {
  constructor(v) {
    this.nombre = v.name;
    this.modelo = v.model;
    this.fabricante = v.manufacturer;
    this.costo_en_creditos = v.cost_in_credits;
    this.largo = v.length;
    this.velocidad_max_atmosfera = v.max_atmosphering_speed;
    this.tripulacion = v.crew;
    this.pasajeros = v.passengers;
    this.capacidad_carga = v.cargo_capacity;
    this.consumibles = v.consumables;
    this.clasificacion_hiperimpulsor = v.hyperdrive_rating;
    this.numero_max_megalights = v.MGLT;
    this.clase_naves_estelares = v.starship_class;
    this.pilotos = v.pilots;
    this.peliculas = v.films;
    this.creado = v.created;
    this.editado = v.edited;
    this.url = v.url;
  }
};
