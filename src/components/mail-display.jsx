//* eslint-disable react/prop-types */
// Importación de utilidades para el manejo de fechas
import format from "date-fns/format";

// Importación de iconos desde la librería 'lucide-react'
import { Archive, MoreVertical, Trash2 } from "lucide-react";

// Importación de componentes personalizados de la UI
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Componente principal para mostrar un correo electrónico
export function MailDisplay({ mail }) {
  return (
    <div className="flex h-full flex-col">
      {/* Barra de herramientas con acciones sobre el correo */}
      <div className="flex items-center p-2 justify-between">
        <div className="flex items-center gap-2">
          {/* Botón para archivar el correo */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <Archive className="h-4 w-4" />
                <span className="sr-only">Archivar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archivar</TooltipContent>
          </Tooltip>

          {/* Botón para eliminar el correo */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Eliminar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Eliminar</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="mx-1 h-6" />
        </div>
        <div className="flex items-center gap-2">
          <Separator orientation="vertical" className="mx-2 h-6" />

          {/* Menú desplegable para más opciones */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Mas</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Marcar como leido</DropdownMenuItem>
              <DropdownMenuItem>Empezar hilo</DropdownMenuItem>
              <DropdownMenuItem>Añadir categoria</DropdownMenuItem>
              <DropdownMenuItem>Silenciar hilo</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Separator />

      {/* Sección principal del correo */}
      {mail ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={mail.name} />
                <AvatarFallback>
                  {mail.name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{mail.name}</div>
                <div className="line-clamp-1 text-xs">{mail.subject}</div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Reply-To:</span> {mail.email}
                </div>
              </div>
            </div>
            {mail.date && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(mail.date), "PPpp")}
              </div>
            )}
          </div>

          <Separator />

          {/* Cuerpo del mensaje */}
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {mail.text}
          </div>

          <Separator className="mt-auto" />

          {/* Sección para responder el correo */}
          <div className="p-4">
            <form>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  placeholder={`Responder ${mail.name}...`}
                />
                <div className="flex items-center">
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    className="ml-auto"
                  >
                    enviar
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No se ha seleccionado ningún correo
        </div>
      )}
    </div>
  );
}
