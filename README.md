# arcadians-client-sdk

Add utility to your NFTs!

# Install

```
npm install arcadians-client-sdk
```

```
import Arcadians  from "arcadians-client-sdk";
```

or

Load acardians.min.js using a script tag.

```
<script src="https://unpkg.com/arcadians-client-sdk@0.2.0/dist/arcadians.min.js"></script>
<script>
    let arc = new Arcadians();
    arc.init().then((result) => {
        console.log(result);
    });
</script>
```

# Usage

Production

```
let arc = new Arcadians();
arc.init().then((result) => {
    console.log(result);
});
```

Test mode

```
let testMode = true;
let testAddress = "0xf0103243f4d22b5696588646b21313d85916a16a";
let arc = new Arcadians(testMode, testAddress);
arc.init().then((result) => {
    console.log(result);
});
```

Limit maximum NFTs loaded

```
let arc = new Arcadians();
arc.init(10).then((result) => {
    console.log(result);
});
```

Add your custom callback on each NFT load

```
let arc = new Arcadians();
arc.init(null, (currentNft) => {
    console.log(currentNft)
}).then((result) => {
    console.log(result);
});
```

Use both NFT limit and callback

```
let arc = new Arcadians();
arc.init(10, (currentNft) => {
    console.log(currentNft)
}).then((result) => {
    console.log(result);
});
```

Add test mode to the mix

```
let testMode = true;
let testAddress = "0xf0103243f4d22b5696588646b21313d85916a16a";
let arc = new Arcadians();
arc.init(10, (currentNft) => {
    console.log(currentNft)
}).then((result) => {
    console.log(result);
});
```