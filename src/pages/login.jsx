import { useLoginUserMutation } from "@/services";
import { useState } from "react";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      await loginUser(email).unwrap();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Usuario no encontrado, intenta de nuevo");
    }
  };

  return (
    <div className="flex h-screen flex-col justify-center items-center w-screen gap-4">
      <h1>Iniciar sesion</h1>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <button onClick={onLogin}>Iniciar sesion</button>
    </div>
  );
};

export default LoginPage;
