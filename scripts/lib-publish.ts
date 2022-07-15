/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import shell from 'shelljs';

const packageName = 'react-adminer';

const [type] = process.argv.slice(2);

const PUBLISH_TYPE = ['major', 'minor', 'patch'];

if (!PUBLISH_TYPE.includes(type)) {
	console.error('Invalid publish type!');
	process.exit(1);
}

const fullPath = path.join(__dirname, '..', 'packages', packageName, 'package.json');
const originalContent = JSON.parse(fs.readFileSync(fullPath).toString());
const content = JSON.parse(fs.readFileSync(fullPath).toString());

const versionIncrement = (): void => {
	const versions = content.version.split('.');

	let index = 2;
	switch (type) {
		case 'major': {
			index = 0;
			break;
		}
		case 'minor': {
			index = 1;
			break;
		}
		case 'patch': {
			index = 2;
			break;
		}
	}

	const toChangeVersion = +versions[index];
	if (!Number.isInteger(toChangeVersion)) {
		console.error('Type in version is not number!');
		process.exit(1);
	}

	// reset prev versions
	for (let i = 2; i > index; i--) {
		versions[i] = 0;
	}

	versions[index] = +versions[index] + 1;
	content.version = versions.join('.');
	originalContent.version = versions.join('.');
};

versionIncrement();

delete content.exports;
content.main = './dist/index.js';
content.types = './dist/index.d.ts';
fs.writeFileSync(fullPath, JSON.stringify(content, null, 2));

const revertPackageContent = (): void => {
	fs.writeFileSync(fullPath, JSON.stringify(originalContent, null, 2));
};

const cmd = `yarn workspace react-adminer publish`;
if (shell.exec(cmd).code !== 0) {
	shell.echo('Publish package failed!');
	revertPackageContent();
	shell.exit(1);
}

revertPackageContent();
