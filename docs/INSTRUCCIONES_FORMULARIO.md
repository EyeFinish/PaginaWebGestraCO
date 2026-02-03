# Instrucciones de Funcionamiento del Formulario

## ✅ Funcionalidad Implementada

Los botones **"Probar Beta"** y **"Solicitar Demo"** ahora funcionan correctamente y abren un formulario modal.

### Botones Activos:

1. **Botón "Probar Beta"** (en el Hero/Inicio)
   - Abre el formulario modal de registro
   
2. **Botón "Solicitar Demo"** (en el Hero/Inicio)
   - Abre el mismo formulario modal de registro
   
3. **Botón "Solicitar demo"** (CTA Final - Sección Contacto)
   - También abre el formulario modal de registro

## 📋 ¿Qué hace el formulario?

El formulario captura la siguiente información:
- ✓ Nombre completo
- ✓ Correo electrónico
- ✓ País (con selector de código telefónico automático)
- ✓ Número de teléfono
- ✓ Empresa

## 🔗 Conexión con Google Sheets

El formulario está configurado para enviar los datos a Google Sheets usando Google Apps Script.

**URL actual configurada:**
```
https://script.google.com/macros/s/AKfycbwkyP-kf-QOgA4j4wQ-Jrj9UVnlOcE7dZoOh3AlJLJNEIt9eLKdHVeat41ZyTJkLVfK/exec
```

### Si necesitas actualizar la URL:

1. Abre el archivo `script.js`
2. Busca la línea que dice `const scriptURL = '...'` (aproximadamente línea 288)
3. Reemplaza la URL con tu nueva URL de Google Apps Script

## 🧪 Cómo Probar

1. Abre el archivo `index.html` en tu navegador
2. Haz clic en cualquiera de los tres botones:
   - "Probar Beta" (Hero)
   - "Solicitar Demo" (Hero)
   - "Solicitar demo" (CTA Final)
3. El modal debe aparecer con el formulario
4. Completa todos los campos obligatorios (*)
5. Haz clic en "Unirse a la lista de espera"
6. Deberías ver un modal de confirmación

## 🎯 Características del Formulario

### Validaciones:
- ✓ Todos los campos son obligatorios
- ✓ Validación de formato de email
- ✓ Selección de país actualiza automáticamente el código telefónico
- ✓ Botón se deshabilita durante el envío ("Enviando...")

### Interacción:
- ✓ Cerrar modal con botón X
- ✓ Cerrar modal haciendo clic fuera del contenido
- ✓ Cerrar modal con tecla ESC
- ✓ Modal de éxito después de enviar
- ✓ Reseteo automático del formulario después del envío

## 🐛 Depuración

Si algo no funciona, abre la **Consola del Navegador** (F12) y verifica:

1. Mensajes de confirmación:
   - "Todos los elementos del formulario cargados correctamente ✓"
   - "Botón Probar Beta clickeado" (al hacer clic)
   - "Botón Solicitar Demo clickeado" (al hacer clic)
   - "Modal abierto desde botón CTA final" (al hacer clic en el botón del final)
   - "✓ Usuario registrado en lista de espera: {...}"

2. Si ves errores:
   - "Elementos del modal no encontrados" → Verifica que los IDs en el HTML coincidan
   - Error en fetch → Verifica la URL de Google Apps Script

## 📝 Notas Importantes

- El formulario usa `mode: 'no-cors'` para enviar a Google Apps Script
- Los datos se registran aunque no recibas una respuesta del servidor
- El modal de éxito se muestra automáticamente después del envío
- Los logs en consola te ayudarán a depurar cualquier problema

## 🚀 Próximos Pasos

Si quieres personalizar más:
1. Modificar los campos del formulario en `index.html`
2. Ajustar el estilo del modal en `Estilo.css`
3. Cambiar los mensajes de confirmación en `index.html`
4. Agregar más países al selector en `index.html`
