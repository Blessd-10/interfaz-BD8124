import { Inbox, Search, Users2 } from "lucide-react";
import * as React from "react";

import ButtonList from "@/components/button-list";
import CreateMail from "@/components/create-mail";
import { MailDisplay } from "@/components/mail-display";
import { MailList } from "@/components/mail-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import UserTimeDisplay from "@/components/user-details";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useMail } from "@/logic/use-mail";
import { useGetCategoriasQuery, useLogoutMutation } from "@/services";
import useGlobalStore from "@/zustand/global";
import { useNavigate } from "react-router";

export function Mail({
  mails,
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize,
}) {
  // STATES
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const {
    selectedCategory,
    setSelectedCategory,
    selectedFolder,
    setSelectedFolder,
  } = useGlobalStore();

  const { user } = useGlobalStore();

  // HOOKS
  const [mail] = useMail();

  // UTILS
  const { toast } = useToast();
  const navigate = useNavigate();

  // Service call to logout
  const [logout] = useLogoutMutation();
  const { data: categorias } = useGetCategoriasQuery();
  console.log(categorias);

  const onLogout = React.useCallback(async () => {
    try {
      await logout().unwrap();
      navigate("/");
      toast({
        title: "Exito",
        message: "Cerraste sesión correctamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        message: error.message,
        variant: "destructive",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onResize={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex flex-col h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <UserTimeDisplay username={user.id} email={user.email} />
          </div>
          <Separator />
          <div className="flex px-2 w-full py-4">
            <ButtonList
              activeTab={selectedFolder}
              onTabClick={(tab) => setSelectedFolder(tab)}
              buttons={[
                {
                  title: "Recibido",
                  id: "Rec",
                  label: "128",
                  icon: Inbox,
                  variant: "ghost",
                },
                {
                  title: "Enviado",
                  id: "Env",
                  label: "128",
                  icon: Inbox,
                  variant: "ghost",
                },
                {
                  title: "Borrador",
                  id: "Bor",
                  label: "128",
                  icon: Inbox,
                  variant: "ghost",
                },
              ]}
            />
          </div>
          <Separator />
          <div className="flex px-2 w-full py-4">
            <ButtonList
              activeTab={selectedCategory}
              onTabClick={(tab) => setSelectedCategory(tab)}
              buttons={[
                {
                  title: "Social",
                  label: "972",
                  icon: Users2,
                  variant: "ghost",
                },
              ]}
            />
          </div>

          <Button variant="destructive" onClick={onLogout}>
            Cerrar sesion
          </Button>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2 justify-between">
              <h1 className="text-xl font-bold">Inbox</h1>
              <CreateMail />
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar correo" className="pl-8" />
                </div>
              </form>
            </div>
            <MailList
              items={mails?.filter((i) => {
                if (selectedFolder === i.idtipocarpeta) return true;
                return false;
              })}
            />
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <MailDisplay
            mail={mails.find((item) => item.id === mail.selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
