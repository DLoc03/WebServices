document
  .getElementById("rss-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const rssUrl = document.getElementById("rss-url").value;
    fetchRSS(rssUrl);
  });

function fetchRSS(url) {
  const proxyUrl =
    "https://api.allorigins.win/get?url=" + encodeURIComponent(url);

  fetch(proxyUrl)
    .then((response) => response.json())
    .then((data) => {
      const parser = new DOMParser();
      const rssData = parser.parseFromString(data.contents, "application/xml");

      const items = rssData.querySelectorAll("item");
      const newsContainer = document.getElementById("news-container");
      newsContainer.innerHTML = "";

      items.forEach((item, index) => {
        if (index >= 5) return;
        const title = item.querySelector("title").textContent;
        const link = item.querySelector("link").textContent;
        const description = item.querySelector("description").textContent;

        const shortDescription =
          description.split(" ").slice(0, 20).join(" ") + "...";

        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");

        const newsTitle = document.createElement("a");
        newsTitle.classList.add("news-title");
        newsTitle.href = link;
        newsTitle.target = "_blank";
        newsTitle.textContent = title;

        const newsDescription = document.createElement("p");
        newsDescription.textContent = shortDescription;

        newsItem.appendChild(newsTitle);
        newsItem.appendChild(newsDescription);

        newsContainer.appendChild(newsItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching the RSS feed:", error);
    });
}
