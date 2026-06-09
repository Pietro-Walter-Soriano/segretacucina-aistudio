const https = require('https');
const fs = require('fs');
const path = require('path');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
          download(response.headers.location, dest).then(resolve).catch(reject);
          return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function main() {
  try {
    await download('https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/assets/lanyard/card.glb', 'src/assets/lanyard/card.glb');
    await download('https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/assets/lanyard/lanyard.png', 'src/assets/lanyard/lanyard.png');
    console.log('Downloaded assets');
  } catch(e) {
    console.error(e);
  }
}

main();
