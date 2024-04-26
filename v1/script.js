const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");

btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "share a fact";
  }
});

//load data from Supabase
loadFacts();
async function loadFacts() {
  const res = await fetch(
    "https://qlfninkswqvdvfvwftbz.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsZm5pbmtzd3F2ZHZmdndmdGJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3Njg5MDQsImV4cCI6MjAyOTM0NDkwNH0.urBJURC_IModfBchnbNlSDAHbZWEUvdxcffaWzF4uRY",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsZm5pbmtzd3F2ZHZmdndmdGJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3Njg5MDQsImV4cCI6MjAyOTM0NDkwNH0.urBJURC_IModfBchnbNlSDAHbZWEUvdxcffaWzF4uRY",
      },
    }
  );
  const data = await res.json();
  console.log(data);
  const filterData = createFactsList(data);
}

// render facts in list
const factsList = document.querySelector(".facts-list");

function createFactsList(dataArr) {
  const htmlArr = dataArr.map(
    (fact) => `
  <li class="fact">
  <p>
    ${fact.text}
    <a
      class="source"
      href="${fact.source}"
      target="_blank"
      >source</a
    >
  </p>
  <span class="tag" style="background-color: #e9d5ff"
    >${fact.category}</span>
</li>`
  );
  const html = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}
