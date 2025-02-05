import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "@/lib/utils";

// Componente Avatar: encapsula el componente Root de Radix UI para crear un contenedor de avatar redondeado
const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref} // Referencia para manipulación directa del DOM si es necesario
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", // Clases predeterminadas para tamaño y forma
      className // Permite agregar clases adicionales desde props
    )}
    {...props} // Pasa cualquier otra prop al componente raíz
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName; // Asigna un nombre para facilitar la depuración

// Componente AvatarImage: renderiza la imagen dentro del avatar con un ajuste completo
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref} // Referencia para acceso directo al elemento de la imagen
    className={cn("aspect-square h-full w-full", className)} // Asegura que la imagen ocupe todo el espacio del avatar
    {...props} // Pasa otras props relevantes para la imagen
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName; // Nombre para depuración

// Componente AvatarFallback: muestra un contenido alternativo cuando la imagen no se carga
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref} // Referencia para posibles manipulaciones directas
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800", // Estilo de fondo neutro y centrado
      className // Permite personalización adicional
    )}
    {...props} // Otras props adicionales
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName; // Nombre para depuración

// Exporta los componentes para su uso en otras partes de la aplicación
export { Avatar, AvatarFallback, AvatarImage };
