import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

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
      a.download = `Cuestionario_Neurodivergencias.txt`;
      a.click();
    } else if (opcion === 'pdf') {
      const pdf = new jsPDF();
      pdf.text('Cuestionario de Neurodivergencias', 10, 10);
      pdf.text(nota, 10, 20);
      Object.keys(preguntas).forEach((key, index) => {
        pdf.text(`${key}. ${preguntas[key]} - ${respuestas[key]}`, 10, 30 + index * 10);
      });
      pdf.save(`Cuestionario_Neurodivergencias.pdf`);
    } else if (opcion === 'google') {
      const form = {
        'info': {
          'title': 'Cuestionario de Neurodivergencias'
        },
        'items': [
          {
            'title': nota,
            'type': 'TEXT'
          },
          ...Object.keys(preguntas).map((key) => ({
            'title': preguntas[key],
            'type': 'TEXT'
          }))
        ]
      };
      axios.post('https://forms.googleapis.com/v1/forms', form, {
        headers: {
          'Authorization': 'Bearer TU_TOKEN_DE_GOOGLE',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        const formId = response.data.formId;
        const whatsappMessage = `¡Cuestionario creado! ${formId}`;
        axios.post('https://graph.facebook.com/v13.0/messages', {
          'messaging_product': 'whatsapp',
          'to': 'TU_NÚMERO_DE_WHATSAPP',
          'type': 'text',
          'text': {
            'body': whatsappMessage
          }
        }, {
          headers: {
            'Authorization': 'Bearer TU_TOKEN_DE_WHATSAPP',
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };

  return (
    <div>
      <h2>Cuestionario para personalizar tu aprendizaje</h2>
      <select value={opcion} onChange={(e) => setOpcion(e.target.value)}>
        <option value="">Seleccione una opción</option>
        <option value="txt">Crear cuestionario en formato TXT</option>
        <option value="pdf">Crear cuestionario en formato PDF</option>
        <option value="google">Crear cuestionario en Google Forms y enviarlo por WhatsApp</option>
      </select>
      <button onClick={handleCrearCuestionario}>Crear cuestionario</button>
    </div>
  );
};

export default CrearCuestionario;
