import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import styles from './ImageToTextConverter.module.css';

const ImageToTextConverter = () => {
  const [imageFile, setImageFile] = useState(null);
  const [textResult, setTextResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const handleConvert = async () => {
    if (!imageFile) return;

    setIsLoading(true);

    try {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const arrayBuffer = fileReader.result;
        const result = await Tesseract.recognize(
          new Blob([new Uint8Array(arrayBuffer)], { type: imageFile.type }),
          'eng',
          {
            logger: (m) => console.log(m)
          }
        );
        setTextResult(result.data.text);
        setIsLoading(false);
      };
      fileReader.onerror = () => {
        console.error('Error reading file.');
        setTextResult('Error reading file. Please try again.');
        setIsLoading(false);
      };
      fileReader.readAsArrayBuffer(imageFile);
    } catch (error) {
      console.error('Error processing image:', error);
      setTextResult('Error processing image. Please try again.');
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textResult);
      alert('Text copied to clipboard!');
    } catch (error) {
      console.error('Error copying text:', error);
      alert('Failed to copy text. Please try again.');
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([textResult], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'converted-text.txt';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div className={styles.converterBody}>
      <div className={styles.wrapper}>
        <div className={`${styles["form-wrapper"]} ${styles["image-to-text"]}`}>
          <h2>Image to Text Converter</h2>
          <div className={styles["input-group"]}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <button
            onClick={handleConvert}
            className={styles.btn}
            disabled={!imageFile || isLoading}
          >
            {isLoading ? 'Converting...' : 'Convert'}
          </button>
          {textResult && (
            <div className={styles.result}>
              <div className={styles["result-header"]}>
                <h3>Result:</h3>
                <span
                  className={styles.copyIcon}
                  onClick={handleCopy}
                >
                  <FontAwesomeIcon icon={faCopy} />
                </span>
              </div>
              <p>{textResult}</p>
              <button
                onClick={handleDownload}
                className={styles.btn}
              >
                Download 
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageToTextConverter;
