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

    // Mock list of discoverable devices
    const mockDiscoverableDevices = [
        { deviceId: "thermostat123", name: "Smart Thermostat", type: "Thermostat" },
        { deviceId: "lightbulb456", name: "Energy Efficient Lightbulb", type: "Lightbulb" },
        // Add more mock devices with unique deviceId values
    ];

    const handleDiscoverDevices = () => {
        // Simulate the discovery process
        console.log("Discovering devices...");
        setDiscoveredDevices(mockDiscoverableDevices);
        setIsDevicesDiscovered(true);
    };

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

    return (
        <Container component={Paper} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h6">Device Discovery and Management</Typography>
            <Button onClick={handleDiscoverDevices} color="primary" variant="contained">
                Discover Devices
            </Button>
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
