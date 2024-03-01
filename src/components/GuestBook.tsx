import { IGuestBook } from "./GuestBookList";

export default function GuestBook({ guestBook, username }: IGuestBook) {
  return (
    <>
      <div className="mb-3">
        <span>이미지</span>
        <span className="pb-2 pl-5 text-lg font-bold">{username}</span>
      </div>
      <div className="mb-12 h-64 rounded-xl border-2 border-white p-10 ">
        <span>{guestBook}</span>
      </div>
    </>
  );
}
