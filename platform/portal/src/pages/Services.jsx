import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box
} from '@mui/material'

function Services() {
  const [services, setServices] = useState([])

  useEffect(() => {
    // Mock data
    setServices([
      { id: 1, name: 'user-service', type: 'microservice', status: 'running', namespace: 'production' },
      { id: 2, name: 'order-service', type: 'microservice', status: 'running', namespace: 'production' },
      { id: 3, name: 'payment-service', type: 'microservice', status: 'running', namespace: 'production' },
      { id: 4, name: 'notification-service', type: 'microservice', status: 'running', namespace: 'staging' },
    ])
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'success'
      case 'pending': return 'warning'
      case 'error': return 'error'
      default: return 'default'
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Services
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Namespace</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id} hover>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.type}</TableCell>
                <TableCell>{service.namespace}</TableCell>
                <TableCell>
                  <Chip label={service.status} color={getStatusColor(service.status)} size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Services