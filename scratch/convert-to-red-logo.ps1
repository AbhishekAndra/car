Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\91939\Documents\Vehicle Insurance Platfor\assets\images\stackly-logo.png"
$bytes = [System.IO.File]::ReadAllBytes($srcPath)
$ms = New-Object System.IO.MemoryStream(,$bytes)
$srcBmp = [System.Drawing.Image]::FromStream($ms)
$w = $srcBmp.Width
$h = $srcBmp.Height

$dstBmp = New-Object System.Drawing.Bitmap($w, $h)

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $pixel = $srcBmp.GetPixel($x, $y)
        $a = $pixel.A
        if ($a -eq 0) {
            $dstBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            continue
        }

        $r = $pixel.R
        $g = $pixel.G
        $b = $pixel.B

        # In stackly-logo.png:
        # The white 'S' cutout inside emblem has R > 230, G > 220, B > 200, and is very neutral/white.
        # The gold areas have R ~ 160-220, G ~ 120-180, B ~ 70-130 (notice G > B + 30).
        $isWhiteS = ($r -gt 220 -and $g -gt 210 -and $b -gt 190 -and ($r - $b) -lt 30)

        if ($isWhiteS) {
            # White 'S' cutout inside emblem
            $dstBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($a, 255, 255, 255))
        } else {
            # Pure Ferrari Rosso Corsa Red:
            # Luminance from gold pixel
            $lum = ($r * 0.5 + $g * 0.4 + $b * 0.1) / 255.0
            
            # Vibrant, rich Ferrari red
            $newR = [Math]::Min(255, [int](255 * [Math]::Pow($lum, 0.4)))
            $newG = [int](18 * $lum)
            $newB = [int](25 * $lum)
            
            $dstBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($a, $newR, $newG, $newB))
        }
    }
}

$srcBmp.Dispose()
$ms.Dispose()

$dstBmp.Save("c:\Users\91939\Documents\Vehicle Insurance Platfor\assets\images\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Standalone icon: X: 0 to 196, Y: 0 to 196
$iconRect = New-Object System.Drawing.Rectangle(0, 0, 196, 196)
$iconBmp = New-Object System.Drawing.Bitmap(196, 196)
$g = [System.Drawing.Graphics]::FromImage($iconBmp)
$g.DrawImage($dstBmp, 0, 0, $iconRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$iconBmp.Save("c:\Users\91939\Documents\Vehicle Insurance Platfor\assets\images\logo-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$iconBmp.Dispose()
$dstBmp.Dispose()

Write-Output "Pure Red Stackly logo created from pristine source!"

