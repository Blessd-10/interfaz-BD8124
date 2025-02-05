import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMail } from "@/logic/use-mail";

// Componente MailList: renderiza una lista de correos electrónicos con detalles básicos
export function MailList({ items }) {
  const [mail, setMail] = useMail(); // Hook personalizado para obtener y actualizar el estado del correo seleccionado

  return (
    <ScrollArea className="h-[80dvh]"> {/* Área de scroll para manejar listas largas de correos */}
      <div className="flex flex-col gap-2 p-4 pt-0"> {/* Contenedor de la lista con espaciado entre elementos */}
        {items.map((item) => (
          <button
            key={item.id} // Clave única para cada correo
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent", // Estilos base del correo
              mail.selected === item.id && "bg-muted" // Destacar el correo seleccionado
            )}
            onClick={() =>
              setMail({
                ...mail,
                selected: item.id, // Actualiza el estado con el correo seleccionado
              })
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div> {/* Nombre del remitente */}
                  {!item.read && ( // Indicador de correo no leído
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    mail.selected === item.id
                      ? "text-foreground" // Estilo para el correo seleccionado
                      : "text-muted-foreground" // Estilo para correos no seleccionados
                  )}
                >
                  {formatDistanceToNow(new Date(item.date), { // Muestra el tiempo transcurrido desde la fecha del correo
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{item.subject}</div> {/* Asunto del correo */}
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground"> {/* Vista previa del contenido del correo */}
              {item.text.substring(0, 300)}
            </div>
            {item.labels.length ? ( // Renderiza las etiquetas si existen
              <div className="flex items-center gap-2 pb-10">
                {item.labels.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}> {/* Etiqueta con su variante de estilo */}
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

// Función auxiliar para determinar la variante del Badge según la etiqueta
function getBadgeVariantFromLabel(label) {
  if (["work"].includes(label.toLowerCase())) {
    return "default"; // Estilo por defecto para correos de trabajo
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline"; // Estilo outline para correos personales
  }

  return "secondary"; // Estilo secundario para otras etiquetas
}
