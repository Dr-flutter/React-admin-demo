import { Show, SimpleShowLayout, TextField, DateField } from 'react-admin';
import { Card, Typography, Divider, Avatar } from '@mui/material';

export const UserShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout sx={{ 
      padding: { xs: '1rem', sm: '2rem', md: '3rem' },
      // backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      '& .RaShow-main': { 
        margin: '1rem',
        '& .MuiTypography-root': {
          marginBottom: '1rem'
        }
      }
    }}>
      <Typography variant="h5" color="primary" gutterBottom>User Profile</Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Avatar 
        sx={{ 
          width: 80, 
          height: 80, 
          bgcolor: '#1976d2',
          mb: 2
        }}
      >
        {props?.record?.name?.charAt(0)}
      </Avatar>
      
      <TextField 
        source="name" 
        sx={{ 
          fontSize: { xs: '1.2rem', sm: '1.5rem' },
          fontWeight: 'bold',
          color: '#1976d2'
        }} 
      />
      
      <TextField 
        source="email"
        sx={{
          '& .MuiTypography-root': {
            color: '#666',
            fontSize: '1.1rem'
          }
        }}
      />
      
      <TextField 
        source="status"
        sx={{
          '& .MuiTypography-root': {
            textTransform: 'capitalize',
            backgroundColor: '#e3f2fd',
            padding: '4px 12px',
            borderRadius: '16px',
            display: 'inline-block'
          }
        }}
      />
      
      <DateField 
        source="createdAt"
        sx={{
          '& .MuiTypography-root': {
            color: '#666',
            fontStyle: 'italic'
          }
        }}
      />
    </SimpleShowLayout>
  </Show>
);