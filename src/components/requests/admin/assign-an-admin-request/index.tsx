import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAssignAnAdminRequest } from "@/hooks";
import { toast } from "@/hooks/use-toast";
import { Request } from "@/types/models";

interface assignAnAdminRequestProps {
  requestId: number;
  onSuccess?: (request: Request) => void;
  onCancel?: () => void;
}

export const AssignAnAdminRequest = ({
  requestId,
  onSuccess,
  onCancel,
}: assignAnAdminRequestProps) => {
  const { mutateAsync: assignRequest, isPending } = useAssignAnAdminRequest();

  const onAssign = async () => {
    try {
      const request = await assignRequest(requestId);

      onSuccess?.(request);
    } catch (error) {
      console.log(error);
      toast({
        title: "Произошла ошибка",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full">Принять</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Принять запрос?</AlertDialogTitle>
          <AlertDialogDescription>
            Вы уверены, что хотите принять этот запрос?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Нет</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onAssign} disabled={isPending}>
              Принять
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
