import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

export default function ImageUploader() {
  const router = useRouter();
  const { id } = router.query;

  const [file, setFile] = useState<any>();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  function handleFileChange(event: any) {
    setFile(event.target.files);
  }

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (!file) return console.error("No file selected");

    const body = new FormData();
    body.append("file", file[0]);
    body.append("id", id as string);

    if (body.get("id") === null) return console.error("No id provided");

    setUploading(true);

    try {
      const response = await axios.post("/api/upload-logo", body, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      });

      if (response.status === 200) {
        router.push("/category");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="upload-logo-input"
          onChange={handleFileChange}
        />
        <label htmlFor="upload-logo-input">
        <div style={{ display: "flex", justifyContent: "center" }}>
      <Button 
        variant="outlined"
        component="span"
        startIcon={<CloudUploadIcon />}
        style={{ width: "100%" ,marginBottom:"10px"}} // Make the button occupy the full width
      >
        Select Image
      </Button>
    </div>
        </label>
        {uploading && (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body2">
              Uploading: {uploadProgress}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              sx={{ flexGrow: 1 }}
            />
          </Stack>
        )}
        <Button
          variant="contained"
          type="submit"
          disabled={uploading || !file}
        >
          Upload
        </Button>
      </Stack>
    </form>
  );
}
