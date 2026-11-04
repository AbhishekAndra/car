Add-Type -AssemblyName System.Drawing

$mockupPath = "C:\Users\91939\.gemini\antigravity\brain\76b29709-8c51-49b4-acd1-71813d935b0b\.user_uploaded\media_1793254555774_bdd669e6.jpg"
$sourceImg = [System.Drawing.Image]::FromFile($mockupPath)

# Refined Cockpit crop:
$cockpitRect = New-Object System.Drawing.Rectangle(620, 183, 103, 195)
$cockpitBmp = New-Object System.Drawing.Bitmap(103, 195)
$g = [System.Drawing.Graphics]::FromImage($cockpitBmp)
$g.DrawImage($sourceImg, 0, 0, $cockpitRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$outputPath = "c:\Users\91939\Documents\Vehicle Insurance Platfor\assets\images\mockup-cockpit.jpg"
$cockpitBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$cockpitBmp.Dispose()
$sourceImg.Dispose()

Write-Output "Refined cockpit cropped!"
