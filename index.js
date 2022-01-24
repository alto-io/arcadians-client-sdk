import Arcadians from "./lib/arcadians.js";
let testMode = true;
let testAddress = "0xf0103243f4d22b5696588646b21313d85916a16a";
let arc = new Arcadians(testMode, testAddress);

function onUserSelect(selectedNft) {
  console.log(selectedNft);
}

arc.showNftsWindow(onUserSelect);
export default Arcadians;
