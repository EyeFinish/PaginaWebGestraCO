# Actualización Automática del Sitemap

Este directorio contiene scripts para actualizar automáticamente las fechas en el `sitemap.xml`.

## 📋 Scripts Disponibles

### 1. Script PowerShell (Recomendado para Windows)
```powershell
.\scripts\update-sitemap.ps1
```

### 2. Script Node.js (Si tienes Node.js instalado)
```bash
node scripts/update-sitemap.js
```

## 🚀 Uso

### Opción 1: PowerShell (Sin dependencias)
1. Abre PowerShell en la raíz del proyecto
2. Ejecuta:
   ```powershell
   .\scripts\update-sitemap.ps1
   ```

### Opción 2: Node.js
1. Asegúrate de tener Node.js instalado
2. Ejecuta:
   ```bash
   node scripts/update-sitemap.js
   ```

## ⚙️ Automatización

### Tarea Programada de Windows

Para ejecutar el script automáticamente cada vez que subas cambios:

1. Abre el **Programador de tareas** de Windows
2. Crea una nueva tarea básica
3. Configura el disparador según necesites (diario, semanal, al iniciar)
4. Acción: "Iniciar un programa"
5. Programa: `powershell.exe`
6. Argumentos: `-ExecutionPolicy Bypass -File "C:\ruta\completa\scripts\update-sitemap.ps1"`

### Git Hook (Pre-commit)

Puedes crear un hook de Git para actualizar el sitemap antes de cada commit:

1. Crea el archivo `.git/hooks/pre-commit` (sin extensión)
2. Agrega:
   ```bash
   #!/bin/sh
   node scripts/update-sitemap.js
   git add sitemap.xml
   ```
3. Dale permisos de ejecución

## 📝 Qué hace el script

- ✅ Actualiza las fechas `<lastmod>` de las páginas principales a la fecha actual
- ✅ Mantiene las fechas originales de los artículos del blog
- ✅ No modifica la estructura del sitemap
- ✅ Muestra un resumen de los cambios realizados

## 🔍 URLs que se actualizan automáticamente

- Página principal
- Todas las secciones (#inicio, #propuesta, #porque, etc.)
- Políticas de cookies y privacidad

**Nota:** Las fechas de los artículos del blog NO se actualizan automáticamente para mantener su fecha de publicación original.
