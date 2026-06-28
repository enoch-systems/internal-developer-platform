import { Grid, Paper, Typography, Box } from '@mui/material'
import { useState, useEffect } from 'react'

function Dashboard() {
  const [stats, setStats] = useState({
    services: 0,
    deployments: 0,
    incidents: 0,
    uptime: '99.9%'
  })

  useEffect(() => {
    // Mock data - later will fetch from API
    setStats({
      services: 12,
      deployments: 48,
      incidents: 0,
      uptime: '99.9%'
    })
  }, [])

  const cards = [
    { title: 'Active Services', value: stats.services, color: '#1976d2' },
    { title: 'Deployments (30d)', value: stats.deployments, color: '#2e7d32' },
    { title: 'Open Incidents', value: stats.incidents, color: stats.incidents > 0 ? '#d32f2f' : '#2e7d32' },
    { title: 'Platform Uptime', value: stats.uptime, color: '#388e3c' },
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
                borderTop: `4px solid ${card.color}`
              }}
            >
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {card.title}
              </Typography>
              <Typography component="p" variant="h4">
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Recent Deployments
            </Typography>
            <Typography color="text.secondary">
              Deployment activity will appear here
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Platform Health
            </Typography>
            <Typography color="text.secondary">
              System status overview
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard