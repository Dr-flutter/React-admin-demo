import { Card, CardContent, Typography, Grid, Box } from '@mui/material';import { useGetList } from 'react-admin';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const { data: users, total: totalUsers } = useGetList('users');
  const { data: posts, total: totalPosts } = useGetList('posts');

  // Prepare data for bar chart (number of posts per user)
  const postsPerUser = users?.map(user => ({
    name: user.name,
    posts: posts?.filter(post => post.authorId === user.id).length,
  }));

  // Prepare data for pie chart (distribution of published vs draft posts)
  const postStatusDistribution = [
    { name: 'Published', value: posts?.filter(post => post.status === 'published').length },
    { name: 'Draft', value: posts?.filter(post => post.status === 'draft').length },
  ];

  // Colors for Pie Chart
  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Dashboard
        </Typography>
        <Grid container spacing={3} sx={{ marginBottom: '20px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Card>
              <CardContent>
                <Typography color="textSecondary">
                  Total Users
                </Typography>
                <Typography variant="h4">
                  {totalUsers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card>
              <CardContent>
                <Typography color="textSecondary">
                  Total Posts
                </Typography>
                <Typography variant="h4">
                  {totalPosts}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Posts per User
        </Typography>
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <BarChart width={window.innerWidth < 600 ? 350 : 500} height={300} data={postsPerUser}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="posts" fill="#8884d8" />
          </BarChart>
        </Box>

        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Post Status Distribution
        </Typography>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <PieChart width={window.innerWidth < 600 ? 300 : 400} height={300}>
            <Pie
              data={postStatusDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {postStatusDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Dashboard;