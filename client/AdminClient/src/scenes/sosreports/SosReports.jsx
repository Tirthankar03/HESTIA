import { useEffect, useState } from "react";
import { Box, Container, Tab, Tabs, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../../config/firebase";
import FlexBetween from "../../components/FlexBetween";

import { useNavigate } from 'react-router-dom'; 

import Header from "../../components/Header";
import { toast } from 'sonner';
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import moment from 'moment';
import IconButton from '@mui/material/IconButton';

import { Delete, Edit, Preview } from '@mui/icons-material';

import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";
import { CheckCircleOutline, HighlightOff,  Check, Close } from "@mui/icons-material";
const SosReports = () => {
  const [unresolvedReports, setUnresolvedReports] = useState([]);
  const [resolvedReports, setResolvedReports] = useState([]);
  const [allReports, setAllReports] = useState([]);
  const [tabValue, setTabValue] = useState(0);


  const navigate = useNavigate();

  const handleToggleResolved = async (id, isResolved) => { 

    try {
      console.log("hi");
      console.log("id", id);
      console.log("resolve", isResolved);
          const reportRef = doc(db, "SOS_Reports", id);
          console.log("report doc", reportRef);

          await updateDoc(reportRef, {
                  isResolved: isResolved,
                });
                const promise = () => new Promise((resolve) => setTimeout(() => resolve(), 2000));

                toast.promise(promise, {
                  loading: 'Loading...',
                  success: 'SOS resolved sucessfully',
                  error: 'Error',
                });
      
    } catch (error) {
      toast.error("unable to resolve")
      console.error(error);
    }

   }


   const handleMoreDetails = (id) => { 
    console.log("hi");
    console.log(id);
      navigate(`/details/${id}`);
    }



  const theme = useTheme();



  const columns1 = [
        {
          field: "id",
          headerName: "ID",
          flex: 1,
        },
        {
          field: "incidentTime",
          headerName: "CreatedAt",
          flex: 1,
          renderCell: (params) =>
          moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
        },
        {
          field: "incidentAddress",
          headerName: "Address",
          flex: 1,
        },
        {
          field: "incidentCategory",
          headerName: "Category",
          flex: 1,
        },
        {
          field: "isResolved",
          headerName: "Status",
          flex: 1,
          renderCell: (params) => 
          {
            return params.value ? (
              <CheckCircleOutline color="secondary" />
            ) : (
              <HighlightOff color="error" />
            );
          },
        },
        {
          field: "toggleResolved",
          headerName: "Resolution",
          flex: 1,
          renderCell: (params) => {
            return (
              <IconButton
                // onClick={() => handleToggleResolved(params.row.id, !params.row.isResolved)}
                onClick={() => handleToggleResolved(params.row.id, !params.row.isResolved)}
              >
                {params.row.isResolved ? <Close color="error" /> : <Check color="secondary" />}
              </IconButton>
            );
          },
        },
        {
          field: "details",
          headerName: "More details",
          flex: 1,
          renderCell: (params) => {
            return (
              <IconButton
                // onClick={() => handleToggleResolved(params.row.id, !params.row.isResolved)}
                onClick={() => handleMoreDetails(params.row.id)}
              >
                <Preview/>
              </IconButton>
            );
          },
        },
      ];

      const columns = [
        {
          field: "id",
          headerName: "ID",
          flex: 1,
        },
        {
          field: "incidentTime",
          headerName: "CreatedAt",
          flex: 1,
          renderCell: (params) =>
          moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
        },
        {
          field: "incidentAddress",
          headerName: "Address",
          flex: 1,
        },
        {
          field: "incidentCategory",
          headerName: "Category",
          flex: 1,
        },
        {
          field: "isResolved",
          headerName: "Status",
          flex: 1,
          renderCell: (params) => 
          {
            return params.value ? (
              <CheckCircleOutline color="secondary" />
            ) : (
              <HighlightOff color="error" />
            );
          },
        },
        {
          field: "details",
          headerName: "More details",
          flex: 1,
          renderCell: (params) => {
            return (
              <IconButton
                // onClick={() => handleToggleResolved(params.row.id, !params.row.isResolved)}
                onClick={() => handleMoreDetails(params.row.id)}
              >
                <Preview/>
              </IconButton>
            );
          },
        },
      ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sosReportsRef = collection(db, "SOS_Reports");
        const querySnapshot = await getDocs(sosReportsRef);
        const reports = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const unresolved = reports.filter((report) => !report.isResolved);
        const resolved = reports.filter((report) => report.isResolved);

        setAllReports(reports);
        setUnresolvedReports(unresolved);
        setResolvedReports(resolved);
      } catch (error) {
        console.error("Error fetching SOS reports:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box m="1.5rem 2.5rem"
    >
          <FlexBetween>
        <Header title="SOSREPORTS" subtitle="see all the emergency sos here (click for more info)" />
      </FlexBetween>
      <Container maxWidth="lg">
      <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
            
            
            >
            <Box
        mt={5}
          sx={{
            height: 600, width:'100%',
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
     <Tabs value={tabValue} onChange={handleTabChange}>
         <Tab label="Unresolved" />
          <Tab label="Resolved" />
         <Tab label="All" />
       </Tabs>
        {tabValue === 0 && (
        <DataGrid
            rows={unresolvedReports}
            columns={columns1}
                      components={{ Toolbar: DataGridCustomToolbar }}
          />
        )}
     {tabValue === 1 && (
         <DataGrid
            rows={resolvedReports}
            columns={columns}
            components={{ Toolbar: DataGridCustomToolbar }}
          />
        )}
        {tabValue === 2 && (
          <DataGrid
            rows={allReports}
            columns={columns}
            components={{ Toolbar: DataGridCustomToolbar }}
          />
        )}
        </Box>
        
            </Box>
      </Container>


    </Box>
  );
};

export default SosReports;
