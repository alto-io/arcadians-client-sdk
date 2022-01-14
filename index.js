import Arcadians from "./lib/arcadians.js";
let testMode = true;
let testAddress = "0xf0103243f4d22b5696588646b21313d85916a16a";
let arc = new Arcadians(testMode, testAddress);
arc
  .init(null, (currentNft) => {
    //console.log(currentNft);
  })
  .then((result) => {
    //console.log(result);
  });
export default Arcadians;
