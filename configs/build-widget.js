const { checkDirectory, copyFileSync, copyFolderSync } = require('./copy-files.js');

checkDirectory('build');
copyFileSync('./script.js', './build/script.js');
copyFolderSync('./static', './build');

console.log('✅ Widget built successfully!');
