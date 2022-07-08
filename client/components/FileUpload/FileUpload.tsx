import React, { useRef } from 'react';

interface FileUploadProps {
  children: React.ReactNode;
  setFile: Function;
  accept: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ children, setFile, accept }) => {
  const ref = useRef<HTMLInputElement>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  };

  return (
    <div onClick={() => ref.current.click()}>
      <input
        type="file"
        ref={ref}
        accept={accept}
        onChange={onChange}
        style={{ display: 'none' }}
      />
      {children}
    </div>
  );
};

export default FileUpload;
