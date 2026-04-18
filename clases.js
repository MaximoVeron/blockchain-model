class person {
  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
  }
  saludar(persona) {
    console.log(`hola ${persona.nombre}`);
  }
  static especie() {
    return 'Homo Sapiens';
  }
}

const max = new person('maximo', 'veron');
console.log(max);
// EJEMPLO DE COMO USAR LAS CLASES
