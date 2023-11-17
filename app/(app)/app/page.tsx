import { getTables } from "@/actions/table-action";
import DND from "./_components/dnd-context";
import { TableForm } from "./_components/form";

export default async function App() {
  const containers = await getTables();

  return (
    <div className=" h-full flex gap-3  p-4 overflow-x-auto">
      <DND containers={containers} />
    </div>
  );
}
