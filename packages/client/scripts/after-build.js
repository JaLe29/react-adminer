const path = require('path');
const fse = require('fs-extra');

const typesPath = path.resolve(__dirname, '..', 'dist', 'packages', 'react-querier', 'src');
const targetPath = path.resolve(__dirname, '..', 'dist');
fse.copySync(typesPath, targetPath);
fse.remove(path.resolve(__dirname, '..', 'dist', 'packages'));
