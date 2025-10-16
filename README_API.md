How to configure backend URL for the frontend

This project reads the backend base URL from Vite env variable `VITE_API_URL`.

Create a file named `.env` in the project root with the following content:

VITE_API_URL=http://127.0.0.1:8000

Restart the dev server after changing `.env`.

If you don't set `VITE_API_URL`, the frontend will default to `http://127.0.0.1:8000`.

Reconnect button

If the frontend cannot reach the backend on startup, the app will fall back to local sample data and show a "Sprawdź połączenie" button on the Todo page. Click it to try to reconnect to the backend.