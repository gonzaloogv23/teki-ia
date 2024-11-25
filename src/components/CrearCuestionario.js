import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './estilosComponentes/crearcuestionario.css';

const CrearCuestionario = () => {
  const [opcion, setOpcion] = useState('');


  const nota = 'Por favor, responda a cada pregunta con "Sí", "No" o "A veces".';

  const preguntas = {
    '1': '¿Tienes dificultades para mantener la atención en una tarea durante un período prolongado?',
    '2': '¿Te cuesta trabajo seguir instrucciones o completar tareas?',
    '3': '¿Te sientes inquieto o tienes dificultades para permanecer sentado?',
    '4': '¿Te cuesta trabajo esperar tu turno o interrumpes a los demás?',
    '5': '¿Tienes dificultades para organizar tus tareas o actividades?',
    '6': '¿Te cuesta trabajo recordar detalles o hacer seguimiento de tus pertenencias?',
    '7': '¿Te sientes abrumado por los estímulos sensoriales?',
    '8': '¿Tienes dificultades para entender las normas sociales?',
    '9': '¿Te cuesta trabajo hacer amigos o mantener relaciones?',
    '10': '¿Tienes dificultades para entender el lenguaje no verbal?',
    '11': '¿Te sientes ansioso o estresado en situaciones sociales?',
    '12': '¿Tienes dificultades para dormir o tienes problemas de sueño?',
    '13': '¿Te sientes deprimido o tienes cambios de humor?',
    '14': '¿Tienes dificultades para controlar tus impulsos?',
    '15': '¿Te cuesta trabajo tomar decisiones?',
    '16': '¿Tienes dificultades para recordar eventos o experiencias pasadas?',
    '17': '¿Te sientes desorganizado o tienes dificultades para planificar?',
    '18': '¿Tienes dificultades para completar tareas debido a la perfección?',
    '19': '¿Te sientes abrumado por las responsabilidades?',
    '20': '¿Tienes dificultades para delegar tareas o pedir ayuda?',
  };

  const respuestas = {
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '5': '',
    '6': '',
    '7': '',
    '8': '',
    '9': '',
    '10': '',
    '11': '',
    '12': '',
    '13': '',
    '14': '',
    '15': '',
    '16': '',
    '17': '',
    '18': '',
    '19': '',
    '20': '',
  };

  const handleCrearCuestionario = async () => {
    if (opcion === 'txt') {
      const texto = `${nota}\n\n${Object.keys(preguntas).map((key) => `${key}. ${preguntas[key]} - ${respuestas[key]}`).join('\n')}`;
      const blob = new Blob([texto], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Cuestionario_personalizado.txt`;
      a.click();
    } else if (opcion === 'pdf') {
      const pdf = new jsPDF();
      pdf.text('Cuestionario personalizado', 10, 10);
      pdf.text(nota, 10, 20);
      Object.keys(preguntas).forEach((key, index) => {
        pdf.text(`${key}. ${preguntas[key]} - ${respuestas[key]}`, 10, 30 + index * 10);
      });
      pdf.save(`Cuestionario_personalizado.pdf`);
    }
  };



  return (
    <div>
   
      <div className="cuestionario-radio">
      <h2>Cuestionario para personalizar tu aprendizaje</h2>
        <input
          type="radio"
          id="txt"
          name="opcion"
          value="txt"
          label="Crear cuestionario en formato TXT 📝"
          checked={opcion === 'txt'}
          onChange={(e) => setOpcion(e.target.value)}
        />
        <input
          type="radio"
          id="pdf"
          name="opcion"
          value="pdf"
          label="Crear cuestionario en formato PDF 📄"
          checked={opcion === 'pdf'}
          onChange={(e) => setOpcion(e.target.value)}
        />
       <button
        className={`cuestionario-button ${opcion === 'txt' || opcion === 'pdf' ? 'cuestionario-button-checked' : ''}`}
        onClick={handleCrearCuestionario}
      >
        Crear cuestionario
      </button>
      </div>

    </div>
  );
};

export default CrearCuestionario;