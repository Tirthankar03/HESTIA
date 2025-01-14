import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import {auth } from "../../config/firebase";

import {
  onAuthStateChanged,
} from "firebase/auth";
import { selectUser } from "../../state/userSlice";


// const Layout = () => {
//   const user = useSelector(selectUser);
//   const [user, setUser] = useState(null);
//   const [authChecked, setAuthChecked] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setAuthChecked(true); // Set to true once authentication state is checked
//     });

//     // Clean up the subscription when the component unmounts
//     return () => unsubscribe();
//   }, []);


//   // console.log("auth in Navbar, I need to change@!!!!!!!!!!!!",user?.email);



//   const isNonMobile = useMediaQuery("(min-width: 600px)");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);


//   // console.log("userId in Layout:", userId);

//   //redux is working fine, RTK is not making calls properly
// //  const { data } = useGetUserQuery(userId);




//   // console.log("data in layout, specific user:", data);
//   return (
//     <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
//       <Sidebar
//         user={user || {}}
//         isNonMobile={isNonMobile}
//         drawerWidth="250px"
//         isSidebarOpen={isSidebarOpen}
//         setIsSidebarOpen={setIsSidebarOpen}
//       />
//       <Box flexGrow={1}>
//         <Navbar
//           user={user || {}}
//           isSidebarOpen={isSidebarOpen}
//           setIsSidebarOpen={setIsSidebarOpen}
//         />
//         <Outlet />
//       </Box>
//     </Box>
//   );
// };

// export default Layout;

const Layout = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
      dispatch(setAuthChecked());
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={user || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={user || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
