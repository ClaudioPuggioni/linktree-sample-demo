import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

// const regex = /\/[A-Z0-9-]+\/?$/gi;

export default function MakeLinks() {
  const { username } = useParams();
  const documentRef = useRef(doc(db, "users", username));

  const youtubeRef = useRef(null);
  const linkedinRef = useRef(null);
  const githubRef = useRef(null);

  useEffect(() => {
    console.log(username);

    // get user data if exists and populate input boxes
    getUserData(username);
    // eslint-disable-next-line
  }, []);

  const getUserData = async function () {
    const docRef = documentRef.current;
    const docUserData = await getDoc(docRef);

    if (docUserData.exists()) {
      //   console.log("Document data:", docUserData.data());
      const socials = docUserData.data().socials;
      if (socials.youtube.length > 0) youtubeRef.current.value = `https://www.youtube.com/channel/${socials.youtube}`;
      if (socials.linkedin.length > 0) linkedinRef.current.value = `https://www.linkedin.com/in/${socials.linkedin}`;
      if (socials.github.length > 0) githubRef.current.value = `https://github.com/${socials.github}`;

      console.log("socials is:", socials);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document! Creating entry now.");

      await setDoc(docRef, {
        socials: {
          youtube: "",
          linkedin: "",
          github: "",
        },
      });

      console.log("Creation complete.");
    }
  };

  const saveData = async function (socialType, value) {
    if (value.length <= 0) return;

    const docRef = documentRef.current;

    await updateDoc(docRef, {
      [`socials.${socialType}`]: value,
    });
    if (socialType === "youtube") youtubeRef.current.value = `https://www.youtube.com/channel/${value}`;
    if (socialType === "linkedin") linkedinRef.current.value = `https://www.linkedin.com/in/${value}`;
    if (socialType === "github") githubRef.current.value = `https://github.com/${value}`;
  };

  const handleEnter = function (e, socialType) {
    if (e.target.value.length <= 0) return;
    if (e.key === "Enter") {
      saveData(socialType, e.target.value);
      if (socialType === "youtube") youtubeRef.current.value = `https://www.youtube.com/channel/${e.target.value}`;
      if (socialType === "linkedin") linkedinRef.current.value = `https://www.linkedin.com/in/${e.target.value}`;
      if (socialType === "github") githubRef.current.value = `https://github.com/${e.target.value}`;
    }
  };

  const delData = async function (socialType) {
    const docRef = documentRef.current;

    await updateDoc(docRef, {
      [`socials.${socialType}`]: "",
    });

    if (socialType === "youtube") youtubeRef.current.value = "";
    if (socialType === "linkedin") linkedinRef.current.value = "";
    if (socialType === "github") githubRef.current.value = "";
  };

  return (
    <div className="main-container h-screen w-screen flex flex-col justify-center items-center bg-[#37505C]">
      <div className="main-logo relative top-[13px] flex">
        <div className="main-logo-text relative left-[-25px] font-['Cursif'] text-[50px] text-[#fb6c8d] drop-shadow-lg z-10">Socialtree</div>
        <img className="main-logo-tree absolute right-[-45px] bottom-[23px] w-[85px]" src="/assets/tree.svg" alt="tree logo" />
      </div>
      <div className="main-card p-5 min-w-[440px] border-2 border-[#113537] rounded-md bg-[#FFEAD0] flex flex-col items-center gap-5">
        <div>
          <div className="main-text pb-2 text-[19px] font-normal subpixel-antialiased flex items-center">
            <img className="social-img mx-1 w-[37px]" src="/assets/socials/youtube.png" alt="youtube logo" />
            Add YouTube Link:
          </div>
          <div className="card-subdiv flex items-center">
            <input
              ref={youtubeRef}
              className="main-input h-10 min-w-[370px] pl-3 border-2 border-slate-500 rounded"
              type="text"
              placeholder="https://www.youtube.com/channel/..."
              onKeyDown={(e) => handleEnter(e, "youtube")}
            />
            <button
              className="start-btn ml-2 w-[40px] h-[37px] bg-[#96616B] text-[#113537] rounded-md font-semibold subpixel-antialiased hover:bg-[#fb6c8d] hover:text-[#37505b]"
              onClick={() => saveData("youtube", youtubeRef.current.value)}
            >
              ✔
            </button>
            <button
              className="start-btn ml-1 w-[40px] h-[37px] bg-[#96616B] text-[#113537] rounded-md font-semibold subpixel-antialiased hover:bg-[#fb6c8d] hover:text-[#37505b]"
              onClick={() => delData("youtube")}
            >
              ✖
            </button>
          </div>
        </div>
        <div>
          <div className="main-text pb-2 text-[19px] font-normal subpixel-antialiased flex items-center">
            <img className="social-img mx-1 w-[37px]" src="/assets/socials/linkedin.png" alt="youtube logo" />
            Add LinkedIn Link:
          </div>
          <div className="card-subdiv flex items-center">
            <input
              ref={linkedinRef}
              className="main-input h-10 min-w-[370px] pl-3 border-2 border-slate-500 rounded"
              type="text"
              placeholder="https://www.linkedin.com/in/..."
              onKeyDown={(e) => handleEnter(e, "linkedin")}
            />
            <button
              className="start-btn ml-2 w-[40px] h-[37px] bg-[#96616B] text-[#113537] rounded-md font-semibold subpixel-antialiased hover:bg-[#fb6c8d] hover:text-[#37505b]"
              onClick={() => saveData("linkedin", linkedinRef.current.value)}
            >
              ✔
            </button>
            <button
              className="start-btn ml-1 w-[40px] h-[37px] bg-[#96616B] text-[#113537] rounded-md font-semibold subpixel-antialiased hover:bg-[#fb6c8d] hover:text-[#37505b]"
              onClick={() => delData("linkedin")}
            >
              ✖
            </button>
          </div>
        </div>
        <div>
          <div className="main-text pb-2 text-[19px] font-normal subpixel-antialiased flex items-center">
            <img className="social-img mx-1 w-[37px]" src="/assets/socials/github.png" alt="youtube logo" />
            Add GitHub Link:
          </div>
          <div className="card-subdiv flex items-center">
            <input
              ref={githubRef}
              className="main-input h-10 min-w-[370px] pl-3 border-2 border-slate-500 rounded"
              type="text"
              placeholder="https://github.com/..."
              onKeyDown={(e) => handleEnter(e, "github")}
            />
            <button
              className="start-btn ml-2 w-[40px] h-[37px] bg-[#96616B] text-[#113537] rounded-md font-semibold subpixel-antialiased hover:bg-[#fb6c8d] hover:text-[#37505b]"
              onClick={() => saveData("github", githubRef.current.value)}
            >
              ✔
            </button>
            <button
              className="start-btn ml-1 w-[40px] h-[37px] bg-[#96616B] text-[#113537] rounded-md font-semibold subpixel-antialiased hover:bg-[#fb6c8d] hover:text-[#37505b]"
              onClick={() => delData("github")}
            >
              ✖
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
