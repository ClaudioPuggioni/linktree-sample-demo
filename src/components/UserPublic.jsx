import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";

export default function UserPublic() {
  const { username } = useParams();
  const documentRef = useRef(doc(db, "users", username));
  const [socials, setSocials] = useState(null);

  useEffect(() => {
    getUserData(username);
    // eslint-disable-next-line
  }, []);

  const getUserData = async function () {
    const docRef = documentRef.current;
    const docUserData = await getDoc(docRef);

    if (docUserData.exists()) {
      //   console.log("Document data:", docUserData.data());
      const receivedSocials = docUserData.data().socials;
      console.log("receivedSocials is:", receivedSocials);
      console.log(Object.values(receivedSocials).every((ele) => ele === ""));
      if (Object.values(receivedSocials).length > 0) setSocials(receivedSocials);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      // Show no links available text
    }
  };

  return (
    <div className="main-container h-screen w-screen flex flex-col justify-center items-center bg-[#37505C]">
      <div className="main-logo relative top-[13px] flex">
        <div className="main-logo-text relative left-[-25px] font-['Cursif'] text-[50px] text-[#fb6c8d] drop-shadow-lg z-10">Socialtree</div>
        <img className="main-logo-tree absolute right-[-45px] bottom-[23px] w-[85px]" src="/assets/tree.svg" alt="tree logo" />
      </div>
      <div className="main-card p-5 w-[420px] border-2 border-[#113537] rounded-md bg-[#FFEAD0] flex flex-col justify-center items-center gap-5">
        {socials && !Object.values(socials).every((ele) => ele === "") ? <div className="text-[21px] font-semibold">{username}'s Links</div> : null}

        {socials && socials.youtube ? (
          <>
            <div className="card-subdiv w-full flex justify-between items-center">
              <div className="main-text mr-3 text-[19px] font-normal subpixel-antialiased flex justify-center items-center">
                <img className="social-img mx-1 w-[37px]" src="/assets/socials/youtube.png" alt="youtube logo" />
                My YouTube Channel
              </div>
              <button
                className="start-btn w-[110px] h-[37px] bg-[#96616B] text-[#113537] text-[18px] rounded-md font-semibold subpixel-antialiased hover:bg-[#fb6c8d] hover:text-[#37505b] flex justify-center items-center gap-2.5"
                onClick={() => window.location.replace(`https://www.youtube.com/channel/${socials.youtube}`)}
              >
                Go To
                <img className="double-arrows-img w-[15px]" src="/assets/double-arrow.svg" alt="double arrows" />
              </button>
            </div>
          </>
        ) : null}
        {socials && socials.linkedin ? (
          <>
            <div className="card-subdiv w-full flex justify-between items-center">
              <div className="main-text mr-3 text-[19px] font-normal subpixel-antialiased flex justify-center items-center">
                <img className="social-img mx-1 w-[37px]" src="/assets/socials/linkedin.png" alt="youtube logo" />
                My LinkedIn Profile
              </div>
              <button
                className="start-btn w-[110px] h-[37px] bg-[#96616B] text-[#113537] text-[18px] rounded-md font-semibold subpixel-antialiased hover:bg-[#fb6c8d] hover:text-[#37505b] flex justify-center items-center gap-2.5"
                onClick={() => window.location.replace(`https://www.linkedin.com/in/${socials.linkedin}`)}
              >
                Go To
                <img className="double-arrows-img w-[15px]" src="/assets/double-arrow.svg" alt="double arrows" />
              </button>
            </div>
          </>
        ) : null}
        {socials && socials.github ? (
          <>
            <div className="card-subdiv w-full flex justify-between items-center">
              <div className="main-text mr-3 text-[19px] font-normal subpixel-antialiased flex justify-center items-center">
                <img className="social-img mx-1 w-[37px]" src="/assets/socials/github.png" alt="youtube logo" />
                My GitHub Profile
              </div>
              <button
                className="start-btn w-[110px] h-[37px] bg-[#96616B] text-[#113537] text-[18px] rounded-md font-semibold subpixel-antialiased hover:bg-[#fb6c8d] hover:text-[#37505b] flex justify-center items-center gap-2.5"
                onClick={() => window.location.replace(`https://github.com/${socials.github}`)}
              >
                Go To
                <img className="double-arrows-img w-[15px]" src="/assets/double-arrow.svg" alt="double arrows" />
              </button>
            </div>
          </>
        ) : null}
        {socials && Object.values(socials).every((ele) => ele === "") ? <>User has no links.</> : null}
      </div>
    </div>
  );
}
