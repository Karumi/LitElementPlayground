# LitElementPlayground

Playground used to learn and experiment with [Lit Element](https://lit-element.polymer-project.org/) and Web development. This repository contains the exercises of tutorial series "[How to build apps with LitElement and redux tutorial](https://vaadin.com/tutorials/lit-element)".

![](https://vaadin.com/static/content/learning-center/tutorials/lit-element/images/lit-element-thumbnail.png)

Here is the content of the tutorial series:

1. [Creating a LitElement project](https://vaadin.com/tutorials/lit-element/starting-a-lit-element-project) PR [#1](https://github.com/Karumi/LitElementPlayground/pull/1)
2. [LitElement templating, properties, and events](https://vaadin.com/tutorials/lit-element/lit-element-templating-properties-and-events) PR [#2](https://github.com/Karumi/LitElementPlayground/pull/2)
3. [Using Redux in a LitElement app](https://vaadin.com/tutorials/lit-element/state-management-with-redux) PR [#3](https://github.com/Karumi/LitElementPlayground/pull/3)
4. [Navigation and code splitting in a LitElement project](https://vaadin.com/tutorials/lit-element/navigation-and-code-splitting) PR [#4](https://github.com/Karumi/LitElementPlayground/pull/4)
5. [PWA and offline](https://vaadin.com/tutorials/lit-element/pwa-and-offline) PR [#5](https://github.com/Karumi/LitElementPlayground/pull/5)

## How to run

```
npm install
npm run dev:sw
```

This application works offline then you need to run also the service worker adding `:sw` after `dev` environment.

Open `localhost:8080` page on your browser.

## How to execute test

```
npm run prod
npm start
npm run cypress:run
```

This application uses Cypress to run the tests. Cypress is an E2E testing framework then we need to start a server which serves our HTML page with the host http://localhost:9000 with `node server`.

Then to run Cypress you have two ways to do it, using cypress:run or cypress:open, the second one will display an application with all the tests files listing and you can run all of them or one by one with a beautiful interface where you can see the different states of the website during the tests.

> Cypress use Chai and Mocha for assertion and test framework.

## Generate new test snapshots

```
npm run cypress:update
```

You can modify the snapshots with new features running cypress:update, it will generate all new images for all tests unless you write in the test you want to change `it.only` in the test name.

## License

    Copyright 2019 Karumi

    Licensed under the GNU General Public License, Version 3 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.gnu.org/licenses/gpl-3.0.en.html

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
