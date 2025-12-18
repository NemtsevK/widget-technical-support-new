const fs = require('fs');
const path = require('path');

// Создаем папку build если её нет
if (!fs.existsSync('build')) {
  fs.mkdirSync('build');
}

// 1. Копируем основной script.js в build
copyFileSync('./script.js', './build/script.js');

// 2. Копируем всю папку static в build
if (fs.existsSync('./static')) {
  copyFolderSync('./static', './build');
} else {
  console.log('⚠️  static folder not found, skipping...');
}

console.log('✅ Widget built successfully!');

// Функция для копирования файла
function copyFileSync(source, target) {
  try {
    if (source.endsWith('.scss')) {
      return;
    }
    fs.copyFileSync(source, target);
    //console.log(`   ✅ ${path.relative("./build", target)}`);
  } catch (error) {
    console.error(`Error copying ${source}:`, error.message);
  }
}

// Функция для рекурсивного копирования папок
function copyFolderSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(source);

  for (const file of files) {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyFolderSync(sourcePath, targetPath);
    } else {
      copyFileSync(sourcePath, targetPath);
    }
  }
}
