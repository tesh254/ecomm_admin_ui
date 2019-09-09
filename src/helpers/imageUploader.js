import axios from "axios";

export default imageUploader => {
  const path = "https://api.cloudinary.com/v1_1/werick-dev/image/upload";
  const formData = new FormData();
  const Headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  formData.append("file", imageUploader.image);
  formData.append("upload_preset", "werick");
  delete axios.defaults.headers.common["Authorization"];
  return axios.post(path, formData, { Headers });
};
