import {
  transformFileSync } from '@babel/core';
import {
  join,
} from 'path';
import {
  readdirSync,
  readFileSync,
} from 'fs';
import plugin from '../src/index';
import expect from 'expect';

describe('index', () => {
  // 测试用例目录
  const fixturesDir = join(__dirname, 'fixtures');
  let fixtures = readdirSync(fixturesDir);

  // 如果有only标识，则只测试only目录的用例
  const onlyFixtures = fixtures.filter(fixture => fixture.indexOf('-only') > -1);
  if (onlyFixtures.length) {
    fixtures = onlyFixtures;
  }

  fixtures.map(caseName => {
    const fixtureDir = join(fixturesDir, caseName);
    const actualFile = join(fixtureDir, 'actual.js');
    const expectedFile = join(fixtureDir, 'expected.js');

    it(`should work with ${caseName.split('-').join(' ')}`, () => {
      let pluginWithOpts;
      caseName = caseName.replace(/-only$/, '');
      if (caseName === 'import-js') {
        pluginWithOpts = [
          plugin, {
            libraryName: 'light-utils',
            camel2DashComponentName: false,
          },
        ];
      }

      let actual;
      if (caseName === 'import-js') {
        actual = transformFileSync(actualFile, {
          presets: ['@babel/react'],
          plugins: [pluginWithOpts],
        }).code;
      }


      if (onlyFixtures.length) {
        console.warn();
        console.warn(actual);
      }

      const expected = readFileSync(expectedFile, 'utf-8');
      expect(actual.trim()).toEqual(expected.trim());
    });
  });
});
