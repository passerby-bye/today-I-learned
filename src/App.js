import { useEffect, useState } from "react";
import "./style.css";
import supabase from "./supabase";

const CATEGORY = [
  { name: "front-end", color: "#e9d5ff" },
  { name: "python", color: "#d1fae5" },
  { name: "sports", color: "#d1fae5" },
];
const initailFacts = [
  {
    id: 1,
    text: "1111",
    source: "111",
    category: "front-end",
  },
  {
    id: 2,
    text: "Tailwind includes an expertly-crafted default color palette out-of-the-box that is a great starting point if you don’t have your own specific branding in mind.",
    source: "111",
    category: "python",
  },
];

function App() {
  const [showForm, setShowForm] = useState(false); //only use usestate can update the screen,or it is just a function not call function
  const [facts, setFacts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [currentcategory, setCurrentcategory] = useState("all");
  useEffect(
    function () {
      async function getFacts() {
        setLoading(true);

        let query = supabase
          .from("facts")
          .select("*")
          .order("id", { ascending: false });
        if (currentcategory !== "all")
          query = query.eq("category", currentcategory);
        let { data: facts, error } = await query;
        console.log(facts, currentcategory);
        console.log(error);
        if (!error) setFacts(facts);
        else alert("There is something wrong with getting data");
        setLoading(false);
      }
      getFacts();
    },
    [currentcategory]
  );
  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFiflter setCurrentcategory={setCurrentcategory} />
        {isLoading ? <Loader /> : <FactList facts={facts} />}
      </main>
    </>
  );
}
function Loader() {
  return <p className="message">Loading ...</p>;
}
function Header({ showForm, setShowForm }) {
  return (
    <header className="header">
      <div className="logo">
        <div>img</div>
        <h1>Today I learned</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "close" : "share a fact"}
      </button>
    </header>
  );
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setUploading] = useState(false);
  async function handleSubmit(e) {
    //1.prevent broswer reload
    e.preventDefault();
    console.log(text, source, category);
    //2.check if is valid
    if (text && category) {
      //3.create a new fact object
      /*       const newFact = {
        id: Math.round(Math.random() * 10000),
        text,
        source,
        category,
      }; */
      //3.upload to supabase
      setUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([
          {
            text,
            source,
            category,
          },
        ])
        .select();
      setUploading(false);
      console.log(newFact);
      //4.add new data to th UI
      setFacts((facts) => [newFact[0], ...facts]);
      //5.reset input fields
      setText("");
      setCategory("");
      setSource("");

      //6.close the form
      setShowForm(false);
    }
  }
  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share your sentence"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="text"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose a category</option>
        {CATEGORY.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFiflter({ setCurrentcategory }) {
  return (
    <aside>
      <ul>
        <li>
          <button
            className="btn btn-all"
            onClick={() => setCurrentcategory("all")}
          >
            ALL
          </button>
        </li>
        {CATEGORY.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentcategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
function Fact({ fact }) {
  return (
    <li key={fact.id} className="fact">
      <p>
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          rel="noreferrer"
        ></a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORY.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button>💖 {fact.votesinterest}</button>
        <button>💯 {fact.votesblowing}</button>
      </div>
    </li>
  );
}
function FactList({ facts }) {
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} />
        ))}
      </ul>
    </section>
  );
}
export default App;
