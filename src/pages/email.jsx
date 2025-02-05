import { mails, transformMessages } from "@/constants/data";
import { useToast } from "@/hooks/use-toast";
import { useGetAllUserMailsQuery } from "@/services";
import { useEffect } from "react";
import { Mail } from "../components/mail";

// Componente principal de la página de correos
export default function EmailPage() {
  // Variables para la configuración del diseño y estado de colapso del menú de navegación
  const defaultLayout = undefined; // Puede usarse para definir un layout predeterminado en el futuro
  const defaultCollapsed = undefined; // Controla si la navegación está colapsada o no por defecto

  const { toast } = useToast();
  const { data, error } = useGetAllUserMailsQuery();
  console.log(data);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        message: error.message,
        variant: "destructive",
      });
    }
  }, [data, error, toast]);

  return (
    <>
      <div className="hidden flex-col md:flex">
        <Mail
          mails={transformMessages(data) ?? mails} // Lista de correos electrónicos
          defaultLayout={defaultLayout} // Configuración del diseño por defecto (actualmente no definida)
          defaultCollapsed={defaultCollapsed} // Estado de colapso por defecto (actualmente no definido)
          navCollapsedSize={4} // Tamaño del menú de navegación cuando está colapsado
        />
      </div>
    </>
  );
}
