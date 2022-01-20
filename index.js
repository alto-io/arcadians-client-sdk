import Arcadians from "./lib/arcadians.js";
let arc = new Arcadians();

// Callback executed when a user selects a NFT from the window.
// Returns an object containing the NFT metadata or false if the user closes the window.
function onUserSelect(selectedNft) {
  console.log(selectedNft);
}

arc.showNftsWindow(onUserSelect);
export default Arcadians;
