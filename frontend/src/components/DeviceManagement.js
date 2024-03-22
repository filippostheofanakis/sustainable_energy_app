import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';

function DeviceManagement() {
    const [open, setOpen] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState({});
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [discoveredDevices, setDiscoveredDevices] = useState([]);
    const [isDevicesDiscovered, setIsDevicesDiscovered] = useState(false);

    const [deviceData, setDeviceData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    // Mock list of discoverable devices
    const mockDiscoverableDevices = [
        { deviceId: "thermostat123", name: "Smart Thermostat", type: "Thermostat" },
        { deviceId: "lightbulb456", name: "Energy Efficient Lightbulb", type: "Lightbulb" },
        // Add more mock devices with unique deviceId values
    ];

    const handleMdnsDiscovery = async () => {
  console.log("Starting mDNS device discovery...");
  try {
    const response = await axios.get('http://localhost:5000/api/start-discovery');
    console.log(response.data); // Should log 'Device discovery started'
  } catch (error) {
    console.error("Error starting mDNS device discovery:", error);
  }
};

    const handleDiscoverDevices = async () => {
        console.log("Discovering devices...");
        setIsLoading(true);
        try {
            // Assuming your backend updates a list of devices upon discovery
            const response = await axios.get('http://localhost:5000/api/devices');
            console.log(response.data);
            setDiscoveredDevices(response.data);
            setIsDevicesDiscovered(true);
        } catch (error) {
            console.error("Error during device discovery:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleAddDevice = async () => {
        try {
            const deviceData = {
                deviceId: selectedDevice.deviceId, // Make sure this is correctly assigned
                name: selectedDevice.name,
                type: selectedDevice.type,
                apiEndpoint: apiEndpoint // Ensure this matches the backend model
            };
    
            const response = await axios.post('http://localhost:5000/api/devices', deviceData);
            if (response.status === 201) {
                alert("Device added successfully!");
                // Clear state and close dialog
                setApiEndpoint('');
                setOpen(false);
                // Refresh or update device list if necessary
                setIsDevicesDiscovered(false);
                setDiscoveredDevices([]);
            }
        } catch (error) {
            console.error("Error adding device:", error.response.data.message);
            alert(`Error adding device: ${error.response.data.message}`);
        }
    };
    

    const handleClickOpen = (device) => {
        setSelectedDevice(device);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const fetchDeviceData = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get('http://localhost:5000/api/devices/fetch-simulated-device-data');
          setDeviceData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching device data:', error);
          setError('Failed to fetch device data. Please try again.');
          setIsLoading(false);
        }
      };


    return (
        <Container component={Paper} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h6">Device Discovery and Management</Typography>
            <Button onClick={handleDiscoverDevices} color="primary" variant="contained">
                Discover Devices
            </Button>
            <Button onClick={handleMdnsDiscovery} color="primary" variant="contained">
  Discover mDNS Devices
</Button>
            <Button onClick={fetchDeviceData} color="primary" variant="contained" style={{ marginLeft: '10px' }}>
                Fetch Device Data
            </Button>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {deviceData && (
                <div>
                    <p>Timestamp: {deviceData.timestamp}</p>
                    <p>Consumption: {deviceData.consumption}</p>
                </div>
            )}
            {isDevicesDiscovered && (
                <List>
                    {discoveredDevices.map((device, index) => (
                        <ListItem button key={index} onClick={() => handleClickOpen(device)}>
                            <ListItemText primary={`${device.name} - ${device.type}`} />
                        </ListItem>
                    ))}
                </List>
            )}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Device</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="apiEndpoint"
                        label="Device API Endpoint"
                        type="text"
                        fullWidth
                        value={apiEndpoint}
                        onChange={(e) => setApiEndpoint(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddDevice} color="primary">
                        Add Device
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default DeviceManagement;
