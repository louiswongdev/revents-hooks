import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon, Header } from 'semantic-ui-react';

function PhotoWidgetDropzone({ setFiles }) {
  const dropzoneStyles = {
    border: 'dashed 3px #eee',
    borderRadius: '5%',
    paddingTop: '30px',
    textAlign: 'center',
  };

  const dropzoneActive = {
    border: 'dashed 3px green',
  };

  const onDrop = useCallback(
    // use map() to add preview property to file object with path URL
    acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
      console.log(acceptedFiles);
    },
    [setFiles],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive ? { ...dropzoneStyles, ...dropzoneActive } : dropzoneStyles
      }
    >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" color="grey" />
      <Header content="Drop image here" />
    </div>
  );
}

export default PhotoWidgetDropzone;