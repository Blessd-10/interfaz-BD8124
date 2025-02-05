import { mails, transformMessages } from "@/constants/data";
import { useToast } from "@/hooks/use-toast";
import { useGetAllUserMailsQuery } from "@/services";
import { useEffect, useMemo, useState } from "react";
import { Mail } from "../components/mail";

// Componente principal de la página de correos
export default function EmailPage() {
  // Variables para la configuración del diseño y estado de colapso del menú de navegación
  const defaultLayout = undefined; // Puede usarse para definir un layout predeterminado en el futuro
  const defaultCollapsed = undefined; // Controla si la navegación está colapsada o no por defecto

  const { toast } = useToast();
  const { data, error } = useGetAllUserMailsQuery();
  const [messages, setMessages] = useState(null);
  const getAllMessages = async () => {
    try {
      const res = await fetch("http://localhost:3000/mensajes");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  console.log(messages, data);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        message: error.message,
        variant: "destructive",
      });
    }
  }, [data, error, toast]);

  const mailsData = useMemo(() => {
    if (data) {
      return transformMessages(data);
    }
    if (messages) {
      return transformMessages(messages);
    }
    return mails;
  }, [data, messages]);

  return (
    <>
      <div className="hidden flex-col md:flex">
        <Mail
          mails={mailsData} // Lista de correos electrónicos
          defaultLayout={defaultLayout} // Configuración del diseño por defecto (actualmente no definida)
          defaultCollapsed={defaultCollapsed} // Estado de colapso por defecto (actualmente no definido)
          navCollapsedSize={4} // Tamaño del menú de navegación cuando está colapsado
        />
      </div>
    </>
  );
}
