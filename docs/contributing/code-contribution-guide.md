# Contributing Guide

Frontity, as an open-source project, welcomes everyone to contribute to code, so we are trying to make it as easy as possible.

The most common way to suggest improvements or changes to Frontity \(and most of the projects\) is to copy the Frontity project to your own repository and make there all the changes you want. Once you consider they are okay, make a pull request to submit your contribution to Frontity.

{% hint style="info" %}
Before starting, the only **prerequisite is to have Node.js 10 installed in your computer**.
{% endhint %}

## Quick guide

1. Fork this [repository](https://github.com/frontity/frontity) and clone your fork.
2. Run `npm install` in the root folder.
3. Run `cd examples/mars-theme-example/` to go to the example directory.
4. Run `npx frontity dev` to start Frontity with mars-theme on [localhost:3000](http://localhost:3000/).
5. Make any changes you consider to the packages.

   > **WARNING: After adding/removing dependencies to a package, go back to the root and do npm install again.**

6. Run `npm test` in the root to check if the fork passes the tests.
7. Commit and push to your fork.
8. Open a Pull Request detailing the changes.

## Step by step guide

**1. Fork this** [**repository**](https://github.com/frontity/frontity)**:**

You can go to [our repository](https://github.com/frontity/frontity/), click on **"Fork"** at the right-top corner and select your user.

![](../.gitbook/assets/frontity_frontity__-_frontity_-_create_amazing_sites_using_wordpress___react%20%286%29.png)

After doing this, you will create Frontity project at your own repository so you can access and modify it at: [https://github.com/\_{YOURUSERNAME}\_/frontity/](https://github.com/_{YOURUSERNAME}_/frontity/).

**2. Clone your own fork:**

This should be made to work on it on a local environment. If you are not using a Git Graphical User Interface \(like GitKraken or SourceTree\), you can clone your fork on the console by changing the current working directory to the location where you want the cloned directory to be made and running the following command:

```text
git clone https://github.com/YOURUSERNAME/frontity.git
```

It will create a folder named “frontity” inside your current directory, and we will work on it from now on.

**3. Run `npm install` on the root folder:**

Make sure you are at the root folder of Frontity project and run `npm install`, don't do it on the packages.

At this point, before starting your work, it is a good practice to have a place to see all the changes you are making, and check if your new code is working properly. For doing so, we have provided some tools to run mars-theme in your local server:

**4. Go to /examples/mars-theme-example/** :

To access an example to test your changes you should run the command `cd examples/mars-theme-example/`.

**5. Run your local server:**

To check your modifications, being in the folder previously mentioned, run **`npx frontity dev`** and it will start Frontity with mars-theme on [localhost:3000](http://localhost:3000/). It will open automatically a new tab on your browser.

**6. Make any changes you consider**:

At this point, you are able to make any improvements you want to any of the packages \(not only **mars-theme**\), and after saving your code changes, you should check if they are working by refreshing _localhost:3000_. For managing the files and the code, we strongly recommend to use a code editor like Visual Studio Code.

{% hint style="warning" %}
_**WARNING: After adding/removing dependencies to a package, you must go back to the root and do `npm install` again**_
{% endhint %}

{% hint style="info" %}
If you are doing modifications to the packages that run before Webpack, like `file-settings`, `babel-plugin-frontity` or the scripts of `core`, you need to run `npm run build` in that package folder after each change.
{% endhint %}

**7. Run the unit tests:**

Once you have finished adding changes to Frontity, your fork must pass all the unit tests. Run `npm test` **in the root folder**. This will tell you if the tests are okay and in case they are not, they will tell you which ones aren't.

If you find some errors, you can try:

- Run `npm test` on a package to detect where is the problem.
- Run `npm run test:ci` in the root to pass all tests without cache. It is useful for TypeScript tests.

**8. Run the e2e tests:**

Your fork must also pass all the end-to-end tests.

Go to the `e2e` folder and run:

```sh
cd e2e
npm install
node e2e.js --cypress run --prod
```

You need Chrome installed in your computer.

If you need to run the e2e tests in development mode, run:

```sh
node e2e.js
```

and Cypress will open.

Complete information about the e2e test in [this README file](https://github.com/frontity/frontity/blob/dev/e2e/README.md).

**9. Commit and push to your fork:**

Again, we recommend you to use a Git Graphical User Interface like GitKraken, but it can also be done in the console if wanted.

**10. Open a Pull Request**

At this point, your fork should be ready to be merged to Frontity, so you can open a Pull Request and we will review it. Make sure to select a descriptive name and follow the template.

For opening one you have to go to [Frontity's pull requests](https://github.com/frontity/frontity/compare) page and select **compare across forks.**

![](../.gitbook/assets/compare_-_frontity_frontity%20%284%29.png)

Select your own repository and **the dev branch** on Frontity, and **create the pull request**.

![](../.gitbook/assets/compare_-_frontity_frontity-2%20%282%29.png)

## Commit messages

Commit messages are one of the most common ways developers communicate with other developers so it’s important that your commit message clearly communicate changes with everybody else.

In Frontity, we follow [the seven rules of Chris Beams](https://chris.beams.io/posts/git-commit/#seven-rules):

1. Separate subject from the body with a blank line
2. Limit the subject line to 50 characters
3. Capitalize the subject line
4. Do not end the subject line with a period
5. Use the imperative mood in the subject line
6. Wrap the body at 72 characters
7. Use the body to explain what and why vs. how

Additionally, you can add a scope followed by a colon. Sometimes it may help clarify and shorten the message:

```text
Decode: Fix regexp for numeric entities
--versus--
Fix the decode regexp for numeric entities
```

Remember to capitalize the subject again after the colon.

For a more detailed explanation please read the excellent article of [Chris Beams](https://github.com/cbeams) and the guide of WordPress VIP:

- [https://chris.beams.io/posts/git-commit](https://chris.beams.io/posts/git-commit/#seven-rules)
- [https://wpvip.com/documentation/commit-messages](https://wpvip.com/documentation/commit-messages/)

## Code comments

For code comments, we follow these guidelines:

1. Write your comments in plain, valid English.
2. Capitalize the first word and end with a period.
3. Use the imperative mood.
4. Break the line at 80 characters.
5. Use TSDoc for all the types, interfaces and functions.

### 1. Write your comments in plain, valid English

```javascript
// Bad comment. Too Cryptic. Please talk English.

// This is a good comment. It is not cryptic and it's easy to read.
// Please, talk in proper English, like when you talk to a person.
```

### 2. Capitalize the first word and end with a period

```javascript
// this is a bad comment

// Remember to capitalize the first word and end with a period.
```

### 3. Use the imperative mood

```javascript
/**
 * A function used to check if an email is valid.
 */
function validateEmail(...) { ... };

// Don't describe functions/types like this 👎


/**
 * Check if an email is valid.
 */
function validateEmail(...) { ... };

// This is much better 👍
```

### 4. Break the line at 80 characters

```javascript
// This is a bad comment because is longer than 80 characters and people need to scroll right to read it. Don't do this.

// This is a good comment. You can create different phrases. Then, break the
// line if it is too long so people do not have to scroll to the right to read
// everything.
```

There is a VS Code extension to do this automatically: https://marketplace.visualstudio.com/items?itemName=stkb.rewrap

### 5. Use TSDoc for all the types, interfaces and functions

```typescript
// Don't use regular comments for types, interfaces and functions.
function validateEmail(email: string): boolean {
  //...
}

/**
 * Use proper TSDoc.
 *
 * @params email - The email to be validated.
 *
 * @returns True if the email is valid and false otherwise.
 */
function validateEmail(email: string): boolean {
  //...
}
```

You can find more about TSDoc at the official repository: https://github.com/microsoft/tsdoc

## Coding Standards

Most of the coding standards are enforced by our `Eslint` and `Prettier` configuration. Please make sure you have both installed in your editor. For VS Code, the extensions are:

- https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

You don't need to configure anything, the default configuration is fine.

Apart from those, please pay attention to these other points:

1. Use `interface` over `type` whenever possible.
2. Use an `interface` when functions have object arguments.
3. Add a line break between TSDoc comments.

### 1. Use `interface` over `type` whenever possible

Use

```ts
interface Something {
  // ...
}
```

Instead of

```ts
type Something = {
  // ...
};
```

### 2. Use an `interface` when functions have object arguments

Instead of typing the objects inline, use a separate interface to be able to document the object using TSDoc. Use the `@link` tag to link the interface and function together.

Use

```ts
/**
 * Options for the {@link validateEmail} function.
 */
interface ValidateEmailOptions {
  /**
   * Whether to allow dots in the email or not.
   *
   * @defaultValue true
   */
  allowDots: string;
}

/**
 * Validate an email address.
 *
 * @param email - The email address to be validated.
 * @param options - The options, defined in {@link ValidateEmailOptions}.
 *
 * @returns True if the email is valid, false otherwise.
 */
const validateEmail = (
  email: string,
  options: ValidateEmailOptions
): boolean => {
  // ...
};
```

Instead of

```ts
/**
 * Validate an email address.
 *
 * @param email - The email address to be validated.
 * @param options - The options.
 * @param options.allowDots - Whether to allow dots in the email or not.
 *
 * @returns True if the email is valid, false otherwise.
 */
const someFunction = (link: string, options: { prop1: string }): void => {
  // ...
};
```

### 3. Add a line break between TSDoc comments

Use

```ts
/**
 * Some interface.
 */
interface Something {
  /**
   * A property of this interface.
   */
  prop1: string;

  /**
   * Another property of this interface.
   */
  prop2: string;
}
```

Instead of

```ts
/**
 * Some interface.
 */
interface Something {
  /**
   * A property of this interface.
   */
  prop1: string;
  /**
   * Another property of this interface.
   */
  prop2: string;
}
```

## Changelogs

We use [Changesets](https://github.com/atlassian/changesets/) to manage our versioning and changelogs.

### What is a changeset

A changeset is a piece of information about changes made in a branch or commit. It holds three bits of information:

- What we need to release.
- What version we are releasing packages at \(using a [SemVer bump type](https://semver.org/)\).
- A changelog entry for the released packages.

If you pull request has changes that need to be released in a new version of some of the packages, you need to include a changeset file in the pull request.

### How to create a changeset

1. Run the command-line script `npx changeset`.
2. Select the packages you want to include in the changeset using ↑ and ↓ to navigate to packages, and hit `space` to select a package. Hit `enter` when all desired packages are selected.
3. You will be prompted to select a bump type for each selected package. Select an appropriate bump type for the changes made. Those are:
   - **Major version**: when you make incompatible API changes.
   - **Minor version:** when you add functionality in a backward-compatible manner.
   - **Patch version:** when you make backward-compatible bugfixes. See [here](https://semver.org/) for information on SemVer versioning.
4. Your final prompt will be to provide a message to go alongside the changeset. This will be written into the changelog when the next release occurs.

After this, a new changeset file will be added, which is a Markdown file with Yaml front matter.

```text
-| .changeset/
-|-| some-unique-name.md
```

#### **You can write as much Markdown as you want**

The message you typed can be found in the Markdown file. If you want to expand on it, you can write as much Markdown as you want, which will all be added to the changelog on publish. If you want to add more packages or change the bump types of any packages, that's also fine.

A good idea of what should be in a changeset is:

- **What** the change is.
- **Why** the change was made.
- **How** a consumer should update their code.

Once you are happy with the changeset, commit the file to your branch.

#### You can add more than one changeset to a pull request

Changesets are designed to stack, so there's no problem with adding multiple. You might want to add more than one changeset when:

- You want to release multiple packages with different changelog entries.
- You have made multiple changes to a package that should each be called out separately.

For more [detailed information on changesets please read their guide](https://github.com/atlassian/changesets/blob/master/docs/detailed-explanation.md).

{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}
