// server.js
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
const port = 3000

app.use(bodyParser.json())

app.post('/generate-comic', async (req, res) => {
  const { panels } = req.body

  console.log('Entered panels:', panels)

  const apiUrl =
    'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud'

  try {
    const response = await axios.post(
      apiUrl,
      { inputs: panels.join(' ') },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM`,
          Accept: 'image/png'
        }
      }
    )

    const imageURL = response.data
    res.json({ imageURL })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
