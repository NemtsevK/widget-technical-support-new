const { checkDirectory, copyFileSync, copyFolderSync } = require('./copy-files.js');

checkDirectory('local/build');
copyFileSync('./static/style.scss', './build/static/style.css');
copyFolderSync('./static', './local/static');

console.log('✅ Local widget built successfully!');
