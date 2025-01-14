import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface PriceSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const PriceSlider = ({ value, onChange, min = 0, max = 1000 }: PriceSliderProps) => {
  return (
    <Box sx={{ width: '100%', padding: '20px' }}>
      <Typography gutterBottom color="white">
        Price Threshold: ${value}
      </Typography>
      <Slider
        value={value || min}
        onChange={(_, newValue) => onChange(newValue as number)}
        min={min}
        max={max}
        sx={{
          color: '#ADD8E6',
          '& .MuiSlider-thumb': {
            backgroundColor: '#ADD8E6',
          },
          '& .MuiSlider-track': {
            backgroundColor: '#ADD8E6',
          },
          '& .MuiSlider-rail': {
            backgroundColor: '#333',
          }
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
        <Typography>${min}</Typography>
        <Typography>${max}</Typography>
      </Box>
    </Box>
  );
}; 