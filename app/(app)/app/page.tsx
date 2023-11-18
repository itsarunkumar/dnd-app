import { Boards } from "./_components/boards";

export default async function App() {
  return (
    <div className=" h-full flex justify-center items-center gap-3  p-4 overflow-x-auto">
      <Boards />
    </div>
  );
}
