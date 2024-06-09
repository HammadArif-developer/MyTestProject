import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { useAuthContext } from '../Context/AuthContext';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('/login');
  const router = useNavigate();
  const authContext = useAuthContext();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    router(newValue);
  };
  const handlelogout = async ()=>{
    await authContext.signOut();
    router('/login');
  }

  return (
    <BottomNavigation style={{ background: '#1976d2', color: 'white' }} value={value} onChange={handleChange}>
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Box flexGrow={1}>
          <Typography variant="h5" component="h4" style={{ width: "100%", textAlign: "center" }}>
            My Test Project
          </Typography>
        </Box>
        {localStorage.getItem('token') ? (
          <BottomNavigationAction
            style={{ color: 'white' }}
            label="Logout"
            value="/login"
            onClick={handlelogout}
            icon={<LogoutIcon />}
          />
        ) : null}
      </Box>
    </BottomNavigation>
  );
  
}
