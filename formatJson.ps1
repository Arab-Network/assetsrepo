$sw = [Diagnostics.Stopwatch]::StartNew()
jq '.' directories.json > formatted_directories.json
$sw.Stop()
Write-Output "Fromatted directories.json in $($sw.Elapsed.TotalMilliseconds) ms."