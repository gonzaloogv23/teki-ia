const RespuestaTransformer = {
    transformarRespuesta(respuesta) {
      if (!respuesta || !respuesta.data) {
        return { message: "" };
      }
  
      const eventData = respuesta.data.split('\n');
      const texto = [];
      eventData.forEach((event) => {
        if (event.startsWith('data: ')) {
          const data = event.substring(6).trim();
  
          if (data === '[DONE]') {
            return;
          }
  
          try {
            if (data.startsWith('{') || data.startsWith('[')) {
              const objetoJson = JSON.parse(data);
              if (objetoJson.choices && objetoJson.choices.length > 0) {
                objetoJson.choices.forEach((choice) => {
                  if (choice.delta && choice.delta.content) {
                    texto.push(choice.delta.content);
                  }
                });
              }
            } else {
              console.log('No es un JSON válido:', data);
            }
          } catch (error) {
            console.error("Error al parsear JSON:", error);
          }
        }
      });
      return { message: texto.join("") };
    },
  };
  
  
export default RespuestaTransformer;
