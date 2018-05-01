
** Main URLs:

http://www.thinksincode.com/2016/07/07/karma-jasmine-webpack.html
https://github.com/webpack-contrib/karma-webpack/issues/189
https://stackoverflow.com/questions/17289423/need-proper-reporter-for-karma-jasmine

`npm install --save-dev karma karma-jasmine karma-chrome-launcher karma-webpack jasmine-core karma-spec-reporter angular-mocks@1.5.8`

Test files need to include reference to main app.js, where angular module loads.

Angular module load point (app.js) must load angular-mocks.
