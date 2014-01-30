#### To Add Functionality to Streamlyne JavaScript SDK

##### Downloading and Building from Source Code

Use the following Bash command:

```bash
git clone http://git.streamlyne.co/streamlyne/sl-javascript-sdk.git && \
cd sl-javascript-sdk/ && \
npm install && \
npm start
```

###### Note:
`npm start` runs `grunt` which builds the documentation in `docs/` and the production-ready script into the destination directory `dist/`.

#### To Use the Streamlyne JavaScript SDK in another Website

Install using [Bower](http://bower.io/).

```
bower install http://git.streamlyne.co/streamlyne/sl-javascript-sdk.git --save
```

Then include the file `/bower_components/streamlyne-javascript-sdk/dist/streamlyne.min.js` as the `src` of a `script` tag.

