# 下載 Leaflet 1.9.4 到專案內（vendor/leaflet/），讓 App 不依賴外部 CDN
# 使用方式：在專案根目錄按右鍵 >「在終端機中開啟」，執行：
#   powershell -ExecutionPolicy Bypass -File .\get_leaflet.ps1

$base = "https://unpkg.com/leaflet@1.9.4/dist"
$dest = Join-Path $PSScriptRoot "vendor\leaflet"

New-Item -ItemType Directory -Force -Path (Join-Path $dest "images") | Out-Null

Write-Host "下載 Leaflet 1.9.4 ..."
Invoke-WebRequest "$base/leaflet.js"  -OutFile (Join-Path $dest "leaflet.js")
Invoke-WebRequest "$base/leaflet.css" -OutFile (Join-Path $dest "leaflet.css")

foreach ($f in @("marker-icon.png", "marker-icon-2x.png", "marker-shadow.png", "layers.png", "layers-2x.png")) {
  Invoke-WebRequest "$base/images/$f" -OutFile (Join-Path $dest "images\$f")
}

Write-Host "完成！檔案已存至 vendor\leaflet\"
Write-Host "記得 git add vendor 一併 commit。"
