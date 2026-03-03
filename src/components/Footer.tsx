export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 py-8 flex items-center justify-between text-xs text-gray-500">
      <div className="flex justify-center gap-2">
        <img src="/MovieLogo.svg" alt="Logo" className="w-6" />
        <span className="text-xl font-semibold text-white">
          <p>Movie</p>
        </span>
      </div>
      <span>Copyright ©2025 Movie Explorer</span>
    </footer>
  );
}
