import { useState, useRef, useEffect } from 'react';
import { FormControl, FormLabel, Image, Button } from '@chakra-ui/react';

const ImageUpload = ({ onImageUpload, selectedImage, setSelectedImage }) => {
//   const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    if (onImageUpload) {
      onImageUpload(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  useEffect(() => {
    if((selectedImage == null) && fileInputRef.current){
      fileInputRef.current.value = null
    }
  }, [selectedImage])

  return (
    <FormControl>
      <FormLabel htmlFor="image">Upload Image</FormLabel>
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
      />
      {selectedImage && (
        <>
          <Image src={URL.createObjectURL(selectedImage)} alt="Preview" mt={4} maxH="200px" />
          <Button mt={4} colorScheme="teal" onClick={clearImage}>
            Clear Image
          </Button>
        </>
      )}
    </FormControl>
  );
};

export default ImageUpload;
