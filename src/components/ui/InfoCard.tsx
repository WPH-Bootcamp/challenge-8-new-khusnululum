type Props = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

export default function InfoCard({ icon, label, value }: Props) {
  return (
    <div
      className="
        bg-white/5 border border-white/10
        rounded-2xl
        px-4 py-4
        flex flex-col items-center justify-center
        text-center
        w-full
      "
    >
      <div className="text-white text-lg mb-2">{icon}</div>
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="text-white text-sm font-semibold mt-1">{value}</p>
    </div>
  );
}
