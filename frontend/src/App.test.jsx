import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the API service to avoid axios import issues and backend dependency
vi.mock('./services/api', () => ({
  getMatches: vi.fn(() => Promise.resolve([]))
}));

test('renders app without crashing', async () => {
  render(<App />);
  // Wait for the loading state to resolve to avoid act warnings
  await screen.findByText(/Match/i);
  // Also wait for the data fetch to complete (loading spinner to disappear)
  // This ensures all state updates are processed
  await screen.findByText(/NO DATA FOUND/i).catch(() => {}); // It might not show if empty, but MainLayout header is always there
});
