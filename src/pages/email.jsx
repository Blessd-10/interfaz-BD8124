import { Mail } from "../components/mail";
import { accounts, mails } from "../constants/data";

// Componente principal de la página de correos
export default function EmailPage() {
  // Variables para la configuración del diseño y estado de colapso del menú de navegación
  const defaultLayout = undefined; // Puede usarse para definir un layout predeterminado en el futuro
  const defaultCollapsed = undefined; // Controla si la navegación está colapsada o no por defecto

  return (
    <>
      {/* Contenedor principal que solo se muestra en pantallas medianas o más grandes */}
      <div className="hidden flex-col md:flex">
        <Mail
          accounts={accounts} // Lista de cuentas de correo para mostrar
          mails={mails} // Lista de correos electrónicos
          defaultLayout={defaultLayout} // Configuración del diseño por defecto (actualmente no definida)
          defaultCollapsed={defaultCollapsed} // Estado de colapso por defecto (actualmente no definido)
          navCollapsedSize={4} // Tamaño del menú de navegación cuando está colapsado
        />
      </div>
    </>
  );
}
