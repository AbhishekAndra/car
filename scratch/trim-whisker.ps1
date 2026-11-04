Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\91939\Documents\Vehicle Insurance Platfor\assets\images\logo.png"
$bytes = [System.IO.File]::ReadAllBytes($srcPath)
$ms = New-Object System.IO.MemoryStream(,$bytes)
$srcBmp = [System.Drawing.Image]::FromStream($ms)
$w = $srcBmp.Width
$h = $srcBmp.Height

$dstBmp = New-Object System.Drawing.Bitmap($w, $h)

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $p = $srcBmp.GetPixel($x, $y)
        
        # Eliminate the top-left whisker:
        # Any pixel at x < 75 and y < 27 that is outside the true squircle
        if ($x -lt 85 -and $y -lt 27) {
            $dstBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            continue
        }

        # Also ensure pure Ferrari Red for all red parts:
        # If pixel is not transparent and not white (cutout)
        $a = $p.A
        if ($a -gt 0) {
            $isWhite = ($p.R -gt 220 -and $p.G -gt 220 -and $p.B -gt 220)
            if ($isWhite) {
                $dstBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($a, 255, 255, 255))
            } else {
                # Ensure vibrant Ferrari Rosso Corsa red (#ef4444 / #dc2626)
                # Keep luminosity
                $lum = ($p.R * 0.6 + $p.G * 0.2 + $p.B * 0.2) / 255.0
                $redVal = [Math]::Min(255, [Math]::Max(190, [int](255 * $lum)))
                $greenVal = [int](20 * $lum)
                $blueVal = [int](30 * $lum)
                $dstBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($a, $redVal, $greenVal, $blueVal))
            }
        } else {
            $dstBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        }
    }
}

$srcBmp.Dispose()
$ms.Dispose()

$dstBmp.Save("c:\Users\91939\Documents\Vehicle Insurance Platfor\assets\images\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Standalone icon
$iconRect = New-Object System.Drawing.Rectangle(0, 0, 196, 196)
$iconBmp = New-Object System.Drawing.Bitmap(196, 196)
$g = [System.Drawing.Graphics]::FromImage($iconBmp)
$g.DrawImage($dstBmp, 0, 0, $iconRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$iconBmp.Save("c:\Users\91939\Documents\Vehicle Insurance Platfor\assets\images\logo-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$iconBmp.Dispose()
$dstBmp.Dispose()

Write-Output "Logo cleaned perfectly without whiskers!"

