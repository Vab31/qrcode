import Image from "next/image";
import React, { useState } from "react";
import QRCode from "qrcode";

const Main = () => {
  const [submitClicked, setSubmitClicked] = useState(false);
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    QRCode.toDataURL(
      url,
      {
        width: "100%",
        margin: 2,
        color: {
          dark: "#0000ffff", // for black dots of the qr code
          //   light: "#000000ff", // for background of the qr code
        },
      },
      (err, url) => {
        if (err) return console.error(err);
        console.log(url);
        setQrCode(url);
      }
    );
    setSubmitClicked(true);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qr_code.png";
    link.click();
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div className="main w-[500px] h-[600px] shadow-lg shadow-teal-600 p-5 px-10 gap-5 flex flex-col items-center justify-center">
        <div className="heading text-white text-3xl font-bold text-center">
          Generate Qr Code :{" "}
        </div>
        <form
          className="form  flex items-center justify-center px-5 py-5 gap-5 h-[100px] w-full"
          onSubmit={submitHandler}
        >
          <input
            type="url"
            name="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="rounded-lg outline-none border-none px-5 py-3 cursor-default"
            placeholder="Enter Your Url Here : "
          />
          <button
            type="submit"
            className="text-white text-[16px] font-bold px-5 py-3 bg-red-500 rounded-lg"
          >
            Submit
          </button>
        </form>
        <div className="qr shadow-teal-200 shadow-md w-fit px-5 h-[350px] flex items-center justify-center">
          {submitClicked ? (
            <Image src={qrCode} width="270" height="270" />
          ) : (
            <div className="w-[270px] h-[270px] flex items-center justify-center text-xl font-bold text-center text-teal-300 tracking-wider">
              <h1 className="">Generate Qr , Paste Your Link</h1>
            </div>
          )}
        </div>
        <div className="download flex items-center justify-center">
          <button
            type="button"
            className="text-white text-[16px] font-bold px-5 py-3 bg-red-500 rounded-lg"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
