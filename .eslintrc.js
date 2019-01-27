module.exports = {
    "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module",
    },
    "parser": "babel-eslint",
    "env": {
      "es6": true
    },
    "plugins": ["react"],
    "rules": {
      'arrow-parens': 0,
      'comma-dangle': [2, 'always-multiline'],
      // 'max-len': [2],
      'require-jsdoc': 0,
      'jsx-quotes': [2, 'prefer-double'],
      'no-invalid-this': 1,
      'eol-last': 0 ,
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "indent": 0,
    }
  };

