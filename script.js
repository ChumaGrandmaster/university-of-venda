// Quick Links Data
const links = [
  { name: "MyUniven (Moodle)", url: "https://myuniven.univen.ac.za" },
  { name: "myAccess Portal", url: "https://www.univen.ac.za/myaccess/" },
  { name: "Library", url: "https://www.univen.ac.za/library" },
  { name: "Student Portal", url: "https://www.univen.ac.za/students/univen-student-portal/" },
  { name: "E-learning Unit", url: "https://www.univen.ac.za/learning-and-teaching/" },
  { name: "Residences", url: "https://www.univen.ac.za/student-affairs/student-residences/" },
  { name: "Academic Calendar", url: "https://www.univen.ac.za/academic-calendar/" },
  { name: "Faculties", url: "https://www.univen.ac.za/faculties/" },
  { name: "News & Events", url: "https://www.univen.ac.za/news/" },
  { name: "Contact UNIVEN", url: "https://www.univen.ac.za/contact-us/" }
];

// Render Quick Links
const container = document.getElementById("links-container");
links.forEach(link => {
  const a = document.createElement("a");
  a.href = link.url;
  a.textContent = link.name;
  a.target = "_blank";
  container.appendChild(a);
});

// Fetch Latest News from UNIVEN RSS Feed
async function loadNews() {
  const newsContainer = document.getElementById("news-container");
  try {
    const rssUrl = "https://www.univen.ac.za/feed/";
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    newsContainer.innerHTML = "";
    data.items.slice(0, 5).forEach(item => {
      const div = document.createElement("div");
      div.classList.add("news-item");
      div.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a>
                       <p>${item.pubDate.split(" ")[0]}</p>`;
      newsContainer.appendChild(div);
    });
  } catch (error) {
    newsContainer.innerHTML = "<p>Failed to load news. Please try again later.</p>";
  }
}

loadNews();
