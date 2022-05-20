
// // @mui
// import { styled, useTheme } from '@mui/material/styles';
// import { Box, Button, AppBar, Toolbar, Container } from '@mui/material';
// import useOffSetTop from '../utils/useOffSetTop';

// // ----------------------------------------------------------------------

// const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
//     height: 64,
//     transition: theme.transitions.create(['height', 'background-color'], {
//         easing: theme.transitions.easing.easeInOut,
//         duration: theme.transitions.duration.shorter,
//     }),
//     [theme.breakpoints.up('md')]: {
//         height: 88,
//     },
// }));

// const ToolbarShadowStyle = styled('div')(({ theme }) => ({
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height: 24,
//     zIndex: -1,
//     margin: 'auto',
//     borderRadius: '50%',
//     position: 'absolute',
//     width: `calc(100% - 48px)`,
//     boxShadow: theme.customShadows.z8,
// }));

// // ----------------------------------------------------------------------

// export default function Navbar() {
//     const isOffset = useOffSetTop(88);

//     const theme = useTheme();

//     return (
//         <Box sx={{ flexGrow: 1 }}>
//             <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent', mb: 72 }}>
//                 <ToolbarStyle
//                     disableGutters
//                     sx={{
//                         ...(isOffset && {
//                             ...cssStyles(theme).bgBlur(),
//                             height: { md: 72 },
//                         }),
//                     }}
//                 >
//                     <Container
//                         sx={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'space-between',
//                         }}
//                     >

//                         {/* <Label color="info" sx={{ ml: 1 }}> */}
//                         A1 Technologies
//                         {/* </Label> */}
//                         <Box sx={{ flexGrow: 1 }} />


//                     </Container>
//                 </ToolbarStyle>

//                 {isOffset && <ToolbarShadowStyle />}
//             </AppBar>
//         </Box>
//     );
// }
