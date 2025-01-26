import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";

function App() {
  return (
    <>
      <Sidebar />
      <Button variant="primary" size="sm" text="Share" />
      <Card title="Important links" type="youtube" link="https://youtube.com" />
    </>
  );
}

export default App;
