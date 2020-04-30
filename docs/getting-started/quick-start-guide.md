# Quick start guide

Right, let's get you set up with your very first Frontity project. This guide will take you from the very basics to feeling amazed at what you can do with Frontity!

>Please check that you meet the [**Installation requirements**](README.md#installation-requirements) before following the steps below.

{% embed url="https://www.youtube.com/watch?v=OdiuVxjbh9A" caption="" %}

## Create a new Frontity project

Frontity has it's own CLI. You can create a new Frontity project with a single command:

```text
npx frontity create my-app
```

>Replace "my-app" in the command above with your own name for your project.

> For those wondering what **npx** is you can take a look at [this article](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).  
> TL;DR It downloads an **npm** package to run just this one time and then removes it from your computer.

You will be prompted to select a theme. You can choose between Mars theme and TwentyTwenty. If this is your first time trying out Frontity then we recommend that you select Mars theme.

You'll also be asked if you want to sign up for the Frontity newsletter. Enter a valid email address if you wish to do so.

The command above will create a new directory with the project name you used. Change into that directory with:

```text
cd my-app
```

>Again you should replace "my-app" with your own project name. 

Your new Frontity project will have the following structure:

```text
my-app/
|__ node_modules/
|__ package.json
|__ frontity.settings.js
|__ favicon.ico
|__ packages/
    |__ mars-theme/
```

## Start development

Now you can start a development server with:

```text
npx frontity dev
```

This server will be listening to `http://localhost:3000` and watching for any changes inside the `packages` folder.

The page should open automatically in your browser. At first Frontity will connect to our starter blog and so you will initially see our demo content. 

Of course you want to see your own content appearing in your new Frontity site, so let's move on to the next step - [**connecting Frontity up**](connecting-to-wordpress.md) to your own WordPress site.

{% hint style="info" %}
Still have questions? Come and join us in [the community](https://community.frontity.org/) and ask there! We are here to help 😊
{% endhint %}
