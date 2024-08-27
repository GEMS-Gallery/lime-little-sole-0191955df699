import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, TextField, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useForm, Controller } from 'react-hook-form';
import { backend } from 'declarations/backend';

interface Player {
  id: number;
  name: string;
  lifeTotal: number;
}

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const { control, handleSubmit } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [lifeTotals, playerNames] = await Promise.all([
        backend.getLifeTotals(),
        backend.getPlayerNames()
      ]);
      setPlayers(lifeTotals.map((life, index) => ({
        id: index,
        name: playerNames[index] || `Player ${index + 1}`,
        lifeTotal: Number(life)
      })));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const updateLifeTotal = async (playerId: number, change: number) => {
    setLoading(true);
    try {
      await backend.updateLifeTotal(playerId, BigInt(change));
      await fetchData();
    } catch (error) {
      console.error('Error updating life total:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetLifeTotals = async () => {
    setLoading(true);
    try {
      await backend.resetLifeTotals();
      await fetchData();
    } catch (error) {
      console.error('Error resetting life totals:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await Promise.all(Object.entries(data).map(([key, value]) => {
        const playerId = parseInt(key.split('-')[1]);
        return backend.setPlayerName(playerId, value as string);
      }));
      await fetchData();
    } catch (error) {
      console.error('Error updating player names:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" align="center" gutterBottom sx={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        MTG Commander Life Counter
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {players.map((player) => (
            <Grid item xs={12} sm={6} md={3} key={player.id}>
              <div className="player-section">
                <Controller
                  name={`name-${player.id}`}
                  control={control}
                  defaultValue={player.name}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Player Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
                <Typography variant="h3" className="life-total">
                  {player.lifeTotal}
                </Typography>
                <Grid container spacing={1} justifyContent="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => updateLifeTotal(player.id, -1)}
                      startIcon={<RemoveIcon />}
                    >
                      -1
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => updateLifeTotal(player.id, 1)}
                      startIcon={<AddIcon />}
                    >
                      +1
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          ))}
        </Grid>
        <Grid container justifyContent="center" spacing={2} sx={{ mt: 4 }}>
          <Grid item>
            <Button type="submit" variant="contained" color="secondary">
              Update Names
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="error"
              onClick={resetLifeTotals}
              startIcon={<RefreshIcon />}
            >
              Reset Life Totals
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="attribution">
        <a href="https://unsplash.com/photos/a-table-topped-with-lots-of-different-types-of-items-4DaSc3Sn76A" target="_blank" rel="noopener noreferrer">
          Background image from Unsplash
        </a>
      </div>
    </Container>
  );
};

export default App;
