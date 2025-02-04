import { defaultTheme } from 'react-admin';

export const myTheme = {
    ...defaultTheme,
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#1e88e5',
                    width: {
                        xs: 240,
                        sm: 240,
                        md: 280
                    },
                    '& .RaMenuItemLink-active': {
                        backgroundColor: '#1565c0',
                        borderLeft: '3px solid #fff',
                        '&:hover': {
                            backgroundColor: '#1565c0',
                        }
                    },
                    '& .MuiMenuItem-root': {
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        }
                    }
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1976d2',
                    width: {
                        xs: '100%',
                        sm: `calc(100% - ${240}px)`,
                        md: `calc(100% - ${280}px)`
                    },
                    marginLeft: {
                        xs: 0,
                        sm: 240,
                        md: 280
                    },
                    '& .RaAppBar-title': {
                        '&.active': {
                            color: '#4fc3f7',
                            fontWeight: 'bold'
                        }
                    }
                }
            }
        }
    }
};