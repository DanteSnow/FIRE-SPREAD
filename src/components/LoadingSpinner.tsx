import "../style/flameStyle.css";

export default function LoadingSpinner() {
  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-black text-9xl font-bold text-black">
        <div className="flame" />
      </div>
    </>
  );
}
