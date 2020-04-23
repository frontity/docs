# 🌎 Deployment

Once you have your application working and ready to be deployed you can create a production version by doing \(from the root of your project\)

```text
npx frontity build
```

This command will generate a `build` folder containing both your \(isomorphic\) React app and your Frontity \(node\) server

So, this folder can be deployed to any hosting that is prepared to serve a node app

The content of this `build` folder will be used by the command

```text
npx frontity serve
```

which we can be used to launch our Frontity app in production

Here you have some guides about how to deploy a Frontity app in some popular hostings:

* [Deploy on Now](deploy-on-now.md)

