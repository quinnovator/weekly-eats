export default function Step({
  number,
  text,
}: { number: number; text: string }) {
  return (
    <div className="flex items-center">
      <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4">
        {number}
      </div>
      <p className="text-green-800">{text}</p>
    </div>
  );
}
