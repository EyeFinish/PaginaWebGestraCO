/**
 * Script para actualizar automáticamente las fechas en sitemap.xml
 * Ejecutar: node scripts/update-sitemap.js
 */

const fs = require('fs');
const path = require('path');

// Obtener la fecha actual en formato YYYY-MM-DD
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Ruta al archivo sitemap.xml
const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');

try {
    // Leer el archivo sitemap.xml
    let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    
    const currentDate = getCurrentDate();
    console.log(`📅 Fecha actual: ${currentDate}`);
    
    // Contar cuántas fechas se actualizarán
    const oldDates = sitemapContent.match(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g) || [];
    console.log(`🔍 Encontradas ${oldDates.length} fechas en el sitemap`);
    
    // Actualizar solo las fechas de las páginas principales (no blog)
    // Las páginas principales deben actualizarse cada vez
    const urlsToUpdate = [
        'gestracoo.com/',
        'gestracoo.com/#inicio',
        'gestracoo.com/#propuesta',
        'gestracoo.com/#porque',
        'gestracoo.com/#clientes',
        'gestracoo.com/#planes',
        'gestracoo.com/#confianza',
        'gestracoo.com/#contacto',
        'politica-cookies.html',
        'politica-privacidad.html'
    ];
    
    let updatedCount = 0;
    
    // Actualizar cada URL principal
    urlsToUpdate.forEach(url => {
        // Buscar la URL y actualizar su lastmod
        const urlRegex = new RegExp(
            `(<loc>https://${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc>\\s*<lastmod>)\\d{4}-\\d{2}-\\d{2}(</lastmod>)`,
            'g'
        );
        
        if (sitemapContent.match(urlRegex)) {
            sitemapContent = sitemapContent.replace(urlRegex, `$1${currentDate}$2`);
            updatedCount++;
        }
    });
    
    // Escribir el archivo actualizado
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
    
    console.log(`✅ Sitemap actualizado exitosamente!`);
    console.log(`📝 ${updatedCount} URLs actualizadas con la fecha ${currentDate}`);
    console.log(`💾 Archivo guardado en: ${sitemapPath}`);
    
} catch (error) {
    console.error('❌ Error al actualizar el sitemap:', error.message);
    process.exit(1);
}
