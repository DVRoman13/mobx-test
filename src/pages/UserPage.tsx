import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useUsers } from '../store/store.ts';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';

const UserPage: React.FC = observer(() => {
  const { getUser, user, deleteUser, editUser, users } = useUsers();
  const { id } = useParams();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState(user?.username);

  useEffect(() => {
    getUser(id);
  }, [id, users]);

  useEffect(() => {
    setName(user?.username);
  }, [user]);

  const handleSaveName = () => {
    if (!name) return;
    editUser(name, user?.id!);
    setEditMode(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: '300px', width: '100%' }}>
        <CardContent>
          {editMode ? (
            <TextField
              error={!name}
              id="standard-helperText"
              label="Edit name"
              value={name}
              variant="standard"
              onChange={e => setName(e.target.value)}
              helperText={!name ? 'Please add name' : ''}
            />
          ) : (
            <Typography
              gutterBottom
              variant="h5"
              component="div"
            >
              {name}
            </Typography>
          )}
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
            disabled={!name}
            sx={{ padding: '10px', border: '1px solid #1976d2' }}
            onClick={() => (editMode ? handleSaveName() : setEditMode(!editMode))}
          >
            {editMode ? 'Save' : 'Edit name'}
          </Button>
          <Button
            color="error"
            size="medium"
            sx={{ padding: '10px', border: '1px solid #d32f2f', marginLeft: '10px' }}
            onClick={() => {
              deleteUser(user?.id!);
              navigate('/');
            }}
          >
            Delete
          </Button>
        </CardContent>
      </Card>
    </>
  );
});

export default UserPage;
