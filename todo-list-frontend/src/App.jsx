import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios';
import Todos from './components/Todos';
import NavigationHeader from './components/NavigationHeader';


const queryClient = new QueryClient()

export const api = axios.create({
  baseURL: "http://localhost:1337/api"
})



export default function App() {
  
  const [search, setSearch] = useState("")
  // DARK MODE
  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <Notifications />
          <NavigationHeader onSearch={ setSearch } search={search}/>
          <Todos search={search} />
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
}