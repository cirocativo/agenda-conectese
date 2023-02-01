import "./Global.css";
import { Header } from "./Components/Header";
import { LoginForm } from "./Components/LoginForm";

function App() {
  return (
    <div className="w-screen h-screen">
      <Header title="ConecteSe"></Header>
      <LoginForm></LoginForm>
    </div>
  );
}

export default App;
