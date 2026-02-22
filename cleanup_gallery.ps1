$image0 = "c:\Users\asnor\Desktop\wedding-website\cs02\wedding-rsvp01\public\photos\image0"
$image1 = "c:\Users\asnor\Desktop\wedding-website\cs02\wedding-rsvp01\public\photos\image1"

$keep0 = @(
 "IMG_2860.webp",
 "IMG_2971.webp",
 "IMG_2651.webp",
 "IMG_2549.webp",
 "IMG_2330.webp",
 "IMG_2254.webp"
)

$keep1 = @(
 "DSC00005.webp",
 "DSC00067.webp",
 "DSCF6838.webp",
 "DSC00268.webp",
 "DSC00292.webp",
 "DSC00287.webp",
 "DSC00977.webp",
 "image_2026-02-06_232856492.webp",
 "1 (1).webp",
 "1 (2).webp",
 "1 (3).webp",
 "1 (4).webp",
 "1 (5).webp",
 "DSC01288.webp"
)

Write-Host "Cleaning image0..."
Get-ChildItem $image0 | Where-Object { $_.Name -notin $keep0 } | ForEach-Object {
    Write-Host "Deleting $($_.Name)"
    Remove-Item $_.FullName -Force
}

Write-Host "Cleaning image1..."
Get-ChildItem $image1 | Where-Object { $_.Name -notin $keep1 } | ForEach-Object {
    Write-Host "Deleting $($_.Name)"
    Remove-Item $_.FullName -Force
}

Write-Host "Cleanup Complete"
