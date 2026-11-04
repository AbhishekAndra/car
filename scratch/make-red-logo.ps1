Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\91939\Documents\Vehicle Insurance Platfor\assets\images\logo.png"
$srcBmp = New-Object System.Drawing.Bitmap($srcPath)
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

        # Check if pixel is white / near white (the 'S' cutout inside emblem)
        # In the original logo, 'S' has R > 230, G > 220, B > 200
        $isWhite = ($r -gt 225 -and $g -gt 215 -and $b -gt 195 -and ($r - $b) -lt 35)

        if ($isWhite) {
            # Keep white cutout pristine white
            $newColor = [System.Drawing.Color]::FromArgb($a, 255, 255, 255)
        } else {
            # Convert gold/brown pixels into Pure Ferrari Red (#ef4444 / #dc2626 / #ff1e1e)
            # Use original intensity to preserve anti-aliasing and shading
            $intensity = ($r * 0.5 + $g * 0.4 + $b * 0.1) / 255.0
            
            # Pure Ferrari Red: High Red (245..255), minimal Green and Blue
            $newR = [Math]::Min(255, [Math]::Max(180, [int](255 * $intensity)))
            $newG = [int](25 * $intensity)
            $newB = [int](35 * $intensity)
            
            $newColor = [System.Drawing.Color]::FromArgb($a, $newR, $newG, $newB)
        }
        
        $dstBmp.SetPixel($x, $y, $newColor)
    }
}

$outPath = "c:\Users\91939\Documents\Vehicle Insurance Platfor\assets\images\logo-red-test.png"
$dstBmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$dstBmp.Dispose()
$srcBmp.Dispose()

Write-Output "Red logo test created successfully!"
