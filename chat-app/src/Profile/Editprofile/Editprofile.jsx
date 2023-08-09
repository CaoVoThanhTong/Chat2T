import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function EditProfileModal({ isOpen, onClose, name, bio, onNameChange, onBioChange, onSave }) {
    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <TextField label="Name" value={name} onChange={onNameChange} fullWidth />
                <TextField label="Bio" value={bio} onChange={onBioChange} fullWidth multiline />
                <Button onClick={onSave} sx={{ mt: 2 }} variant="contained">Save</Button>
            </Box>
        </Modal>
    );
}
