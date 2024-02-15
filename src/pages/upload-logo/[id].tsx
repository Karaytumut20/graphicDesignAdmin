import React, {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

export default function ImageUploader() {
  const router = useRouter()
  const {id} = router.query

  const [file, setFile] = useState<any>();

  function handleFileChange(event: any) {
    setFile(event.target.files);
  }

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if(!file) return console.error("No file selected")
    const body = new FormData();

    body.append('file', file[0]);
    body.append('id', id as string);

    if(body.get('id') === null) return console.error("No id provided")

    const response = await axios.post('/api/upload-logo', body)
    if(response.status === 200){
      router.push('/category')
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="file" onChange={handleFileChange}/>
      <button type="submit">Submit</button>
    </form>
  );
}
