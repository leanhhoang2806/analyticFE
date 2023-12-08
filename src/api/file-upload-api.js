

const getDocument = async (getTokenFunction) => {
    try {
        const token = await getTokenFunction();
        console.log(token);
        const response = await fetch('http://localhost:8000/uploadfile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        return result
      } catch (error) {
        console.log('Error fetching data');
      }
    };

const postDocument = async (file, getTokenFunction, user) => {
  try {
    const token = await getTokenFunction();
    const formData = new FormData();
    formData.append('file', file, file.name);
    // formData.append('auth0User', JSON.stringify(user));

    const response = await fetch('http://localhost:8000/uploadfile', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    const result = await response.json();
    return result
  } catch (error) {
    console.log('Error uploading file');
  }
}

export {
  getDocument,
  postDocument
};