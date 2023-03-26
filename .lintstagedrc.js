module.exports = {
  '*.{js,ts}': ['prettier --write', 'eslint --fix'],
  '*.ts': [() => 'tsc --skipLibCheck --noEmit'],
  'package.json': ['prettier-package-json --write'],
};
