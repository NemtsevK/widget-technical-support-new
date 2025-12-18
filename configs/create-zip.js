const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Запускаем создание архива
createZip().catch(error => {
  console.error('❌ Error creating zip:', error.message);
  process.exit(1);
});

// Создать архив
function createZip() {
  return new Promise((resolve, reject) => {
    // Проверяем существование папки build
    if (!fs.existsSync('build')) {
      reject(new Error('Build folder not found. Run npm run build first.'));
      return;
    }

    // Создаем архив
    const output = fs.createWriteStream('widget.zip');
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    output.on('close', () => {
      console.log(`✅ widget.zip created successfully!`);
      console.log(`📦 Total size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
      //console.log("📁 Archive contents:");
      resolve();
    });

    archive.on('error', err => {
      reject(err);
    });

    archive.on('entry', entry => {
      //console.log(`   - ${entry.name}`);
    });

    // Пайпим архив в файл
    archive.pipe(output);

    // Добавляем все файлы из папки build в архив
    // НЕ включая саму папку build в пути архива
    addDirectoryToArchive(archive, 'build', '');

    // Финализируем архив
    archive.finalize();
  });
}

// Добавить директорию в архив
function addDirectoryToArchive(archive, sourceDir, archivePath) {
  const files = fs.readdirSync(sourceDir);

  for (const file of files) {
    const filePath = path.join(sourceDir, file);
    const stat = fs.lstatSync(filePath);

    const relativePath = archivePath ? `${archivePath}/${file}` : file;

    if (stat.isDirectory()) {
      // Рекурсивно добавляем подпапки
      addDirectoryToArchive(archive, filePath, relativePath);
    } else {
      // Добавляем файл в архив
      archive.file(filePath, { name: relativePath });
    }
  }
}
