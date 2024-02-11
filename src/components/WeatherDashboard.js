import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../security/AuthContext';  

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (authToken) {
          const response = await axios.get('http://localhost:8080/weather/city/all', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          setWeatherData(response.data);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Error fetching weather data. Please try again later.');
      }
    };

    fetchData();
  }, [authToken]); 
  return (
    <div>
      <h2>Weather Dashboard</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature (°C)</th>
              <th>Pressure</th>
              <th>Humidity</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.map((cityData) => (
              <tr key={cityData.city}>
                <td>{cityData.city}</td>
                <td>{cityData.temp}</td>
                <td>{cityData.pressure}</td>
                <td>{cityData.humidity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WeatherDashboard;
