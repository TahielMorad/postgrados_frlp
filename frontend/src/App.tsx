import { AppRouter } from "./routes/AppRouter";
import { AppShell } from "./shared/components/AppShell";

function App() {
  return (
    <AppShell>
      <AppRouter />
    </AppShell>
  );
}

export default App;
