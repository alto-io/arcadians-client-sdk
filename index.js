import Arcadians from "./lib/arcadians.js";
let testMode = false;
let testAddress = "0xf0103243f4d22b5696588646b21313d85916a16a";
let arc = new Arcadians(testMode, testAddress);

function onNftLoaded(loadedNft) {
  //console.log(loadedNft);
}
arc.showNftsWindow(5000, onNftLoaded);
function onUserSelect(selectedNft) {
  //console.log(selectedNft);
}
arc.showNftsWindow(onUserSelect, onNftLoaded);
arc.showNftsWindow(onUserSelect, onNftLoaded);
export default Arcadians;
