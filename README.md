# arcadians-client-sdk

Add utility to your NFTs!

# Demo Repository

[Live Demo](https://github.com/alto-io/sdk-example-client)

# Install

```

npm install arcadians-client-sdk

```

```

import Arcadians from "arcadians-client-sdk";

```

or

Load acardians.min.js using a script tag:

```

<script src="https://unpkg.com/arcadians-client-sdk@0.4.4/dist/arcadians.min.js"></script>

<script>

let settings = {
	testMode: true, // Test mode.
	testAddress: "0xf0103243f4d22b5696588646b21313d85916a16a", // The test address you would like to use.
	nftsLimit : 50, // Limit the maximum numbers of fetched NFTs.
	gameId : "0cd69241-531c-4698-bf17-454dd6cb1ab4", // Your gameId provided by us.
	apiUrl : "https://lb-dev.gmfrens.games", // Your apiUrl provided by us.
}
let arc = new Arcadians(settings);

function onUserSelect(selectedNft) {
console.log(selectedNft);
}
arc.showNftsWindow(onUserSelect);

</script>

```

# Usage

Production:

```

let settings = {
gameId : "0cd69241-531c-4698-bf17-454dd6cb1ab4", // Your gameId provided by us.
apiUrl : "https://lb-dev.gmfrens.games", // Your apiUrl provided by us.
}
let arc = new Arcadians(settings);

// Callback executed when a user selects a NFT from the window.
// Returns an object containing the NFT metadata or false if the user closes the window.
function onUserSelect(selectedNft) {
	console.log(selectedNft);
}

arc.showNftsWindow(onUserSelect);

```

Add your custom callback on each NFT loaded:

```

function onUserSelect(selectedNft) {
	console.log(selectedNft);
}

function onNftLoaded(loadedNft) {
	console.log(loadedNft);
}

arc.showNftsWindow(onUserSelect, onNftLoaded);

```

Get NFTs metadata without injecting a window:

```

arc.getUserNfts().then((result) => {
	console.log(result);
});

```

Get NFTs metadata without logging in into MetaMask by using a custom address:

```

let customAddress = "0xf0103243f4d22b5696588646b21313d85916a16a";

arc.getUserNftsWithCustomAddress(customAddress).then((result) => {
	console.log(result);
});

```

Show leaderboard window:

```

arc.showLeaderboardWindow();

```

Get leaderboard data without injecting a window:

```

arc.fetchLeaderboard();

```

Start your game session (when a user joins a game):

```

arc.startGameSession();

```
