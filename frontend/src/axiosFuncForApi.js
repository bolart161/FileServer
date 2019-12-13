const axios = require('axios');
const crypto = require('crypto-js');

const domain = process.env.domain || 'http://localhost:3333';
const domainAuth = process.env.domainAuth || 'http://localhost:3012';

export const getFiles = (fileType, id) => (
  axios
    .get(`${domain}/files/${fileType}/${id}`)
    .then(response => response.data)
    .catch(() => [])
);

export const sendFile = (file, id) => {
  const formData = new FormData();
  formData.append('my-file', file);
  return (
    axios
      .post(`${domain}/upload`,
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            id,
          },
        })
      .then(response => (response.status === 200))
      .catch(() => false)
  );
};

export const deleteFile = (filename, filetype, id) => (
  axios
    .delete(`${domain}/deleteFile/${filetype}/${id}/${filename}`)
    .then(response => response.data)
    .catch(() => [])
);


export const downloadFile = ref => (
  axios
    .get(`${domain}/${ref}`)
    .then(response => response.data)
    .catch(() => [])
);

export const signIn = (login, password) => (
  axios
    .get(`${domainAuth}/users/${login}/${crypto.MD5(password)}`)
    .then(response => response.data)
    .catch(() => null)
);

export const register = (user) => {
  const userInfo = user;

  userInfo.password = crypto.MD5(userInfo.password).toString();
  return (
    axios
      .post(`${domainAuth}/users`, userInfo)
      .then(response => response.data.status)
      .catch(() => { 'Failed'; })
  );
};
