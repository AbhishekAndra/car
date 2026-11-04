Add-Type -AssemblyName System.Drawing

$mockupPath = "C:\Users\91939\.gemini\antigravity\brain\76b29709-8c51-49b4-acd1-71813d935b0b\.user_uploaded\media_1793254555774_bdd669e6.jpg"
$sourceImg = [System.Drawing.Image]::FromFile($mockupPath)

# Car only crop:
$carRect = New-Object System.Drawing.Rectangle(60, 360, 555, 188)
$carBmp = New-Object System.Drawing.Bitmap(555, 188)
$g = [System.Drawing.Graphics]::FromImage($carBmp)
$g.DrawImage($sourceImg, 0, 0, $carRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$outputPath = "c:\Users\91939\Documents\Vehicle Insurance Platfor\assets\images\mockup-car-clean.png"
$carBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$carBmp.Dispose()
$sourceImg.Dispose()

Write-Output "Cropped clean car image!"

