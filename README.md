# arcadians-client-sdk

Add utility to your NFTs!

# Install

```
npm install arcadians-client-sdk
```

or

Load acardians.min.js using a script tag.

```
<script src="https://unpkg.com/arcadians-client-sdk@0.1.18/dist/arcadians.min.js"></script>
    <script>
        arcadians.init().then((result) => {
                console.log(result);
            })
    </script>
```

# Usage

Production

```
arcadians.init().then((result) => {
    console.log(result);
})
```

Test mode

```
let testMode = true;
let testAddress = "0x4Cb6459930F30B7cA63a37D7075D85d670C97E1e";
arcadians.init(testMode, testAddress).then((result) => {
    console.log(result);
})
```
