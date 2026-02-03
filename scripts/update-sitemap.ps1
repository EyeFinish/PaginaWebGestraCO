# Script para actualizar automáticamente las fechas en sitemap.xml
# Ejecutar: .\scripts\update-sitemap.ps1

Write-Host "Actualizando sitemap.xml..." -ForegroundColor Cyan

# Obtener la fecha actual en formato YYYY-MM-DD
$currentDate = Get-Date -Format "yyyy-MM-dd"
Write-Host "Fecha actual: $currentDate" -ForegroundColor Green

# Ruta al archivo sitemap.xml
$sitemapPath = Join-Path $PSScriptRoot "..\sitemap.xml"

if (-not (Test-Path $sitemapPath)) {
    Write-Host "Error: No se encontro el archivo sitemap.xml en $sitemapPath" -ForegroundColor Red
    exit 1
}

try {
    # Leer el contenido del sitemap
    $content = Get-Content $sitemapPath -Raw -Encoding UTF8
    
    # Contar cuántas fechas hay
    $oldDates = ([regex]::Matches($content, '<lastmod>\d{4}-\d{2}-\d{2}</lastmod>')).Count
    Write-Host "Encontradas $oldDates fechas en el sitemap" -ForegroundColor Yellow
    
    # URLs que deben actualizarse siempre (páginas principales)
    $urlsToUpdate = @(
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
    )
    
    $updatedCount = 0
    
    # Actualizar cada URL principal
    foreach ($url in $urlsToUpdate) {
        # Escapar caracteres especiales para regex
        $escapedUrl = [regex]::Escape($url)
        
        # Crear el patrón regex para encontrar y actualizar
        $pattern = "(<loc>https://$escapedUrl</loc>\s*<lastmod>)\d{4}-\d{2}-\d{2}(</lastmod>)"
        
        if ($content -match $pattern) {
            $content = $content -replace $pattern, "`$1$currentDate`$2"
            $updatedCount++
        }
    }
    
    # Guardar el archivo actualizado
    $content | Set-Content -Path $sitemapPath -Encoding UTF8 -NoNewline
    
    Write-Host "Sitemap actualizado exitosamente!" -ForegroundColor Green
    Write-Host "$updatedCount URLs actualizadas con la fecha $currentDate" -ForegroundColor Green
    Write-Host "Archivo guardado en: $sitemapPath" -ForegroundColor Cyan
    
} catch {
    Write-Host "Error al actualizar el sitemap: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
