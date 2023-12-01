module.exports = {
  '*.js?(x)': (files) => [
    `eslint --fix ${files.join(' ')}`,
  ],
  '*.{js?(x),md,json,yml}': (files) => `prettier --write ${files.join(' ')}`,
  '*.(css)': (files) => `stylelint --fix ${files.join(' ')}`,
};
