import React, { useEffect, useState } from 'react';
import styles from './style.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faFolder } from '@fortawesome/free-solid-svg-icons';

const FileInputBlock = (props) => {
  const {
    className,
    title,
    name,
    accept,
    setParentFileName,
    setParentFile,
    required,
  } = props;

  const [selectedFileName, setSelectedFileName] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setParentFileName && setParentFileName(selectedFileName);
    setParentFile && setParentFile(selectedFile);
  }, [selectedFile, setParentFile, selectedFileName, setParentFileName]);

  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div>
        <p>{title}</p>
      </div>
      <div className={styles.content}>
        <div>
          <div>
            {selectedFileName ? (
              <FontAwesomeIcon icon={faFolder} />
            ) : (
              <FontAwesomeIcon icon={faFolderOpen} />
            )}
            <span className={selectedFileName && styles.filled}>
              {selectedFileName ? selectedFileName : 'Upload Nilai Siswa'}
            </span>
          </div>
          <input
            type="file"
            name={name}
            id={name}
            accept={accept}
            required={required}
            // files[0] is an object
            onChange={(e) => {
              e.target.files[0].name &&
                setSelectedFileName(e.target.files[0].name);
              setSelectedFile(e.target.files[0]);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FileInputBlock;
