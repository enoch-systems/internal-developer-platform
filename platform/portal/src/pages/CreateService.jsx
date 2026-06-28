import { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Paper
} from '@mui/material'

function CreateService() {
  const [formData, setFormData] = useState({
    name: '',
    type: 'microservice',
    description: '',
    owner: '',
    repo_url: '',
    port: 8000
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: Call API to create service
    console.log('Creating service:', formData)
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Create New Service
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Service Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
            helperText="Lowercase letters, numbers, and hyphens only"
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Service Type</InputLabel>
            <Select
              name="type"
              value={formData.type}
              label="Service Type"
              onChange={handleChange}
            >
              <MenuItem value="microservice">Microservice</MenuItem>
              <MenuItem value="function">Serverless Function</MenuItem>
              <MenuItem value="job">Batch Job</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
          />

          <TextField
            fullWidth
            label="Owner / Team"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Git Repository URL"
            name="repo_url"
            value={formData.repo_url}
            onChange={handleChange}
            margin="normal"
            placeholder="https://github.com/org/repo"
          />

          <TextField
            fullWidth
            label="Port"
            name="port"
            type="number"
            value={formData.port}
            onChange={handleChange}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
          >
            Create Service
          </Button>
        </form>
      </Paper>
    </Box>
  )
}

export default CreateService