// /* eslint-disable */

// import axios from 'axios';
// import { showAlert } from './alerts';

// export const signup = async (name, email, password, passwordConfirm) => {
//   console.log(signup);
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: 'http://localhost:3000/api/v1/users/signup',
//       data: {
//         name,
//         email,
//         password,
//         passwordConfirm,
//       },
//     });

//     if (res.data.status === 'success') {
//       showAlert('success', 'Account created successfully');
//       window.setTimeout(() => {
//         location.replace('/');
//       }, 1500);
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };
/* eslint-disable */
// import axios from 'axios';
// import { showAlert } from './alerts';

// export const signup = async (
//   name,
//   location,
//   email,
//   password,
//   passwordConfirm
// ) => {
//   try {
//     await axios({
//       method: 'POST',
//       url: 'http://127.0.0.1:3000/api/v1/users/signup',
//       data: { name, location, email, password, passwordConfirm },
//     });

//     if (res.data.status === 'succes' || res.data.status === 'success') {
//       showAlert('success', `${type.toUpperCase()} updated successfully!`);
//       window.setTimeout(() => {
//         window.location.replace('/me');
//       }, 1000);
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//     console.log(err.response.data.message);
//   }
// };
import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Account created and logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
