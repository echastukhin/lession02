module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "airbnb-base",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": ["error", 4],
	"eqeqeq": "off",
	"arrow-body-style": ["error", "always"],
	"no-console": "off",
	"no-plusplus": "off",
	"prefer-destructuring": "off",
	"import/no-extraneous-dependencies": [
        "error", {
           "devDependencies": true
        }
    ]
    }
};
