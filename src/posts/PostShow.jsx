import { Show, SimpleShowLayout, TextField, ReferenceField, DateField } from 'react-admin';
import { Card, Typography, Divider } from '@mui/material';

export const PostShow = (props) => (
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
      <Typography variant="h5" color="primary" gutterBottom>Post Details</Typography>
      <Divider sx={{ mb: 3 }} />
      
      <TextField 
        source="title" 
        sx={{ 
          fontSize: { xs: '1.2rem', sm: '1.5rem' },
          fontWeight: 'bold',
          color: '#1976d2'
        }} 
      />
      
      <ReferenceField 
        label="Author" 
        source="authorId" 
        reference="users"
        sx={{ 
          '& .MuiTypography-root': {
            color: '#666',
            fontSize: '1.1rem'
          }
        }}
      >
        <TextField source="name" />
      </ReferenceField>
      
      <DateField 
        source="publishedDate"
        sx={{ 
          '& .MuiTypography-root': {
            color: '#666',
            fontStyle: 'italic'
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
    </SimpleShowLayout>
  </Show>
);