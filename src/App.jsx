import { Admin, Resource, Login } from 'react-admin';
import { PostList, PostEdit, PostCreate, PostShow } from './posts';
import { UserList, UserEdit, UserCreate, UserShow } from './users';
import jsonServerProvider from 'ra-data-simple-rest';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import styles from './App.module.css';

const dataProvider = jsonServerProvider('http://localhost:3000');


const CustomLoginPage = () => (
  <section className={styles.loginWrapper}>
    <Login
    backgroundImage="/background.jpg"  
    title="Admin Dashboard"
    className={styles.loginComponent}
  />
  </section>
);

const App = () => (
  <Admin 
    authProvider={authProvider} 
    dataProvider={dataProvider} 
    
    dashboard={Dashboard}
    loginPage={CustomLoginPage}
    requireAuth
  >
    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} show={PostShow} />
    <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} show={UserShow} />
  </Admin>
);

export default App;