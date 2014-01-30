#### To Add Functionality to Streamlyne JavaScript SDK

##### Downloading and Building from Source Code

Use the following [Bash] command:

```bash
git clone http://git.streamlyne.co/streamlyne/sl-javascript-sdk.git && \
cd sl-javascript-sdk/ && \
npm install && \
npm start
```

###### Note:
*npm start* builds the documentation in `./docs/`.

#### To Use the Streamlyne JavaScript SDK in another Website

Install using [Bower](http://bower.io/).

```
bower install http://git.streamlyne.co/streamlyne/sl-javascript-sdk.git --save
```

Then include the file `/bower_components/streamlyne-javascript-sdk/dist/streamlyne.min.js` as the `src` of a `script` tag.

