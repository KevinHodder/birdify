import { useState } from "react";
import deepai from "deepai";
import { InfinitySpin } from "react-loader-spinner";
import "./App.css";

deepai.setApiKey("cc383872-557e-4673-959a-9f9a28fa19c8"); //set to real

function App() {
  const [modifiedImage, setModifiedImage] = useState(undefined);
  const [prompts, setPrompts] = useState(["tui", "kakapo", "kea", "fantail"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const send = async () => {
    setLoading(true);
    const image = document.getElementById("fileInput")?.value;
    setError(!image || !prompts.length);
    if (!image || !prompts.length) {
      return;
    }
    const randomPromptElem =
      prompts[Math.floor(Math.random() * prompts.length)];
    const pic = await deepai.callStandardApi("image-editor", {
      image: document.getElementById("fileInput"),
      text: `transform the person into a ${randomPromptElem}, photorealistic`,
    });
    console.log(pic);
    setModifiedImage(pic.output_url);
    setLoading(false);
  };

  const updatePrompts = (event) => {
    setPrompts(event.target.value.split("\n").filter((val) => !!val));
  };

  return (
    <div className="App">
      <p>Select a photo to upload:</p>
      <input id={"fileInput"} type={"file"} />
      <p>List of birds</p>
      <textarea rows="5" cols={"40"} onChange={updatePrompts}>
        {`kea\r\nkakapo\r\ntui\r\nfantail`}
      </textarea>
      {loading && !document.getElementById("fileInput") ? (
        <p style={{ background: "lightpink" }}>
          Please select a file to modify
        </p>
      ) : (
        <></>
      )}
      {loading && !prompts.length ? (
        <p style={{ background: "lightpink" }}>
          Please enter something in the "list of birds" box
        </p>
      ) : (
        <></>
      )}
      <p>
        <button onClick={send}>Birdify</button>
      </p>
      {loading && !error ? (
        <p style={{ textAlign: "center" }}>
          <InfinitySpin width="200" color="#4fa94d" />
        </p>
      ) : null}
      {modifiedImage && !loading ? (
        <>
          <img key={modifiedImage} src={modifiedImage} alt={"temp"} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
