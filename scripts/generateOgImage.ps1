Add-Type -AssemblyName System.Drawing

$publicDir = Join-Path $PSScriptRoot "..\public"
$width = 1200
$height = 630

$bmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)

$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

# 1. Background: Deep obsidian #050505
$bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 5, 5, 5))
$g.FillRectangle($bgBrush, 0, 0, $width, $height)

# 2. Subtle grid lines / architectural framing
$gridPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(20, 255, 255, 255), 1)
for ($x = 60; $x -lt $width; $x += 120) {
    $g.DrawLine($gridPen, [float]$x, [float]0, [float]$x, [float]$height)
}
for ($y = 60; $y -lt $height; $y += 120) {
    $g.DrawLine($gridPen, [float]0, [float]$y, [float]$width, [float]$y)
}

# 3. Outer border frame
$framePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(40, 255, 255, 255), 1.5)
$g.DrawRectangle($framePen, 40, 40, $width - 80, $height - 80)

# Corner markers (editorial brackets)
$coralColor = [System.Drawing.Color]::FromArgb(255, 255, 76, 36) # #ff4c24
$coralPen = New-Object System.Drawing.Pen($coralColor, 3)
$cLen = 20
# Top-Left
$g.DrawLine($coralPen, 40, 40, 40 + $cLen, 40)
$g.DrawLine($coralPen, 40, 40, 40, 40 + $cLen)
# Top-Right
$g.DrawLine($coralPen, $width - 40, 40, $width - 40 - $cLen, 40)
$g.DrawLine($coralPen, $width - 40, 40, $width - 40, 40 + $cLen)
# Bottom-Left
$g.DrawLine($coralPen, 40, $height - 40, 40 + $cLen, $height - 40)
$g.DrawLine($coralPen, 40, $height - 40, 40, $height - 40 - $cLen)
# Bottom-Right
$g.DrawLine($coralPen, $width - 40, $height - 40, $width - 40 - $cLen, $height - 40)
$g.DrawLine($coralPen, $width - 40, $height - 40, $width - 40, $height - 40 - $cLen)

# 4. Top Status Header
$coralBrush = New-Object System.Drawing.SolidBrush($coralColor)
$g.FillEllipse($coralBrush, [float]70, [float]72, [float]10, [float]10)

$fontFamily = [System.Drawing.FontFamily]::GenericMonospace
$headerFont = New-Object System.Drawing.Font($fontFamily, 13, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$headerBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 200, 200, 200))
$g.DrawString("VIVEK PARMAR  //  SOFTWARE ENGINEER L1  //  AHMEDABAD", $headerFont, $headerBrush, [float]90, [float]70)

$yearFont = New-Object System.Drawing.Font($fontFamily, 12, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(140, 255, 255, 255))
$g.DrawString("[ EDITORIAL PORTFOLIO v2.5 ]", $yearFont, $mutedBrush, [float]920, [float]70)

# 5. Main Headline
$sansFamily = [System.Drawing.FontFamily]::GenericSansSerif
$headlineFont = New-Object System.Drawing.Font($sansFamily, 54, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 244, 241, 238))
$g.DrawString("Build at the frontier.", $headlineFont, $whiteBrush, [float]70, [float]135)

$subheadFont = New-Object System.Drawing.Font($sansFamily, 26, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString("Java Backend Engineer", $subheadFont, $coralBrush, [float]72, [float]210)

# 6. Description Text
$descFont = New-Object System.Drawing.Font($sansFamily, 17, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$descBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 175, 175, 175))
$descText = "Architecting resilient Spring Boot backends, Apache Kafka event streams, and high-concurrency`nPostgreSQL/MySQL storage on AWS for enterprise recruitment & healthcare systems."
$g.DrawString($descText, $descFont, $descBrush, [float]72, [float]255)

# 7. Metrics Cards (Bottom Middle)
$metricsY = 360
$metrics = @(
    @{ val = "2+ YEARS"; lbl = "PRODUCTION EXP" },
    @{ val = "74% REDUCED"; lbl = "DB QUERY LOAD" },
    @{ val = "99.9% UPTIME"; lbl = "CLOUD RESILIENCY" }
)

$cardX = 70
$cardW = 320
$cardH = 110

foreach ($m in $metrics) {
    # Card background
    $cardBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 14, 14, 14))
    $g.FillRectangle($cardBg, [float]$cardX, [float]$metricsY, [float]$cardW, [float]$cardH)
    
    $cardPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(40, 255, 255, 255), 1)
    $g.DrawRectangle($cardPen, [float]$cardX, [float]$metricsY, [float]$cardW, [float]$cardH)
    
    # Left accent bar
    $g.FillRectangle($coralBrush, [float]$cardX, [float]$metricsY, [float]4, [float]$cardH)
    
    $valFont = New-Object System.Drawing.Font($sansFamily, 24, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $g.DrawString($m.val, $valFont, $whiteBrush, [float]($cardX + 22), [float]($metricsY + 22))
    
    $lblFont = New-Object System.Drawing.Font($fontFamily, 11, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $g.DrawString($m.lbl, $lblFont, $mutedBrush, [float]($cardX + 22), [float]($metricsY + 65))
    
    $valFont.Dispose()
    $lblFont.Dispose()
    $cardBg.Dispose()
    $cardPen.Dispose()
    
    $cardX += $cardW + 35
}

# 8. Bottom Footer Bar
$footerY = 525
$tagFont = New-Object System.Drawing.Font($fontFamily, 12, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString("JAVA 21  *  SPRING BOOT  *  KAFKA  *  REDIS  *  AWS  *  DOCKER", $tagFont, $mutedBrush, [float]72, [float]$footerY)

$urlFont = New-Object System.Drawing.Font($fontFamily, 13, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString("vivekparmar.is-a.dev", $urlFont, $coralBrush, [float]955, [float]$footerY)

# Save high quality PNG & JPG
$ogPngPath = Join-Path $publicDir "og-image.png"
$ogJpgPath = Join-Path $publicDir "og-image.jpg"

$bmp.Save($ogPngPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save($ogJpgPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)

Write-Host "Generated: $ogPngPath and $ogJpgPath"

# Cleanup
$g.Dispose()
$bmp.Dispose()
$bgBrush.Dispose()
$gridPen.Dispose()
$framePen.Dispose()
$coralPen.Dispose()
$coralBrush.Dispose()
$headerFont.Dispose()
$headerBrush.Dispose()
$yearFont.Dispose()
$mutedBrush.Dispose()
$headlineFont.Dispose()
$whiteBrush.Dispose()
$subheadFont.Dispose()
$descFont.Dispose()
$descBrush.Dispose()
$tagFont.Dispose()
$urlFont.Dispose()
