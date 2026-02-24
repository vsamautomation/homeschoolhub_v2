param(
  [string]$InputDir = "assets-src",
  [string]$OutputDir = "public/optimized",
  [int]$Quality = 80
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq "image/jpeg" }

function Save-Jpeg {
  param(
    [System.Drawing.Image]$Image,
    [string]$Path,
    [int]$Quality
  )

  $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters 1
  $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality,
    [long]$Quality
  )

  $Image.Save($Path, $jpegCodec, $encoderParams)
}

function Resize-Jpeg {
  param(
    [string]$SourcePath,
    [string]$DestPath,
    [int]$TargetWidth,
    [int]$Quality
  )

  $src = [System.Drawing.Image]::FromFile($SourcePath)
  try {
    if ($src.Width -le $TargetWidth) {
      $TargetWidth = $src.Width
    }

    $ratio = $TargetWidth / $src.Width
    $targetHeight = [int][math]::Round($src.Height * $ratio)

    $bmp = New-Object System.Drawing.Bitmap $TargetWidth, $targetHeight
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    try {
      $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
      $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $g.DrawImage($src, 0, 0, $TargetWidth, $targetHeight)

      Save-Jpeg -Image $bmp -Path $DestPath -Quality $Quality
    } finally {
      $g.Dispose()
      $bmp.Dispose()
    }
  } finally {
    $src.Dispose()
  }
}

$images = @(
  @{
    file = "a-teacher-with-children-looking-at-a-globe.jpg"
    name = "hero"
    widths = @(768, 1280, 1600, 1920)
  },
  @{
    file = "portrait-of-happy-young-girl.jpg"
    name = "whyus-girl"
    widths = @(480, 768, 1024)
  },
  @{
    file = "woman-daughter-and-black-family-in-drawing-lounge-for.jpg"
    name = "whyus-family"
    widths = @(480, 768, 1024)
  },
  @{
    file = "black-female-teacher-instructs-primary-girls-group-students.jpg"
    name = "whyus-teacher"
    widths = @(480, 768, 1024)
  },
  @{
    file = "homeschoolhub-logo.jpg"
    name = "logo"
    widths = @(96, 128, 192)
  }
)

New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

foreach ($img in $images) {
  $srcPath = Join-Path $InputDir $img.file
  if (-not (Test-Path $srcPath)) {
    Write-Warning "Missing source image: $srcPath"
    continue
  }

  foreach ($w in $img.widths) {
    $destPath = Join-Path $OutputDir ("{0}-{1}.jpg" -f $img.name, $w)
    Resize-Jpeg -SourcePath $srcPath -DestPath $destPath -TargetWidth $w -Quality $Quality
    Write-Host ("Generated {0}" -f $destPath)
  }
}
