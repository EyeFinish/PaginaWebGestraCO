/**
 * CÓDIGO PARA GOOGLE APPS SCRIPT
 * 
 * INSTRUCCIONES DE CONFIGURACIÓN:
 * 
 * 1. Crea una nueva Google Sheet donde quieres guardar los leads
 * 2. En la hoja, crea las siguientes columnas en la primera fila:
 *    - Columna A: Fecha
 *    - Columna B: Nombre
 *    - Columna C: Correo
 *    - Columna D: País
 *    - Columna E: Teléfono
 *    - Columna F: Empresa
 * 
 * 3. En tu Google Sheet, ve a Extensiones > Apps Script
 * 4. Borra el código que viene por defecto
 * 5. Copia y pega TODO este código
 * 6. Guarda el proyecto (Ctrl+S o icono de disquete)
 * 
 * 7. SOLUCIÓN AL ERROR DE AUTORIZACIÓN:
 *    Si te sale "OAuth client was deleted" o "Error 401: deleted_client":
 *    
 *    a) Ve al ícono de engranaje (⚙️) en la parte superior izquierda
 *    b) Haz clic en "Configuración del proyecto"
 *    c) Marca la casilla "Mostrar el archivo de manifiesto 'appsscript.json' en el editor"
 *    d) Vuelve al editor y verás un nuevo archivo "appsscript.json"
 *    e) Ahora continúa con el paso 8
 * 
 * 8. Haz clic en "Implementar" (botón azul arriba a la derecha) > "Nueva implementación"
 * 9. Selecciona tipo: "Aplicación web"
 * 10. Configura:
 *     - Descripción: "API para lista de espera GestraCOO"
 *     - Ejecutar como: "Yo" (tu correo)
 *     - Quién tiene acceso: "Cualquier usuario"
 * 11. Haz clic en "Implementar"
 * 12. AUTORIZAR:
 *     - Haz clic en "Autorizar acceso"
 *     - Selecciona tu cuenta de Google
 *     - Si te dice "Esta app no está verificada", haz clic en "Avanzado"
 *     - Haz clic en "Ir a [nombre del proyecto] (no seguro)"
 *     - Haz clic en "Permitir"
 * 13. Copia la URL que te da (URL de la aplicación web)
 * 14. Pega esa URL en el archivo script.js de tu página web
 *     donde dice: 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI'
 * 
 * NOTA: Si ya intentaste implementar antes y te da error, ELIMINA la implementación antigua:
 * - Ve a "Implementar" > "Administrar implementaciones"
 * - Haz clic en el ícono de archivo (archivar) de la implementación antigua
 * - Luego crea una nueva implementación desde el paso 8
 */

function doPost(e) {
  try {
    // Obtener la hoja activa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parsear los datos del formulario
    var data = JSON.parse(e.postData.contents);
    
    // Agregar nueva fila con los datos en el orden correcto
    // A: Fecha, B: Nombre, C: Correo, D: País, E: Teléfono, F: Empresa
    sheet.appendRow([
      data.fecha || new Date().toLocaleString('es-CL'),
      data.nombre || '',
      data.correo || '',
      data.pais || '',
      "'" + (data.telefono || ''),  // Apóstrofe al inicio para forzar formato texto
      data.empresa || ''
    ]);
    
    // Responder con éxito
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'success',
        'message': 'Datos guardados correctamente'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Responder con error
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Función de prueba (opcional)
function testPost() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        fecha: new Date().toLocaleString('es-CL'),
        nombre: 'Juan Pérez',
        correo: 'juan@ejemplo.com',
        pais: 'Chile',
        telefono: '+56 9 1234 5678',
        empresa: 'Constructora Ejemplo'
      })
    }
  };
  
  var result = doPost(testData);
  Logger.log(result.getContent());
}
