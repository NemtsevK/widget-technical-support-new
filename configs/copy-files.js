const fs = require('fs');
const path = require('path');

// Функция для рекурсивного копирования папок
function copyFolderSync(source, target) {
  if (!fs.existsSync(source)) {
    console.log(`⚠️ Директория ${source} не найдена`);
    return;
  }

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

// Функция для копирования файла
function copyFileSync(source, target) {
  try {
    if (source.endsWith('.scss')) {
      return;
    }
    fs.copyFileSync(source, target);
  } catch (error) {
    console.error(`Error copying ${source}:`, error.message);
  }
}

function checkDirectory(source) {
  if (!fs.existsSync(source)) {
    fs.mkdirSync(source);
  }
}

module.exports = {
  copyFolderSync,
  copyFileSync,
  checkDirectory,
};
