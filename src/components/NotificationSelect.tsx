import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import ChatIcon from '@mui/icons-material/Chat';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)({
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': {
      borderColor: '#333',
    },
    '&:hover fieldset': {
      borderColor: '#ADD8E6',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ADD8E6',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'white',
    '&.Mui-focused': {
      color: '#ADD8E6',
    },
  },
  '& .MuiSelect-icon': {
    color: '#ADD8E6',
  },
});

interface NotificationSelectProps {
  value: string;
  onChange: (value: "email" | "discord" | "sms") => void;
}

export const NotificationSelect = ({ value, onChange }: NotificationSelectProps) => {
  return (
    <StyledFormControl fullWidth>
      <InputLabel>Notification Method</InputLabel>
      <Select
        value={value}
        label="Notification Method"
        onChange={(e) => onChange(e.target.value as "email" | "discord" | "sms")}
        sx={{ backgroundColor: '#1a1a1a' }}
      >
        <MenuItem value="email">
          <EmailIcon sx={{ mr: 1 }} /> Email
        </MenuItem>
        <MenuItem value="discord">
          <ChatIcon sx={{ mr: 1 }} /> Discord
        </MenuItem>
        <MenuItem value="sms">
          <SmsIcon sx={{ mr: 1 }} /> SMS
        </MenuItem>
      </Select>
    </StyledFormControl>
  );
}; 