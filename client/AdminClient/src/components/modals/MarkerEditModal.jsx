// import * as React from "react";

// import { useState, useEffect } from "react";
// // import Button from '@mui/material/Button';
// // import TextField from '@mui/material/TextField';
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

// import { Field, Form, Formik } from "formik";
// import { object, string } from "yup";

// import axios from "axios";

// import { db } from "../../config/firebase";

// import { toast } from 'sonner';

// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDocs,
//   updateDoc,
// } from "firebase/firestore";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// import {
//   TextField,
//   Button,
//   Box,
//   Card,
//   CardContent,
//   Snackbar,
//   Typography,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";

// import IconButton from "@mui/material/IconButton";

// import { Edit } from "@mui/icons-material";

// import { useDispatch, useSelector } from "react-redux";
// import {
//   setUser,
//   setAuthChecked,
//   selectUser,
//   selectAuthChecked,
// } from "../../state/userSlice";

// export default function MarkerEditModal({ params}) {

//   const {marker_id: id, imageUrl, userid, formattedTime, description, address} = params.row;

// //   console.log("action route in my add context description", actionRoute);

// // const [descriptionData, setDescriptionData] = useState("")

// // console.log("descriptionData?>>>>>", descriptionData);

//   const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
    
//     console.log("edit individual id doc?", id);


//     console.log("edit individual doc?", description);

//     // setDescriptionData(description)

//     console.log("hi");

    
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleOnEdit = async (values) => {
//     // console.log("handle description>>>>", description);


//     try {

//     console.log("handle on edit id", id);

//     console.log("valeus ka descr", values.description);
//     const updateData = doc(db,"Markers",id)

//     await updateDoc(updateData,{description: values.description})


//           //need to refactor this properly later
//           const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));

//           toast.promise(promise, {
//             loading: 'Loading...',
//             success: 'Marker edited sucessfully',
//             error: 'Error',
//           });



//     } catch (error) {
//         toast.error('Could not delete marker');
//         console.error("Error in handleOnEdit:", error);
//     }
//     // finally {
//     //   // Set loading back to false after the request is complete
//     //   setLoading(false);
//     // }
//   };

//   const initalValues = {
//     // email: "",
//     // name: "",
//     // password: "",
//     description: "",
//   };

//   return (
//     <React.Fragment>
//           <Edit onClick={handleClickOpen}/>


//       <Dialog
//         open={open}
//         onClose={handleClose}

//       >
//         <DialogTitle>Edit Marker</DialogTitle>
//         <DialogContent>
//           <div>
//             <Formik
//               initialValues={initalValues}
//               onSubmit={(values, formikHelpers) => {
//                 console.log(values);
//                 handleOnEdit(values);

//                 formikHelpers.resetForm();
//               }}
//             >
//               {() => (
//                 <Form>
//                   <Box height={14} />
//                   <Field
//                     my={20}
//                     name="description"
//                     // type="email"
//                     as={TextField}
//                     variant="outlined"
//                     color="primary"
//                     label="description"
//                     fullWidth
//                   />
//                   <Box height={14} />


//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     size="large"
//                   >
//                     EDIT
//                   </Button>

//                   <Button
//                     onClick={handleClose}
//                     variant="contained"
//                     color="primary"
//                     size="large"
//                     // disabled={!isValid || !dirty}
//                   >
//                     Close
//                   </Button>
//                 </Form>
//               )}
//             </Formik>
//           </div>

//           {/* <TextField
//             autoFocus
//             required
//             margin="dense"
//             id="name"
//             name="email"
//             label="Email Address"
//             type="email"
//             fullWidth
//             variant="standard"
//           /> */}
//         </DialogContent>
//       </Dialog>
//     </React.Fragment>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from 'sonner';
import { Edit, Login } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectUser } from "../../state/userSlice";

export default function MarkerEditModal({ params }) {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { marker_id: id, description } = params.row;

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setOpen(false);
  };

  const handleNavigateToAuth = (e) => {
    e.stopPropagation();
    handleClose();
    navigate('/auth');
  };

  const handleOnEdit = async (values) => {
    setIsEditing(true);
    try {
      const updateData = doc(db, "Markers", id);
      
      const editPromise = async () => {
        await updateDoc(updateData, { description: values.description });
        return { success: true };
      };

      await toast.promise(editPromise, {
        loading: 'Updating marker...',
        success: 'Marker updated successfully',
        error: 'Failed to update marker',
      });

      handleClose();
    } catch (error) {
      console.error("Error in handleOnEdit:", error);
    } finally {
      setIsEditing(false);
    }
  };

  const initialValues = {
    description: "",
  };

  return (
    <React.Fragment>
      <Edit onClick={handleClickOpen} />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-dialog-title"
      >
        <DialogTitle id="edit-dialog-title">
          {user ? "Edit Marker" : "Authentication Required"}
        </DialogTitle>

        {user ? (
          <DialogContent>
            <div>
              <Formik
                initialValues={initialValues}
                onSubmit={(values, formikHelpers) => {
                  handleOnEdit(values);
                  formikHelpers.resetForm();
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box height={14} />
                    <Field
                      name="description"
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="Description"
                      fullWidth
                      disabled={isEditing}
                    />
                    <Box height={14} />
                    <Box display="flex" gap={2} justifyContent="flex-end">
                      <Button
                        onClick={handleClose}
                        variant="outlined"
                        color="primary"
                        size="large"
                        disabled={isEditing}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={isEditing}
                      >
                        Save Changes
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </div>
          </DialogContent>
        ) : (
          <>
            <DialogContent>
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <DialogContentText>
                  This is an admin action. Please log in to edit markers.
                </DialogContentText>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleClose} 
                color="primary"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleNavigateToAuth}
                color="primary" 
                variant="contained" 
                startIcon={<Login />}
                autoFocus
              >
                Go to Login
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </React.Fragment>
  );
}