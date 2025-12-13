$mavenVersion = "3.9.6"
$mavenUrl = "https://archive.apache.org/dist/maven/maven-3/$mavenVersion/binaries/apache-maven-$mavenVersion-bin.zip"
$mavenZip = "maven.zip"
$mavenDir = "maven"

Write-Host "Downloading Maven $mavenVersion..."
Invoke-WebRequest -Uri $mavenUrl -OutFile $mavenZip

Write-Host "Extracting Maven..."
Expand-Archive -Path $mavenZip -DestinationPath $mavenDir -Force

$mvnPath = "$PWD\$mavenDir\apache-maven-$mavenVersion\bin\mvn.cmd"

Write-Host "Maven installed successfully!"
Write-Host "To run the application, use this command:"
Write-Host "& '$mvnPath' spring-boot:run"

# Clean up zip
Remove-Item $mavenZip
