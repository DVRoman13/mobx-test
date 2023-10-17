import { FC } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useUsers } from '../store/store.ts';
import { observer } from 'mobx-react-lite';
import { IUsers } from '../types.ts';
import { Link } from 'react-router-dom';

const Home: FC = observer(() => {
  const usersStore = useUsers();

  const handleDeleteUser = (id: number) => {
    usersStore.deleteUser(id);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        maxWidth: '90%',
        margin: '0 auto',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        gap: '20px',
      }}
    >
      {usersStore.users?.map((user: IUsers) => {
        return (
          <Card
            sx={{ maxWidth: '300px', width: '100%' }}
            key={user.id}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
              >
                {user.username}
              </Typography>
              <Typography
                sx={{ mb: 1.5 }}
                color="text.secondary"
              >
                {user?.email}
              </Typography>
              <Typography
                sx={{ mb: 1.5 }}
                color="text.secondary"
              >
                {user?.website}
              </Typography>

              <Button
                size="medium"
                sx={{ padding: '10px', border: '1px solid #1976d2' }}
              >
                <Link to={`users/${user.id}`}>Learn More</Link>
              </Button>
              <Button
                color="error"
                size="medium"
                sx={{ padding: '10px', border: '1px solid #d32f2f', marginLeft: '10px' }}
                onClick={() => handleDeleteUser(user.id!)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
});

export default Home;
