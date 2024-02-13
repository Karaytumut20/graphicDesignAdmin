import React, { useState } from "react";

export default function ImageUploader() {
  const [files, setFiles] = useState([]);

  function handleFileChange(event:any) {
    setFiles(event.target.files);
  }

  function onSubmit(event: any) {
    event.preventDefault();

    const body = new FormData();

    for (let index = 0; index < files.length; index++) {
      body.append('file', files[index]);
    }

    fetch("/api/upload", {
      method: "POST",
      body
    })
      .then(response => {
        // Handle response
        console.log("Upload successful:", response);
      })
      .catch(error => {
        // Handle error
        console.error("Upload failed:", error);
      });
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
