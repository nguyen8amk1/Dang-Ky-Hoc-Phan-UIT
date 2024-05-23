import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import {Button, Typography, List, ListItem, ListItemText, ListItemButton, Stack} from '@mui/material';
import SignInWithGoogleButton from './SignInWithGoogleButton';
import {useState} from 'react';

function Login({loggedIn=false, setEvent__suddenlyDontWantToLoginAnymore}) {
    const [open, setOpen] = useState(true); 
    //if(loggedIn) return <></>

    const handleClose = () => {
        console.log("FUCKING WOW SHIT");
        setOpen(false); 
        setEvent__suddenlyDontWantToLoginAnymore(true);
    }

    return(
        <>
            <Dialog onClose={handleClose}  open={open}>
                <DialogTitle>Đăng nhập với Google</DialogTitle>
                <DialogContent>
                <List sx={{ 
                    pt: 0, 
                    width: "15em", 
                    height: "17em"
                }}>
                    <ListItem disableGutters sx={{
                        width: "10em", 
                        height: "12em"
                    }}>
                    <Stack direction="column" spacing={2}>
                    <img style={{width: '100%', height: '100%'}} alt="This suppose to be a meme :))"
                        src="https://www.mememaker.net/static/images/memes/4806874.jpg"/>

                    <SignInWithGoogleButton/>
                    </Stack>
                    </ListItem>
                </List>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Login;
