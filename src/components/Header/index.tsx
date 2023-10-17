import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        height: '100px',
        justifyContent: 'center',
      }}
    >
      <Typography sx={{ minWidth: 100 }}>
        <Link to={'/'}>Home</Link>
      </Typography>
      <Typography
        sx={{ minWidth: 100 }}
        style={{ color: '#000' }}
      >
        <Link to={'/create-user'}>Create user</Link>
      </Typography>
    </Box>
  );
};

export default Header;
