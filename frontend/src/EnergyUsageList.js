// frontend/src/EnergyUsageList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Card, CardContent, Box } from '@material-ui/core';


function EnergyUsageList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/energy-usage')
      .then(response => {
        setData(response.data.slice().reverse()); // Reversing to ensure the newest data is at the top
      })
      .catch(error => console.error("There was an error fetching the energy usage data:", error));
  }, []);

  const lastFiveData = data.slice(0, 5);

  
    return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Energy Usage Data
        </Typography>
        {/* Static list for the last five data entries */}
        {/* <List>
          {lastFiveData.map((item, index) => (
            <ListItem key={index}>
              <ListItemText 
                primary={`Timestamp: ${new Date(item.timestamp).toLocaleString()}`} 
                secondary={`Consumption: ${item.consumption} kWh - Device: ${item.device}`} 
              />
            </ListItem>
          ))}
        </List> */}
        {/* Scrollable List for the rest of the data */}
        <Box style={{ maxHeight: 200, overflow: 'auto' }}>
          <List>
            {data.map((item, index) => (
              <ListItem key={index}>
                <ListItemText 
                  primary={`Timestamp: ${new Date(item.timestamp).toLocaleString()}`} 
                  secondary={`Consumption: ${item.consumption} kWh - Device: ${item.device}`} 
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
}

export default EnergyUsageList;