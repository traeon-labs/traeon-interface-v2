import LinearProgress,{linearProgressClasses} from '@mui/material/LinearProgress';
import {styled} from '@mui/material/styles';

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[800],
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: 'rgb(222,222,222)',
      ...theme.applyStyles('dark', {
        backgroundColor: '#308fe8',
      }),
    },
  
}));