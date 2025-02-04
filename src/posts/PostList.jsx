import { List, Datagrid, TextField, ReferenceField, DateField, EditButton, Filter, TextInput, SelectInput, Pagination } from 'react-admin';

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <SelectInput source="status" choices={[
      { id: 'published', name: 'Published' },
      { id: 'draft', name: 'Draft' },
    ]} />
  </Filter>
);

export const PostList = (props) => (
  <List {...props} 
    filters={<PostFilter />}
    pagination={<Pagination rowsPerPageOptions={[10, 25, 50]} />}
    perPage={10}
    sx={{ 
      '& .RaList-main': { 
        margin: { xs: '0.5rem', sm: '1rem', md: '2rem' } 
      } 
    }}
  >
    <Datagrid sx={{
      '& .RaDatagrid-headerCell': {
        backgroundColor: 'none',
      },
    }}>
      <TextField source="title" />
      <ReferenceField 
        label="Author" 
        source="authorId" 
        reference="users"
        sx={{ display: { xs: 'none', sm: 'table-cell' } }}
      >
        <TextField source="name" />
      </ReferenceField>
      <DateField source="publishedDate" sx={{ display: { xs: 'none', md: 'table-cell' } }} />
      <TextField source="status" />
      <EditButton />
    </Datagrid>
  </List>
);