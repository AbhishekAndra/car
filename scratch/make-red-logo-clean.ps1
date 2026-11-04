Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\91939\Documents\Vehicle Insurance Platfor\assets\images\logo-red-test.png"
$bytes = [System.IO.File]::ReadAllBytes($srcPath)
$ms = New-Object System.IO.MemoryStream(,$bytes)
$srcBmp = [System.Drawing.Image]::FromStream($ms)
$w = $srcBmp.Width
$h = $srcBmp.Height

$dstBmp = New-Object System.Drawing.Bitmap($w, $h)

# The squircle bounding box in the logo:
$sqL = 6.0
$sqT = 20.0  # The real top flat boundary of squircle
$sqR = 188.0
$sqB = 192.0
$radius = 38.0

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $pixel = $srcBmp.GetPixel($x, $y)
        $a = $pixel.A
        if ($a -eq 0) {
            $dstBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            continue
        }

        # Apply squircle mask only to the icon on the left (x < 220)
        if ($x -lt 215) {
            if ($x -lt $sqL -or $x -gt $sqR -or $y -lt $sqT -or $y -gt $sqB) {
                $dstBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                continue
            }
            # Top-left corner
            if ($x -lt ($sqL + $radius) -and $y -lt ($sqT + $radius)) {
                $dx = ($sqL + $radius) - $x
                $dy = ($sqT + $radius) - $y
                if (($dx*$dx + $dy*$dy) -gt ($radius*$radius)) {
                    $dstBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                    continue
                }
            }
            # Top-right corner
            if ($x -gt ($sqR - $radius) -and $y -lt ($sqT + $radius)) {
                $dx = $x - ($sqR - $radius)
                $dy = ($sqT + $radius) - $y
                if (($dx*$dx + $dy*$dy) -gt ($radius*$radius)) {
                    $dstBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                    continue
                }
            }
            # Bottom-left corner
            if ($x -lt ($sqL + $radius) -and $y -gt ($sqB - $radius)) {
                $dx = ($sqL + $radius) - $x
                $dy = $y - ($sqB - $radius)
                if (($dx*$dx + $dy*$dy) -gt ($radius*$radius)) {
                    $dstBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                    continue
                }
            }
            # Bottom-right corner
            if ($x -gt ($sqR - $radius) -and $y -gt ($sqB - $radius)) {
                $dx = $x - ($sqR - $radius)
                $dy = $y - ($sqB - $radius)
                if (($dx*$dx + $dy*$dy) -gt ($radius*$radius)) {
                    $dstBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                    continue
                }
            }
        }
        
        $dstBmp.SetPixel($x, $y, $pixel)
    }
}

$srcBmp.Dispose()
$ms.Dispose()

$dstBmp.Save("c:\Users\91939\Documents\Vehicle Insurance Platfor\assets\images\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Save standalone icon
$iconRect = New-Object System.Drawing.Rectangle(0, 0, 196, 196)
$iconBmp = New-Object System.Drawing.Bitmap(196, 196)
$g = [System.Drawing.Graphics]::FromImage($iconBmp)
$g.DrawImage($dstBmp, 0, 0, $iconRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$iconBmp.Save("c:\Users\91939\Documents\Vehicle Insurance Platfor\assets\images\logo-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$iconBmp.Dispose()
$dstBmp.Dispose()

Write-Output "Flawless pure red logo saved!"
