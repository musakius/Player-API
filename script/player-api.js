const _apiBase =
  "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q=";
const inputText = document.querySelector("#input-search");
const butSearch = document.getElementById("but-search");
const list = document.getElementById("list");
let id;

const addZero = (num) => {
  num++;
  if (num <= 9) num = "0" + num;
  return num;
};

const get = async () => {
  butSearch.addEventListener("click", loadData);
  inputText.addEventListener("keypress", (e) => {
    if (e.which === 13) loadData();
    DZ.player.pause();
  });

  function loadData() {
    list.innerHTML = `<li class="text-center">
                            <div class="spinner-border" role="status">
                              <span class="sr-only">Loading...</span>
                            </div>
                        </li>
    `;
    fetch(_apiBase + inputText.value)
      .then((data) => data.json().then(render))
      .catch((error) => console.log(error));
  }

  function render(allMusiks) {
    list.innerHTML = "";
    for (let i = 0; i < allMusiks.data.length - 1; i++) {
      let tr = document.createElement("li");
      tr.className = allMusiks.data[i].id;
      tr.innerHTML =
        '<span class="number">' +
        addZero(i) +
        "</span>" +
        '<span class="track">' +
        allMusiks.data[i].title +
        "</span>" +
        '<span class="artist"> - ' +
        allMusiks.data[i].artist.name +
        "</span>" +
        '<span class="time-music-api">' +
        duration(allMusiks.data[i].duration) +
        "</span>";
      list.append(tr);
      tr.style.background = "rgbrgb(35, 34, 41)";
      let url = allMusiks.data[i].artist.picture_xl;
      document.querySelector(".photo").style.backgroundImage =
        "url(" + url + ")";
      tr.addEventListener("click", function () {
        DZ.player.playTracks([tr.className]);
      });
    }
    DZ.player.playTracks([id]);
    return id;
  }
};

DZ.init({
  appId: "394844",
  channelUrl: "index.html",
  player: {
    container: "player",
    cover: true,
    playlist: true,
    width: 800,
    height: 91,
    onload: get
  }
});
