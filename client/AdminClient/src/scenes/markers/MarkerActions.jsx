import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from "../../config/firebase";
import MarkerEditModal from '../../components/modals/MarkerEditModal'
import FlexBetween from '../../components/FlexBetween';
import MarkerDeleteModal from '../../components/modals/MarkerDeleteModal';

const MarkerActions = ({ params, snackbarShowMessage }) => {
  const {marker_id: id, imageUrl, userid, formattedTime, description, address} = params.row;


  return (
    <Box display='flex' gap={2}>
      <Tooltip title="Edit  marker">
      <IconButton>
      {/* <MarkerEditModal/> */}
      <MarkerEditModal params={params}/>
        </IconButton>


      </Tooltip>

        <IconButton
        >
          <MarkerDeleteModal params={params} />
        </IconButton>
    </Box>
  );
};

export default MarkerActions;
