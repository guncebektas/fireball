const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please provide the folder name: ', (folderName) => {
  const folderPath = path.join(__dirname, `../../public/online/${folderName}`);
  const iconsDir = path.join(folderPath, 'icons');
  const logoPath = path.join(folderPath, 'logo.png');

  if (!fs.existsSync(folderPath)) {
    console.error(`Error: The folder "${folderPath}" does not exist.`);
    rl.close();
    return;
  }

  fs.readdir(iconsDir, (err, files) => {
    if (err) {
      console.error('Error reading icons directory:', err);
      rl.close();
      return;
    }

    files.forEach(file => {
      const filePath = path.join(iconsDir, file);
      const outputFilePath = path.join(iconsDir, file);

      sharp(filePath)
        .metadata()
        .then(metadata => {
          return sharp(logoPath)
            .resize(metadata.width, metadata.height)
            .toFile(outputFilePath);
        })
        .then(() => {
          console.log(`Replaced ${file} with logo.png`);
        })
        .catch(err => {
          console.error('Error processing file:', err);
        });
    });

    rl.close();
  });
});
