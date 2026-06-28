import { Typography, Box, Paper } from '@mui/material'

function Documentation() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Documentation
      </Typography>
      
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Getting Started
        </Typography>
        <Typography paragraph>
          Welcome to the Internal Developer Platform. This portal helps you deploy and manage your services
          without worrying about infrastructure.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Creating Your First Service
        </Typography>
        <Typography paragraph>
          1. Navigate to "New Service" in the sidebar
          <br />
          2. Fill in service details (name, type, owner)
          <br />
          3. Connect your Git repository
          <br />
          4. Click "Create" and let the platform handle the rest
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Observability
        </Typography>
        <Typography paragraph>
          All services come with built-in monitoring:
          <br />
          - Metrics: Available in Grafana dashboards
          <br />
          - Logs: Centralized in ELK Stack
          <br />
          - Traces: Distributed tracing via OpenTelemetry
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Need Help?
        </Typography>
        <Typography paragraph>
          Contact the Platform Team: platform@company.com
        </Typography>
      </Paper>
    </Box>
  )
}

export default Documentation