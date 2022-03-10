import axios from "axios";

class Arcadians {
  constructor(settings) {
    this.nftsWindowOpen = false;
    this.nftsWindowElements = [];
    this.leaderboardWindowOpen = false;
    this.leaderboardWindowElements = [];
    if (settings.testMode === true) {
      this.testMode = true;
      this.testAddress = settings.testAddress;
      console.log("Test mode enabled.");
    } else {
      this.testMode = false;
      this.testAddress = "";
      console.log("Production mode enabled.");
    }
    if (typeof settings.nftsLimit === "number") {
      this.nftsLimit = settings.nftsLimit;
    } else {
      this.nftsLimit = 0;
    }
    if (typeof settings.gameId === "string") {
      this.gameId = settings.gameId;
    } else {
      this.gameId = "default";
    }
    if (typeof settings.apiUrl === "string") {
      this.apiUrl = settings.apiUrl;
    } else {
      this.apiUrl = "default";
    }
    if (typeof settings.loginMessage === "string") {
      this.loginMessage = settings.loginMessage;
    } else {
      this.loginMessage = "Arcadians SDK Login.";
    }
  }

  async getCurrentAddress() {
    let currentAddress;
    if (this.testMode === true) {
      currentAddress = this.testAddress;
    } else {
      let provider = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      currentAddress = provider[0];
    }
    return currentAddress;
  }

  async getOwnedNftsMetadata(address) {
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
      `https://deep-index.moralis.io/api/v2/${address}/nft?chain=eth&format=decimal${currentLimit}`,
      {
        headers: {
          accept: "application/json",
          "X-API-Key":
            "mFyMfiJ0MpAMDzMNtaCwAI63ov21RvSO8vkPd1aPjyW13ktq7DmGy5XpEH4tqpGY",
        },
      }
    );

    console.log(`Fetched NFTs metadata in ${Date.now() - time} ms.`);
    console.log(`Found ${nftsMetadata.data.result.length} NFTs.`);
    return nftsMetadata.data.result;
  }

  parseMetadata(nftsMetadata, numberOfOwnedNfts, onNftLoaded, currentAddress) {
    let parsedNfts = [];
    for (let i = 0; i < numberOfOwnedNfts; i++) {
      let currentToken = nftsMetadata[i];
      let currentTokenId = parseInt(currentToken.token_id);
      console.log(
        `Loading token ${
          i + 1
        } of ${numberOfOwnedNfts} with the id ${currentTokenId}`
      );

      if (currentToken.metadata !== null) {
        let currentTokenMetadata = JSON.parse(currentToken.metadata);
        if (currentTokenMetadata.image !== undefined) {
          currentTokenMetadata.contractAddress = currentToken.token_address;
          currentTokenMetadata.tokenId = currentToken.token_id;
          currentTokenMetadata.currentAddress = currentAddress;
          parsedNfts.push(currentTokenMetadata);
          if (typeof onNftLoaded === "function") {
            onNftLoaded(currentTokenMetadata);
          }
        }
      }
    }
    return parsedNfts;
  }

  createNftsWindow(parsedNftsMetadata, onUserSelect) {
    let modal = document.createElement("div");
    this.nftsWindowElements.push(modal);
    document.body.appendChild(modal);
    modal.id = "modal-nfts";
    modal.style.position = "fixed";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.flexWrap = "wrap";
    modal.style.zIndex = "999";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0,0,0,0.25)";

    let content = document.createElement("div");
    this.nftsWindowElements.push(content);
    modal.appendChild(content);
    content.id = "content-nfts";
    content.style.position = "fixed";
    content.style.display = "flex";
    content.style.alignItems = "center";
    content.style.justifyContent = "center";
    content.style.flexWrap = "wrap";
    content.style.width = "90%";
    content.style.height = "90%";
    content.style.overflow = "auto";
    content.style.backgroundColor = "rgba(255,255,255,0.75)";
    content.style.boxShadow = "0 0 0.125rem 0.125rem rgba(128,128,128,0.5)";
    content.style.borderRadius = "0.5rem";

    let closeCenter = document.createElement("div");
    this.nftsWindowElements.push(closeCenter);
    modal.appendChild(closeCenter);
    closeCenter.id = "close-center-nfts";
    closeCenter.style.position = "absolute";
    closeCenter.style.display = "flex";
    closeCenter.style.alignItems = "center";
    closeCenter.style.justifyContent = "center";
    closeCenter.style.left = "5%";
    closeCenter.style.top = "5%";
    closeCenter.style.transform = "translate(-50%, -50%)";
    closeCenter.style.width = "4rem";
    closeCenter.style.height = "4rem";

    let close = document.createElement("div");
    this.nftsWindowElements.push(close);
    closeCenter.appendChild(close);
    close.id = "close-nfts";

    close.style.width = "2rem";
    close.style.height = "2rem";
    close.style.backgroundColor = "#D21404";
    close.style.boxShadow = "0 0 0.125rem 0.125rem rgba(128,128,128,0.5)";
    close.style.borderRadius = "0.5rem";
    close.style.color = "#900D09";
    close.textContent = "\u00D7";
    close.style.fontSize = "1.75rem";
    close.style.fontWeight = "bold";
    close.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
    close.style.textAlign = "center";
    close.style.cursor = "pointer";
    close.style.userSelect = "none";
    close.style.transition = "0.25s";

    close.addEventListener("pointerdown", () => {
      console.log(`User closed window.`);
      if (typeof onUserSelect === "function") {
        onUserSelect(false);
      }
      this.deleteNftsWindow();
    });

    close.addEventListener("pointerover", () => {
      close.style.boxShadow = "0 0 0.25rem 0.25rem rgba(210,20,4,0.5)";
    });

    close.addEventListener("pointerout", () => {
      close.style.boxShadow = "0 0 0.125rem 0.125rem rgba(128,128,128,0.5)";
    });

    if (Array.isArray(parsedNftsMetadata) === true) {
      for (let i = 0; i < parsedNftsMetadata.length; i++) {
        let card = document.createElement("div");
        this.nftsWindowElements.push(card);
        content.appendChild(card);
        card.id = "card-content-nfts-" + i;
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
          console.log(`User selected ${parsedNftsMetadata[i].name}.`);
          if (typeof onUserSelect === "function") {
            onUserSelect(parsedNftsMetadata[i]);
          }
          this.deleteNftsWindow();
        });

        card.addEventListener("pointerover", () => {
          card.style.boxShadow = "0 0 1rem 0.5rem rgba(255,215,0,0.5)";

          titleCenter.style.borderColor = "#FFD700";
          image.style.borderColor = "#FFD700";
          if (video.src.endsWith("mp4") === true) {
            video
              .play()
              .then()
              .catch(() => {});
          }
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
          if (video.src.endsWith("mp4") === true) {
            video.pause();
            video.currentTime = 0;
          }
          selectCenter.style.borderColor = "#DCDCDC";

          titleCenter.style.backgroundColor = "#F5F5F5";
          title.style.color = "#808080";
          selectCenter.style.backgroundColor = "#F5F5F5";

          select.textContent = "";
        });

        let titleCenter = document.createElement("div");
        this.nftsWindowElements.push(titleCenter);
        card.appendChild(titleCenter);
        titleCenter.id = "title-center-nfts-" + i;
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
        this.nftsWindowElements.push(title);
        titleCenter.appendChild(title);
        title.id = "title-nfts-" + i;
        title.textContent = parsedNftsMetadata[i].name;
        title.style.fontSize = "1rem";
        title.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
        title.style.color = "#808080";

        let image = document.createElement("div");
        this.nftsWindowElements.push(image);
        card.appendChild(image);
        image.id = "image-nfts-" + i;
        image.style.display = "flex";
        image.style.justifyContent = "center";
        image.style.alignItems = "center";
        image.style.overflow = "hidden";
        image.style.width = "100%";
        image.style.height = "80%";
        image.style.backgroundColor = "#F5F5F5";
        image.style.backgroundSize = "cover";
        image.style.backgroundRepeat = "no-repeat";
        image.style.backgroundPosition = "center";
        image.style.borderColor = "#DCDCDC";
        image.style.borderWidth = "0 0.1rem 0 0.1rem";
        image.style.borderStyle = "solid";

        let video = document.createElement("video");
        this.nftsWindowElements.push(video);
        image.appendChild(video);
        video.style.display = "none";
        video.id = "video-nfts-" + i;
        video.style.width = "200px";
        video.style.height = "200px";
        video.muted = true;
        video.loop = true;

        let imageData = parsedNftsMetadata[i].image.replace(
          "ipfs://ipfs/",
          "https://ipfs.moralis.io:2053/ipfs/"
        );
        if (imageData.endsWith("mp4") !== true) {
          image.style.backgroundImage = `url(${imageData})`;
        } else {
          video.style.display = "block";
          video.src = imageData;
        }

        let selectCenter = document.createElement("div");
        this.nftsWindowElements.push(selectCenter);
        card.appendChild(selectCenter);
        selectCenter.id = "select-center-nfts-" + i;
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
        this.nftsWindowElements.push(select);
        selectCenter.appendChild(select);
        select.id = "select-nfts-" + i;
        select.style.color = "#CD853F";
        select.style.fontWeight = "bold";
        select.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
        select.style.fontSize = "1rem";
      }
    }
    if (typeof parsedNftsMetadata === "string") {
      let card = document.createElement("div");
      this.nftsWindowElements.push(card);
      content.appendChild(card);
      card.id = "card-content-nfts";
      card.style.display = "flex";
      card.style.justifyContent = "center";
      card.style.alignItems = "center";
      card.style.width = "80%";
      card.style.height = "80%";
      card.style.borderRadius = "0.5rem";
      card.style.backgroundColor = "#DCDCDC";
      card.style.boxShadow = "0 0 0.125rem 0.125rem rgba(128,128,128,0.5)";
      card.style.margin = "1rem";
      card.style.fontSize = "2rem";
      card.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
      card.style.color = "#808080";
      card.style.textAlign = "center";
      card.textContent = parsedNftsMetadata;
    }
  }

  deleteNftsWindow() {
    for (let i = 0; i < this.nftsWindowElements.length; i++) {
      this.nftsWindowElements[i].parentElement.removeChild(
        this.nftsWindowElements[i]
      );
    }
    this.nftsWindowElements.length = 0;
    this.nftsWindowOpen = false;
  }

  async showLeaderboardWindow() {
    if (this.leaderboardWindowOpen === false) {
      this.leaderboardWindowOpen = true;
      let leaderboardData = await this.fetchLeaderboard();
      this.createLeaderboardWindow(leaderboardData);
    } else {
      console.log("Already showed leadeboard window!");
    }
  }

  createLeaderboardWindow(leaderboardData) {
    let modal = document.createElement("div");
    this.leaderboardWindowElements.push(modal);
    document.body.appendChild(modal);
    modal.id = "modal-leaderboard";
    modal.style.position = "fixed";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.flexWrap = "wrap";
    modal.style.zIndex = "999";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0,0,0,0.25)";

    let content = document.createElement("div");
    this.leaderboardWindowElements.push(content);
    modal.appendChild(content);
    content.id = "content-leaderboard";
    content.style.position = "fixed";
    content.style.display = "flex";
    content.style.alignItems = "center";
    content.style.flexDirection = "column";
    content.style.width = "90%";
    content.style.height = "90%";
    content.style.overflow = "auto";
    content.style.backgroundColor = "rgba(255,255,255,0.75)";
    content.style.boxShadow = "0 0 0.125rem 0.125rem rgba(128,128,128,0.5)";
    content.style.borderRadius = "0.5rem";

    let closeCenter = document.createElement("div");
    this.leaderboardWindowElements.push(closeCenter);
    modal.appendChild(closeCenter);
    closeCenter.id = "close-center-leaderboard";
    closeCenter.style.position = "absolute";
    closeCenter.style.display = "flex";
    closeCenter.style.alignItems = "center";
    closeCenter.style.justifyContent = "center";
    closeCenter.style.left = "5%";
    closeCenter.style.top = "5%";
    closeCenter.style.transform = "translate(-50%, -50%)";
    closeCenter.style.width = "4rem";
    closeCenter.style.height = "4rem";

    let close = document.createElement("div");
    this.leaderboardWindowElements.push(close);
    closeCenter.appendChild(close);
    close.id = "close-leaderboard";

    close.style.width = "2rem";
    close.style.height = "2rem";
    close.style.backgroundColor = "#D21404";
    close.style.boxShadow = "0 0 0.125rem 0.125rem rgba(128,128,128,0.5)";
    close.style.borderRadius = "0.5rem";
    close.style.color = "#900D09";
    close.textContent = "\u00D7";
    close.style.fontSize = "1.75rem";
    close.style.fontWeight = "bold";
    close.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
    close.style.textAlign = "center";
    close.style.cursor = "pointer";
    close.style.userSelect = "none";
    close.style.transition = "0.25s";

    close.addEventListener("pointerdown", () => {
      this.deleteLeaderboardWindow();
    });

    close.addEventListener("pointerover", () => {
      close.style.boxShadow = "0 0 0.25rem 0.25rem rgba(210,20,4,0.5)";
    });

    close.addEventListener("pointerout", () => {
      close.style.boxShadow = "0 0 0.125rem 0.125rem rgba(128,128,128,0.5)";
    });

    if (Array.isArray(leaderboardData) === true) {
      for (let i = 0; i < leaderboardData.length; i++) {
        let cardContainer = document.createElement("div");
        this.leaderboardWindowElements.push(cardContainer);
        content.appendChild(cardContainer);
        cardContainer.id = "card-container-content-leaderboard-" + i;
        cardContainer.style.display = "flex";
        cardContainer.style.justifyContent = "center";
        cardContainer.style.alignItems = "center";
        cardContainer.style.borderRadius = "0.5rem";
        cardContainer.style.boxShadow =
          "0 0 0.125rem 0.125rem rgba(128,128,128,0.5)";
        cardContainer.style.margin = "1rem";
        cardContainer.style.backgroundColor = "#F5F5F5";

        let cardLeft = document.createElement("div");
        this.leaderboardWindowElements.push(cardLeft);
        cardContainer.appendChild(cardLeft);
        cardLeft.id = "card-left-content-leaderboard-" + i;
        cardLeft.style.display = "flex";
        cardLeft.style.justifyContent = "center";
        cardLeft.style.alignItems = "center";
        cardLeft.style.flexDirection = "column";
        cardLeft.style.padding = "1rem";

        let playerLeftCenter = document.createElement("div");
        this.leaderboardWindowElements.push(playerLeftCenter);
        cardLeft.appendChild(playerLeftCenter);
        playerLeftCenter.id = "player-left-center-leaderboard-" + i;
        playerLeftCenter.style.display = "flex";
        playerLeftCenter.style.justifyContent = "flex-start";
        playerLeftCenter.style.alignItems = "center";
        playerLeftCenter.style.width = "100%";
        playerLeftCenter.style.height = "25%";

        let playerLeft = document.createElement("div");
        this.leaderboardWindowElements.push(playerLeft);
        playerLeftCenter.appendChild(playerLeft);
        playerLeft.id = "player-left-leaderboard-" + i;
        playerLeft.textContent = "PLAYER ADDRESS:";
        playerLeft.style.fontSize = "1rem";
        playerLeft.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
        playerLeft.style.color = "#808080";

        let contractAddressLeftCenter = document.createElement("div");
        this.leaderboardWindowElements.push(contractAddressLeftCenter);
        cardLeft.appendChild(contractAddressLeftCenter);
        contractAddressLeftCenter.id =
          "contract-addres-left-center-leaderboard-" + i;
        contractAddressLeftCenter.style.display = "flex";
        contractAddressLeftCenter.style.justifyContent = "flex-start";
        contractAddressLeftCenter.style.alignItems = "center";
        contractAddressLeftCenter.style.width = "100%";
        contractAddressLeftCenter.style.height = "25%";

        let contractAddressLeft = document.createElement("div");
        this.leaderboardWindowElements.push(contractAddressLeft);
        contractAddressLeftCenter.appendChild(contractAddressLeft);
        contractAddressLeft.id = "contract-address-left-leaderboard-" + i;
        contractAddressLeft.textContent = "CONTRACT ADDRESS:";
        contractAddressLeft.style.fontSize = "1rem";
        contractAddressLeft.style.fontFamily =
          "'Roboto', Arial, Helvetica, sans-serif";
        contractAddressLeft.style.color = "#808080";

        let tokenIdLeftCenter = document.createElement("div");
        this.leaderboardWindowElements.push(tokenIdLeftCenter);
        cardLeft.appendChild(tokenIdLeftCenter);
        tokenIdLeftCenter.id = "token-id-left-center-leaderboard-" + i;
        tokenIdLeftCenter.style.display = "flex";
        tokenIdLeftCenter.style.justifyContent = "flex-start";
        tokenIdLeftCenter.style.alignItems = "center";
        tokenIdLeftCenter.style.width = "100%";
        tokenIdLeftCenter.style.height = "25%";

        let tokenIdLeft = document.createElement("div");
        this.leaderboardWindowElements.push(tokenIdLeft);
        tokenIdLeftCenter.appendChild(tokenIdLeft);
        tokenIdLeft.id = "token-id-left-leaderboard-" + i;
        tokenIdLeft.textContent = "TOKEN ID:";
        tokenIdLeft.style.fontSize = "1rem";
        tokenIdLeft.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
        tokenIdLeft.style.color = "#808080";

        let scoreLeftCenter = document.createElement("div");
        this.leaderboardWindowElements.push(scoreLeftCenter);
        cardLeft.appendChild(scoreLeftCenter);
        scoreLeftCenter.id = "score-left-center-leaderboard-" + i;
        scoreLeftCenter.style.display = "flex";
        scoreLeftCenter.style.justifyContent = "flex-start";
        scoreLeftCenter.style.alignItems = "center";
        scoreLeftCenter.style.width = "100%";
        scoreLeftCenter.style.height = "25%";

        let scoreLeft = document.createElement("div");
        this.leaderboardWindowElements.push(scoreLeft);
        scoreLeftCenter.appendChild(scoreLeft);
        scoreLeft.id = "score-left-leaderboard-" + i;
        scoreLeft.textContent = "SCORE:";
        scoreLeft.style.fontSize = "1rem";
        scoreLeft.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
        scoreLeft.style.color = "#808080";

        let cardRight = document.createElement("div");
        this.leaderboardWindowElements.push(cardRight);
        cardContainer.appendChild(cardRight);
        cardRight.id = "card-right-content-leaderboard-" + i;
        cardRight.style.display = "flex";
        cardRight.style.justifyContent = "center";
        cardRight.style.alignItems = "center";
        cardRight.style.flexDirection = "column";
        cardRight.style.padding = "1rem";

        let playerRightCenter = document.createElement("div");
        this.leaderboardWindowElements.push(playerRightCenter);
        cardRight.appendChild(playerRightCenter);
        playerRightCenter.id = "player-right-center-leaderboard-" + i;
        playerRightCenter.style.display = "flex";
        playerRightCenter.style.justifyContent = "flex-start";
        playerRightCenter.style.alignItems = "center";
        playerRightCenter.style.width = "100%";
        playerRightCenter.style.height = "25%";

        let playerRight = document.createElement("div");
        this.leaderboardWindowElements.push(playerRight);
        playerRightCenter.appendChild(playerRight);
        playerRight.id = "player-right-leaderboard-" + i;
        playerRight.textContent = leaderboardData[i].player_address;
        playerRight.style.fontSize = "1rem";
        playerRight.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
        playerRight.style.color = "#808080";

        let ccontractAddressRightCenter = document.createElement("div");
        this.leaderboardWindowElements.push(ccontractAddressRightCenter);
        cardRight.appendChild(ccontractAddressRightCenter);
        ccontractAddressRightCenter.id =
          "contract-address-right-center-leaderboard-" + i;
        ccontractAddressRightCenter.style.display = "flex";
        ccontractAddressRightCenter.style.justifyContent = "flex-start";
        ccontractAddressRightCenter.style.alignItems = "center";
        ccontractAddressRightCenter.style.width = "100%";
        ccontractAddressRightCenter.style.height = "25%";

        let contractAddressRight = document.createElement("div");
        this.leaderboardWindowElements.push(contractAddressRight);
        ccontractAddressRightCenter.appendChild(contractAddressRight);
        contractAddressRight.id = "contract-address-right-leaderboard-" + i;
        contractAddressRight.textContent = leaderboardData[i].contract_address;
        contractAddressRight.style.fontSize = "1rem";
        contractAddressRight.style.fontFamily =
          "'Roboto', Arial, Helvetica, sans-serif";
        contractAddressRight.style.color = "#808080";

        let tokenIdRightCenter = document.createElement("div");
        this.leaderboardWindowElements.push(tokenIdRightCenter);
        cardRight.appendChild(tokenIdRightCenter);
        tokenIdRightCenter.id = "token-id-right-center-leaderboard-" + i;
        tokenIdRightCenter.style.display = "flex";
        tokenIdRightCenter.style.justifyContent = "flex-start";
        tokenIdRightCenter.style.alignItems = "center";
        tokenIdRightCenter.style.width = "100%";
        tokenIdRightCenter.style.height = "25%";

        let tokenIdRight = document.createElement("div");
        this.leaderboardWindowElements.push(tokenIdRight);
        tokenIdRightCenter.appendChild(tokenIdRight);
        tokenIdRight.id = "token-id-right-leaderboard-" + i;
        tokenIdRight.textContent = leaderboardData[i].token_id;
        tokenIdRight.style.fontSize = "1rem";
        tokenIdRight.style.fontFamily =
          "'Roboto', Arial, Helvetica, sans-serif";
        tokenIdRight.style.color = "#808080";

        let scoreRightCenter = document.createElement("div");
        this.leaderboardWindowElements.push(scoreRightCenter);
        cardRight.appendChild(scoreRightCenter);
        scoreRightCenter.id = "score-right-center-leaderboard-" + i;
        scoreRightCenter.style.display = "flex";
        scoreRightCenter.style.justifyContent = "flex-start";
        scoreRightCenter.style.alignItems = "center";
        scoreRightCenter.style.width = "100%";
        scoreRightCenter.style.height = "25%";

        let scoreRight = document.createElement("div");
        this.leaderboardWindowElements.push(scoreRight);
        scoreRightCenter.appendChild(scoreRight);
        scoreRight.id = "score-right-leaderboard-" + i;
        scoreRight.textContent = leaderboardData[i].score;
        scoreRight.style.fontSize = "1rem";
        scoreRight.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
        scoreRight.style.color = "#808080";
      }
    }
  }

  deleteLeaderboardWindow() {
    for (let i = 0; i < this.leaderboardWindowElements.length; i++) {
      this.leaderboardWindowElements[i].parentElement.removeChild(
        this.leaderboardWindowElements[i]
      );
    }
    this.leaderboardWindowElements.length = 0;
    this.leaderboardWindowOpen = false;
  }

  async signMessage(address, message) {
    let signed = await window.ethereum.request({
      method: "personal_sign",
      params: [address, message],
    });
    this.saveLocalSignature(address, signed);
    return signed;
  }

  async showNftsWindow(onUserSelect, onNftLoaded) {
    if (typeof window.ethereum !== "undefined") {
      if (this.nftsWindowOpen === false) {
        this.nftsWindowOpen = true;

        ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        ethereum.on("disconnect", () => {
          window.location.reload();
        });

        let currentAddress = await this.getCurrentAddress();
        let nftsMetadata = await this.getOwnedNftsMetadata(currentAddress);
        let numberOfOwnedNfts = nftsMetadata.length;
        let parsedNftsMetadata = this.parseMetadata(
          nftsMetadata,
          numberOfOwnedNfts,
          onNftLoaded,
          currentAddress
        );
        if (parsedNftsMetadata.length > 0) {
          this.createNftsWindow(parsedNftsMetadata, onUserSelect);
        } else {
          this.createNftsWindow("You don't own any NFTs.", onUserSelect);
        }
      } else {
        console.log("Already showed NFTs window!");
      }
    } else {
      this.createNftsWindow("Please install MetaMask!", onUserSelect);
    }
  }

  async getUserNfts(onNftLoaded) {
    if (typeof window.ethereum !== "undefined") {
      ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      ethereum.on("disconnect", () => {
        window.location.reload();
      });

      let currentAddress = await this.getCurrentAddress();
      let nftsMetadata = await this.getOwnedNftsMetadata(currentAddress);
      let numberOfOwnedNfts = nftsMetadata.length;
      let parsedNftsMetadata = this.parseMetadata(
        nftsMetadata,
        numberOfOwnedNfts,
        onNftLoaded,
        currentAddress
      );
      if (parsedNftsMetadata.length > 0) {
        return parsedNftsMetadata;
      } else {
        console.log("You don't own any NFTs.");
        return ["You don't own any NFTs."];
      }
    } else {
      console.log("Please install MetaMask!");
      return ["Please install MetaMask!"];
    }
  }

  getLocalSignature(address) {
    if (localStorage.arcadiansSdk === undefined) {
      return null;
    }
    const stored = JSON.parse(localStorage.arcadiansSdk);
    return stored.signed[address];
  }

  saveLocalSignature(address, signed) {
    let stored = { signed: {} };
    if (localStorage.arcadiansSdk !== undefined) {
      stored = JSON.parse(localStorage.arcadiansSdk);
    }
    stored.signed[address] = signed;
    localStorage.arcadiansSdk = JSON.stringify(stored);
  }

  async startGameSession(playerAddress, tokenId, contractAddress) {
    let signed = this.getLocalSignature(playerAddress);
    if (!signed) {
      signed = await this.signMessage(playerAddress, this.loginMessage);
    }

    const gameId = this.gameId;

    let response = await axios.post(`${this.apiUrl}/game/start`, {
      gameId,
      playerAddress,
      contractAddress,
      tokenId,
      msg: this.loginMessage,
      signed,
    });
    return response && response.data && response.data.data.id;
  }

  async fetchLeaderboard() {
    const gameId = this.gameId;
    const response = await axios.get(`${this.apiUrl}/game/leaderboard`, {
      params: {
        selectBy: "game_id",
        queryValues: gameId,
        rankBy: "token_id",
      },
    });
    let returnData = response.data.data;
    return returnData;
  }
}

export default Arcadians;
