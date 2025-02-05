import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCreateMessajeMutation, useGetAllUserMailsQuery } from "@/services";
import useGlobalStore from "@/zustand/global";
import { useState } from "react";

const CreateMail = () => {
  const [asunto, setAsunto] = useState("");
  const [cuerpoMensaje, setCuerpoMensaje] = useState("");
  const [destinatarios, setDestinatarios] = useState([
    { correoContacto: "", nombreContacto: "", idTipoCopia: "" },
  ]);

  const handleAddRecipient = () => {
    setDestinatarios([
      ...destinatarios,
      { correoContacto: "", nombreContacto: "", idTipoCopia: "" },
    ]);
  };

  const handleRecipientChange = (index, field, value) => {
    const updatedRecipients = [...destinatarios];
    updatedRecipients[index][field] = value;
    setDestinatarios(updatedRecipients);
  };

  const { toast } = useToast();
  const [sendMessage] = useCreateMessajeMutation();
  const { refetch } = useGetAllUserMailsQuery();
  const { setRefetch } = useGlobalStore();

  const handleSubmit = async () => {
    const payload = {
      asunto,
      cuerpoMensaje,
      idTipoCarpeta: "Rec",
      idCategoria: "PRI",
      destinatarios,
    };
    try {
      await sendMessage(payload).unwrap();
      console.log("Payload enviado:", payload);
      refetch(1);
      setRefetch(true);
      toast({
        title: "Mensaje enviado",
        message: "El mensaje ha sido enviado correctamente.",
      });
    } catch (error) {
      console.log("Error al enviar el mensaje:", error);
      toast({
        title: "Error",
        message: "No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Crear nuevo mensaje</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear nuevo mensaje</DialogTitle>
          <DialogDescription>
            Completa los campos para enviar un nuevo mensaje.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="asunto">Asunto</Label>
          <Input
            id="asunto"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            placeholder="Ingrese el asunto"
          />

          <Label htmlFor="cuerpoMensaje">Mensaje</Label>
          <Textarea
            id="cuerpoMensaje"
            value={cuerpoMensaje}
            onChange={(e) => setCuerpoMensaje(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
          />

          <Label>Destinatarios</Label>
          {destinatarios.map((dest, index) => (
            <div key={index} className="grid gap-2 border p-2 rounded-md">
              <Input
                type="email"
                placeholder="Correo"
                value={dest.correoContacto}
                onChange={(e) =>
                  handleRecipientChange(index, "correoContacto", e.target.value)
                }
              />
              <Input
                type="text"
                placeholder="Nombre"
                value={dest.nombreContacto}
                onChange={(e) =>
                  handleRecipientChange(index, "nombreContacto", e.target.value)
                }
              />
              <Input
                type="text"
                placeholder="Tipo de Copia (CO, COO)"
                value={dest.idTipoCopia}
                onChange={(e) =>
                  handleRecipientChange(index, "idTipoCopia", e.target.value)
                }
              />
            </div>
          ))}
          <Button onClick={handleAddRecipient}>Añadir destinatario</Button>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Enviar mensaje</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMail;
