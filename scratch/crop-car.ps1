Add-Type -AssemblyName System.Drawing

$mockupPath = "C:\Users\91939\.gemini\antigravity\brain\76b29709-8c51-49b4-acd1-71813d935b0b\.user_uploaded\media_1793254555774_bdd669e6.jpg"
$sourceImg = [System.Drawing.Image]::FromFile($mockupPath)

# Laptop screen in 1024x682 image:
# Screen runs roughly X: 34 to 742 (width ~708), Y: 88 to 570 (height ~482)
# Inside screen, car is at bottom left/center:
# Let's crop the car region and also the screen region
$carRect = New-Object System.Drawing.Rectangle(60, 340, 560, 205)
$carBmp = New-Object System.Drawing.Bitmap(560, 205)
$g = [System.Drawing.Graphics]::FromImage($carBmp)
$g.DrawImage($sourceImg, 0, 0, $carRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$outputPath = "c:\Users\91939\Documents\Vehicle Insurance Platfor\assets\images\mockup-red-car.png"
$carBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$carBmp.Dispose()
$sourceImg.Dispose()

Write-Output "Cropped mockup car successfully!"

