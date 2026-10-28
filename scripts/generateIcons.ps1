Add-Type -AssemblyName System.Drawing

$publicDir = Join-Path $PSScriptRoot "..\public"

function Draw-Icon {
    param(
        [int]$size,
        [string]$outputPath,
        [bool]$showMonogram = $false
    )
    
    $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
    
    # Background
    $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 5, 5, 5))
    
    # Corner radius
    $cornerRadius = [Math]::Max(2, [int]($size * 0.22))
    $diameter = $cornerRadius * 2
    
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddArc(0, 0, $diameter, $diameter, 180, 90)
    $path.AddArc($size - $diameter, 0, $diameter, $diameter, 270, 90)
    $path.AddArc($size - $diameter, $size - $diameter, $diameter, $diameter, 0, 90)
    $path.AddArc(0, $size - $diameter, $diameter, $diameter, 90, 90)
    $path.CloseFigure()
    
    $g.FillPath($bgBrush, $path)
    
    # Border
    $borderWidth = [float][Math]::Max(1.0, $size * 0.02)
    $borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(45, 255, 255, 255), $borderWidth)
    $g.DrawPath($borderPen, $path)
    
    # Central Coral Glow Circle
    $center = [float]($size / 2.0)
    $radius = [float]($size * 0.26)
    $x = [float]($center - $radius)
    $y = [float]($center - $radius)
    $w = [float]($radius * 2.0)
    $h = [float]($radius * 2.0)
    
    # Radiant coral fill
    $coralColor = [System.Drawing.Color]::FromArgb(255, 255, 76, 36) # #ff4c24
    $coralBrush = New-Object System.Drawing.SolidBrush($coralColor)
    $g.FillEllipse($coralBrush, $x, $y, $w, $h)
    
    if ($showMonogram -and $size -ge 128) {
        # Sleek white "V" in center of large icons
        $fontFamily = [System.Drawing.FontFamily]::GenericSansSerif
        $fontSize = [float]($size * 0.22)
        $font = New-Object System.Drawing.Font($fontFamily, $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
        $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
        
        $sf = New-Object System.Drawing.StringFormat
        $sf.Alignment = [System.Drawing.StringAlignment]::Center
        $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
        
        $layoutRect = New-Object System.Drawing.RectangleF([float]0.0, [float]($size * 0.02), [float]$size, [float]$size)
        $g.DrawString("V", $font, $whiteBrush, $layoutRect, $sf)
        
        $font.Dispose()
        $whiteBrush.Dispose()
        $sf.Dispose()
    } else {
        # Crisp white center highlight dot for favicons
        $innerRadius = [float][Math]::Max(1.5, $radius * 0.35)
        $ix = [float]($center - $innerRadius)
        $iy = [float]($center - $innerRadius)
        $iw = [float]($innerRadius * 2.0)
        $ih = [float]($innerRadius * 2.0)
        $innerBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(245, 255, 255, 255))
        $g.FillEllipse($innerBrush, $ix, $iy, $iw, $ih)
        $innerBrush.Dispose()
    }
    
    # Cleanup and Save
    $g.Dispose()
    $path.Dispose()
    $bgBrush.Dispose()
    $borderPen.Dispose()
    $coralBrush.Dispose()
    
    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Generated: $outputPath ($size x $size)"
}

# 1. Favicons
Draw-Icon -size 16 -outputPath (Join-Path $publicDir "favicon-16x16.png")
Draw-Icon -size 32 -outputPath (Join-Path $publicDir "favicon-32x32.png")
Draw-Icon -size 48 -outputPath (Join-Path $publicDir "favicon-48x48.png")

# 2. Touch and Android App Icons
Draw-Icon -size 180 -outputPath (Join-Path $publicDir "apple-touch-icon.png") -showMonogram $true
Draw-Icon -size 192 -outputPath (Join-Path $publicDir "android-chrome-192x192.png") -showMonogram $true
Draw-Icon -size 512 -outputPath (Join-Path $publicDir "android-chrome-512x512.png") -showMonogram $true

Write-Host "PNG icons generated successfully."
