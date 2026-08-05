import { AppRouter } from "./routes/AppRouter";
import { AuthProvider } from "./shared/auth/AuthContext";
import { AppShell } from "./shared/components/AppShell";

function App() {
  return (
    <AuthProvider>
      <AppShell>
        <AppRouter />
      </AppShell>
    </AuthProvider>
  );
}

export default App;
