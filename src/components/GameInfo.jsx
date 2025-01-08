import React from "react";
import { FaRedo, FaPause } from "react-icons/fa";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
  Tooltip,
  OutlinedInput,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function GameInfo({ matchedPairs, attempts, timer, restartGame, setEmojiSet, pauseGame }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: { xs: 2, sm: 3, md: 4 },
        margin: "auto",
        maxWidth: { xs: '90%', sm: '80%', md: '60%' },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          mb: { xs: 2, sm: 3, md: 4 },
          textAlign: "center",
          fontFamily: "'Caveat', cursive",
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
        }}
      >
        MemoryFlip
      </Typography>

      <FormControl sx={{ flex: 1, minWidth: { xs: 200, sm: 240 }, mb: { xs: 2, sm: 3 } }} variant="outlined">
        <InputLabel id="emoji-set-label">Modo</InputLabel>
        <Select
          labelId="emoji-set-label"
          defaultValue="frutas"
          onChange={(e) => setEmojiSet(e.target.value)}
          size="small"
          input={<OutlinedInput label="Modo" />}
          IconComponent={ExpandMoreIcon}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.dark",
            },
            "& .MuiSelect-icon": {
              color: "primary.main",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                mt: 1,
              },
            },
          }}
        >
          <MenuItem value="frutas">🍓 Frutas</MenuItem>
          <MenuItem value="caras">😎 Caras</MenuItem>
          <MenuItem value="animales">🐢 Animales</MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: { xs: 1, sm: 2 },
          mb: { xs: 2, sm: 3 },
        }}
      >
        <Tooltip title="Pausar Juego">
          <IconButton
            onClick={pauseGame}
            sx={{
              backgroundColor: "#616161",
              "&:hover": { backgroundColor: "#424242" },
              color: "white",
            }}
          >
            <FaPause />
          </IconButton>
        </Tooltip>

        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: { xs: '1rem', sm: '1.25rem' },
            flexGrow: 1, // Permite que el tiempo se centre al crecer
          }}
        >
          Tiempo: {timer}s
        </Typography>

        <Tooltip title="Reiniciar Juego">
          <IconButton
            onClick={restartGame}
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
              color: "white",
            }}
          >
            <FaRedo />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default GameInfo;
