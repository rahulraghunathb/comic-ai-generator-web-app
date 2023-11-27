// ComicGenerator.js
import React, { useState } from 'react'
import './ComicGenerator.css'
import { query } from './script'

const ComicGenerator = () => {
  const [comicText, setComicText] = useState('')

  const [comicStripImages, setComicStripImages] = useState([])
  const [panelImages, setPanelImages] = useState([])

  const handleInputChange = (e) => {
    setComicText(e.target.value)
  }

  const handleGenerate = async () => {
    try {
      console.log(comicText)
      const imageBlob = await query({ inputs: comicText })
      const imageUrl = URL.createObjectURL(imageBlob)

      // Clear the panel images and add the new image
      setPanelImages([imageUrl])

      // Add the new image to the comic strip images
      setComicText('')
    } catch (error) {
      console.error('Error in API request:', error)
    }
  }

  const handleAddToComicStrip = () => {
    // Add the panel images to the comic strip images
    setComicStripImages((prevStripImages) => [
      ...prevStripImages,
      ...panelImages
    ])
  }

  return (
    <div className="comic-generator">
      <div className="header-text">Comicon AI Generator</div>

      {/* Panel images */}
      <div className="panel-container">
        {panelImages.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Panel Image ${index + 1}`} />
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '30px',
          marginTop: '20px'
        }}
      >
        <input
          type="text"
          placeholder="Enter your comic text here..."
          value={comicText}
          onChange={handleInputChange}
          style={{
            width: '500px',
            height: '100px',
            padding: '10px',
            boxSizing: 'border-box',
            marginBottom: '20px',
            marginTop: '15px',
            borderRadius: '20px',
            border: '2.25px solid #ccc',
            fontWeight: 550,
            fontSize: 20
          }}
        />
        {/* Generate button */}
        <button onClick={handleGenerate} className="generate-button">
          GENERATE
        </button>

        {/* Clear Panel button */}
        <button
          style={{ margin: '5px' }}
          onClick={() => setPanelImages([])}
          className="clear-panel-button"
        >
          CLEAR PANEL
        </button>

        {/* Add Panel to Comic Strip button */}
        <button
          style={{ margin: '5px' }}
          onClick={handleAddToComicStrip}
          className="add-panel-button"
        >
          Add Panel to Comic Strip
        </button>
      </div>

      {/* Comic strip images */}
      <div className="strip-container">
        {comicStripImages.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Comic Strip Image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ComicGenerator
