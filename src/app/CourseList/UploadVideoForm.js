import { useSession } from 'next-auth/react';
import { useState } from 'react';

const UploadVideoForm = () => {
  const [file, setFile] = useState(null);
  const {data :session}=useSession();
  const [videoMetadata, setVideoMetadata] = useState({
    title: '',
    description: '',
    privacyStatus: ''
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };



  const handleMetadataChange = (e) => {
    const { name, value } = e.target;
    setVideoMetadata((prevMetadata) => ({
      ...prevMetadata,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('accessToken', session.accessToken);
    formData.append('videoMetadata', JSON.stringify(videoMetadata));
  
    try {
      const response = await fetch('https://youtube-backend-mc7i.onrender.com/upload', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        const videoData = await response.json();
        // Access the video details from the response
        const videoTitle = videoData.snippet.title;
        const videoId = videoData.id;
        console.log(videoData)
        // Handle the retrieved video details as needed
        console.log('Video uploaded!');
        console.log('Title:', videoTitle);
        console.log('Video ID:', videoId);
      } else {
        console.error('Failed to upload video');
        console.log(await videoMetadata)
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="file">Video File:</label>
        <input type="file" id="file" onChange={handleFileChange} required />
      </div>
   
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={videoMetadata.title} onChange={handleMetadataChange} required />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={videoMetadata.description} onChange={handleMetadataChange} required />
      </div>
      <div>
        <label htmlFor="privacyStatus">Privacy Status:</label>
        <select id="privacyStatus" name="privacyStatus" value={videoMetadata.privacyStatus} onChange={handleMetadataChange}>
          <option value="private">Private</option>
          <option value="public">Public</option>
          <option value="unlisted">Unlisted</option>
        </select>
      </div>
      <button type="submit">Upload Video</button>
    </form>
  );
};

export default UploadVideoForm;
