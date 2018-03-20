# babel-plugin-import

一个轻量的按需加载库()

[![NPM version](https://img.shields.io/npm/v/light-babel-import.svg)](https://npmjs.org/package/light-babel-import)
[![NPM version](https://img.shields.io/npm/v/light-babel-import.svg?style=flat)](https://npmjs.org/package/light-babel-import)

----

## Install

```shell
npm install light-babel-import --save-dev
```

## Example

Converts

```javascript
import { _isUrl } from 'light-utils'
```

to

```javascript
var _isUrl = require('light-utils/lib/_isUrl')
```

## styleLibraryName Example

Converts

```javascript
import Components from 'components'
import { Button } from 'components'
```

to

```javascript
require('components/lib/styleLibraryName/index.css')
var button = require('components/lib/styleLibraryName/button.css')
```

## Usage

Via `.babelrc` or babel-loader.

```javascript
{
  "plugins": [["light-babel-import", options]]
}
```

## Multiple Module
```javascript
{
  "plugins": [xxx,
    ["light-babel-import", {
      libraryName: "antd",
      style: true,
    }, "antd"],
    ["light-babel-import", {
      libraryName: "test-module",
      style: true,
    }, "test-module"]
  ]
}
```
