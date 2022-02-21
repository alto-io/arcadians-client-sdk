# arcadians-client-sdk

Add utility to your NFTs!

# Install

```
npm install arcadians-client-sdk
```

```
import Arcadians from "arcadians-client-sdk";
```

or

Load acardians.min.js using a script tag.

```
<script src="https://unpkg.com/arcadians-client-sdk@0.3.12/dist/arcadians.min.js"></script>
<script>
let arc = new Arcadians();
function onUserSelect(selectedNft) {
  console.log(selectedNft);
}
arc.showNftsWindow(onUserSelect);
</script>
```

# Usage

Production

```
let arc = new Arcadians();

// Callback executed when a user selects a NFT from the window.
// Returns an object containing the NFT metadata or false if the user closes the window.
function onUserSelect(selectedNft) {
  console.log(selectedNft);
}

arc.showNftsWindow(onUserSelect);
```

Test mode

```
let testMode = true;
let testAddress = "0xf0103243f4d22b5696588646b21313d85916a16a";
let arc = new Arcadians(testMode, testAddress);

function onUserSelect(selectedNft) {
  console.log(selectedNft);
}

arc.showNftsWindow(onUserSelect);
```

Limit maximum NFTs loaded

```
let arc = new Arcadians(null, null, 5);

function onUserSelect(selectedNft) {
  console.log(selectedNft);
}

arc.showNftsWindow(onUserSelect);
```

Add your custom callback on each NFT loaded

```
let arc = new Arcadians();

function onUserSelect(selectedNft) {
  console.log(selectedNft);
}

function onNftLoaded(loadedNft) {
  console.log(loadedNft);
}

arc.showNftsWindow(onUserSelect, onNftLoaded);
```

Get NFTs metadata without injecting a window

```
let arc = new Arcadians();
arc.getUserNfts().then((result) => {
  console.log(result);
});
```