import { ethers } from "ethers";
import axios from "axios";

class Arcadians {
  constructor(testMode, testAddress, nftsLimit, { gameId, apiUrl } ) {
    this.gameId = gameId;
    this.apiUrl = apiUrl;

    this.contractAddress = "0xc3C8A1E1cE5386258176400541922c414e1B35Fd";
    this.abi = [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "approved",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "ApprovalForAll",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [],
        name: "MAX_ENTRIES",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "entries",
            type: "address[]",
          },
          { internalType: "bool", name: "isOG", type: "bool" },
        ],
        name: "addToPresale",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_num", type: "uint256" }],
        name: "buy",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "buysPerAddress",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "getApproved",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
        ],
        name: "isApprovedForAll",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "maxBuysPerAddress",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "maxMint",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "maxPrebuysPerAddress",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "maxPresaleMint",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "maxTotalPresale",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "_to", type: "address" }],
        name: "ogEligible",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "ogPrice",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "ownerOf",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "prebuysPerAddress",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_num", type: "uint256" }],
        name: "presale",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "presalePaused",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "price",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "bytes", name: "_data", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "salePaused",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "_to", type: "address" },
          { internalType: "uint256", name: "_num", type: "uint256" },
        ],
        name: "seedPromo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_num", type: "uint256" }],
        name: "seedPromoToOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
          { internalType: "bool", name: "approved", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "val", type: "uint256" }],
        name: "setMaxMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "val", type: "uint256" }],
        name: "setMaxPrebuysPerAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "val", type: "uint256" }],
        name: "setMaxPresale",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "bool", name: "val", type: "bool" }],
        name: "setPresalePauseStatus",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "bool", name: "val", type: "bool" }],
        name: "setSalePauseStatus",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "string", name: "baseURI", type: "string" }],
        name: "setURI",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes4",
            name: "interfaceId",
            type: "bytes4",
          },
        ],
        name: "supportsInterface",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
        name: "tokenByIndex",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "index", type: "uint256" },
        ],
        name: "tokenOfOwnerByIndex",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "tokenURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "_to", type: "address" }],
        name: "whitelistEligible",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "withdrawAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    if (testMode === true) {
      this.testMode = true;
      this.testAddress = testAddress;
      console.log("Test mode enabled.");
    } else {
      this.testMode = false;
      this.testAddress = "";
      console.log("Production mode enabled.");
    }
    if (typeof nftsLimit === "number") {
      this.nftsLimit = nftsLimit;
    } else {
      this.nftsLimit = 0;
    }
  }

  async getCurrentProvider() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
  }

  async getCurrentAddress(provider) {
    let accounts = await provider.listAccounts();
    return accounts[0];
  }

  async getNumberOfOwnedNfts(contractAddress, abi, provider, address) {
    let erc721 = new ethers.Contract(contractAddress, abi, provider);
    let ownedNfts = await erc721.balanceOf(address);
    let ownedNftsDecimal = parseInt(ownedNfts._hex, 16);
    if (ownedNftsDecimal <= 0) {
      console.log("You don't own any NFTs!");
      return ownedNftsDecimal;
    } else {
      console.log(`You own ${ownedNftsDecimal} NFT(s)!`);
      return ownedNftsDecimal;
    }
  }

  async getOwnedNftsMetadata(contractAddress, address) {
    let time = Date.now();
    let nftsMetadata;
    let currentLimit;
    if (typeof this.nftsLimit === "number" && this.nftsLimit !== 0) {
      currentLimit = `&limit=${this.nftsLimit}`;
      console.log(`Limit set. Loading maximum ${this.nftsLimit} NFTs!`);
    } else {
      currentLimit = "";
      console.log("No limit set. Loading all owned NFTs.");
    }

    nftsMetadata = await axios.get(
      `https://deep-index.moralis.io/api/v2/${address}/nft/${contractAddress}?chain=eth&format=decimal${currentLimit}`,
      {
        headers: {
          accept: "application/json",
          "X-API-Key":
            "r0ny2M2egV7CYrEyb5ib8xr8oqD05MLguWlu6Vy5SQ0ODlhbeVxY31dWjeFaBrRj",
        },
      }
    );

    console.log(`Fetched NFTs metadata in ${Date.now() - time} ms.`);
    console.log(`Found ${nftsMetadata.data.result.length} NFTs.`);
    return nftsMetadata.data.result;
  }

  parseMetadata(nftsMetadata, numberOfOwnedNfts, onNftLoaded) {
    let parsedNfts = [];
    for (let i = 0; i < numberOfOwnedNfts; i++) {
      let currentToken = nftsMetadata[i];
      let currentTokenId = parseInt(currentToken.token_id);
      console.log(
        `Loading token ${
          i + 1
        } of ${numberOfOwnedNfts} with the id ${currentTokenId}`
      );
      let currentTokenMetadata = JSON.parse(currentToken.metadata);
      parsedNfts.push(currentTokenMetadata);
      if (typeof onNftLoaded === "function") {
        onNftLoaded(currentTokenMetadata);
      }
    }
    return parsedNfts;
  }

  async showNftsWindow(onUserSelect, onNftLoaded) {
    if (typeof window.ethereum !== "undefined") {
      ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      ethereum.on("disconnect", () => {
        window.location.reload();
      });

      let currentProvider = await this.getCurrentProvider();

      let currentAddress;
      if (this.testMode === true) {
        currentAddress = this.testAddress;
      } else {
        currentAddress = await this.getCurrentAddress(currentProvider);
      }

      let nftsMetadata = await this.getOwnedNftsMetadata(
        this.contractAddress,
        currentAddress
      );
      let numberOfOwnedNfts = nftsMetadata.length;
      let parsedNftsMetadata = this.parseMetadata(
        nftsMetadata,
        numberOfOwnedNfts,
        onNftLoaded
      );

      let modal = document.createElement("div");
      document.body.appendChild(modal);
      modal.id = "modal";
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.style.flexWrap = "wrap";
      modal.style.position = "fixed";
      modal.style.zIndex = "999";
      modal.style.left = "0";
      modal.style.top = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0,0,0,0.25)";

      let content = document.createElement("div");
      modal.appendChild(content);
      content.id = "content";
      content.style.display = "flex";
      content.style.alignItems = "center";
      content.style.justifyContent = "center";
      content.style.flexWrap = "wrap";
      content.style.width = "90%";
      content.style.height = "90%";
      content.style.overflow = "auto";
      content.style.backgroundColor = "#FFFFFF";
      content.style.boxShadow = "0 0 0.125rem 0.125rem rgba(128,128,128,0.5)";
      content.style.borderRadius = "0.5rem";
      content.style.backgroundColor = "rgba(255,255,255,0.75)";

      for (let i = 0; i < parsedNftsMetadata.length; i++) {
        let card = document.createElement("div");
        content.appendChild(card);
        card.id = "card-content" + i;
        card.style.display = "flex";
        card.style.justifyContent = "center";
        card.style.alignItems = "center";
        card.style.flexDirection = "column";
        card.style.width = "200px";
        card.style.height = "250px";
        card.style.borderRadius = "0.5rem";
        card.style.transition = "0.25s";
        card.style.cursor = "pointer";
        card.style.boxShadow = "0 0 0.125rem 0.125rem rgba(128,128,128,0.5)";
        card.style.margin = "1rem";

        card.addEventListener("pointerdown", () => {
          modal.style.display = "none";
          console.log(`User selected ${parsedNftsMetadata[i].name}`);
          onUserSelect(parsedNftsMetadata[i]);
        });

        card.addEventListener("pointerover", () => {
          card.style.boxShadow = "0 0 1rem 0.5rem rgba(255,215,0,0.5)";

          titleCenter.style.borderColor = "#FFD700";
          image.style.borderColor = "#FFD700";
          selectCenter.style.borderColor = "#FFD700";

          titleCenter.style.backgroundColor = "#FFD700";
          title.style.color = "#CD853F";
          selectCenter.style.backgroundColor = "#FFD700";

          select.textContent = "SELECT";
        });

        card.addEventListener("pointerout", () => {
          card.style.boxShadow = "0 0 0.125rem 0.125rem rgba(128,128,128,0.5)";

          titleCenter.style.borderColor = "#DCDCDC";
          image.style.borderColor = "#DCDCDC";
          selectCenter.style.borderColor = "#DCDCDC";

          titleCenter.style.backgroundColor = "#F5F5F5";
          title.style.color = "#808080";
          selectCenter.style.backgroundColor = "#F5F5F5";

          select.textContent = "";
        });

        let titleCenter = document.createElement("div");
        card.appendChild(titleCenter);
        titleCenter.id = "title-center" + i;
        titleCenter.style.display = "flex";
        titleCenter.style.justifyContent = "center";
        titleCenter.style.alignItems = "center";
        titleCenter.style.width = "100%";
        titleCenter.style.height = "15%";
        titleCenter.style.borderColor = "#DCDCDC";
        titleCenter.style.borderWidth = "0.1rem";
        titleCenter.style.borderStyle = "solid";
        titleCenter.style.borderRadius = "0.5rem 0.5rem 0 0";
        titleCenter.style.backgroundColor = "#F5F5F5";

        let title = document.createElement("div");
        titleCenter.appendChild(title);
        title.id = "title" + i;
        title.textContent = parsedNftsMetadata[i].name;
        title.style.fontSize = "1rem";
        title.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
        title.style.color = "#808080";

        let image = document.createElement("div");
        card.appendChild(image);
        image.id = "image" + i;
        image.style.width = "100%";
        image.style.height = "80%";
        image.style.backgroundColor = "#F5F5F5";
        image.style.backgroundImage = `url(${parsedNftsMetadata[i].image})`;
        image.style.backgroundSize = "cover";
        image.style.backgroundRepeat = "no-repeat";
        image.style.backgroundPosition = "center";
        image.style.borderColor = "#DCDCDC";
        image.style.borderWidth = "0 0.1rem 0 0.1rem";
        image.style.borderStyle = "solid";

        let selectCenter = document.createElement("div");
        card.appendChild(selectCenter);
        selectCenter.id = "select-center" + i;
        selectCenter.style.display = "flex";
        selectCenter.style.justifyContent = "center";
        selectCenter.style.alignItems = "center";
        selectCenter.style.width = "100%";
        selectCenter.style.height = "20%";
        selectCenter.style.borderColor = "#DCDCDC";
        selectCenter.style.borderWidth = "0.1rem";
        selectCenter.style.borderStyle = "solid";
        selectCenter.style.borderRadius = "0 0 0.5rem 0.5rem";
        selectCenter.style.backgroundColor = "#F5F5F5";
        selectCenter.style.userSelect = "none";

        let select = document.createElement("div");
        selectCenter.appendChild(select);
        select.id = "select" + i;
        select.style.color = "#CD853F";
        select.style.fontWeight = "bold";
        select.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
        select.style.fontSize = "1rem";
      }
    } else {
      alert("Please install MetaMask!");
    }
  }

  async startGameSession(playerAddress, tokenId) {
    const gameId = this.gameId
    const contractAddress = this.contractAddress

    let res = null
    try {
      res = await axios.post(`${this.apiUrl}/game/start`, {
        gameId,
        playerAddress,
        contractAddress,
        tokenId,
      })
    } catch (err) {
      console.error(err);
    }
    return res && res.data && res.data.data.id;
  }

  async testPostScore(sessionId, score) {
    if (!this.testMode) {
      console.error("Client side score posting is allowed only in test mode.")
      return;
    }
    try {
      await axios.post(`${this.apiUrl}/game/score`, {
        sessionId,
        score,
      });
    } catch(err) {
      console.error(err);
    }
  }

  async fetchLeaderboard(selectBy, queryValues, rankBy) {
    let ret = null
    try {
      const res = await axios.get(`${this.apiUrl}/game/leaderboard`, {
        params: {
          selectBy,
          queryValues,
          rankBy,
        }
      })
      ret = res.data.data;
    } catch(err) {
      console.error(err);
    }
    return ret;
  }
}

export default Arcadians;
