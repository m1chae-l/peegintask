import Head from "next/head";
import Link from "next/link";
import ListOfRecents from "./components/ListOfRecents";
import { useState, useEffect } from "react";
import AddWordModal from "./components/AddWordModal";
import AddPeeginForm from "./components/AddPeeginForm";
import TopRightSideBar from "./components/TopRightSideBar";
import LeftSideBar from "./components/LeftSideBar";
import BottomRightSideBar from "./components/BottomRightSideBar";
import Image from "next/image";
import Navbar from "./components/Navbar";

export async function getStaticProps() {
  const response = await fetch("https://peegin.com/api/public/peegins/recent"); //https://peegin.com/api/public/peegins/recent
  const data = await response.json();

  return {
    props: { data },
  };
}

const Homepage = ({ data }) => {
  const [peegins, SetPeegins] = useState([]);
  const [loading, SetLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [isOpen, setISOpen] = useState(false);
  const [addbutton, setAddButton] = useState("Add A New Word");

  useEffect(() => {
    SetPeegins(data.peegins), //is == data.peegins when using real api- this is due to the fact that data is an object and peeging is a property with the array of objects that has our data
      SetLoading(false);
  }, [data]); //run anytime data changes

  const [title, setTitle] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  const [origin, setOrigin] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPeegin = { title, meaning, example, origin, user: { name } };

    console.log("new word added");
    console.log(newPeegin);
    setISOpen(false);
    setAddButton("Add New Word");

    peegins.unshift(newPeegin); //to add to the top of the array

    console.log(peegins);
  };

  // const [addedPeegin, setAddedPeegin] = useState([])

  // useEffect(() => {
  //   setAddedPeegin(data.peegins)
  // }, [peegins]);

  const modalButton = () => {
    setISOpen(!isOpen);
  };

  return (
    <div className="content">
      <Head>
        <title>Peegin Recent</title>
      </Head>
      <Navbar search={search} setSearch={setSearch} />
      {isOpen ? (
        <AddPeeginForm
          title={title}
          meaning={meaning}
          origin={origin}
          example={example}
          name={name}
          data1={isOpen}
          data3={setISOpen}
          submit={handleSubmit}
          addnew={addbutton}
          addnew2={setAddButton}
          setTitle={setTitle}
          setName={setName}
          setMeaning={setMeaning}
          setOrigin={setOrigin}
          setExample={setExample}
        />
      ) : null}

      <div className="grid">
        <div className="mobileaddword">
          <h2> The Official Pidgin English Dictionary</h2>
          <AddWordModal
            modalButton={modalButton}
            addnew={addbutton}
            addnew2={setAddButton}
            data1={isOpen}
            data3={setISOpen}
          />
        </div>
        <div className="leftsidebar">
          <LeftSideBar woday={peegins} />
        </div>

        <div className="peegindisplay">
          <ListOfRecents data2={peegins} load={loading} search={search} setSearch={setSearch}/>
        </div>

        <div className="rightsidebar">
          <TopRightSideBar />
          <AddWordModal
            modalButton={modalButton}
            addnew={addbutton}
            addnew2={setAddButton}
            data1={isOpen}
            data3={setISOpen}
          />
          <BottomRightSideBar />
        </div>
        {/* <div className="backtop">
          <div>
            <Image
              src="/shuffle button.png"
              alt="Random Peegin"
              width={40}
              height={40}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Homepage;
