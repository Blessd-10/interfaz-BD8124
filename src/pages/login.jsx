import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoginUserMutation } from "@/services";
import { useNavigate } from "react-router";
// Forms
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import useGlobalStore from "@/zustand/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email({ message: "Email invalido!" }),
});

const LoginPage = () => {
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
    },
  });
  const { setUser } = useGlobalStore();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data.email).unwrap();
      setUser(res.user);
      toast({
        title: "Éxito",
        description: "Sesión iniciada correctamente",
      });
      navigate("/email");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Hubo un error al iniciar sesión",
      });
    }
  };

  return (
    <div className="flex h-screen flex-col justify-center items-center w-screen gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Email login
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@example.co" {...field} />
                </FormControl>
                <FormDescription>
                  Este es el email para iniciar sesión
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Iniciar sesión</Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
