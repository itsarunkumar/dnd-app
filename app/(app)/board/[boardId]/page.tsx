import { getTables } from "@/actions/table-action";
import DND from "../_components/dnd-context";

export default async function App({ params }: { params: { boardId: string } }) {
  const containers = await getTables(params.boardId);

  return (
    <div className=" h-full flex gap-3  p-4 overflow-x-auto">
      <DND containers={containers} />
    </div>
  );
}
