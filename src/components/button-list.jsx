import { Button } from "@/components/ui/button";

const ButtonList = ({ activeTab, onTabClick, buttons }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {buttons.map(({ title, label, icon: Icon, variant, id }, index) => (
        <Button
          key={index}
          variant={activeTab === title ? "default" : variant}
          className="flex justify-between"
          onClick={() => onTabClick(id)}
        >
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5" />
            {title}
          </div>
          {label && (
            <span className="ml-auto text-xs text-muted-foreground">
              {label}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
};

export default ButtonList;
