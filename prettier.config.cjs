/** @type {import("prettier").Config} */
module.exports = {
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    printWidth: 100,
    bracketSpacing: true,
    importOrder: ['^react$', '^@?\\w', '^[./]'],
    // importOrderSeparation: true, # If you want to separate imports with a new line
    importOrderSortSpecifiers: true,
    plugins: ['@trivago/prettier-plugin-sort-imports'],
  };
  