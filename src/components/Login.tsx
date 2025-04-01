// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import { useContext, useEffect, useState } from 'react';
// import { Fab, TextField } from '@mui/material';
// //import Registration from './Registration';
// //import { User } from './user';
// import { UserContext } from './context';
// import axios from 'axios';
// import { butttonStyle, FabStyle } from './styleType';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     pt: 2,
//     px: 4,
//     pb: 3,
//     borderRadius: '10px',
//     // color:"rgb(32, 2, 71)"
// };

// const Login = ({ onLoginSuccess }: { onLoginSuccess: Function }) => {
//     const [open, setOpen] = useState(false);
//     const [email, setEmail] = useState('');
//     const [errorMail, setErrorMail] = useState(false);
//     const [helperTextMail, setHelperTextMail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorPassword, setErrorPassword] = useState(false);
//     const [helperTextPassword, setHelperTextPassword] = useState('');
//     const [notFoundEmailOrPassword, setNotFoundEmailOrPassword] = useState(false);
//     const [helperTextNotFoundEmailOrPassword, setHelperTextNotFoundEmailOrPassword] = useState('');
//     // const [user, setUser] = useState<User | null>(null);
//     const [touchedEmail, setTouchedEmail] = useState(false);
//     //   const [touchedpassword, setTouchedpassword] = useState(false);

//     const context = useContext(UserContext);
//     if (!context) {
//         throw new Error("UserContext must be used within a UserProvider");
//     }

//     const { dispatch } = context;

//     useEffect(() => {
//         validateEmail(email);
//     }, [email]);

//     useEffect(() => {
//         validatePassword(password);
//     }, [password]);

//     const validateEmail = (value: string) => {
//         if (!value) {
//             setErrorMail(true);
//             setHelperTextMail("Email is required");
//             return;
//         }
//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailPattern.test(value)) {
//             setErrorMail(true);
//             setHelperTextMail("Enter a valid email");
//             return;
//         }
//         setErrorMail(false);
//         setHelperTextMail('');
//     };

//     const validatePassword = (value: string) => {
//         if (!value) {
//             setErrorPassword(true);
//             setHelperTextPassword("Password is required");
//             return;
//         }
//         setErrorPassword(false);
//         setHelperTextPassword('');
//         // setPassword("");
//         // setEmail("");
//     };

//     const handleLogin = async () => {

//         if (!email || !password) {
//             if (!email) {
//                 setErrorMail(true);
//                 setHelperTextMail("Email is required");
//             }
//             if (!password) {
//                 setErrorPassword(true);
//                 setHelperTextPassword("Password is required");
//             }
//         }
//         else {

//             try {
//                 const res = await axios.post('http://localhost:5095/users', {
//                     email: email,
//                     password: password
//                 }
//                 );
//                 setNotFoundEmailOrPassword(false);
//                 setHelperTextNotFoundEmailOrPassword('');

//                 dispatch({
//                     type: 'NEW_USER',
//                     data: res.data.user
//                 });
//                 onLoginSuccess();
//             }

//             catch (e: Error | any) {
//                 if (e.response.status === 401) {
//                     setNotFoundEmailOrPassword(true);
//                     setHelperTextNotFoundEmailOrPassword("The email or password is wrong");
//                 }
//                 else {
//                     console.log(e);
//                 }

//             }
//         }
//     }

//     return (<>
//         <div>
//             <Fab
//                 sx={{ ...FabStyle, height: '7%' }}
//                 aria-label="add" onClick={() => setOpen(true)}>Login
//             </Fab>
//             <Modal
//                 open={open}
//                 onClose={() => setOpen(false)}
//                 aria-labelledby="parent-modal-title"
//                 aria-describedby="parent-modal-description"
//             >
//                 <Box sx={{ ...style, width: 400 }}>
//                     <h2 id="parent-modal-title">
//                         Please Enter your email and password:
//                     </h2>
//                     <TextField
//                         error={errorMail}
//                         helperText={helperTextMail}
//                         label="Email"
//                         type='email'
//                         margin='normal'
//                         required={true}
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <TextField
//                         error={errorPassword}
//                         helperText={helperTextPassword}
//                         label="Password"
//                         margin='normal'
//                         required={true}
//                         type="password"
//                         value={password}
//                         onChange={(e) => { setPassword(e.target.value); }}
//                     />
//                     <div></div>
//                     <Button onClick={handleLogin}
//                         sx={butttonStyle}>
//                         Login
//                     </Button>
//                     {notFoundEmailOrPassword && <p>{helperTextNotFoundEmailOrPassword}</p>}

//                 </Box>
//             </Modal>
//         </div>
//     </>);
// };

// export default Login;


