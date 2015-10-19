(function(){
  'use strict';
  /**
   * @ngdoc service
   * @name unicorEligeApp.Unicor
   * @description
   * # Unicor
   * Constant in the unicorEligeApp.
   */
  angular.module('unicorEligeApp')
    .constant('Unicor', {
      faculty: ['Ingenierías',
        'Medicina Veterinaria y Zootecnia',
        'Ciencias Básicas',
        'Ciencias Agrícolas',
        'Educación y Ciencias Humanas',
        'Ciencias Económicas, Jurídicas y Administrativas',
        'Ciencias de la Salud'
      ],
      programs : [{
        program: 'Ingeniería de Alimentos',
        faculty: 'Ingenierías'
        },
        {
          program: 'Ingeniería Ambiental',
          faculty: 'Ingenierías'
        },
        {
          program: 'Ingeniería Industrial',
          faculty: 'Ingenierías'
        },
        {
          program: 'Ingeniería Mecánica',
          faculty: 'Ingenierías'
        },
        {
          program: 'Ingeniería de Sistemas',
          faculty: 'Ingenierías'
        },
        {
          program: 'Medicina Veterinaria y Zootecnia',
          faculty: 'Medicina Veterinaria y Zootecnia'
        },
        {
          program: 'Acuicultura',
          faculty: 'Medicina Veterinaria y Zootecnia'
        },
        {
          program: 'Biología',
          faculty: 'Ciencias Básicas'
        },
        {
          program: 'Estadistícas',
          faculty: 'Ciencias Básicas',
        },
        {
          program: 'Física',
          faculty: 'Ciencias Básicas',
        },
        {
          program: 'Geografía',
          faculty: 'Ciencias Básicas',
        },
        {
          program: 'Matemáticas',
          faculty: 'Ciencias Básicas',
        },
        {
          program: 'Química',
          faculty: 'Ciencias Básicas',
        },
        {
          program: 'Ingeniería Agronómica',
          faculty: 'Ciencias Agrícolas',
        },
        {
          program: 'Licenciatura en Educación Básica con Énfasis en Humanidades-Lengua Castellana',
          faculty: 'Educación y Ciencias Humanas',
        },
        {
          program: 'Licenciatura en Educación Física, Recreacíon y Deportes',
          faculty: 'Educación y Ciencias Humanas',
        },
        {
          program: 'Licenciatura en Informática y Medios Audiovisuales',
          faculty: 'Educación y Ciencias Humanas',
        },
        {
          program: 'Licenciatura en Educación Básica con Énfasis en Humanidades-Inglés',
          faculty: 'Educación y Ciencias Humanas',
        },
        {
          program: 'Licenciatura en Educación Básica con Énfasis en Ciencias Sociales',
          faculty: 'Educación y Ciencias Humanas',
        },
        {
          program: 'Licenciatura en Educación Básica con Énfasis en Educación Artística-Música',
          faculty: 'Educación y Ciencias Humanas',
        },
        {
          program: 'Licenciatura en Ciencias Naturales y Educación Ambiental',
          faculty: 'Educación y Ciencias Humanas',
        },
        {
          program: 'Administración en Finanzas y Negocios Internacionales',
          faculty: 'Ciencias Económicas, Jurídicas y Administrativas',
        },
        {
          program: 'Administración en Salud',
          faculty: 'Ciencias de la Salud'
        },
        {
          program: 'Bacteriología',
          faculty: 'Ciencias de la Salud'
        },
        {
          program: 'Enfermería',
          faculty: 'Ciencias de la Salud'
        },
        {
          program: 'Enfermería',
          faculty: 'Tecnología en Regencia y Farmacia'
        },
      ],
      semester: ['1','2','3','4','5','6','7','8','9','10']
    });
})();
